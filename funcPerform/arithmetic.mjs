import { add } from '../functions/arithmetic/add.mjs';
import { subtract } from '../functions/arithmetic/subtract.mjs';
import { divide } from '../functions/arithmetic/divide.mjs';
import { multiply } from '../functions/arithmetic/multiply.mjs';
import { sin, cos, tan, cosec, sec, cot } from '../functions/arithmetic/trigonometry.mjs';
import { squareRoot } from '../functions/arithmetic/root.mjs';
import { square } from '../functions/arithmetic/square.mjs';
import { logarithm } from '../functions/arithmetic/logarithm.mjs';
import { acos, asin, atan, asec, acosec, acot } from '../functions/arithmetic/atrigonometry.mjs'
import inquirer from 'inquirer';
import colors from 'colors';

function createBox(lines) {
    const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const box = [
        '┌' + '─'.repeat(maxLength + 2) + '┐',
        ...lines.map(line => '│ ' + line.padEnd(maxLength, ' ') + ' │'),
        '└' + '─'.repeat(maxLength + 2) + '┘'
    ];
    return box.join('\n');
}

function performAddition(num1, num2) {
    const result = add(num1, num2);
    const box = createBox([
        `Input 1: ${num1}`.green,
        `Input 2: ${num2}`.green,
        `Result: ${result}`.green
    ]);
    console.log(box);
    return result;
}

function performSubtraction(num1, num2) {
    const result = subtract(num1, num2);
    const box = createBox([
        `Input 1: ${num1}`.green,
        `Input 2: ${num2}`.green,
        `Result: ${result}`.green
    ]);
    console.log(box);
    return result;
}

function performMultiplication(num1, num2) {
    const result = multiply(num1, num2);
    const box = createBox([
        `Input 1: ${num1}`.green,
        `Input 2: ${num2}`.green,
        `Result: ${result}`.green
    ]);
    console.log(box);
    return result;
}

function performDivision(num1, num2) {
    const result = divide(num1, num2);
    const box = createBox([
        `Input 1: ${num1}`.green,
        `Input 2: ${num2}`.green,
        `Result: ${result}`.green
    ]);
    console.log(box);
    return result;
}

function performTrigonometry(operation, angle) {
    let result;
    let operationName;
    switch (operation) {
        case 'sin':
            result = sin(angle);
            operationName = 'Sine';
            break;
        case 'cos':
            result = cos(angle);
            operationName = 'Cosine';
            break;
        case 'tan':
            result = tan(angle);
            operationName = 'Tangent';
            break;
        case 'cosec':
                result = cosec(angle);
                operationName = 'Cosecant';
            break;
        case 'sec':
            result = sec(angle);
            operationName = 'Secant';
            break;
        case 'cot':
            result = cot(angle);
            operationName = 'Cotangent';
            break;
        default:
            console.log("Invalid operation. Please choose a valid trigonometric function.");
            return;
    }
    const box = createBox([
        `${operationName} Operation: ${operation}`,
        `Angle: ${angle}`,
        `Result: ${result}`
    ]);
    console.log(box);
}

function aTrigonometryPerform(operation, angle) {
    let result;
    let operationName;
    switch (operation) {
        case 'asin':
            result = asin(angle);
            operationName = 'Arc Sine';
            break;
        case 'acos':
            result = acos(angle);
            operationName = 'Arc Cosine';
            break;
        case 'atan':
            result = atan(angle);
            operationName = 'Arc Tangent';
            break;
        case 'asec':
            result = asec(angle);
            operationName = 'Arc Secant';
            break;
        case 'acosec':
            result = acosec(angle);
            operationName = 'Arc Cosecant';
            break; // Add break statement here
        default:
            console.log("Invalid operation. Please choose a valid trigonometric function.");
            return; // Add a return statement here to exit the function if the operation is invalid
    }
    const box = createBox([
        `${operationName} Operation: ${operation}`,
        `Angle: ${angle}`,
        `Result: ${result}`
    ]);
    console.log(box);
}

function performSquareRoot(number) {
    const result = squareRoot(number);
    const box = createBox([
        `Input: ${number}`.green,
        `Result: ${result}`.green
    ]);
    console.log(box);
    return result;
}

function performSquare(number) {
    const result = square(number);
    const box = createBox([
        `Input: ${number}`.green,
        `Result: ${result}`.green
    ]);
    console.log(box);
    return result;
}

function performLogarithm(base, number, callback) {
    // Call the logarithm function with the input values
    const result = logarithm(base, number);

    // Display the result
    const box = createBox([
        `Base: ${base}`.green,
        `Number: ${number}`.green,
        `Result: ${result}`.green
    ]);
    console.log(box);

    // Invoke the callback function if provided
    if (callback) {
        callback();
    }
}

export {
    performAddition,
    performSubtraction,
    performMultiplication,
    performDivision,
    performTrigonometry,
    aTrigonometryPerform,
    performSquareRoot,
    performSquare,
    performLogarithm
};
