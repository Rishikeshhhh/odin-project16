const Tree = require('./Tree');

// Function to generate random numbers
function generateRandomNumbers(count) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * 100));
  }
  return Array.from(numbers);
}

// Create a balanced binary search tree
const randomNumbers = generateRandomNumbers(10);
const balancedTree = new Tree(randomNumbers);

// Confirm that the tree is balanced
console.log("Is the tree balanced?", balancedTree.isBalanced());

// Print elements in level, pre, post, and in order
console.log("Level Order:");
balancedTree.levelOrder(node => console.log(node.data));
console.log("Pre Order:");
balancedTree.preOrder(node => console.log(node.data));
console.log("Post Order:");
balancedTree.postOrder(node => console.log(node.data));
console.log("In Order:");
balancedTree.inOrder(data => console.log(data)); // <-- Corrected invocation

// Add several numbers > 100 to unbalance the tree
const unbalancedNumbers = [101, 102, 103];
unbalancedNumbers.forEach(num => balancedTree.insert(num));

// Confirm that the tree is unbalanced
console.log("Is the tree unbalanced?", !balancedTree.isBalanced());

// Rebalance the tree
balancedTree.rebalance();

// Confirm that the tree is balanced again
console.log("Is the tree balanced after rebalancing?", balancedTree.isBalanced());

// Print elements in level, pre, post, and in order after rebalancing
console.log("Level Order after rebalancing:");
balancedTree.levelOrder(node => console.log(node.data));
console.log("Pre Order after rebalancing:");
balancedTree.preOrder(node => console.log(node.data));
console.log("Post Order after rebalancing:");
balancedTree.postOrder(node => console.log(node.data));
console.log("In Order after rebalancing:");
balancedTree.inOrder(data => console.log(data)); // <-- Corrected invocation
