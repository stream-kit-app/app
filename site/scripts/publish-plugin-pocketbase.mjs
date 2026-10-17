/**
 * Publish built plugin zips to PocketBase so https://stream-kit.app/api/plugins/<key>/manifest.json
 * (the update feed installed plugins poll) serves the same version as the GitHub distribution repos.
 *
 * Runs after `scripts/publish-plugin-distribution.mjs` in the Publish Plugins workflow, which leaves
 * `plugins/<key>/dist/plugin-<key>.zip` behind. Idempotent: an existing version with the same zip is
 * left alone, otherwise the zip is (re)uploaded and the version is marked as latest.
 *
 * Usage:
 *   node site/scripts/publish-plugin-pocketbase.mjs --all
 *   node site/scripts/publish-plugin-pocketbase.mjs --plugin tts [--dry-run]
 *
 * Env: PUBLIC_POCKETBASE_URL, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD (superuser).
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import PocketBase from 'pocketbase';

import {
	getDownloadUrl,
	getPluginDir,
	getZipFileName,
	PLUGIN_KEYS
} from '../../scripts/plugin-distribution-config.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const POCKETBASE_URL = process.env.PUBLIC_POCKETBASE_URL ?? process.env.POCKETBASE_URL;
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD;

function parseArgs(argv) {
	const options = { plugins: [], dryRun: false };

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];

		if (arg === '--all') {
			options.plugins = [...PLUGIN_KEYS];
		} else if (arg === '--plugin') {
			options.plugins.push(argv[index + 1]);
			index += 1;
		} else if (arg === '--dry-run') {
			options.dryRun = true;
		}
	}

	return options;
}

function pocketBaseDate(date = new Date()) {
	return date.toISOString().replace('T', ' ');
}

function escapeFilterValue(value) {
	return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

async function loadRelease(key) {
	const pluginDir = getPluginDir(repoRoot, key);
	const manifestPath = join(pluginDir, 'manifest.json');
	const zipPath = join(pluginDir, 'dist', getZipFileName(key));

	if (!existsSync(manifestPath)) {
		throw new Error(`Manifest not found for ${key}: ${manifestPath}`);
	}

	if (!existsSync(zipPath)) {
		throw new Error(
			`Zip not found for ${key}: ${zipPath}. Run "node scripts/package-plugin.mjs --plugin ${key}" (or the distribution publish) first.`
		);
	}

	const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
	const zip = await readFile(zipPath);

	return {
		key,
		manifest,
		zipName: getZipFileName(key),
		zip,
		sha256: createHash('sha256').update(zip).digest('hex')
	};
}

async function findFirst(pb, collection, filter) {
	try {
		return await pb.collection(collection).getFirstListItem(filter);
	} catch (error) {
		if (error?.status === 404) {
			return null;
		}

		throw error;
	}
}

/** First-party plugins share one author; reuse it for a plugin that is new to the catalog. */
async function resolveAuthorId(pb) {
	const existing = await pb.collection('plugins').getList(1, 1, { sort: 'created' });
	const authorId = existing.items[0]?.author;

	if (!authorId) {
		throw new Error(
			'No plugin records exist yet, so no author can be inherited. Create the first plugin record in the PocketBase admin (or run site/scripts/seed-plugins.mjs) once.'
		);
	}

	return authorId;
}

async function upsertPlugin(pb, release) {
	const { manifest } = release;
	const existing = await findFirst(pb, 'plugins', `key="${escapeFilterValue(manifest.key)}"`);
	const payload = {
		name: manifest.name,
		description: manifest.description ?? '',
		icon: manifest.icon ?? ''
	};

	if (existing) {
		return pb.collection('plugins').update(existing.id, payload);
	}

	return pb.collection('plugins').create({
		...payload,
		key: manifest.key,
		author: await resolveAuthorId(pb)
	});
}

