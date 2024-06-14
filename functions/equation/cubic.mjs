function solveCubicEquation(coefficients) {
    const [a, b, c, d] = coefficients;

    if (a === 0) {
        return solveQuadraticEquation([b, c, d]);
    }

    const delta0 = b * b - 3 * a * c;
    const delta1 = 2 * b * b * b - 9 * a * b * c + 27 * a * a * d;

    if (delta0 === 0 && delta1 === 0) {
        // All roots are the same
        return [-b / (3 * a)];
    }

    if (delta1 * delta1 - 4 * delta0 * delta0 * delta0 > 0) {
        // 3 real roots
        const C = Math.cbrt((delta1 + Math.sqrt(delta1 * delta1 - 4 * delta0 * delta0 * delta0)) / 2);
        const D = Math.cbrt((delta1 - Math.sqrt(delta1 * delta1 - 4 * delta0 * delta0 * delta0)) / 2);
        const x1 = (-b - C - D) / (3 * a);
        const x2 = (-b + 0.5 * (C + D)) / (3 * a);
        const x3 = (-b + 0.5 * (C + D)) / (3 * a);
        return [x1, x2, x3];
    } else if (delta1 * delta1 - 4 * delta0 * delta0 * delta0 === 0) {
        // 1 real root, 2 complex roots
        const K = delta1 / delta0;
        const x1 = -b / (3 * a) + K;
        const x2 = -0.5 * K - b / (3 * a);
        const x3 = 0.5 * Math.sqrt(3) * Math.sqrt(K * K - 4) * Math.sqrt(delta0) / (3 * a);
        return [x1, x2 + x3 + 'i', x2 - x3 + 'i'];
    } else if (delta1 * delta1 - 4 * delta0 * delta0 * delta0 < 0) {
        // All roots are complex
        const realPart = -b / (3 * a);
        const imaginaryPart = Math.sqrt(Math.abs(delta0)) / (3 * a);
        const complexRoot1 = `${realPart} + ${imaginaryPart}i`;
        const complexRoot2 = `${realPart} - ${imaginaryPart}i`;
        const complexRoot3 = `${realPart} + ${2 * imaginaryPart}i`;
        return [complexRoot1, complexRoot2, complexRoot3];
    }
    else {
        // 1 real root, 2 complex roots
        const theta = Math.acos(delta1 / (2 * Math.sqrt(delta0 * delta0 * delta0)));
        const x1 = -b / (3 * a) + 2 * Math.sqrt(delta0) * Math.cos(theta / 3) / (3 * a);
        const x2 = -b / (3 * a) + 2 * Math.sqrt(delta0) * Math.cos((theta + 2 * Math.PI) / 3) / (3 * a);
        const x3 = -b / (3 * a) + 2 * Math.sqrt(delta0) * Math.cos((theta + 4 * Math.PI) / 3) / (3 * a);
        return [x1, x2, x3];
    }

}

export { solveCubicEquation }