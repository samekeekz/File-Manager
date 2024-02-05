import { colorMap } from "../colors.js";
import { add } from "../services/file-operations/add.js";
import { open } from "../services/file-operations/cat.js";
import { copy } from "../services/file-operations/copy.js";

export async function processInput(input, rl, dir) {
    switch (input) {
        case "hello":
            console.log("hi hi");
            break;
        default:
            processInputWithHandlers(input, dir);
    }
}



async function processInputWithHandlers(input, dir) {
    const command = input.split(" ")[0];
    switch (command) {
        case "add":
            await add(input, dir);
            break;
        case "cat":
            await open(input, dir);
            break;
        case "cp":
            await copy(input, dir);
            break;
        default:
            console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}