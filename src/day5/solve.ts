import * as fs from 'fs';
import * as path from 'path';

export function solve() {
    const filePath = path.join(__dirname, 'test.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    let ranges: number[][], ids: number[];
    ({ ranges, ids } = readRangeAndIds(data));

    console.log(ranges, ids);

    let sortedRanges = ranges.sort((a: number[], b: number[]) => a[0] - b[0]);
    let mergedRanges = mergeRanges(sortedRanges);
    console.log(mergedRanges);

    let count = 0;
    /*ids.forEach(id => {
        const isInRange = mergedRanges.some(([start, end]) => id >= start && id <= end);
        if (isInRange) {
            count++;
        }
    })*/
    
    for(let i = 0; i < mergedRanges.length; i++) {
        const [start, end] = mergedRanges[i];
        count += (end - start + 1);    
    };

    console.log(`fresh ingredients: ${count}`);
}

function readRangeAndIds(data: string) {
    const [rangePart, idPart] = data.trim().split(/\n\s*\n/);
  
    // Parse ranges → [[start, end], ...]
    const ranges: number[][] = rangePart
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.split("-").map(Number));
  
    // Parse IDs → [1, 5, 8, ...]
    const ids: number[] = idPart
      .split("\n")
      .map(line => Number(line.trim()))
      .filter(n => !isNaN(n));
  
    return { ranges, ids };
}
  
function mergeRanges(sortedRanges: number[][]): number[][] {
    const merged: number[][] = [];
    let [currentStart, currentEnd] = sortedRanges[0];
  
    for (let i = 1; i < sortedRanges.length; i++) {
      const [start, end] = sortedRanges[i];
  
      // Örtüşme var mı? (start <= currentEnd ise)
      if (start <= currentEnd) {
        // Aralığı genişlet
        currentEnd = Math.max(currentEnd, end);
      } else {
        // Önceki aralığı ekle, yeni aralığa başla
        merged.push([currentStart, currentEnd]);
        currentStart = start;
        currentEnd = end;
      }
    }
    merged.push([currentStart, currentEnd]);
    return merged;
}
  
solve();
