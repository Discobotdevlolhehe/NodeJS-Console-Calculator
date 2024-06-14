import inquirer from 'inquirer';
import { solveLinearEquation } from '../functions/equation/linear.mjs';
import { solveQuadraticEquation } from '../functions/equation/quadratic.mjs';
import { solveCubicEquation } from '../functions/equation/cubic.mjs';

function askEquationType() {
    inquirer
        .prompt({
            type: 'list',
            name: 'equationType',
            message: 'What would you like to solve?',
            choices: ['Linear', 'Quadratic', 'Cubic', 'Back']
        })
        .then(answer => {
            switch (answer.equationType) {
                case 'Linear':
                    askCoefficients('linear');
                    break;
                case 'Quadratic':
                    askCoefficients('quadratic');
                    break;
                case 'Cubic':
                    askCoefficients('cubic');
                    break;
                case 'Back':
                    import ('../index.mjs').then(module => {
                        const { chooseCalculator } = module
                        chooseCalculator()
                    })
                default:
                    console.log('Invalid choice.');
                    askEquationType();
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

function askCoefficients(type) {
    const numCoefficients = type === 'linear' ? 2 : (type === 'quadratic' ? 3 : 4);
    const coefficientNames = type === 'linear' ? ['a', 'b'] : (type === 'quadratic' ? ['a', 'b', 'c'] : ['a', 'b', 'c', 'd']);
    const questions = [];

    for (let i = 0; i < numCoefficients; i++) {
        questions.push({
            type: 'input',
            name: `coefficient${coefficientNames[i]}`,
            message: `Enter coefficient ${coefficientNames[i]}:`
        });
    }

    inquirer
        .prompt(questions)
        .then(answers => {
            const coefficients = Object.values(answers).map(parseFloat);
            solveEquation(type, coefficients);
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

function solveEquation(type, coefficients) {
    let result;
    switch (type) {
        case 'linear':
            result = solveLinearEquation(coefficients);
            break;
        case 'quadratic':
            result = solveQuadraticEquation(coefficients);
            break;
        case 'cubic':
            result = solveCubicEquation(coefficients);
            break;
        default:
            console.log('Invalid equation type.');
            return;
    }
    displayResult(result);
}
 function displayResult(result) {
    const boxWidth = 40;
    const horizontalLine = '─'.repeat(boxWidth - 2);

    if (Array.isArray(result)) {
        const longestRootLength = result.reduce((max, root) => Math.max(max, root.toString().length), 0);
        const boxedResult = result.map(root => {
            return `│ ${root.toString().padEnd(longestRootLength)} │`;
        }).join('\n');

        console.log(`┌${horizontalLine}┐`);
        console.log(boxedResult);
        console.log(`└${horizontalLine}┘`);
    } else {
        const boxedResult = `│ ${result.toString().padEnd(boxWidth - 4)}│`;
        console.log(`┌${horizontalLine}┐`);
        console.log(boxedResult);
        console.log(`└${horizontalLine}┘`);
    }

askEquationType();
}



export { askEquationType }