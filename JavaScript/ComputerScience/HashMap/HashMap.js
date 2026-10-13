import Node from "../LinkedList/Node.js";

export default class HashMap {
  constructor() {
    this.load_factor = 0.75;
    this.capacity = 16;
    this.entry = 0;
    this.hashmap = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.getIndex(key);
    const newNode = new Node({ key, value });

    // find if key already exist,
    // if exist, replace value
    // if not, add new node to the front of the linked list
    if (this.hashmap[index] !== null) {
      if (this.findAndReplace(index, key, value)) {
        return;
      } else {
        newNode.next = this.hashmap[index];
      }
    }
    this.hashmap[index] = newNode;
    this.entry++;

    if (this.entry > this.capacity * this.load_factor) {
      this.grow();
    }
  }

  get(key) {
    const index = this.getIndex(key);
    let currentNode = this.hashmap[index];
    while (currentNode !== null) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return undefined;
  }

  has(key) {
    const index = this.getIndex(key);
    let currentNode = this.hashmap[index];
    while (currentNode !== null) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  remove(key) {
    const index = this.getIndex(key);
    let currentNode = this.hashmap[index];
    let prevNode = null;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        if (prevNode === null) {
          this.hashmap[index] = currentNode.next;
        } else {
          prevNode.next = currentNode.next;
        }
        this.entry--;
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  length() {
    return this.entry;
  }

  clear() {
    this.capacity = 16;
    this.entry = 0;
    this.hashmap = new Array(this.capacity).fill(null);
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.hashmap.length; i++) {
      let currentNode = this.hashmap[i];
      while (currentNode !== null) {
        keys.push(currentNode.key);
        currentNode = currentNode.next;
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let i = 0; i < this.hashmap.length; i++) {
      let currentNode = this.hashmap[i];
      while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let i = 0; i < this.hashmap.length; i++) {
      let currentNode = this.hashmap[i];
      while (currentNode !== null) {
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.next;
      }
    }
    return entries;
  }

  // helper functions
  getIndex(key) {
    return this.hash(key) % this.capacity;
  }

  findAndReplace(index, key, value) {
    let currentNode = this.hashmap[index];
    while (currentNode !== null) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  grow() {
    const oldHashmap = this.hashmap;

    this.capacity *= 2;
    this.entry = 0;
    this.hashmap = new Array(this.capacity).fill(null);

    for (let i = 0; i < oldHashmap.length; i++) {
      let currentNode = oldHashmap[i];
      while (currentNode !== null) {
        this.set(currentNode.key, currentNode.value);
        currentNode = currentNode.next;
      }
    }
  }
}
