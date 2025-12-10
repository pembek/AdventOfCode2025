import * as fs from 'fs';
import * as path from 'path';

let splitTimes = 0;

type Grid = string[];

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
    let grid: Grid = lines;
    const pathCount = countBeamPaths(grid);
    console.log("Total distinct paths from 'S' to bottom:", pathCount);
}

function countBeamPaths(grid: Grid): number {
    const rows = grid.length;
    if (rows === 0) return 0;
    const cols = grid[0].length;
  
    // Find starting position 'S'
    let startRow = -1;
    let startCol = -1;
    outer: for (let r = 0; r < rows; r++) {
      const c = grid[r].indexOf("S");
      if (c !== -1) {
        startRow = r;
        startCol = c;
        break outer;
      }
    }
    if (startRow === -1) {
      throw new Error("No 'S' found in grid");
    }
  
    /*You can treat this as a directed acyclic graph problem and just do a DFS with memoization.

Interpreting your rules

From what you wrote / drew:

Grid chars:

'S' – start

'|' – straight beam segment

'^' – splitter

'.' – empty

Beam always goes downwards in “rows”.

Behaviour:

From S or |:

Go straight down to the same column if the cell below is | or ^.

From ^:

Split into two beams: down-left and down-right to the immediate left and right positions on the next row – but only if those cells are |.

A path is a sequence of positions from S down to any cell in the last row.

Paths are considered different if they differ at any step, even if they end on the same bottom cell.

Because the graph only goes downward (no cycles), you can count paths with DFS + memoization:
“Number of paths from cell X = sum of number of paths from each possible next cell”.*/
    // Memoization: key = "r,c" -> number of paths from that cell to bottom
    const memo = new Map<string, number>();
  
    const dfs = (r: number, c: number): number => {
      const key = `${r},${c}`;
      const cached = memo.get(key);
      if (cached !== undefined) return cached;
  
      // If we're already on the bottom row, this is one complete path.
      if (r === rows - 1) {
        memo.set(key, 1);
        return 1;
      }
  
      const cell = grid[r][c];
      let result = 0;
  
      if (cell === "S" || cell === "|") {
        // Go straight down if possible
        const nr = r + 1;
        const nc = c;
        if (nr < rows && (grid[nr][nc] === "|" || grid[nr][nc] === "^")) {
          result = dfs(nr, nc);
        } else {
          result = 0; // dead end, doesn't reach bottom
        }
      } else if (cell === "^") {
        // Split down-left and down-right
        const nr = r + 1;
        for (const dc of [-1, 1]) {
          const nc = c + dc;
          if (
            nc >= 0 &&
            nc < cols &&
            grid[nr][nc] === "|"
          ) {
            result += dfs(nr, nc);
          }
        }
      } else {
        // '.', or anything else: no beam passes through
        result = 0;
      }
  
      memo.set(key, result);
      return result;
    };
  
    return dfs(startRow, startCol);
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
