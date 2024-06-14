import inquirer from 'inquirer'
console.log('What would you like to solve today?')

function selectProgressionCalculator() {
    inquirer
        .prompt({
            type: 'list',
            name: 'progressionType',
            message: 'What would you like to solve?',
            choices: ['Arithmetic Progression', 
                    'Geometric Progression',
                    'Harmonic Progression',
                    'Back']
        })
        .then(answer => {
            switch (answer.progressionType) {
                case 'Arithmetic Progression':
                    import('../funcPerform/progressions/apCalc.mjs').then(module => {
                        const { calculateAP } = module
                        calculateAP(selectProgressionCalculator);
                    })
                    break;
                case 'Geometric Progression':
                    import('../funcPerform/progressions/gpCalc.mjs').then(module => {
                        const { calculateGP } = module
                        calculateGP(selectProgressionCalculator);
                    })
                    break;
                case 'Harmonic Progression':
                    import('../funcPerform/progressions/hpCalc.mjs').then(module => {
                        const { calculateHP } = module
                        calculateHP(selectProgressionCalculator);
                    })
                    break;
                case 'Back':
                    import ('../index.mjs').then(module => {
                        const { chooseCalculator } = module
                        chooseCalculator();
                    })
                default:
                    console.log('Invalid choice!')
                    selectProgressionCalculator()

            }
        })
}

export { 
    selectProgressionCalculator
}