import { create, all } from 'mathjs';
const math = create(all);
import inquirer  from 'inquirer';
export default async function addition(matrixA) {
    const matrixB = await getMatrix(matrixA.length, matrixA[0].length);
    const result = math.add(matrixA, matrixB);
    return result;
}

async function getMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const { value } = await inquirer.prompt({
                type: 'input',
                name: 'value',
                message: `Enter the value for element [${i+1},${j+1}]`
            });
            row.push(value);
        }
        matrix.push(row);
    }
    return matrix;
}