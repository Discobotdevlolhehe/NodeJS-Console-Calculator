import { create, all } from 'mathjs';
const math = create(all);

export default async function root(matrix) {
    const result = math.sqrt(matrix);
    return result;
}