import * as fs from 'fs';
import * as path from 'path';

export function solve() {
    const filePath = path.join(__dirname, 'test.txt');
    const data = fs.readFileSync(filePath, 'utf-8');

    

    console.log(data);
}

solve();
