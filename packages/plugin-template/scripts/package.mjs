import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.resolve(root, 'dist');
const packageDir = path.resolve(outputDir, 'plugin-package');
const zipPath = path.resolve(outputDir, 'plugin.zip');

rmSync(packageDir, { force: true, recursive: true });
mkdirSync(path.resolve(packageDir, 'dist'), { recursive: true });

const manifest = JSON.parse(readFileSync(path.resolve(root, 'manifest.json'), 'utf8'));
writeFileSync(path.resolve(packageDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
cpSync(path.resolve(outputDir, 'index.js'), path.resolve(packageDir, 'dist/index.js'));

rmSync(zipPath, { force: true });

if (process.platform === 'win32') {
	execFileSync(
		'powershell',
		[
			'-NoProfile',
			'-Command',
			`Compress-Archive -Path "${packageDir}\\*" -DestinationPath "${zipPath}" -Force`
		],
		{ stdio: 'inherit' }
	);
} else {
	execFileSync('zip', ['-r', zipPath, '.'], { cwd: packageDir, stdio: 'inherit' });
}

console.log(`Created ${zipPath}`);
