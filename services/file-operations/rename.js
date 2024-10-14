import { rename } from 'fs/promises';
import path from 'path';
import { parseInput } from '../../utils/parse-input-arr.js';
import { colorMap } from '../../colors.js';
import { checkPathIfExists } from '../../utils/check-path.js';

export async function renameFile(input, { currentDir: directory }) {
    try {
        const params = await parseInput(input);
        if (params.length !== 2) throw new Error("Invalid input");

        const sourceFile = params[0];
        const newFileName = params[1];

        const sourceFilePath = path.resolve(directory, sourceFile);
        const lastFileDirectory = path.dirname(sourceFilePath);
        const destinationFilePath = path.resolve(lastFileDirectory, newFileName);

        const sourceExists = await checkPathIfExists(sourceFilePath);
        if (!sourceExists) throw new Error("Invalid input");

        const destinationExists = await checkPathIfExists(destinationFilePath);
        if (destinationExists) throw new Error("Invalid input");

        await rename(sourceFilePath, destinationFilePath);

    } catch (error) {
        console.log(`${colorMap.red}Error: ${error.message}${colorMap.reset}`);
    }
}
