
// Function to calculate the nth term of a GP
function nthTermGP(firstTerm, commonRatio, n) {
    return firstTerm * Math.pow(commonRatio, n - 1);
}

// Function to calculate the sum of the first n terms of a GP
function sumOfTermsGP(firstTerm, commonRatio, n) {
    if (commonRatio === 1) {
        return firstTerm * n;
    } else {
        return firstTerm * (Math.pow(commonRatio, n) - 1) / (commonRatio - 1);
    }
}

// Function to calculate the number of terms in a GP
function numberOfTermsGP(firstTerm, lastTerm, commonRatio) {
    return Math.log(lastTerm / firstTerm) / Math.log(commonRatio) + 1;
}

// Function to find the first term of a GP given the second term and common ratio
function firstTermGP(secondTerm, commonRatio) {
    return secondTerm / commonRatio;
}

// Function to find the common ratio of a GP given the first and second terms
function commonRatioGP(firstTerm, secondTerm) {
    return secondTerm / firstTerm;
}

export {
    nthTermGP,
    sumOfTermsGP,
    numberOfTermsGP,
    firstTermGP,
    commonRatioGP
}