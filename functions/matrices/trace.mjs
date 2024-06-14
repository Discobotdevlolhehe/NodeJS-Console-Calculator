import { create, all } from 'mathjs';
const math = create(all);

export default async function trace(matrix) {
    const result = math.trace(matrix);
    return result;
}