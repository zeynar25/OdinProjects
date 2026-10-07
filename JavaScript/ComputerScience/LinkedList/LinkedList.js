import Node from "./Node.js";

export default class LinkedList {
  constructor(arr) {
    this.head = null;
    this.tail = null;
    this.n = 0;

    if (arr) {
      this.n = 1;
      this.head = arr[0];
      this.tail = arr[arr.length - 1];

      for (let i = 0; i < arr.length - 1; i++) {
        arr[i].next = arr[i + 1];
        this.n++;
      }
    }
  }

  append(value) {
    const newHead = new Node(value, this.head);
    this.head = newHead;
  }

  prepend(value) {
    const newTail = new Node(value);
    this.tail.next = newTail;
    this.tail = newTail;
  }

  size() {
    return this.n;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  at(index) {
    if (index > this.n - 1) {
      return null;
    }

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  pop() {
    if (n === 0) {
      return null;
    }

    let currentNode = this.head;
    this.head = this.head.next;
    this.n--;
    return currentNode;
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
    if (n === 0) {
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
    if (n === 0) {
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
