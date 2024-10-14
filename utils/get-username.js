export function getUsername(argument) {
    const match = argument.match(/username=(.+)/i);
    if (match) {
        let username = match[1];
        username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
        return username;
    }
    return false;
}