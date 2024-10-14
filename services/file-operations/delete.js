import fs from 'fs/promises';
import { colorMap } from '../../colors.js';

export async function removeFile(input, directory) {
    try {
        const pathToFile = input.split(' ')[1];
        if (!pathToFile) {
            console.log(`${colorMap.red}Error: No file path specified.${colorMap.reset}`);
            return;
        }

        const fullPath = `${directory.currentDir}/${pathToFile}`;
        await fs.unlink(fullPath);
        console.log(`${colorMap.green}File ${pathToFile} has been deleted.${colorMap.reset}`);
    } catch (error) {
        console.error(`${colorMap.red}Error deleting file: ${error.message}${colorMap.reset}`);
    }
}
