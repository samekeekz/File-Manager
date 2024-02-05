import { getUsername } from "./utils/get-username.js";
import { checkPathIfExists } from "./utils/check-path.js";
import { initializeFileManager } from "./utils/file-manager.js";
import os from 'os';

const homeDirectory = os.homedir();

initializeFileManager("Samat", homeDirectory)