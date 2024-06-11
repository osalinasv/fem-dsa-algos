function dfs(
  adj: number[][],
  current: number,
  target: number,
  seen: boolean[],
  path: number[],
) {
  if (seen[current]) {
    return false;
  }

  seen[current] = true;
  path.push(current);

  if (current === target) {
    return true;
  }

  const adjacent = adj[current];
  for (let i = 0; i < adjacent.length; i++) {
    if (dfs(adj, adjacent[i], target, seen, path)) {
      return true;
    }
  }

  path.pop();
  return false;
}

function findPath(adj: number[][], start: number, target: number) {
  const path = new Array<number>();
  const seen = new Array<boolean>(adj.length).fill(false);

  if (!dfs(adj, start, target, seen, path)) {
    return undefined;
  }

  return path;
}

const adjacency = [[1, 2], [3], [0, 3], [4], [1]];

function test(from: number, to: number) {
  console.log("from:", from, "to:", to, findPath(adjacency, from, to));
}

test(0, 4);
test(2, 4);
test(0, 5);
test(4, 0);
