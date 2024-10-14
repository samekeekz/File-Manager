import { colorMap } from '../../colors.js';
import { resolve } from 'path';

export function up(directory) {
    try {
        const currentDirectory = directory.currentDir;
        directory.currentDir = resolve(currentDirectory, "..");
    } catch {
        console.log(`${colorMap.red}Operation failed${colorMap.reset}`);
    }
}
