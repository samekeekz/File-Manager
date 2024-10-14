import { parseInput } from '../../utils/parse-input-arr.js';
import { colorMap } from '../../colors.js';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function add(input, { currentDir: directory }) {
    try {
        const params = await parseInput(input);
        if (params.length !== 1) throw new Error("Invalid input");
        const fileName = params[0];
        const filePath = path.resolve(directory, fileName);
        await writeFile(filePath, "", { flag: "wx" });
    } catch {
        console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}
