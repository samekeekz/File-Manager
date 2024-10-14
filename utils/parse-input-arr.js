export function parseInput(input) {
    const params = input.trim().split(/\s+/);

    if (params.length === 0) return null;
    if (params.length === 1) return [];

    return params.slice(1);
}