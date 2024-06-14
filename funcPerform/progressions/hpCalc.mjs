import inquirer from 'inquirer';
import { nthTermHP,
    sumOfTermsHP,
    numberOfTermsHP} from '../../functions/progressions/hp.mjs';

// Function to handle user input and calculate the result
function calculateHP(callback) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'calculation',
            message: 'What would you like to find?',
            choices: [
                'First term',
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
                        name: 'n',
                        message: 'Enter the value of n:'
                    },
                    {
                        type: 'input',
                        name: 'nthTerm',
                        message: 'Enter the nth term:'
                    }
                ]).then(answers => {
                    const { n, nthTerm } = answers;
                    console.log(`The first term is: ${parseFloat(nthTerm) / (parseInt(n) + 1)}`);
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
                        name: 'n',
                        message: 'Enter the value of n:'
                    }
                ]).then(answers => {
                    const { firstTerm, n } = answers;
                    console.log(`The ${n}th term is: ${nthTermHP(parseFloat(firstTerm), parseInt(n))}`);
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
                        name: 'n',
                        message: 'Enter the value of n:'
                    }
                ]).then(answers => {
                    const { firstTerm, n } = answers;
                    console.log(`The sum of the first ${n} terms is: ${sumOfTermsHP(parseFloat(firstTerm), parseInt(n))}`);
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
                    }
                ]).then(answers => {
                    const { firstTerm, lastTerm } = answers;
                    console.log(`The number of terms is: ${numberOfTermsHP(parseFloat(firstTerm), parseFloat(lastTerm))}`);
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
export { calculateHP }