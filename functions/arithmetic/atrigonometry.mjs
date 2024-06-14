function asin(angle) {
    return Math.asin(angle);
}

function acos(angle) {
    return Math.acos(angle);
}

function atan(angle) {
     return Math.atan(angle);
}

function asec(angle) {
    return 1/Math.acos(angle);
}

function acosec(angle) {
    return 1 / Math.asin(angle);
}

function acot(angle) {
    return 1/ Math.atan(angle);
}

export {
    asin,
    acos,
    atan,
    asec,
    acosec,
    acot
}