import { colorMap } from "../colors.js";
import { add } from "../services/file-operations/add.js";
import { open } from "../services/file-operations/cat.js";
import { copy } from "../services/file-operations/copy.js";
import { move } from "../services/file-operations/move.js";
import { renameFile } from "../services/file-operations/rename.js";
import { cd } from "../services/navigation/cd.js";
import { ls } from "../services/navigation/ls.js";
import { up } from "../services/navigation/up.js";

export async function processInput(input, rl, directory) {
    if (input === "hello") {
        console.log("hi hi");
    } else if (input.startsWith("cat")) {
        await open(input, directory);
    } else if (input.startsWith("add")) {
        await add(input, directory);
    } else if (input.startsWith("cp")) {
        await copy(input, directory);
    } else if (input.startsWith("mv")) {
        await move(input, directory);
    } else if (input.startsWith("rn")) {
        await renameFile(input, directory);
    } else if (input === "ls") {
        await ls(directory);
    } else if (input === "up") {
        up(directory);
    } else if (input.startsWith("cd")) {
        await cd(input, directory);
    }
    else {
        console.log(`${colorMap.red}Invalid input${colorMap.reset}`);
    }
}
