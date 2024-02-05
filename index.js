import { getUsername } from "./utils/get-username.js";
import { checkPathIfExists } from "./utils/check-path.js";
import { initializeFileManager } from "./utils/file-manager.js";
import os from 'os';
import { colorMap } from "./colors.js";

const usernameInput = process.argv[2]?.slice(2);
const homeDir = os.homedir();
let username = "Anonymous";

if (usernameInput) {
    username = getUsername(usernameInput);
}

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`${colorMap.cyan}You are currently in ${homeDir}${colorMap.reset}`);

initializeFileManager(username, homeDir)