import { createWriteStream } from 'node:fs';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

import PocketBase from 'pocketbase';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..', '..');
const pluginsDir = join(repoRoot, 'plugins');

const POCKETBASE_URL = process.env.PUBLIC_POCKETBASE_URL ?? 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD;

const SEED_AUTHOR = {
	email: 'catalog@stream-kit.local',
	password: 'catalog-seed-local',
	name: 'Stream Kit'
};

function pocketBaseDate(date = new Date()) {
	return date.toISOString().replace('T', ' ');
}

function distributionDownloadUrl(manifest) {
	const repoKey = manifest.key;
	return `https://github.com/stream-kit-app/plugin-${repoKey}/releases/download/v${manifest.version}/plugin-${repoKey}.zip`;
}

async function ensurePocketBaseRunning() {
	try {
		const response = await fetch(`${POCKETBASE_URL}/api/health`, { signal: AbortSignal.timeout(3000) });
		if (!response.ok) {
			throw new Error(`health check failed (${response.status})`);
		}
	} catch (error) {
		throw new Error(
			`PocketBase is not reachable at ${POCKETBASE_URL}. Start it with: pnpm --filter @stream-kit/site pb:serve\n(${error.message})`
		);
	}
}

async function loadManifests() {
	const entries = await readdir(pluginsDir, { withFileTypes: true });
	const manifests = [];

	for (const entry of entries) {
		if (!entry.isDirectory()) continue;

		const manifestPath = join(pluginsDir, entry.name, 'manifest.json');

		try {
			const content = await readFile(manifestPath, 'utf8');
			manifests.push(JSON.parse(content));
		} catch {
			// skip plugin folders without a manifest
		}
	}

	return manifests.sort((a, b) => a.name.localeCompare(b.name));
}

async function downloadZip(url, destination) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to download ${url} (${response.status})`);
	}

	if (!response.body) {
		throw new Error(`Empty response while downloading ${url}`);
	}

	await pipeline(Readable.fromWeb(response.body), createWriteStream(destination));
}

async function ensureAuthor(pb) {
	try {
		return await pb.collection('users').getFirstListItem(`email="${SEED_AUTHOR.email}"`);
	} catch {
		return pb.collection('users').create({
			email: SEED_AUTHOR.email,
			password: SEED_AUTHOR.password,
			passwordConfirm: SEED_AUTHOR.password,
			name: SEED_AUTHOR.name,
			emailVisibility: false,
			verified: true
		});
	}
}

async function upsertPlugin(pb, authorId, manifest) {
	const payload = {
		key: manifest.key,
		name: manifest.name,
		description: manifest.description ?? '',
		icon: manifest.icon ?? '',
		author: authorId
	};

	try {
		const existing = await pb.collection('plugins').getFirstListItem(`key="${manifest.key}"`);
		return pb.collection('plugins').update(existing.id, payload);
	} catch {
		return pb.collection('plugins').create(payload);
	}
}

async function uploadFileRecord(pb, zipPath, filename) {
	const zipBuffer = await readFile(zipPath);
	const formData = new FormData();

	formData.append('file', new Blob([zipBuffer], { type: 'application/zip' }), filename);

	return pb.collection('files').create(formData);
}

async function upsertFileRecord(pb, zipPath, filename, existingFileId) {
	if (existingFileId) {
		const zipBuffer = await readFile(zipPath);
		const formData = new FormData();

		formData.append('file', new Blob([zipBuffer], { type: 'application/zip' }), filename);

		return pb.collection('files').update(existingFileId, formData);
	}

	return uploadFileRecord(pb, zipPath, filename);
}

async function upsertLatestVersion(pb, pluginId, manifest, fileId) {
	const versionPayload = {
		plugin: pluginId,
		file: fileId,
		version: manifest.version,
		streamKitVersion: manifest.streamKitVersion ?? '',
		entry: manifest.entry ?? '',
		isLatest: true,
		publishedAt: pocketBaseDate()
	};

	const existingVersions = await pb.collection('plugin_versions').getFullList({
		filter: `plugin="${pluginId}"`
	});

	for (const version of existingVersions) {
		if (version.version === manifest.version) continue;
		if (version.isLatest) {
			await pb.collection('plugin_versions').update(version.id, { isLatest: false });
		}
	}

	try {
		const existing = await pb.collection('plugin_versions').getFirstListItem(
			`plugin="${pluginId}" && version="${manifest.version}"`
		);
		return pb.collection('plugin_versions').update(existing.id, versionPayload);
	} catch {
		return pb.collection('plugin_versions').create(versionPayload);
	}
}

async function main() {
	if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
		throw new Error(
			'Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD (PocketBase superuser credentials from http://127.0.0.1:8090/_/)'
		);
	}

	await ensurePocketBaseRunning();

	const pb = new PocketBase(POCKETBASE_URL);
	await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

	const manifests = await loadManifests();

	if (manifests.length === 0) {
		throw new Error(`No manifests found in ${pluginsDir}`);
	}

	const author = await ensureAuthor(pb);
	const tempDir = await mkdtemp(join(tmpdir(), 'stream-kit-seed-'));

	console.log(`Seeding ${manifests.length} plugins from ${pluginsDir}...\n`);

	try {
		for (const manifest of manifests) {
			const plugin = await upsertPlugin(pb, author.id, manifest);
			const zipName = `plugin-${manifest.key}.zip`;
			const zipPath = join(tempDir, zipName);
			const downloadUrl = distributionDownloadUrl(manifest);

			console.log(`  ↓ ${manifest.name}: downloading ${downloadUrl}`);
			await downloadZip(downloadUrl, zipPath);

			let existingFileId;

			try {
				const existingVersion = await pb.collection('plugin_versions').getFirstListItem(
					`plugin="${plugin.id}" && version="${manifest.version}"`
				);
				existingFileId = existingVersion.file;
			} catch {
				existingFileId = undefined;
			}

			const fileRecord = await upsertFileRecord(pb, zipPath, zipName, existingFileId);
			await upsertLatestVersion(pb, plugin.id, manifest, fileRecord.id);

			console.log(`  ✓ ${manifest.name} (${manifest.key}) v${manifest.version}`);
		}
	} finally {
		await rm(tempDir, { recursive: true, force: true });
	}

	console.log('\nDone. Open http://localhost:5173/plugins to verify.');
}

main().catch((error) => {
	console.error(error.message ?? error);
	process.exit(1);
});
