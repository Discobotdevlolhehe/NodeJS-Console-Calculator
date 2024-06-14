import { create, all } from 'mathjs';
const math = create(all);
import inquirer  from 'inquirer';

export default async function multiplication(matrixA) {
    const matrixB = await getMatrix(matrixA[0].length);
    const result = math.multiply(matrixA, matrixB);
    return result;
}

async function getMatrix(cols) {
    const matrix = [];
    for (let i = 0; i < cols; i++) {
        const { value } = await inquirer.prompt({
            type: 'input',
            name: 'value',
            message: `Enter the value for element [${i+1},1]`
        });
        matrix.push([value]);
    }
    return matrix;
}