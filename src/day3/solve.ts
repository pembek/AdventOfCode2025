import * as fs from 'fs';
import * as path from 'path';
let best = ""; 
let cumulativeBest = 0

export function solve() {
    const filePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');
    const banks = data.split(/\r?\n/); 
    
    banks.forEach(bank => {
        const digits = findMaxNDigits(bank, 12);
        best = digits.join('');
        console.log(best);
        cumulativeBest += parseInt(best);
        best = "";
    });
    console.log(`Cumulative Best: ${cumulativeBest}`);
}

export function findMaxNDigits(bank: string, lengthBattery: number): number[] {
    let stack: number []= [];
    let remainingRemovableCount = bank.length - lengthBattery;
    const charArray = bank.split('');
    console.log(bank);
  
    for (const digit of charArray) {
        console.log(`Processing digit: ${digit}`);
        while (remainingRemovableCount > 0 && stack.length > 0 && stack[stack.length - 1] < parseInt(digit)) {
            console.log(`Stack before pop: ${stack}`);
            console.log(`Popping ${stack[stack.length - 1]} because it's less than ${digit}`);
            stack.pop();
            remainingRemovableCount--;
        }
        stack.push(parseInt(digit));
    }
    return stack.slice(0, lengthBattery);
}

solve()