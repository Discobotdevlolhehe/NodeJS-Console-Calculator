import { create, all } from 'mathjs';
const math = create(all);

export default async function determinant(matrix) {
    const result = math.det(matrix);
    return result;
}