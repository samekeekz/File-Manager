import { colorMap } from '../../colors.js';
import { resolve } from 'path';
import { checkPathIfExists } from '../../utils/check-path.js';

export async function cd(input, directory) {
    try {
        const targetDir = input.split(' ')[1];
        const resolvedDir = resolve(directory.currentDir, targetDir);
        const exists = await checkPathIfExists(resolvedDir);
        if (!exists) {
            throw new Error("Invalid input");
        }
        directory.currentDir = resolvedDir;
    } catch (error) {
        console.log(`${colorMap.red}${error.message}${colorMap.reset}`);
    }
}
