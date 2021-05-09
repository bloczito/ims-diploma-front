export const utils = {
    withinGuard,
}

async function withinGuard(setB, proc) {
    setB(true);
    const results = await proc();
    setB(false);
    return results
}