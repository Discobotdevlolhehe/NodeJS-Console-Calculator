import inquirer from 'inquirer';
import { handleSquareMatrix, handleRectangularMatrix } from '../funcPerform/matrix.mjs';
import chalk from 'chalk';

export async function matrixOperation() {
    let continueOperation = true;

    while (continueOperation) {
        try {
            const matrixType = await getMatrixType(); // Select type of matrix (Square or Rectangular)

            if (matrixType === 'Square') {
                const order = await getSquareMatrixOrder(); // Select order of square matrix (e.g., 2x2, 3x3)
                await handleSquareMatrix(order);
            } else if (matrixType === 'Rectangular') {
                const { rows, cols } = await getRectangularMatrixDimensions(); // Select dimensions for rectangular matrix
                await handleRectangularMatrix(rows, cols);
            } else if (matrixType === 'Back') {
                continueOperation = false;
                import ('../index.mjs').then(module => {
                    const { chooseCalculator } = module
                    chooseCalculator()
                }) // Exit loop to go back to main calculator selection
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
            console.error('Error:', error.message);
            continueOperation = false; // Exit loop on error
        }
    }
}

async function getMatrixType() {
    const { matrixType } = await inquirer.prompt({
        type: 'list',
        name: 'matrixType',
        message: 'Select the type of matrix:',
        choices: ['Square', 'Rectangular']
    });
    return matrixType;
}

async function getSquareMatrixOrder() {
    const { order } = await inquirer.prompt({
        type: 'list',
        name: 'order',
        message: 'Select the order of the square matrix:',
        choices: ['1x1', '2x2', '3x3', '4x4', '5x5']
    });
    return order.split('x'); // Split '2x2' into ['2', '2']
}

async function getRectangularMatrixDimensions() {
    const { rows } = await inquirer.prompt({
        type: 'input',
        name: 'rows',
        message: 'Enter the number of rows:'
    });
    const { cols } = await inquirer.prompt({
        type: 'input',
        name: 'cols',
        message: 'Enter the number of columns:'
    });
    return { rows: parseInt(rows), cols: parseInt(cols) };
}

