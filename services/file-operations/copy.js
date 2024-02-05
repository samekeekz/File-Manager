import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { checkPathIfExists } from '../../utils/check-path.js';
import { parseInput } from '../../utils/parse-input-arr.js';
import { colorMap } from '../../colors.js';

export async function copy(input, { currentDir: directory }) {
    try {
        const params = await parseInput(input);
        if (params.length !== 2) throw new Error("Invalid input");

        const sourceFile = params[0];
        const destinationDirectory = params[1];
        const sourceFilePath = path.resolve(directory, sourceFile);
        const destinationFilePath = path.resolve(directory, destinationDirectory, path.basename(sourceFile));

        const sourceExists = await checkPathIfExists(sourceFilePath);
        if (!sourceExists) throw new Error(`Source file '${sourceFile}' does not exist`);

        const destinationExists = await checkPathIfExists(destinationDirectory);
        if (!destinationExists) throw new Error(`Destination directory '${destinationDirectory}' does not exist`);

        const readStream = createReadStream(sourceFilePath);
        const writeStream = createWriteStream(destinationFilePath);

        await pipeline(readStream, writeStream);

    } catch (error) {
        console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}