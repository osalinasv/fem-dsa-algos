import { MinHeap } from "datastructures-js";

type Edge = {
  to: number;
  weight: number;
};

type PQItem = {
  value: number;
  priority: number;
};

type Graph = Edge[][];

function findShortestPath(graph: Graph, start: number, target: number) {
  if (target >= graph.length) return undefined;

  const queue = new MinHeap<PQItem>((i) => i.priority);

  const previous = new Array<number>(graph.length).fill(-1);
  const dist = new Array<number>(graph.length).fill(Infinity);

  dist[start] = 0;
  queue.push({ value: start, priority: 0 });

  while (!queue.isEmpty()) {
    const { value: current, priority } = queue.extractRoot()!;
    if (priority > dist[current]) continue;

    const adjacent = graph[current];

    for (let i = 0; i < adjacent.length; i++) {
      const neighbor = adjacent[i];
      const cost = dist[current] + neighbor.weight;

      if (cost < dist[neighbor.to]) {
        previous[neighbor.to] = current;
        dist[neighbor.to] = cost;
        queue.push({ value: neighbor.to, priority: cost });
      }
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

const graph: Graph = [
  [
    { to: 1, weight: 2 },
    { to: 2, weight: 1 },
    { to: 3, weight: 1 },
  ],
  [
    { to: 3, weight: 1 },
    { to: 4, weight: 5 },
  ],
  [{ to: 3, weight: 1 }],
  [{ to: 4, weight: 2 }],
  [],
];

function test(from: number, to: number) {
  console.log("from:", from, "to:", to, findShortestPath(graph, from, to));
}

test(0, 4);
test(2, 4);
test(0, 5);
test(4, 0);
