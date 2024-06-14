import inquirer from 'inquirer';
import chalk from 'chalk'; 
import {
    addition,
    subtraction,
    multiplication,
    division,
    square,
    root,
    trace,
    transpose,
    determinant,
    minor,
    cofactor,
    scalarMultiplication
} from '../functions/matrices/index.mjs';

/**
 * Main function to handle matrix operations.
 */
export default async function matrixOperation() {
    let continueOperation = true;

    while (continueOperation) {
        try {
            const matrixType = await selectMatrixType(); // Select type of matrix (Square or Rectangular)

            if (matrixType === 'Square') {
                const order = await selectSquareOrder(); // Select order of square matrix (e.g., 2x2, 3x3)
                await handleSquareMatrix(order);
            } else if (matrixType === 'Rectangular') {
                const { rows, cols } = await selectRectangularDimensions(); // Select dimensions for rectangular matrix
                await handleRectangularMatrix(rows, cols);
            } else if (matrixType === 'Back') {
                continueOperation = false; // Exit loop to go back to main calculator selection
            } else {
                throw new Error('Invalid matrix type selected.');
            }

            if (continueOperation) {
                const { continueOption } = await inquirer.prompt({
                    type: 'confirm',
                    name: 'continueOption',
                    message: 'Do you want to perform another matrix operation?',
                    default: true,
                });

                continueOperation = continueOption;
            }

            if (!continueOperation) {
                console.log(chalk.yellow('Returning to main calculator selection.'));
                import ('../index.mjs').then(module => {
                    const { chooseCalculator } = module
                    chooseCalculator()
                })
            }
        } catch (error) {
            console.error(chalk.red('Error:'), error.message); // Styling error messages in red
            continueOperation = false; // Exit loop on error
        }
    }
}

/**
 * Prompts user to select the type of matrix (Square or Rectangular).
 * @returns {Promise<string>} The selected matrix type.
 */
async function selectMatrixType() {
    const { matrixType } = await inquirer.prompt({
        type: 'list',
        name: 'matrixType',
        message: 'Select the type of matrix:',
        choices: ['Square', 'Rectangular', 'Back'],
    });
    return matrixType;
}

/**
 * Prompts user to select the order of the square matrix (e.g., 2x2, 3x3).
 * @returns {Promise<string>} The selected order of the square matrix.
 */
async function selectSquareOrder() {
    const { order } = await inquirer.prompt({
        type: 'list',
        name: 'order',
        message: 'Select the order of the square matrix:',
        choices: ['1x1', '2x2', '3x3', '4x4', '5x5', 'Back'],
    });
    return order;
}

/**
 * Prompts user to select the dimensions of the rectangular matrix (rows and columns).
 * @returns {Promise<{ rows: number, cols: number }>} The selected dimensions of the rectangular matrix.
 */
async function selectRectangularDimensions() {
    const questions = [
        {
            type: 'number',
            name: 'rows',
            message: 'Enter the number of rows:',
            validate: value => value > 0 && Number.isInteger(value) ? true : 'Please enter a positive integer',
        },
        {
            type: 'number',
            name: 'cols',
            message: 'Enter the number of columns:',
            validate: value => value > 0 && Number.isInteger(value) ? true : 'Please enter a positive integer',
        },
    ];

    const answers = await inquirer.prompt(questions);
    return answers;
}

/**
 * Handles operations for a square matrix.
 * @param {string} order - The order of the square matrix (e.g., '2x2', '3x3').
 */
export async function handleSquareMatrix(order) {
    if (order === 'Back') {
        return; // Simply return to the main loop
    }

    const size = parseInt(order[0]); // Extract size from order string (e.g., '2x2' -> 2)
    const matrix = await getMatrix(size, size); // Get the square matrix
    const operation = await getOperation('Square'); // Get operation choice from user

    await performOperation(matrix, operation);
}

/**
 * Handles operations for a rectangular matrix.
 * @param {number} rows - Number of rows in the matrix.
 * @param {number} cols - Number of columns in the matrix.
 */
export async function handleRectangularMatrix(rows, cols) {
    if (rows === 'Back' || cols === 'Back') {
        return; // Simply return to the main loop
    }

    const matrix = await getMatrix(rows, cols); // Get the rectangular matrix
    const operation = await getOperation('Rectangular'); // Get operation choice from user

    await performOperation(matrix, operation);
}

/**
 * Prompts user to input matrix elements.
 * @param {number} rows - Number of rows in the matrix.
 * @param {number} cols - Number of columns in the matrix.
 * @returns {Promise<Array<Array<number|string>>>} The matrix filled with user input.
 */
async function getMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const { value } = await inquirer.prompt({
                type: 'input',
                name: 'value',
                message: `Enter the value for element [${i + 1},${j + 1}]`
            });
            row.push(parseFloat(value)); // Parse input as float or integer
        }
        matrix.push(row);
    }
    return matrix;
}

