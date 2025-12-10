import * as fs from 'fs';
import * as path from 'path';
  
export function solve() {
    const filePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    console.log(data);

    let verticalNumbers: number[][] = [];
    let operators: string[] = [];

    const lines = data.split('\n').filter(line => line.trim() !== '');
    lines.forEach((line, index) => {
        let arrayNumbers = line.split(/\s+/).filter(Boolean).map(string => parseInt(string));
        if (index >= lines.length - 1) {
            operators = line.split(/\s+/).filter(Boolean);
        } else {
            for (let i = 0; i < arrayNumbers.length; i++) {
                if (!verticalNumbers[i]) {
                    verticalNumbers[i] = [];
                }
                verticalNumbers[i][index] = arrayNumbers[i];
            }
        }
    })
    console.log('Vertical Numbers:', verticalNumbers);
    console.log('Operators:', operators);

    let results = 0;

    for (let i = 0; i < verticalNumbers.length; i++) {
        if (operators[i] === '+') {
            let add = 0;
            for (let j = 0; j < verticalNumbers[i].length; j++) {
                add += verticalNumbers[i][j];
            }
            results += add;
        } else if (operators[i] === '*') {
            let multiply = 1;
            for (let j = 0; j < verticalNumbers[i].length; j++) {    
                multiply *= verticalNumbers[i][j];
            }
            results += multiply;
        }
    }
    console.log('Final Results:', results);
}

solve();
