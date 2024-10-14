import os from 'os';
import { colorMap } from '../../colors.js';
import { parseInput } from '../../utils/parse-input-arr.js';

export async function getInfo(input, { currentDir: directory }) {
    try {
        const command = parseInput(input)[0];
        switch (command) {
            case '--EOL':
                console.log(`End-Of-Line (EOL): ${JSON.stringify(os.EOL)}`);
                break;
            case '--cpus':
                const cpus = os.cpus();
                console.log(`Number of CPUs: ${cpus.length}`);
                console.table(
                    cpus.map((cpu) => ({
                        Model: cpu.model,
                        "Clock Rate (GHz)": cpu.speed / 1000,
                    }))
                )
                break;
            case '--homedir':
                console.log(`Home Directory: ${os.homedir()}`);
                break;
            case '--username':
                console.log(`Current User Name: ${os.userInfo().username}`);
                break;
            case '--architecture':
                console.log(`CPU Architecture: ${os.arch()}`);
                break;
            default:
                throw new Error("Invalid input");
        }
    } catch (error) {
        console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}
