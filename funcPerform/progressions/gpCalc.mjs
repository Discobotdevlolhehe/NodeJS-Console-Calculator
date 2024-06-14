import inquirer from 'inquirer';
import { nthTermGP,
    sumOfTermsGP,
    numberOfTermsGP,
    firstTermGP,
    commonRatioGP } from '../../functions/progressions/gp.mjs';
// Function to handle user input and calculate the result
function calculateGP(callback) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'calculation',
            message: 'What would you like to find?',
            choices: [
                'First term',
                'Common ratio',
                'Nth term',
                'Sum of first N terms',
                'Number of terms',
                'Back'
            ]
        }
    ]).then(answer => {
        const calculation = answer.calculation;
        switch (calculation) {
            case 'First term':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'secondTerm',
                        message: 'Enter the second term:'
                    },
                    {
                        type: 'input',
                        name: 'commonRatio',
                        message: 'Enter the common ratio:'
                    }
                ]).then(answers => {
                    const { secondTerm, commonRatio } = answers;
                    console.log(`The first term is: ${firstTermGP(parseFloat(secondTerm), parseFloat(commonRatio))}`);
                    callback();
                });
                break;
            case 'Common ratio':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstTerm',
                        message: 'Enter the first term:'
                    },
                    {
                        type: 'input',
                        name: 'secondTerm',
                        message: 'Enter the second term:'
                    }
                ]).then(answers => {
                    const { firstTerm, secondTerm } = answers;
                    console.log(`The common ratio is: ${commonRatioGP(parseFloat(firstTerm), parseFloat(secondTerm))}`);
                    callback();
                });
                break;
            case 'Nth term':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstTerm',
                        message: 'Enter the first term:'
                    },
                    {
                        type: 'input',
                        name: 'commonRatio',
                        message: 'Enter the common ratio:'
                    },
                    {
                        type: 'input',
                        name: 'n',
                        message: 'Enter the value of n:'
                    }
                ]).then(answers => {
                    const { firstTerm, commonRatio, n } = answers;
                    console.log(`The ${n}th term is: ${nthTermGP(parseFloat(firstTerm), parseFloat(commonRatio), parseInt(n))}`);
                    callback();
                });
                break;
            case 'Sum of first N terms':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstTerm',
                        message: 'Enter the first term:'
                    },
                    {
                        type: 'input',
                        name: 'commonRatio',
                        message: 'Enter the common ratio:'
                    },
                    {
                        type: 'input',
                        name: 'n',
                        message: 'Enter the value of n:'
                    }
                ]).then(answers => {
                    const { firstTerm, commonRatio, n } = answers;
                    console.log(`The sum of the first ${n} terms is: ${sumOfTermsGP(parseFloat(firstTerm), parseFloat(commonRatio), parseInt(n))}`);
                    callback();
                });
                break;
            case 'Number of terms':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstTerm',
                        message: 'Enter the first term:'
                    },
                    {
                        type: 'input',
                        name: 'lastTerm',
                        message: 'Enter the last term:'
                    },
                    {
                        type: 'input',
                        name: 'commonRatio',
                        message: 'Enter the common ratio:'
                    }
                ]).then(answers => {
                    const { firstTerm, lastTerm, commonRatio } = answers;
                    console.log(`The number of terms is: ${numberOfTermsGP(parseFloat(firstTerm), parseFloat(lastTerm), parseFloat(commonRatio))}`);
                    callback();
                });
                break;
            case 'Back':
                import ('../../calc/progressions.mjs').then(module => {
                    const { selectProgressionCalculator } = module;
                    selectProgressionCalculator();
                });
                break;
            default:
                console.log('Invalid choice.');
                callback();
                break;
        }
    });
}

// Call the function to start the calculator
export { calculateGP }