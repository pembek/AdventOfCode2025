import * as fs from 'fs';
import * as path from 'path';

const RIGHT = 'R';
const LEFT = 'L';
const inputFilePath = path.join(__dirname, 'input1.txt');

try {
    const data = fs.readFileSync(inputFilePath, 'utf-8');
    const commands = data.split(/\r?\n/); // Split by newlines (handles both Windows and Unix)
    let direction = "";
    let position = 50;
    let clickedZeroAtTheEnd = 0;
    let clickedZeroInTheMiddle = 0;
    let run = 0;

    commands.forEach(command => {
        const regex = /^([RL])(\d+)$/;
        const match = command.match(regex);
        let tempClickedZeroInTheMiddle = 0;
        if (match) {
            direction = match[1];      // "R"
            run = Number(match[2]); // 12
        } else {
            throw new Error(`Invalid command format: ${command}`);
        }
        console.log(`${position} + ${command}`);
        if (direction === RIGHT) {
            if (position + run <= 99) {
                position += run;
            } else if (position + run > 99) {
                tempClickedZeroInTheMiddle += Math.trunc((position + run) / 100);
                if ((position + run) % 100 === 0) { // clicked at 0     
                    tempClickedZeroInTheMiddle -= 1;
                }
                position = (position + run) % 100;
            }
        } else if (direction === LEFT) {
            tempClickedZeroInTheMiddle += Math.trunc(run / 100);
            run = run % 100; 
            if (position - run >= 0) {
                position = position - run;
            } else if (position - run < 0) {
                if (position !== 0) {
                    tempClickedZeroInTheMiddle++;
                }
                run = run - position; 
                position = 99 - run + 1;
            }
        }
        if (position === 0) { 
            clickedZeroAtTheEnd++;
        }
        clickedZeroInTheMiddle = clickedZeroInTheMiddle + tempClickedZeroInTheMiddle;
        console.log(`${position} + in the middle clicked ${tempClickedZeroInTheMiddle} times`);
    });
    console.log(clickedZeroAtTheEnd); // Output the array of strin
    console.log(clickedZeroAtTheEnd + clickedZeroInTheMiddle);
} catch (error) {
    console.error('Error reading the file:', error);
}