import { create, all } from 'mathjs';
const math = create(all);

export default async function minor(matrix) {
    const minors = matrix.map((row, i) =>
        row.map((_, j) => math.det(math.subset(matrix, math.index([...Array(i).keys(), ...Array(matrix.length - 1 - i).keys()], [...Array(j).keys(), ...Array(matrix.length - 1 - j).keys()])))
    ));
    return minors;
}
