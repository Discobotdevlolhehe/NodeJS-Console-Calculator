import inquirer from 'inquirer';


console.log("Welcome to the Calculator!");

function chooseCalculator() {
    inquirer
        .prompt({
            type: 'list',
            name: 'calculatorType',
            message: 'Which calculator would you like to use?',
            choices: [
                'Arithmetic Calculator',
                'Equation Calculator',
                'Progression Calculator',
                'Matrices Calculator',
                'Quit'
            ]
        })
        .then(answer => {
            switch (answer.calculatorType) {
                case 'Arithmetic Calculator':
                    import ('./calc/airthmeticCalc.mjs').then(module => {
                        const { calculator } = module;
                        calculator();
                    });
                    break;
                case 'Equation Calculator':
                    import('./calc/equationCalc.mjs').then(module => {
                        const { askEquationType } = module;
                        askEquationType();
                    });
                    break;
                case 'Progression Calculator':
                    import('./calc/progressions.mjs').then(module => {
                        const { selectProgressionCalculator } = module;
                        selectProgressionCalculator();
                    });
                    break;
                case 'Matrices Calculator':
                    import ('./calc/matrices.mjs').then(module => {
                        const { matrixOperation } = module
                        matrixOperation();
                    });
                break;
                case 'Quit':
                    console.log("Thanks for using the calculator!");
                    process.exit();
                default:
                    console.log('Invalid choice.');
                    break;
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}
export { chooseCalculator }
chooseCalculator();