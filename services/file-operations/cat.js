import { parseInput } from '../../utils/parse-input-arr.js';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { colorMap } from '../../colors.js';
import path from 'path';

export async function open(input, { currentDir: directory }) {
    try {
        const params = await parseInput(input);
        if (params.length !== 1) throw new Error("Invalid input");
        const fileName = params[0];
        const filePath = path.resolve(directory, fileName);
        console.log(filePath);
        const isFile = await checkPath(filePath);
        if (!isFile) throw new Error("Invalid path to file");
        const readableStream = createReadStream(filePath, { encoding: 'utf8' });
        await new Promise((resolve, reject) => {
            readableStream.on("error", (err) => {
                reject(err);
            });
            readableStream.on("close", () => {
                resolve();
            });
            readableStream.on("data", (chunk) => {
                console.log(chunk);
            });
        }); console.log(`File '${filePath}' read successfully.`);

    } catch {
        console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}
