import { execSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { chmod, mkdir, stat } from 'node:fs/promises';
import { arch, platform } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const POCKETBASE_VERSION = '0.39.4';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pbDir = join(__dirname, '..', 'pb');

function getPlatformAsset() {
	const os = platform();
	const cpu = arch();

	if (os === 'win32') {
		return cpu === 'arm64' ? 'windows_arm64' : 'windows_amd64';
	}

	if (os === 'darwin') {
		return cpu === 'arm64' ? 'darwin_arm64' : 'darwin_amd64';
	}

	if (os === 'linux') {
		return cpu === 'arm64' ? 'linux_arm64' : 'linux_amd64';
	}

	throw new Error(`Unsupported platform: ${os} ${cpu}`);
}

function getBinaryName() {
	return platform() === 'win32' ? 'pocketbase.exe' : 'pocketbase';
}

async function fileExists(path) {
	try {
		await stat(path);
		return true;
	} catch {
		return false;
	}
}

async function downloadFile(url, destination) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to download PocketBase (${response.status}): ${url}`);
	}

	if (!response.body) {
		throw new Error(`Empty response while downloading PocketBase: ${url}`);
	}

	await pipeline(Readable.fromWeb(response.body), createWriteStream(destination));
}

function extractZip(zipPath, destination) {
	if (platform() === 'win32') {
		execSync(
			`powershell -NoProfile -Command "Expand-Archive -Path '${zipPath.replace(/'/g, "''")}' -DestinationPath '${destination.replace(/'/g, "''")}' -Force"`,
			{ stdio: 'inherit' }
		);
		return;
	}

	execSync(`unzip -o "${zipPath}" -d "${destination}"`, { stdio: 'inherit' });
}

export async function ensurePocketBase() {
	const asset = getPlatformAsset();
	const binaryName = getBinaryName();
	const binaryPath = join(pbDir, binaryName);

	await mkdir(join(pbDir, 'pb_data'), { recursive: true });
	await mkdir(join(pbDir, 'pb_migrations'), { recursive: true });
	await mkdir(join(pbDir, 'pb_hooks'), { recursive: true });

	if (await fileExists(binaryPath)) {
		return binaryPath;
	}

	const zipName = `pocketbase_${POCKETBASE_VERSION}_${asset}.zip`;
	const zipPath = join(pbDir, zipName);
	const downloadUrl = `https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/${zipName}`;

	console.log(`Downloading PocketBase v${POCKETBASE_VERSION} (${asset})...`);
	await downloadFile(downloadUrl, zipPath);

	console.log('Extracting PocketBase...');
	extractZip(zipPath, pbDir);

	if (platform() !== 'win32') {
		await chmod(binaryPath, 0o755);
	}

	if (!(await fileExists(binaryPath))) {
		throw new Error(`PocketBase binary not found after extraction: ${binaryPath}`);
	}

	console.log(`PocketBase ready at ${binaryPath}`);
	return binaryPath;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	ensurePocketBase().catch((error) => {
		console.error(error);
		process.exit(1);
	});
}
