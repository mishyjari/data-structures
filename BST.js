// Binary Search Trees

// Define a class for a new node
class TreeNode {
  constructor(val,left,right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }

  add(val) {
    let current = this;
    if ( val === current.val ) {
      console.log(val, 'Value already exists in tree!')
      return current
    }
    else if ( val < current.val ) {
      if ( current.left ) {
        current.left.add(val);
      } else {
        current.left = new TreeNode(val)
      }
    } else if ( val > current.val ) {
      if ( current.right ) {
        current.right.add(val)
      } else {
        current.right = new TreeNode(val)
      }
    } else {
      return null
    }
  }

  find(target) {
    console.log('searching tree for ' + target)
    let current = this.root ? this.root : this
    if ( current.val === target ) {
      console.log(target + " found")
      return current;
    } else {
      if ( target < current.val ) {
        console.log('searching left')
        return current.left ? current.left.find(target) : null;
      } else if ( target > current.val ){
        console.log('searching right')
        return current.right ? current.right.find(target) : null;
      } else {
        return null
      }
    }
  }

  parentNode(target, last=null, current=null)  {
    if ( !current ) {
      current = this.root ? this.root : this;
    }

    if ( current.val === target ) {
      return last;
    }
    else if ( current.left && current.left.val === target || current.right && current.right.val === target ) {
      return current;
    }
    else if ( target < current.val ) {
      return this.parentNode(target,current,current.left)
    }
    else if ( target > current.val ) {
      return this.parentNode(target,current,current.right)
    } else {
      console.log('Node not found');
      return null
    }
  }

  remove(val) {
    let node = this.find(val);
    if ( !node ) { return null }

    let parent = this.parentNode(node.val);
    if ( !parent ) {
      // Node is root
      return null
    }

    if ( node.left && node.right ) {
      // Target node has two children
      let newChild = Math.abs(node.right.val - parent.val) > Math.abs(node.left.val - parent.val) ? node.rigth : node.left;
      let tmpChild = newChild === node.right ? node.left : node.right;

      node = newChild;
      let current = node;

      const insertNode = (root,node) => {
        console.log(root,node)
        if ( root.val < node.val ) {
          if ( root.left ) { return insertNode(root.left,node) }
          else { root.left = node }
        }
        else if ( root.val > node.val ) {
          if ( root.rigth ) { return insertNode(root.right,node) }
          else { root.right = node }
        }
      }

      return insertNode(parent,node);
    }
    else if ( !node.left && !node.right ) {
      // Target is a leaf node, just remove it;
      node = null;
    }
    else {
      let newChild = node.left ? node.left : node.right;

      if ( parent.right === node ) { parent.right = newChild }
      else if ( parent.left === node ) { parent.left = newChild }
    }
  }
}



// Define a class for a new tree
class Tree extends TreeNode {
  constructor() {
    super();
    this.root = null
  }

  add(val) {
    // Insert first root node
    if ( !this.root ) {
      this.root = new TreeNode(val)
    } else {
      this.root.add(val);
    }
  }
}

let bst = new Tree();
bst.add(20)
bst.add(5)
bst.add(22)
bst.add(50)
bst.add(4)
bst.add(17)
bst.add(18)
bst.add(40)
bst.add(60)
bst.add(3)
bst.add(10)
bst.add(15)
bst.add(30)
bst.add(45)
bst.add(55)
bst.add(70)


// Get all nodes of same level
const valuesAtLevelN = (tree,n) => {
  let res = [];
  const getChildren = (root,level=1) => {
    console.log(root,level)
    if ( level === n ) {
      if ( root.left ) { res.push(root.left.val) }
      if ( root.right ) { res.push(root.right.val) }
    }
    else {
      if ( root.left ) { getChildren(root.left,level+1) }
      if ( root.right ) { getChildren(root.right,level+1) }
    }
  }
  getChildren(tree.root);
  return res;
}


// Get the lowest common parent node
const lowestParentNode = (tree,v1,v2) => {
  let root = tree.root;

  let n1 = v1 < v2 ? v1 : v2;
  let n2 = v1 < v2 ? v2 : v1;

  const findNode = (root,target) => {
    if ( root.val === target ) { return root }
    if ( target < root.val ) {
      return root.left ? findNode(root.left,target) : null;
    }
    if ( target > root.val ) {
      return root.right ? findNode(root.right,target) : null;
    }
  }

  const checkChildren = root => {
    if ( n1 < root.val && n2 > root.val ) {
      // Check if targets are found in the left and right children
      return ( findNode(root,n1) && findNode(root,n2) ) ? root : null;
    }
    else if ( n1 < root.val && n2 < root.val ) {
      return root.left ? checkChildren(root.left) : null;
    }
    else if ( n1 > root.val && n2 > root.val ) {
      return root.right ? checkChildren(root.right) : null;
    }
  }

  return checkChildren(root,n1,n2)
}

// Get the delta in tree depth
const treeDelta = tree => {

  if ( !tree ) { return -1 }
  if ( !tree.left && tree.right ) { return 0 }

  let root = tree.root ? tree.root : tree;
  let maxDepth = -1;
  let minDepth = -1;

  const findDepth = (node,level=0) => {
    if ( node.left ) {
      findDepth(node.left,level+1)
    }
    else {

      if ( level > maxDepth ) {
        maxDepth = level;
        minDepth = level;

      }
      if ( level < minDepth ) {
        minDepth = level;
      }
    }
    if ( node.right ) {
      findDepth(node.right,level+1)
    }
    else {
      if ( level > maxDepth ) {
        maxDepth = level;
        minDepth = level;

      }
      if ( level < minDepth ) {
        minDepth = level;
      }
    }
    return Math.abs(maxDepth-minDepth)
  }

  return findDepth(root)
}

const getTreeBalance = tree => {
  if ( tree === null ) { return -1 }

  let root = tree.root ? tree.root : tree;

  let balanceL = 0;
  let balanceR = 0;

  const count = (node,balL=0,balR=0) => {
    if ( node.right ) {
      count(node.right, balL,balR+1)
    }
    else {
      balanceR += balR
    }
    if ( node.left ) {
      count(node.left, balL+1,balR)
    }
    else {
      balanceL += balL
    }
  }
  count(root);

  return balanceL - balanceR;
}

// Banlance a tree
const balanceTree = tree => {
  let root = tree.root ? tree.root : tree;

  const rotateRight = node => {
    if ( !node.left ) {
      return node;
    }
    let currentRoot = node;
    let nextRoot = node.left;

    currentRoot.left = nextRoot.right;
    nextRoot.right = currentRoot;

    return currentRoot
  }

  const rotateLeft = node => {
    if ( !node.right ) {
      return node;
    }
    let currentRoot = node;
    let nextRoot = node.right;

    currentRoot.right = nextRoot.left;
    nextRoot.left = currentRoot;

    return nextRoot;
  }

  const balance = (node) => {
    const rootBalance = getTreeBalance(node);

    if ( rootBalance > 1 ) {
      node = rotateRight(node);
    }
    else if ( rootBalance < -1 ) {
      node = rotateLeft(node)
    }

    if ( Math.abs(getTreeBalance(node)) > 1 ) {
      if ( node.right && Math.abs(getTreeBalance(node.right)) > 1 ) {
        balance(node.right)
      }
      if ( node.left && Math.abs(getTreeBalance(node.left)) > 1 ) {
        balance(node.left)
      }
    }

    return node
  }

  while ( treeDelta(root) > 1 ) {
    root = balance(root)
  }

  return balance(root)
}

bst = balanceTree(bst)
