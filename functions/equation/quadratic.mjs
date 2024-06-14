function solveQuadraticEquation(coefficients) {
    const [a, b, c] = coefficients;
    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [root1, root2];
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        return [root];
    } else {
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
        return [`${realPart} + ${imaginaryPart}i`, `${realPart} - ${imaginaryPart}i`];
    }
}

export { solveQuadraticEquation }