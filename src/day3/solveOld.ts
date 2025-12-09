import * as fs from 'fs';
import * as path from 'path';
let best = ""; 
const lengthBattery = 12;
let cumulativeBest = 0

export function solve() {
    const filePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf-8');
    const banks = data.split(/\r?\n/); 
    
    banks.forEach(bank => {
        backtrack(0, "", bank);
        console.log(best);
        cumulativeBest += parseInt(best);
        best = "";
    });
    console.log(`Cumulative Best: ${cumulativeBest}`);
}

function backtrack(index: number, chosen: string, bank: string) {
  const remaining = bank.length - index;
  const chosenLen = chosen.length;
  const need = 2 - chosenLen;

  if (remaining < need) return;

  if (chosenLen === lengthBattery) {
    if (best === "" || chosen > best) {
      best = chosen;
    }
    return;
  }
  if (index === bank.length) return;

  const digitStr = bank[index].toString();

  backtrack(index + 1, chosen + digitStr, bank);

  backtrack(index + 1, chosen, bank);
}

solve()

