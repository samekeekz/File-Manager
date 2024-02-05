import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { parseInput } from '../../utils/parse-input-arr.js';
import { colorMap } from '../../colors.js';
import path from 'path';

export async function hash(input, { currentDir: directory }) {
    try {
        const params = await parseInput(input);
        if (params.length !== 1) throw new Error("Invalid input");

        const filePath = path.resolve(directory, params[0]);

        const readStream = createReadStream(filePath);
        const hash = createHash('sha256');

        readStream.on('data', (chunk) => {
            hash.update(chunk);
        });

        readStream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(`Hash for '${params[0]}': ${fileHash}`);
        });

        readStream.on('error', (error) => {
            throw error;
        });
    } catch (error) {
        console.log(`${colorMap.red}Error: ${error.message}${colorMap.reset}`);
    }
}