async function uploadZip(pb, release) {
	const formData = new FormData();

	formData.append('file', new Blob([release.zip], { type: 'application/zip' }), release.zipName);
	formData.append('mimeType', 'application/zip');
	formData.append('size', String(release.zip.byteLength));
	formData.append('sha256', release.sha256);
	formData.append('originalName', release.zipName);

	return pb.collection('files').create(formData);
}

async function markLatest(pb, pluginId, versionId) {
	const versions = await pb.collection('plugin_versions').getFullList({
		filter: `plugin="${pluginId}" && isLatest=true && id!="${versionId}"`
	});

	for (const version of versions) {
		await pb.collection('plugin_versions').update(version.id, { isLatest: false });
	}
}

async function publishRelease(pb, release, dryRun) {
	const { key, manifest, sha256 } = release;
	const label = `${manifest.name} (${key}) v${manifest.version}`;

	if (dryRun) {
		console.log(`[dry-run] Would publish ${label} (sha256 ${sha256})`);
		return;
	}

	const plugin = await upsertPlugin(pb, release);
	const existingVersion = await findFirst(
		pb,
		'plugin_versions',
		`plugin="${plugin.id}" && version="${escapeFilterValue(manifest.version)}"`
	);
	const existingFile = existingVersion?.file
		? await pb
				.collection('files')
				.getOne(existingVersion.file)
				.catch(() => null)
		: null;
	const unchanged = existingVersion?.isLatest && existingFile?.sha256 === sha256;

	if (unchanged) {
		console.log(`= ${label} is already published`);
		return;
	}

	const file = existingFile?.sha256 === sha256 ? existingFile : await uploadZip(pb, release);
	const payload = {
		plugin: plugin.id,
		file: file.id,
		version: manifest.version,
		streamKitVersion: manifest.streamKitVersion ?? '',
		entry: manifest.entry ?? '',
		downloadUrl: getDownloadUrl(key, manifest.version),
		sha256,
		isLatest: true,
		publishedAt: existingVersion?.publishedAt || pocketBaseDate()
	};
	const version = existingVersion
		? await pb.collection('plugin_versions').update(existingVersion.id, payload)
		: await pb.collection('plugin_versions').create(payload);

	await markLatest(pb, plugin.id, version.id);

	if (existingFile && existingFile.id !== file.id) {
		await pb
			.collection('files')
			.delete(existingFile.id)
			.catch((error) => {
				console.warn(`  Could not remove the previous zip of ${label}: ${error.message}`);
			});
	}

	console.log(`✓ Published ${label}`);
}

async function main() {
	const options = parseArgs(process.argv.slice(2));

	if (options.plugins.length === 0) {
		throw new Error('Pass --all or --plugin <key>.');
	}

	const releases = [];

	for (const key of options.plugins) {
		releases.push(await loadRelease(key));
	}

	if (options.dryRun) {
		for (const release of releases) {
			await publishRelease(null, release, true);
		}

		return;
	}

	if (!POCKETBASE_URL) {
		throw new Error('Set PUBLIC_POCKETBASE_URL (e.g. https://api.stream-kit.app).');
	}

	if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
		throw new Error(
			'Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD to PocketBase superuser credentials.'
		);
	}

	const pb = new PocketBase(POCKETBASE_URL);

	await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
	console.log(`Publishing ${releases.length} plugin release(s) to ${POCKETBASE_URL}`);

	const failures = [];

	for (const release of releases) {
		try {
			await publishRelease(pb, release, false);
		} catch (error) {
			failures.push(release.key);
			console.error(
				`✗ ${release.key}: ${error?.response?.message ?? error.message ?? error}`
			);

			if (error?.response?.data) {
				console.error(JSON.stringify(error.response.data, null, 2));
			}
		}
	}

	if (failures.length > 0) {
		throw new Error(`Failed to publish: ${failures.join(', ')}`);
	}
}

main().catch((error) => {
	console.error(error.message ?? error);
	process.exit(1);
});
