class TrieNode {
  value: string;
  isWord: boolean;
  children: (TrieNode | undefined)[];

  constructor(value: string) {
    this.value = value;
    this.isWord = false;
    this.children = new Array(26).fill(undefined);
  }

  insert(value: string) {
    const val = value.toLowerCase();
    const node = new TrieNode(val);
    this.children[this.toIndex(val)] = node;

    return node;
  }

  get(value: string) {
    const val = value.toLowerCase();
    const node = this.children[this.toIndex(val)];
    return node ?? undefined;
  }

  toIndex(value: string) {
    return value.charCodeAt(0) - "a".charCodeAt(0);
  }

  isEmpty() {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i]) return false;
    }

    return true;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }

  insert(word: string) {
    if (word.length < 1) return;
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const next = current.get(word[i]);

      if (next) {
        current = next;
      } else {
        current = current.insert(word[i]);
      }
    }

    current.isWord = true;
  }

  contains(word: string) {
    if (word.length < 1) return false;
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const next = current.get(word[i]);

      if (!next) {
        return false;
      }

      current = next;
    }

    return current.isWord;
  }

  invalidate(word: string) {
    if (word.length < 1) return;
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const next = current.get(word[i]);
      if (!next) return;

      current = next;
    }

    current.isWord = false;
  }

  delete(word: string) {
    if (word.length < 1) return;

    const traverse = (
      node: TrieNode | undefined,
      word: string,
      index: number,
    ) => {
      if (!node) return undefined;

      if (index === word.length) {
        if (node.isWord) node.isWord = false;
        if (node.isEmpty()) return undefined;
        return node;
      }

      const nextIndex = node.toIndex(word[index]);
      node.children[nextIndex] = traverse(
        node.children[nextIndex],
        word,
        index + 1,
      );

      if (node.isEmpty()) {
        return undefined;
      }

      return node;
    };

    traverse(this.root, word, 0);
  }

  toArray() {
    const array = new Array<string>();

    const traverse = (node: TrieNode | undefined, word: string[]) => {
      if (!node) return;
      word.push(node.value);

      if (node.isWord) {
        array.push(word.join(""));
      }

      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i], word);
      }

      word.pop();
    };

    traverse(this.root, []);
    return array;
  }

  toArrayV2() {
    const array = new Array<string>();

    const stack: [TrieNode | undefined, string][] = [[this.root, ""]];

    while (stack.length) {
      const [node, word] = stack.pop()!;
      if (!node) continue;

      const current = word + node.value;

      if (node.isWord) {
        array.push(current);
      }

      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push([node.children[i], current]);
      }
    }

    return array;
  }
}

const trie = new Trie();

function insert(word: string) {
  trie.insert(word);
  console.log("inserted", word);
}

function contains(word: string) {
  console.log("contains?", word, trie.contains(word));
}

insert("let");
insert("lot");
insert("lower");
insert("lasso");
insert("lament");
insert("lateral");
insert("lowered");

console.log(trie);
contains("let");
contains("lets");
contains("low");
contains("lower");

console.log(trie.toArray());
console.log(trie.toArrayV2());

trie.invalidate("lot");
console.log(trie.toArrayV2());

trie.delete("lower");
console.log(trie.toArrayV2());
