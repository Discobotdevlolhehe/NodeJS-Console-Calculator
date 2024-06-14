import inquirer from 'inquirer';
import { 
    performAddition, 
    performSubtraction, 
    performMultiplication, 
    performDivision,
    performTrigonometry,
    aTrigonometryPerform,
    performSquareRoot,
    performSquare,
    performLogarithm } from '../funcPerform/arithmetic.mjs';

console.log("Welcome to the Simple Calculator!");

function calculator() {
    inquirer.prompt({
        type: 'list',
        name: 'operation',
        message: 'Choose operation:',
        choices: [
            'Addition',
            'Subtraction',
            'Multiplication',
            'Division',
            'Trigonometry',
            'Arc Trigonometry',
            'Square Root',
            'Square',
            'Logarithm',
            'Back'
        ]
    }).then(answer => {
        switch (answer.operation) {
            case 'Addition':
                performOperation(performAddition, calculator);
                break;
            case 'Subtraction':
                performOperation(performSubtraction, calculator);
                break;
            case 'Multiplication':
                performOperation(performMultiplication, calculator);
                break;
            case 'Division':
                performOperation(performDivision, calculator);
                break;
            case 'Trigonometry':
                performTrigonometryOperation(calculator);
                break;
            case 'Arc Trigonometry':
                aTrigonometryPerformOperation(calculator);
                break;
            case 'Square Root':
                performSquareRootOperation(calculator);
                break;
            case 'Square':
                performSquareOperation(calculator);
                break;
            case 'Logarithm':
                performLogarithmOperation(calculator);
                break;
            case 'Back':
                import ('../index.mjs').then(module => {
                    const { chooseCalculator } = module
                    chooseCalculator()
                })
                break;
            default:
                console.log("Invalid choice. Please choose an operation from the list.");
                calculator();
        }
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}

function performOperation(operationFunction, callback) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'num1',
            message: 'Enter first number:'
        },
        {
            type: 'input',
            name: 'num2',
            message: 'Enter second number:'
        }
    ]).then(answers => {
        const num1 = parseFloat(answers.num1);
        const num2 = parseFloat(answers.num2);
        console.log(`Result: ${operationFunction(num1, num2)}`);
        callback(); // Move the callback invocation inside the 'then' block
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}

function performTrigonometryOperation(callback) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'Choose trigonometric operation:',
            choices: ['sin', 'cos', 'tan', 'cosec', 'sec', 'cot']
        },
        {
            type: 'input',
            name: 'angle',
            message: 'Enter angle:'
        },
        {
            type: 'list',
            name: 'unit',
            message: 'Are you using degrees (d) or radians (r)?',
            choices: ['d', 'r']
        }
    ]).then(answers => {
        let angle;
        if (answers.unit === 'd') {
            angle = parseFloat(answers.angle) * (Math.PI / 180);
        } else if (answers.unit === 'r') {
            angle = parseFloat(answers.angle);
        } else {
            console.log("Invalid unit. Please enter 'd' for degrees or 'r' for radians.");
            return;
        }
        // Pass the operation and angle to performTrigonometry
        performTrigonometry(answers.operation, angle);
        callback(); // Move the callback invocation inside the 'then' block
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}

function aTrigonometryPerformOperation(callback) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'Choose trigonometric operation:',
            choices: ['asin', 'acos', 'atan', 'acosec', 'asec', 'acot']
        },
        {
            type: 'input',
            name: 'angle',
            message: 'Enter angle:'
        },
        {
            type: 'list',
            name: 'unit',
            message: 'Are you using degrees (d) or radians (r)?',
            choices: ['d', 'r']
        }
    ]).then(answers => {
        let angle;
        if (answers.unit === 'd') {
            angle = parseFloat(answers.angle) * (Math.PI / 180);
        } else if (answers.unit === 'r') {
            angle = parseFloat(answers.angle);
        } else {
            console.log("Invalid unit. Please enter 'd' for degrees or 'r' for radians.");
            return;
        }
        // Pass the operation and angle to performTrigonometry
        aTrigonometryPerform(answers.operation, angle);
        callback();
    });
}

function performSquareRootOperation(callback) {
    inquirer.prompt({
        type: 'input',
        name: 'number',
        message: 'Enter number:'
    }).then(answer => {
        console.log(`Result: ${performSquareRoot(parseFloat(answer.number))}`);
        callback(); // Move the callback invocation inside the 'then' block
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}

function performSquareOperation(callback) {
    inquirer.prompt({
        type: 'input',
        name: 'number',
        message: 'Enter number:'
    }).then(answer => {
        console.log(`Result: ${performSquare(parseFloat(answer.number))}`);
        callback(); // Move the callback invocation inside the 'then' block
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}
function performLogarithmOperation(callback) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'base',
            message: 'Enter base:'
        },
        {
            type: 'input',
            name: 'number',
            message: 'Enter number:'
        }
    ]).then(answers => {
        // Pass the input values to performLogarithm function
        performLogarithm(parseFloat(answers.base), parseFloat(answers.number), callback);
    }).catch(error => {
        console.error('An error occurred:', error);
    });
}

export { calculator };

