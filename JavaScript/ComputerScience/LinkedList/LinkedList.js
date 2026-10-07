import Node from "./Node.js";

export default class LinkedList {
  constructor(arr = []) {
    this._head = null;
    this._tail = null;
    this.n = 0;

    if (arr.length > 0) {
      this.n = arr.length;
      this._head = new Node(arr[0]);
      this._tail = this._head;

      for (let i = 0; i < arr.length - 1; i++) {
        let nextNode = new Node(arr[i + 1]);
        this._tail.next = nextNode;
        this._tail = nextNode;
      }
    }
  }

  append(value) {
    if (this.n === 0) {
      const newNode = new Node(value);
      this._head = newNode;
      this._tail = newNode;
    } else {
      const newTail = new Node(value);
      this._tail.next = newTail;
      this._tail = newTail;
    }

    this.n++;
  }

  prepend(value) {
    const newHead = new Node(value, this._head);
    this._head = newHead;

    if (this.n === 0) {
      this._tail = newHead;
    }

    this.n++;
  }

  size() {
    return this.n;
  }

  head() {
    if (this.n === 0) {
      return undefined;
    }
    return this._head.value;
  }

  tail() {
    if (this.n === 0) {
      return undefined;
    }
    return this._tail.value;
  }

  at(index) {
    if (index < 0 || index > this.n - 1) {
      return undefined;
    }

    let currentNode = this._head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode.value;
  }

  pop() {
    if (this.n === 0) {
      return undefined;
    }

    let currentNode = this._head;
    this._head = this._head.next;
    this.n--;

    if (this.n === 0) {
      this._tail = null;
    }

    return currentNode.value;
  }

  contains(value) {
    let currentNode = this._head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }

  findIndex(value) {
    if (this.n === 0) {
      return -1;
    }

    let currentNode = this._head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }

    return -1;
  }

  toString() {
    if (this.n === 0) {
      return "";
    }

    let str = "";
    let currentNode = this._head;
    while (currentNode) {
      str += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    str += "null";
    return str;
  }
}
