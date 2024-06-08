const Node = require('./Node');

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    array = Array.from(new Set(array)); // Remove duplicates
    array.sort((a, b) => a - b); // Sort array
    return this.sortedArrayToBST(array, 0, array.length - 1);
  }

  sortedArrayToBST(array, start, end) {
    if (start > end) return null;
    
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    
    root.left = this.sortedArrayToBST(array, start, mid - 1);
    root.right = this.sortedArrayToBST(array, mid + 1, end);
    
    return root;
  }

  insert(value, node = this.root) {
    if (!node) {
      this.root = new Node(value);
      return this.root;
    }

    if (value < node.data) {
      if (!node.left) {
        node.left = new Node(value);
        return node.left;
      } else {
        return this.insert(value, node.left);
      }
    } else {
      if (!node.right) {
        node.right = new Node(value);
        return node.right;
      } else {
        return this.insert(value, node.right);
      }
    }
  }

  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        let temp = this.findMinNode(node.right);
        node.data = temp.data;
        node.right = this.deleteNode(node.right, temp.data);
      }
    }
    return node;
  }

  find(value, node = this.root) {
    if (node === null) return null;

    if (value === node.data) return node;
    else if (value < node.data) return this.find(value, node.left);
    else return this.find(value, node.right);
  }

  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  levelOrder(callback) {
    if (!this.root) return [];
    
    const queue = [this.root];
    const result = [];

    while (queue.length) {
      const current = queue.shift();
      result.push(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    if (callback) {
      result.forEach(value => callback(this.find(value)));
    }

    return result;
  }

  preOrder(callback, node = this.root) {
    if (!node) return [];

    if (callback) callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (!node) return [];

    const result = [];
    const stack = [];

    while (node || stack.length) {
      while (node) {
        stack.push(node);
        node = node.left;
      }

      node = stack.pop();
      if (callback) callback(node.data);
      result.push(node.data);

      node = node.right;
    }

    return result;
  }

  postOrder(callback, node = this.root) {
    if (!node) return [];

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    if (callback) callback(node);
  }

  height(node) {
    if (node === null) return -1;
    
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === this.root) return 0;
    
    let current = node;
    let depth = 0;
    
    while (current !== this.root) {
      current = this.parent(current);
      depth++;
    }
    
    return depth;
  }

  parent(child, node = this.root, parent = null) {
    if (node === null) return null;
    
    if (node === child) return parent;
    
    return this.parent(child, node.left, node) || this.parent(child, node.right, node);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTree(values);
  }
}

module.exports = Tree;
