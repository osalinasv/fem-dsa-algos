function findPath(adj: number[][], start: number, target: number) {
  if (target >= adj.length) {
    return undefined;
  }

  const previous = new Array<number>(adj.length).fill(-1);
  const seen = new Array<boolean>(adj.length).fill(false);

  const queue = [start];

  while (queue.length) {
    const current = queue.shift()!;

    if (seen[current]) {
      continue;
    }

    seen[current] = true;

    if (current === target) {
      break;
    }

    const adjacent = adj[current];

    for (let i = 0; i < adjacent.length; i++) {
      const next = adjacent[i];
      if (seen[next]) continue;

      previous[next] = current;
      queue.push(next);
    }
  }

  if (previous[target] === -1) {
    return undefined;
  }

  const path = new Array<number>();
  let current = target;

  while (previous[current] > -1) {
    path.push(current);
    current = previous[current];
  }

  path.push(current);
  path.reverse();

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
