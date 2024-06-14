// Function to calculate the nth term of an AP
function nthTermAP(firstTerm, commonDifference, n) {
    return firstTerm + (n - 1) * commonDifference;
}

// Function to calculate the sum of the first n terms of an AP
function sumOfTermsAP(firstTerm, commonDifference, n) {
    return (n / 2) * (2 * firstTerm + (n - 1) * commonDifference);
}

// Function to calculate the number of terms in an AP
function numberOfTermsAP(firstTerm, lastTerm, commonDifference) {
    return Math.ceil((lastTerm - firstTerm + commonDifference) / commonDifference);
}

// Function to find the first term of an AP given the second term and common difference
function firstTermAP(secondTerm, commonDifference) {
    return secondTerm - commonDifference;
}

// Function to find the common difference of an AP given the first and second terms
function commonDifferenceAP(firstTerm, secondTerm) {
    return secondTerm - firstTerm;
}


export {
    nthTermAP,
    sumOfTermsAP,
    numberOfTermsAP,
    firstTermAP,
    commonDifferenceAP
}