class CacheNode {
  key: string;
  value: number;
  prev?: CacheNode;
  next?: CacheNode;

  constructor(key: string, value: number) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `${this.key}=${this.value}`;
  }
}

class LRUCache {
  private head: CacheNode;
  private tail: CacheNode;
  private hash: Map<string, CacheNode>;
  private size: number;
  private capacity: number;

  constructor(capacity: number) {
    this.size = 0;
    this.capacity = capacity;
    this.hash = new Map<string, CacheNode>();

    this.head = new CacheNode("h", Infinity);
    this.tail = new CacheNode("t", Infinity);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: string) {
    const node = this.hash.get(key);
    if (!node) return undefined;

    this.moveToFront(node);
    return node.value;
  }

  put(key: string, value: number) {
    const existingNode = this.hash.get(key);

    if (existingNode) {
      existingNode.value = value;
      this.moveToFront(existingNode);

      return;
    }

    const node = new CacheNode(key, value);

    if (this.size === this.capacity) {
      const leastRecent = this.tail.prev!;
      this.unlinkNode(leastRecent);
      this.hash.delete(leastRecent.key);
    } else {
      this.size++;
    }

    this.insertBetween(node, this.head, this.head.next!);
    this.hash.set(key, node);
  }

  toString() {
    let str = "{ ";
    let current: CacheNode | undefined = this.head;

    while (current) {
      str += current.toString() + ", ";
      current = current.next;
    }

    str += "}";
    return str;
  }

  private moveToFront(node: CacheNode) {
    this.unlinkNode(node);
    this.insertBetween(node, this.head, this.head.next!);
  }

  private insertBetween(node: CacheNode, left: CacheNode, right: CacheNode) {
    node.next = right;
    node.prev = left;

    left.next = node;
    right.prev = node;
  }

  private unlinkNode(node: CacheNode) {
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
  }
}

const cache = new LRUCache(2);

function put(value: number) {
  console.log("PUT", value);
  cache.put(value.toString(), value);
  console.log(cache.toString());
  console.log();
}

function get(key: number) {
  console.log("GET", key, cache.get(key.toString()));
  console.log(cache.toString());
  console.log();
}

put(1);
put(2);
get(1);
put(3);
get(2);
put(4);
get(1);
get(3);
get(4);
