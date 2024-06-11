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

function toArray<T>(
  root: BinaryNode<T>,
  traverse: (node: BinaryNode<T> | undefined, path: T[]) => T[],
) {
  return traverse(root, []);
}

function preorder<T>(node: BinaryNode<T> | undefined, path: T[]) {
  if (!node) return path;

  path.push(node.value);
  preorder(node.left, path);
  preorder(node.right, path);

  return path;
}

function inorder<T>(node: BinaryNode<T> | undefined, path: T[]) {
  if (!node) return path;

  preorder(node.left, path);
  path.push(node.value);
  preorder(node.right, path);

  return path;
}

function postorder<T>(node: BinaryNode<T> | undefined, path: T[]) {
  if (!node) return path;

  preorder(node.left, path);
  preorder(node.right, path);
  path.push(node.value);

  return path;
}

const root = new BinaryNode(
  1,
  new BinaryNode(
    2,
    new BinaryNode(3, undefined, new BinaryNode(4)),
    new BinaryNode(5),
  ),
  new BinaryNode(
    6,
    new BinaryNode(7, new BinaryNode(8, new BinaryNode(9)), undefined),
  ),
);

console.log(toArray(root, preorder));
console.log(toArray(root, inorder));
console.log(toArray(root, postorder));
