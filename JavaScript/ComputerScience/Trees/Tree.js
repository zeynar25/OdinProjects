import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    // removes duplicates and sorts
    const uniqueArray = [...new Set(array)].sort((a, b) => a - b);

    return this.buildTreeHelper(uniqueArray, 0, uniqueArray.length - 1);
  }

  includes(value) {
    return this.includesHelper(this.root, value);
  }

  insert(value) {
    this.root = this.insertHelper(this.root, value);
  }

  deleteItem(value) {
    this.root = this.deleteItemHelper(this.root, value);
  }

  height(value) {
    let currentNode = this.root;
    while (currentNode !== null && currentNode.value !== value) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (currentNode == null) {
      return undefined;
    }

    return Math.max(this.heightHelper(currentNode), 0);
  }

  depth(value) {
    return this.depthHelper(this.root, value, 0);
  }

  isBalanced() {
    return this.isBalancedHelper(this.root) !== -1;
  }

  rebalance() {
    const array = this.treeToArray(this.root);
    this.root = this.buildTree(array);
  }

  // helper functions
  buildTreeHelper(array, left, right) {
    if (left > right) {
      return null;
    }

    const mid = Math.floor((left + right) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTreeHelper(array, left, mid - 1);
    node.right = this.buildTreeHelper(array, mid + 1, right);

    return node;
  }

  includesHelper(node, value) {
    if (node === null) {
      return false;
    }

    if (node.value === value) {
      return true;
    }

    return (
      this.includesHelper(node.left, value) ||
      this.includesHelper(node.right, value)
    );
  }

  insertHelper(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value === node.value) {
      return node;
    }

    if (value < node.value) {
      node.left = this.insertHelper(node.left, value);
    } else {
      node.right = this.insertHelper(node.right, value);
    }

    return node;
  }

  deleteItemHelper(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.deleteItemHelper(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteItemHelper(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      // If it has two children, we'll use inorder predecessor in removing this node.
      const leftSubtreeLargest = this.findLargestValue(node.left);
      node.value = leftSubtreeLargest;
      node.left = this.deleteItemHelper(node.left, leftSubtreeLargest);
    }

    return node;
  }

  heightHelper(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.heightHelper(node.left);
    const rightHeight = this.heightHelper(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depthHelper(node, value, depth) {
    if (node === null) {
      return undefined;
    }

    if (node.value === value) {
      return depth;
    }

    if (value < node.value) {
      return this.depthHelper(node.left, value, depth + 1);
    }

    return this.depthHelper(node.right, value, depth + 1);
  }

  isBalancedHelper(node) {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.isBalancedHelper(node.left);
    const rightHeight = this.isBalancedHelper(node.right);

    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  findLargestValue(node) {
    return node.right === null ? node.value : this.findLargestValue(node.right);
  }

  treeToArray(node) {
    if (node === null) {
      return [];
    }

    const leftArray = this.treeToArray(node.left);
    const rightArray = this.treeToArray(node.right);

    return [...leftArray, node.value, ...rightArray];
  }
}
