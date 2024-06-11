class ListNode<T> {
  value: T;
  next?: ListNode<T>;

  constructor(value: T) {
    this.value = value;
  }
}

class Queue<T> {
  head?: ListNode<T>;
  tail?: ListNode<T>;
  length = 0;

  enqueue(value: T) {
    if (this.tail) {
      this.tail.next = new ListNode(value);
      this.tail = this.tail.next;
    } else {
      this.tail = new ListNode(value);
      this.head = this.tail;
    }

    this.length++;
  }

  dequeue() {
    if (!this.head) return undefined;

    const node = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = undefined;

    this.length--;
    return node.value;
  }

  peek() {
    return this.head;
  }
}

class Stack<T> {
  head?: ListNode<T>;
  length = 0;

  push(value: T) {
    const next = this.head;

    this.head = new ListNode(value);
    this.head.next = next;

    this.length++;
  }

  pop() {
    if (!this.head) return undefined;

    const node = this.head;
    this.head = this.head.next;

    this.length--;
    return node.value;
  }

  peek() {
    return this.head;
  }
}

console.log("QUEUE:");

const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);

console.log(queue);

while (queue.length) {
  const value = queue.dequeue();
  console.log({ value, l: queue.length });
}

console.log(queue);

console.log("\nSTACK:");

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

console.log(stack);

while (stack.length) {
  const value = stack.pop();
  console.log({ value, l: stack.length });
}

console.log(stack);
