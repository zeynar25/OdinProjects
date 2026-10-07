import Node from "./Node.js";

export default class LinkedList {
  constructor(arr) {
    this.head = null;
    this.tail = null;
    this.n = 0;

    if (arr.length > 0) {
      this.n = arr.length;
      this.head = new Node(arr[0]);
      this.tail = this.head;

      for (let i = 0; i < arr.length - 1; i++) {
        let nextNode = new Node(arr[i + 1]);
        this.tail.next = nextNode;
        this.tail = nextNode;
      }
    }
  }

  append(value) {
    if (this.n === 0) {
      const newNode = new Node(value);
      this.head = newNode;
      this.tail = newNode;
    } else {
      const newTail = new Node(value);
      this.tail.next = newTail;
      this.tail = newTail;
    }

    this.n++;
  }

  prepend(value) {
    const newHead = new Node(value, this.head);
    this.head = newHead;

    if (this.n === 0) {
      this.tail = newHead;
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
    return this.head.value;
  }

  tail() {
    if (this.n === 0) {
      return undefined;
    }
    return this.tail.value;
  }

  at(index) {
    if (index < 0 || index > this.n - 1) {
      return undefined;
    }

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode.value;
  }

  pop() {
    if (this.n === 0) {
      return undefined;
    }

    let currentNode = this.head;
    this.head = this.head.next;
    this.n--;

    if (this.n === 0) {
      this.tail = null;
    }

    return currentNode.value;
  }

  contains(value) {
    let currentNode = this.head;
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

    let currentNode = this.head;
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
    let currentNode = this.head;
    while (currentNode) {
      str += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    str += "null";
    return str;
  }
}
