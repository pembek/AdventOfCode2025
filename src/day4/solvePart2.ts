import { create } from 'domain';
import * as fs from 'fs';
import * as path from 'path';

export function solve() {
    const filePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');
    let matrix = data.split("\n").map(line => line.split(""));
    let lessThan4Count = -1
    let grandSumlessThan4 = 0;
    
    do {
        const counts = createMatrix(matrix);
        fillCountsMatrix(counts, matrix);
        lessThan4Count = countLessThan4(counts);
        grandSumlessThan4 += lessThan4Count;
        console.log("Remove: ", lessThan4Count);
        removeRolls(counts, matrix);
    } while (lessThan4Count > 0)
    
    console.log("Grand total less than 4:", grandSumlessThan4);
}

solve();

function createMatrix(data: string[][]) {
    const matrix: string[][] = [];

    const y = data.length;
    const x = data[0].length;
    for (let i = 0; i < y; i++) {
        matrix[i] = [];
        for (let j = 0; j < x; j++) {
            matrix[i][j] = data[i][j];
        }
    }
    return matrix;
}

function fillCountsMatrix(counts: string[][], matrix: string[][]) {
    const y = matrix.length;
    const x = matrix[0].length;

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            // Example operation: count adjacent '@' characters
            if (matrix[i][j] === '@') {
                let count = 0;
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        if (di === 0 && dj === 0) continue;
                        if (di + i < 0 || dj + j < 0 || di + i >= y || dj + j >= x) continue;
                        if (matrix[i + di][j + dj] === '@') {
                            count++;
                        }
                    }
                }
                counts[i][j] = count.toString();
            }
        }
    }
}

function removeRolls(counts: string[][], matrix: string[][]) {
    const y = counts.length;
    const x = counts[0].length;

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            const val = parseInt(counts[i][j]);
            if (!isNaN(val) && val < 4) {
                matrix[i][j] = '.';
            }
        }
    }
}

function countLessThan4(counts: string[][]) {
    let total = 0;
    const y = counts.length;
    const x = counts[0].length;

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            const val = parseInt(counts[i][j]);
            if (!isNaN(val) && val < 4) {
                total++;
            }
        }
    }
    console.log("Total less than 4:", total);
    return total;
}