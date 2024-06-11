class ListNode<T> {
  value: T;
  next?: ListNode<T>;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  head?: ListNode<T>;
  tail?: ListNode<T>;
  length: number = 0;

  insert(value: T) {
    if (!this.tail) {
      this.tail = new ListNode(value);
      this.head = this.tail;
    } else {
      this.tail.next = new ListNode(value);
      this.tail = this.tail.next;
    }

    this.length++;
  }

  insertAfter(value: T, reference: T) {
    const prev = this._find(reference);
    if (!prev) return false;

    const node = new ListNode(value);
    node.next = prev.next;
    prev.next = node;

    if (prev === this.tail) {
      this.tail = node;
    }

    this.length++;
    return true;
  }

  delete(value: T) {
    let prev: ListNode<T> | undefined = undefined;
    let current = this.head;

    while (current && current.value !== value) {
      prev = current;
      current = current.next;
    }

    if (!current) {
      return false;
    }

    if (!prev) {
      this.head = current.next;
    } else {
      prev.next = current.next;
    }

    this.length--;
    return true;
  }

  get(i: number) {
    if (i < 0 || i >= this.length) return undefined;
    if (i == this.length - 1) return this.tail?.value;

    let current = this.head;

    while (current && i > 0) {
      current = current.next;
      i--;
    }

    return current?.value;
  }

  find(value: T) {
    return this._find(value)?.value;
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

  private _find(value: T) {
    let current = this.head;

    while (current && current.value !== value) {
      current = current.next;
    }

    return current;
  }
}

const list = new LinkedList<number>();

console.log("INSERTIONS:");
list.insert(1);
list.insert(2);
list.insert(3);
list.insert(4);
list.insert(5);
console.log("length:", list.length);

console.log("\nTRAVERSAL:");
console.log(list.toArray());

console.log("\nGET:");
console.log("-1st is:", list.get(-1));
console.log("0th is:", list.get(0));
console.log("1st is:", list.get(1));
console.log("3rd is:", list.get(3));
console.log("6th is:", list.get(6));

console.log("\nFIND:");
console.log("3 is:", list.find(3));
console.log("6 is:", list.find(6));

console.log("\nINSERT AFTER:");
console.log(list.insertAfter(12, 2));
console.log(list.insertAfter(16, 5));
console.log("tail:", list.tail);
console.log("length:", list.length);
console.log(list.toArray());

console.log("\nDELETION:");
console.log(list.delete(3));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.delete(16));
console.log("length:", list.length);
console.log(list.toArray());
console.log(list.delete(1));
console.log("length:", list.length);
console.log(list.toArray());
