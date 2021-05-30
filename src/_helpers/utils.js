import moment from "moment";

export const utils = {
    withinGuard,
    compareDateStr,
    compareDateStrDesc
}

async function withinGuard(setB, proc) {
    setB(true);
    const results = await proc();
    setB(false);
    return results
}

function compareDateStr(a, b) {
    return moment(a).isAfter(moment(b));
}

function compareDateStrDesc(a, b) {
    return compareDateStr(b, a);
}