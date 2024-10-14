import { parseInput } from '../../utils/parse-input-arr.js';
import { createReadStream } from 'fs';
import { colorMap } from '../../colors.js';
import path from 'path';
import { checkPathIfExists } from '../../utils/check-path.js';

export async function open(input, { currentDir: directory }) {
    try {
        const params = await parseInput(input);
        if (params.length !== 1) throw new Error("Invalid input");
        const fileName = params[0];
        const filePath = path.join(directory, fileName);
        const flag = await checkPathIfExists(filePath);
        if (!flag) throw new Error("Invalid path");
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
        });

    } catch {
        console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}
