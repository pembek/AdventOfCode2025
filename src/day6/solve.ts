import * as fs from 'fs';
import * as path from 'path';

interface ColumnNumber {
  value: number;
  operator: string;
}

export function solve() {
    const filePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    console.log(data);

    const allLines = data.replace(/^\uFEFF/, "").split(/\r?\n/);
    const lines = allLines.filter(l => l.length > 0);

    const operatorLineRaw = lines[lines.length - 1];
    const digitLinesRaw = lines.slice(0, -1);

    // Monospace hizalamayı korumak için tüm satırları aynı uzunluğa pad'liyoruz
    const maxLen = Math.max(...lines.map(l => l.length));
    const operatorLine = operatorLineRaw.padEnd(maxLen, " ");
    const digitLines = digitLinesRaw.map(l => l.padEnd(maxLen, " "));

    const columnNumbers: ColumnNumber[] = [];

    // Sağdan sola git
    for (let col = maxLen - 1; col >= 0; col--) {
        const opChar = operatorLine[col];
        // Bu sütundaki rakamları yukarıdan aşağıya topla
        const digits: string[] = [];
        for (const line of digitLines) {
        const ch = line[col];
        if (ch >= "0" && ch <= "9") {
            digits.push(ch);
        }
        }
        if (digits.length === 0) {
            // Operatör var ama üstünde rakam yoksa, o sütunu es geçiyoruz
            continue;
          }

        const value = parseInt(digits.join(""), 10);
        const operator = opChar;

        columnNumbers.push({ value, operator });
    }
    console.log('Column Numbers:', columnNumbers);
        
    let array: number[] = [];
    let grandSum = 0;
    columnNumbers.forEach(number => {
        console.log(number);
        array.push(number.value);
        if (number.operator != ' ') {
            console.log(array);
            let res = 0;
            array.forEach(num => {
                if (number.operator === '+') { 
                    res += num;
                } else if(number.operator === '*') {
                    if (res === 0) res = 1;
                    res *= num;
                }
            })
            console.log('Result for operator', number.operator, ':', res);
            grandSum += res;
            array = [];
        } 
    });
    console.log(':', grandSum);
}

solve();
