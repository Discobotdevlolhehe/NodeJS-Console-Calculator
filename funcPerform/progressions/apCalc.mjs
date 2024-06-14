import inquirer from 'inquirer';
import { nthTermAP,
    sumOfTermsAP,
    numberOfTermsAP,
    firstTermAP,
    commonDifferenceAP } from '../../functions/progressions/ap.mjs';


// Function to handle user input and calculate the result
function calculateAP(callback) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'calculation',
            message: 'What would you like to find?',
            choices: [
                'First term',
                'Common difference',
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
                        name: 'commonDifference',
                        message: 'Enter the common difference:'
                    }
                ]).then(answers => {
                    const { secondTerm, commonDifference } = answers;
                    console.log(`The first term is: ${firstTermAP(parseFloat(secondTerm), parseFloat(commonDifference))}`);
                    callback();
                });
                 
            break;
            case 'Common difference':
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
                    console.log(`The common difference is: ${commonDifferenceAP(parseFloat(firstTerm), parseFloat(secondTerm))}`);
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
                        name: 'commonDifference',
                        message: 'Enter the common difference:'
                    },
                    {
                        type: 'input',
                        name: 'n',
                        message: 'Enter the value of n:'
                    }
                ]).then(answers => {
                    const { firstTerm, commonDifference, n } = answers;
                    console.log(`The ${n}th term is: ${nthTermAP(parseFloat(firstTerm), parseFloat(commonDifference), parseFloat(n))}`);
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
                        name: 'commonDifference',
                        message: 'Enter the common difference:'
                    },
                    {
                        type: 'input',
                        name: 'n',
                        message: 'Enter the value of n:'
                    }
                ]).then(answers => {
                    const { firstTerm, commonDifference, n } = answers;
                    console.log(`The sum of the first ${n} terms is: ${sumOfTermsAP(parseFloat(firstTerm), parseFloat(commonDifference), parseFloat(n))}`);
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
                        name: 'commonDifference',
                        message: 'Enter the common difference:'
                    }
                ]).then(answers => {
                    const { firstTerm, lastTerm, commonDifference } = answers;
                    console.log(`The number of terms is: ${numberOfTermsAP(parseFloat(firstTerm), parseFloat(lastTerm), parseFloat(commonDifference))}`);
                    callback();
                });
                
                break;
            case 'Back':
                import ('../../calc/progressions.mjs').then(module => {
                    const { selectProgressionCalculator } = module;
                    selectProgressionCalculator();
                });
            default:
                console.log('Invalid choice.');
                break;
        }
    })
    .catch(error => {
        console.error('An error occurred:', error);
    })
}

// Call the function to start the calculator
export { calculateAP }