import { create, all } from 'mathjs';
const math = create(all);

export default async function scalarMultiplication(matrix, scalar) {
    const result = math.multiply(matrix, scalar);
    return result;
}