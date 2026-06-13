import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const appPackageJsonPath = join(root, 'packages/app/package.json');
const tauriConfPath = join(root, 'packages/app/src-tauri/tauri.conf.json');
const tauriWindowsConfPath = join(root, 'packages/app/src-tauri/tauri.windows.conf.json');
const cargoTomlPath = join(root, 'packages/app/src-tauri/Cargo.toml');

/** MSI/WiX requires numeric-only versions: major.minor.patch or major.minor.patch.build */
function toWixVersion(version) {
	const [core, pre] = version.split('-');
	const [major, minor, patch] = core.split('.');

	if (!pre) {
		return `${major}.${minor}.${patch}`;
	}

	if (/^\d+$/.test(pre)) {
		return `${major}.${minor}.${patch}.${pre}`;
	}

	const lastPart = pre.split('.').at(-1);
	if (/^\d+$/.test(lastPart)) {
		return `${major}.${minor}.${patch}.${lastPart}`;
	}

	return `${major}.${minor}.${patch}.0`;
}

const { version } = JSON.parse(readFileSync(appPackageJsonPath, 'utf8'));

const tauriConf = JSON.parse(readFileSync(tauriConfPath, 'utf8'));
tauriConf.version = version;
writeFileSync(tauriConfPath, `${JSON.stringify(tauriConf, null, '\t')}\n`);

const tauriWindowsConf = JSON.parse(readFileSync(tauriWindowsConfPath, 'utf8'));
tauriWindowsConf.bundle ??= {};
tauriWindowsConf.bundle.windows ??= {};
tauriWindowsConf.bundle.windows.wix ??= {};
tauriWindowsConf.bundle.windows.wix.version = toWixVersion(version);
writeFileSync(tauriWindowsConfPath, `${JSON.stringify(tauriWindowsConf, null, '\t')}\n`);

let cargoToml = readFileSync(cargoTomlPath, 'utf8');
cargoToml = cargoToml.replace(/^version = ".*"$/m, `version = "${version}"`);
writeFileSync(cargoTomlPath, cargoToml);

console.log(`Synced app version to ${version}`);
console.log(`Synced MSI/WiX version to ${toWixVersion(version)}`);
