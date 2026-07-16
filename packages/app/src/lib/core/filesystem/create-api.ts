import type { Filesystem } from './filesystem';

export function createFilesystemApi(fs: Filesystem) {
	return {
		select: fs.select.bind(fs),
		save: fs.save.bind(fs),
		join: fs.join.bind(fs),
		create: fs.create.bind(fs),
		open: fs.open.bind(fs),
		copyFile: fs.copyFile.bind(fs),
		mkdir: fs.mkdir.bind(fs),
		readDir: fs.readDir.bind(fs),
		readFile: fs.readFile.bind(fs),
		readTextFile: fs.readTextFile.bind(fs),
		readTextFileLines: fs.readTextFileLines.bind(fs),
		remove: fs.remove.bind(fs),
		rename: fs.rename.bind(fs),
		stat: fs.stat.bind(fs),
		lstat: fs.lstat.bind(fs),
		truncate: fs.truncate.bind(fs),
		writeFile: fs.writeFile.bind(fs),
		writeTextFile: fs.writeTextFile.bind(fs),
		exists: fs.exists.bind(fs),
		watch: fs.watch.bind(fs),
		watchImmediate: fs.watchImmediate.bind(fs),
		size: fs.size.bind(fs)
	};
}