/**
 * Prompts user to choose an operation.
 * @param {string} type - Type of matrix ('Square' or 'Rectangular').
 * @returns {Promise<string>} The chosen operation.
 */
async function getOperation(type) {
    const operations = type === 'Square' ?
        ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Square', 'Root', 'Trace', 'Transpose', 'Determinant', 'Minor', 'Cofactor', 'Scalar Multiplication', 'Back'] :
        ['Scalar Multiplication', 'Multiplication', 'Transpose', 'Back'];

    const { operation } = await inquirer.prompt({
        type: 'list',
        name: 'operation',
        message: 'Select the operation to perform:',
        choices: operations
    });
    return operation;
}

/**
 * Performs the chosen matrix operation and displays the result.
 * @param {Array<Array<number|string>>} matrix - The matrix on which the operation is performed.
 * @param {string} operation - The operation to perform.
 */
async function performOperation(matrix, operation) {
    try {
        let result;

        switch (operation) {
            case 'Addition':
            case 'Subtraction':
            case 'Division':
                if (!isCompatibleDimensions(matrix)) {
                    throw new Error('Matrices must have the same dimensions for addition, subtraction, and division.');
                }
                result = await performBasicOperation(matrix, operation);
                break;
            case 'Multiplication':
                if (!isMultiplicable(matrix)) {
                    throw new Error('Matrix multiplication requires that the number of columns in the first matrix matches the number of rows in the second matrix.');
                }
                result = await performMultiplication(matrix);
                break;
            case 'Square':
                result = matrix.map(row => row.map(element => Math.pow(element, 2))); // Apply square operation element-wise
                break;
            case 'Root':
                result = matrix.map(row => row.map(element => Math.sqrt(element))); // Apply square root operation element-wise
                break;
            case 'Trace':
                result = await trace(matrix);
                break;
            case 'Transpose':
                result = await transpose(matrix);
                break;
            case 'Determinant':
                result = await determinant(matrix);
                break;
            case 'Minor':
                result = await minor(matrix);
                break;
            case 'Cofactor':
                result = await cofactor(matrix);
                break;
            case 'Scalar Multiplication':
                const { scalar } = await inquirer.prompt({
                    type: 'input',
                    name: 'scalar',
                    message: 'Enter the scalar value:'
                });
                result = await scalarMultiplication(matrix, scalar);
                break;
            case 'Back':
                return; // Simply return to the main loop
            default:
                throw new Error('Invalid operation selected.');
        }

        console.log(chalk.green('Result:'));
        printMatrix(result); // Print matrix result in a formatted way
    } catch (error) {
        console.error(chalk.red('Error performing operation:'), error.message);
    }
}

/**
 * Checks if the matrix dimensions are compatible for addition, subtraction, and division.
 * @param {Array<Array<number|string>>} matrix - The matrix to check.
 * @returns {boolean} True if dimensions are compatible, false otherwise.
 */
function isCompatibleDimensions(matrix) {
    const firstRowLength = matrix[0].length;
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i].length !== firstRowLength) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if the matrix dimensions are compatible for multiplication.
 * @param {Array<Array<number|string>>} matrix - The matrix to check.
 * @returns {boolean} True if dimensions are compatible for multiplication, false otherwise.
 */
function isMultiplicable(matrix) {
    const firstMatrixCols = matrix[0].length;
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i].length !== firstMatrixCols) {
            return false;
        }
    }
    return true;
}

/**
 * Performs basic matrix operations like addition, subtraction, division, etc.
 * @param {Array<Array<number|string>>} matrix - The matrix on which the operation is performed.
 * @param {string} operation - The operation to perform.
 * @returns {Promise<any>} The result of the operation.
 */
async function performBasicOperation(matrix, operation) {
    switch (operation) {
        case 'Addition':
            return await addition(matrix);
        case 'Subtraction':
            return await subtraction(matrix);
        case 'Division':
            return await division(matrix);
        default:
            throw new Error('Invalid basic operation.');
    }
}

/**
 * Performs matrix multiplication.
 * @param {Array<Array<number|string>>} matrix - The matrix on which the operation is performed.
 * @returns {Promise<any>} The result of matrix multiplication.
 */
async function performMultiplication(matrix) {
    const matrixB = await getMatrix(matrix[0].length, matrix.length); // Get second matrix for multiplication
    return await multiplication(matrix, matrixB);
}

/**
 * Prints a matrix in a formatted way.
 * @param {Array<Array<number|string>>} matrix - The matrix to print.
 */
function printMatrix(matrix) {
    matrix.forEach(row => {
        console.log(row.map(formatElement).join('\t')); // Format each element in the row and join with tabs
    });
}

/**
 * Formats an element of the matrix for output.
 * @param {number|string} element - The matrix element to format.
 * @returns {string} The formatted element.
 */
function formatElement(element) {
    return typeof element === 'number' ? chalk.yellow(element.toFixed(2)) : element; // Format numbers in yellow
}

