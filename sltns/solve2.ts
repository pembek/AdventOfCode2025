import * as fs from 'fs';
import * as path from 'path';

// Read the content of input2.txt
const filePath = path.join(__dirname, 'input2.txt');
const fileContent = fs.readFileSync(filePath, 'utf-8');

const insertedValues = new Set<number>();

// Split the content by commas and trim whitespace
const rangeInfoArray: string[] = fileContent.split(',').map(item => item.trim());
let addIds = 0;

rangeInfoArray.forEach(rangeInfo => {
    const regex = /^(\d+)-(\d+)$/;
    const match = rangeInfo.match(regex);
    let start: number;
    let end: number;
    if (match) {
        start = Number(match[1]);     
        end = Number(match[2]); 
    } else {
        throw new Error(`Invalid command format: ${rangeInfo}`);
    }
    console.log(`Start: ${start}, End: ${end}`);
    for(let i = start; i <= end; i++) {
        if ((i % 11 === 0 && i < 100 && i != 0) ||
            (i % 101 === 0) ||
            (i % 1001 === 0) || 
            (i % 10001 === 0) ||     
            (i % 100001 === 0)) {
            if (isRepeatedNum(i)) {
                existSetOrAdd(i);
            }
        }
        if ((i % 111 === 0 && i < 1000 && i != 0) ||
            (i % 10101 === 0) ||
            (i % 1001001 === 0)) {
            if (isRepeatedNum(i)) {
                existSetOrAdd(i);
            }
        }
        if ((i % 1111 === 0 && i < 10000 && i != 0) ||
        (i % 1010101 === 0)) {
            if (isRepeatedNum(i)) {
                existSetOrAdd(i);
            }
        }
        if ((i % 11111 === 0 && i < 100000 && i != 0) ||
        (i % 101010101 === 0)) {
            if (isRepeatedNum(i)) {
                existSetOrAdd(i);
            }
        }
        if ((i % 111111 === 0 && i < 100000 && i != 0) ||
         (i % 1111111 === 0 && i < 10000000 && i != 0) ||
         (i % 11111111 === 0 && i < 100000000 && i != 0) ||
         (i % 111111111 === 0 && i < 1000000000 && i != 0) ||
            (i % 1111111111 === 0 && i != 0)) {
                if (isRepeatedNum(i)) {
                    existSetOrAdd(i);
                }
         }
    }
});
 
console.log(`Sum of all IDs: ${addIds}`);

function existSetOrAdd(value: number) {
    if (!insertedValues.has(value)) {
        insertedValues.add(value);
        console.log(value);
        addIds += value;
    } 
}

export function isRepeatedNum(n: number): boolean {
    const str = n.toString();
    const len = str.length;
  
    // Allowed repetition counts
    const allowedRepeats = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  
    for (const repeats of allowedRepeats) {
      if (len % repeats !== 0) continue; // substring must divide length exactly
  
      const partLength = len / repeats;
      const part = str.slice(0, partLength);
  
      // Build repeated version once
      const built = part.repeat(repeats);
  
      if (built === str) return true;
    }
    return false;
  }