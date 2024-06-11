class MinHeap {
  private data: number[] = [];
  length = 0;

  push(value: number) {
    const index = this.length;
    this.data[index] = value;
    this.length++;

    this.heapifyUp(index);
    console.log(this.data);
  }

  private heapifyUp(start: number) {
    let index = start;

    while (index > 0) {
      const parent = this.parentIndex(index);
      if (this.data[parent] <= this.data[index]) {
        break;
      }

      this.swap(index, parent);
      index = parent;
    }
  }

  pop(): number | undefined {
    if (!this.length) return undefined;
    const min = this.data[0];

    this.length--;
    this.data[0] = this.data[this.length];

    this.heapifyDown(0);
    console.log(this.data);

    return min;
  }

  private heapifyDown(start: number) {
    let index = start;

    while (index < this.length - 1) {
      const left = this.leftIndex(index);
      const right = this.rightIndex(index);

      if (left >= this.length) {
        break;
      }

      if (
        this.data[left] < this.data[right] &&
        this.data[index] > this.data[left]
      ) {
        this.swap(index, left);
        index = left;
      } else if (
        this.data[right] < this.data[left] &&
        this.data[index] > this.data[right]
      ) {
        this.swap(index, right);
        index = right;
      } else {
        break;
      }
    }
  }

  private leftIndex(index: number) {
    return 2 * index + 1;
  }

  private rightIndex(index: number) {
    return 2 * index + 2;
  }

  private parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private swap(a: number, b: number) {
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }
}

const minHeap = new MinHeap();

console.log("INSERTING");
minHeap.push(40);
minHeap.push(50);
minHeap.push(30);
minHeap.push(20);
minHeap.push(35);

console.log("\nREMOVING");
while (minHeap.length) {
  console.log(minHeap.pop());
}

console.log();
minHeap.push(1);
console.log(minHeap.pop());

console.log();
minHeap.push(3);
minHeap.push(1);
minHeap.push(2);
while (minHeap.length) {
  console.log(minHeap.pop());
}

console.log();
minHeap.push(1);
minHeap.push(2);
minHeap.push(3);
while (minHeap.length) {
  console.log(minHeap.pop());
}

console.log();
minHeap.push(4);
minHeap.push(1);
minHeap.push(5);
minHeap.push(3);
minHeap.push(2);
while (minHeap.length) {
  console.log(minHeap.pop());
}
