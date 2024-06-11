class BinaryNode<T> {
  value: T;
  left?: BinaryNode<T>;
  right?: BinaryNode<T>;

  constructor(
    value: T,
    left: BinaryNode<T> | undefined = undefined,
    right: BinaryNode<T> | undefined = undefined,
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function areEqual<T>(
  first: BinaryNode<T> | undefined,
  second: BinaryNode<T> | undefined,
) {
  if (!first && !second) return true;
  if (!first || !second) return false;
  if (first.value !== second.value) return false;

  return (
    areEqual(first?.left, second?.left) && areEqual(first?.right, second?.right)
  );
}

const a = new BinaryNode(1, new BinaryNode(2), new BinaryNode(3));
const b = new BinaryNode(1, new BinaryNode(2, new BinaryNode(3)));

console.log(areEqual(a, b));
console.log(areEqual(a, a));
console.log(areEqual(b, b));
