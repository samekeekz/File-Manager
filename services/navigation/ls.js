import { readdir, stat } from 'fs/promises';
import path from 'path';
import { colorMap } from '../../colors.js';

export async function ls({ currentDir: directory }) {
    try {
        const files = await readdir(directory, { withFileTypes: true });

        const filesArr = [];
        const dirsArr = [];
        const otherArr = [];

        for (const file of files) {
            const filePath = path.join(directory, file.name);
            const fileStats = await stat(filePath);
            const fileInfo = { Name: file.name, Type: '', Size: fileStats.size };

            if (fileStats.isDirectory()) {
                fileInfo.Type = 'dir';
                dirsArr.push(fileInfo);
            } else if (fileStats.isFile()) {
                fileInfo.Type = 'file';
                filesArr.push(fileInfo);
            } else {
                fileInfo.Type = 'other';
                otherArr.push(fileInfo);
            }
        }

        console.table(filesArr.concat(dirsArr, otherArr));
    } catch (error) {
        console.log(`${colorMap.red}Operation failed${colorMap.reset}`);
    }
}
