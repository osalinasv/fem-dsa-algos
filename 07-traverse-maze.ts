const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function canTraverse(
  maze: string[],
  sx: number,
  sy: number,
  ex: number,
  ey: number,
) {
  const visited = new Array<boolean[]>(maze.length);

  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array<boolean>(maze[i].length).fill(false);
  }

  const traverse = (x: number, y: number) => {
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[y].length) return false;
    if (visited[y][x]) return false;
    if (maze[y][x] === "#") return false;
    if (x === ex && y === ey) return true;

    visited[y][x] = true;

    for (const [dx, dy] of directions) {
      if (traverse(x + dx, y + dy)) {
        return true;
      }
    }

    return false;
  };

  return traverse(sx, sy);
}

function findPath(
  maze: string[],
  sx: number,
  sy: number,
  ex: number,
  ey: number,
) {
  const path = new Array<[number, number]>();
  const visited = new Array<boolean[]>(maze.length);

  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array<boolean>(maze[i].length).fill(false);
  }

  const traverse = (x: number, y: number) => {
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[y].length) return false;
    if (visited[y][x]) return false;
    if (maze[y][x] === "#") return false;

    visited[y][x] = true;
    path.push([x, y]);

    if (x === ex && y === ey) return true;

    for (const [dx, dy] of directions) {
      if (traverse(x + dx, y + dy)) {
        return true;
      }
    }

    path.pop();
    return false;
  };

  return traverse(sx, sy) ? path : undefined;
}

// prettier-ignore
let maze = [
  "##### #",
  "#     #",
  "# #####"
];

for (const line of maze) {
  console.log(line);
}

console.log(3, 0, canTraverse(maze, 1, 2, 3, 0));
console.log(3, 0, findPath(maze, 1, 2, 3, 0));

console.log(5, 0, canTraverse(maze, 1, 2, 5, 0));
console.log(5, 0, findPath(maze, 1, 2, 5, 0));
