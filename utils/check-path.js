import fs from 'fs';

export async function checkPathIfExists(path) {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false;
    }
}