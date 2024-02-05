import * as readline from "node:readline/promises";
import { stdin as reader, stdout as writer } from "node:process";
import { colorMap } from '../colors.js';

export async function initializeFileManager(user, homeDir) {
    const rl = readline.createInterface({ input: reader, output: writer });
    const workingDirectory = { currentDir: homeDir };

    rl.on("close", () => {
        console.log(`\n${colorMap.blue}Thank you for using File Manager, ${colorMap.yellow}${user}, ${colorMap.blue}goodbye!${colorMap.reset}`);
    });

    rl.on("line", async () => {
        // await processInput(reader.trim(), rl, workingDirectory);
        console.log(
            `${colorMap.blue}You are currently in ${workingDirectory.currentDir}${colorMap.reset}`
        );
    });

}

