// Function to calculate the nth term of a Harmonic Progression (HP)
function nthTermHP(firstTerm, n) {
    return 1 / (firstTerm + (n - 1));
}

// Function to calculate the sum of the first n terms of a Harmonic Progression (HP)
function sumOfTermsHP(firstTerm, n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += nthTermHP(firstTerm, i);
    }
    return sum;
}

// Function to calculate the number of terms in a Harmonic Progression (HP)
function numberOfTermsHP(firstTerm, lastTerm) {
    return 1 / (1 / firstTerm - 1 / lastTerm) + 1;
}

export {
    nthTermHP,
    sumOfTermsHP,
    numberOfTermsHP
}