import * as fs from 'fs';
import * as path from 'path';

let splitTimes = 0;

export function solve() {
    const filePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    let lines = data.split('\n').filter(line => line.trim() !== '');
    console.log(lines.join('\n'));

    for (let l = 0; l < lines.length - 1; l++) {
        for (let i = 0; i < lines[l].length; i++) {
            if (lines[l][i] === 'S') {
                updateBeamDownwards(lines, l, i);
            } else if (lines[l][i] === '|') {
                reflectBeamDownnwards(lines, l, i);
            }
        }
    };

    console.log(lines.join('\n'), splitTimes);
}

function updateBeamDownwards(lines: string[], startRow: number, col: number) {
    let charArray = lines[startRow + 1].split('');
    if (charArray[col] === '.') {
        charArray[col] = "|";
    }
    lines[startRow + 1] = charArray.join('');
}

function reflectBeamDownnwards(lines: string[], startRow: number, col: number) {
    let charArray = lines[startRow + 1].split('');
    if (charArray[col] === '.') {
        charArray[col] = "|";
    } else if (charArray[col] === '^') {
        splitTimes++;
        if(col - 1 >= 0) {
            charArray[col - 1] = '|';
        }
        if(col + 1 < charArray.length) {
            charArray[col + 1] = '|';
        }
    }
    lines[startRow + 1] = charArray.join('');
}

solve();
