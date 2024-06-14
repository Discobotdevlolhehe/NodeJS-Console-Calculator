import { create, all } from 'mathjs';
const math = create(all);

export default async function square(matrix) {
    const result = math.square(matrix);
    return result;
}