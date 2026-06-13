import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const appPackageJsonPath = join(root, 'packages/app/package.json');
const tauriConfPath = join(root, 'packages/app/src-tauri/tauri.conf.json');
const cargoTomlPath = join(root, 'packages/app/src-tauri/Cargo.toml');

const { version } = JSON.parse(readFileSync(appPackageJsonPath, 'utf8'));

const tauriConf = JSON.parse(readFileSync(tauriConfPath, 'utf8'));
tauriConf.version = version;
writeFileSync(tauriConfPath, `${JSON.stringify(tauriConf, null, '\t')}\n`);

let cargoToml = readFileSync(cargoTomlPath, 'utf8');
cargoToml = cargoToml.replace(/^version = ".*"$/m, `version = "${version}"`);
writeFileSync(cargoTomlPath, cargoToml);

console.log(`Synced app version to ${version}`);
