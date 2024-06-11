class ListNode<T> {
  value: T;
  next?: ListNode<T>;
  prev?: ListNode<T>;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  head?: ListNode<T>;
  tail?: ListNode<T>;
  length: number = 0;

  prepend(value: T) {
    const node = new ListNode(value);
    this.length++;

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }

  append(value: T) {
    const node = new ListNode(value);
    this.length++;

    if (!this.tail) {
      this.tail = node;
      this.head = this.tail;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
  }

  insertAt(value: T, index: number) {
    if (index > this.length) return false;

    if (index === this.length) {
      this.append(value);
      return true;
    } else if (index === 0) {
      this.prepend(value);
      return true;
    }

    this.length++;
    let current = this.head;

    for (let i = 0; current && i < index; i++) {
      current = current.next;
    }

    if (!current) return false;

    const node = new ListNode(value);
    node.next = current.next;
    node.prev = current;
    current.next = node;

    if (node.next) node.next.prev = node;
    return true;
  }

  insertAfter(value: T, reference: T) {
    const prev = this.getNode(reference);
    if (!prev) return false;

    this.length++;

    const node = new ListNode(value);
    node.next = prev.next;
    node.prev = prev;

    if (prev.next) prev.next.prev = node;
    prev.next = node;

    if (prev === this.tail) {
      this.tail = node;
    }

    return true;
  }

  remove(value: T) {
    const node = this.getNode(value);
    if (!node) return false;

    this.length--;

    if (!node.prev) {
      this.head = node.next;
      if (this.head) this.head.prev = undefined;
    } else {
      node.prev.next = node.next;
      if (node.next) node.next.prev = node.prev;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }

    return true;
  }

  get(value: T) {
    return this.getNode(value)?.value;
  }

  getAt(index: number) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === this.length - 1) return this.tail?.value;

    let current = this.head;

    while (current && index > 0) {
      current = current.next;
      index--;
    }

    return current?.value;
  }

  toArray() {
    const array = new Array<T>();
    let current = this.head;

    while (current) {
      array.push(current.value);
      current = current.next;
    }

    return array;
  }

  toReversed() {
    const array = new Array<T>();
    let current = this.tail;

    while (current) {
      array.push(current.value);
      current = current.prev;
    }

    return array;
  }

  private getNode(value: T) {
    let current = this.head;

    while (current && current.value !== value) {
      current = current.next;
    }

    return current;
  }
}

const list = new LinkedList<number>();

console.log("INSERTIONS:");
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.prepend(0);
list.prepend(-1);
console.log("length:", list.length);

console.log("\nTRAVERSAL:");
console.log(list.toArray());
console.log(list.toReversed());

console.log("\nGET:");
console.log("-1st is:", list.getAt(-1));
console.log("0th is:", list.getAt(0));
console.log("1st is:", list.getAt(1));
console.log("3rd is:", list.getAt(3));
console.log("6th is:", list.getAt(6));

console.log("\nFIND:");
console.log("3 is:", list.get(3));
console.log("6 is:", list.get(6));

console.log("\nINSERT AFTER:");
console.log(list.insertAfter(12, 2));
console.log(list.insertAfter(16, 5));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.toReversed());

console.log("\nINSERT AT:");
console.log(list.insertAt(20, 0));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.toReversed());
console.log(list.insertAt(21, 10));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.toReversed());
console.log(list.insertAt(22, 3));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.toReversed());

console.log("\nDELETION:");
console.log(list.remove(3));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.toReversed());
console.log(list.remove(16));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.toReversed());
console.log(list.remove(1));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.toReversed());
