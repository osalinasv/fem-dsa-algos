class TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;

  constructor(value: number) {
    this.value = value;
  }
}

class BinaryTree {
  private root?: TreeNode;
  size = 0;

  insert(value: number) {
    const node = new TreeNode(value);
    const [prev, found] = this.findNode(value);

    if (found) {
      return;
    }

    if (!prev) {
      this.root = node;
      this.size++;

      return;
    }

    if (prev.value < value) {
      prev.right = node;
    } else {
      prev.left = node;
    }

    this.size++;
  }

  delete(value: number) {
    if (this.size > 0) this.size--;
    this.root = this.deleteNode(this.root, value);
  }

  search(value: number) {
    return this.findNode(value)[1];
  }

  min(start: TreeNode | undefined = undefined) {
    let current = start ?? this.root;

    while (current?.left) {
      current = current.left;
    }

    return current?.value;
  }

  max(start: TreeNode | undefined = undefined) {
    let current = start ?? this.root;

    while (current?.right) {
      current = current.right;
    }

    return current?.value;
  }

  bfs() {
    const array: number[] = [];
    if (!this.root) return array;

    const queue = [this.root];

    while (queue.length) {
      const current = queue.shift() as TreeNode;

      array.push(current.value);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);

      // O(n) shifting can be avoided by:
      // const newQueue: TreeNode[] = [];
      //
      // for (let i = 0; i < queue.length; i++) {
      //   const current = queue[i];
      //   array.push(current.value);
      //
      //   if (current.left) newQueue.push(current.left);
      //   if (current.right) newQueue.push(current.right);
      // }
      //
      // queue = newQueue;
    }

    return array;
  }

  dfs() {
    const array: number[] = [];

    let current = this.root;
    const stack: TreeNode[] = [];

    while (current || stack.length) {
      if (current) {
        stack.push(current);
        current = current.left;

        continue;
      }

      current = stack.pop() as TreeNode;
      array.push(current.value);

      current = current.right;
    }

    return array;
  }

  dfsPre() {
    const array: number[] = [];
    if (!this.root) return array;

    const stack = [this.root];
    let current: TreeNode;

    while (stack.length) {
      current = stack.pop() as TreeNode;
      array.push(current.value);

      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }

    return array;
  }

  private deleteNode(root: TreeNode | undefined, value: number) {
    if (!root) return undefined;

    if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      const min = this.min(root.right) as number;
      root.value = min;
      root.right = this.deleteNode(root.right, min);
    }

    return root;
  }

  private findNode(value: number) {
    let prev: TreeNode | undefined = undefined;
    let current = this.root;

    while (current) {
      if (current.value === value) {
        return [prev, current] as const;
      }

      prev = current;

      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

    return [prev, current] as const;
  }
}

const tree = new BinaryTree();

// Test insertion
tree.insert(6);
tree.insert(3);
tree.insert(8);
tree.insert(7);
tree.insert(9);
tree.insert(10);
tree.insert(5);
tree.insert(4);
tree.insert(2);
tree.insert(1);

// Test ignore duplicates
tree.insert(6);
tree.insert(8);
tree.insert(1);
tree.insert(4);

console.log(JSON.stringify(tree, undefined, 2));
console.log("size:", tree.size);

// Test search
console.log("8 is:", tree.search(8));
console.log("4 is:", tree.search(4));
console.log("11 is:", tree.search(11));

// Min and max validation
console.log("min:", tree.min());
console.log("max:", tree.max());

// Traversal tests
console.log("dfs inorder:", tree.dfs());
console.log("dfs preorder:", tree.dfsPre());
console.log("bfs:", tree.bfs());

// Test deletion
tree.delete(1);
console.log("tree:", tree.dfs(), tree.bfs());
console.log("size:", tree.size);

tree.delete(10);
console.log("tree:", tree.dfs(), tree.bfs());
console.log("size:", tree.size);

tree.delete(6);
console.log("tree:", tree.dfs(), tree.bfs());
console.log("size:", tree.size);

tree.insert(1);
tree.insert(6);

console.log(JSON.stringify(tree, undefined, 2));
console.log("tree:", tree.dfs(), tree.bfs());
console.log("size:", tree.size);
