import { create, all } from 'mathjs';
import minor from './minor.mjs';

const math = create(all);

export default async function cofactor(matrix) {
    try {
        const minors = await minor(matrix); // Calculate minors using the minor function
        const cofactorMatrix = minors.map((row, i) =>
            row.map((val, j) => {
                const sign = (i + j) % 2 === 0 ? 1 : -1; // Determine sign based on i + j
                return sign * val; // Apply sign to minor value
            })
        );
        return cofactorMatrix; // Return the cofactor matrix
    } catch (error) {
        console.error('Error calculating cofactor:', error.message);
        throw error; // Propagate the error
    }
}