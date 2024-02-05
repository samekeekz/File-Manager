import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { checkPathIfExists } from '../../utils/check-path.js';
import { parseInput } from '../../utils/parse-input-arr.js';
import { colorMap } from '../../colors.js';
import zlib from "zlib";

export async function compress(input, { currentDir: directory }) {
    try {
        const params = await parseInput(input);
        if (params.length !== 2) throw new Error("Invalid input");

        const sourceFile = params[0];
        const destinationDirectory = params[1];
        const sourceFilePath = resolve(directory, sourceFile);
        const destinationFilePath = resolve(directory, destinationDirectory);

        const sourceExists = await checkPathIfExists(sourceFilePath);
        if (!sourceExists) throw new Error("Invalid input");

        const destinationExists = await checkPathIfExists(destinationFilePath);
        if (!destinationExists) throw new Error("Invalid input");

        const destinationFileName = `${sourceFile}.br`;
        const destinationFile = resolve(destinationDirectory, destinationFileName);

        const readStream = createReadStream(sourceFilePath);
        const writeStream = createWriteStream(destinationFile, { flags: "wx" });

        const compressStream = zlib.createBrotliCompress();

        await pipeline(readStream, compressStream, writeStream);

    } catch (error) {
        console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}
