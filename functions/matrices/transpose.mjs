import { create, all } from 'mathjs';
const math = create(all);

export default async function transpose(matrix) {
    const result = math.transpose(matrix);
    return result;
}