export class BinaryTree {
    constructor() {
        this.root = null;
        this.size = null;
    }
    root = null;
    size = 0;
    reset() {
        this.root = null;
        this.size = 0;
    }
    buildTree(arr) {
        if (arr.length === 0) {
            return null;
        }
        var uniqueArr = [...new Set(arr)];
        var middleInd = Math.floor(uniqueArr.length / 2);
        var leftArr = uniqueArr.slice(0, middleInd);
        var rightArr = uniqueArr.slice(middleInd + 1, uniqueArr.length);
        var middleNode = new Node(uniqueArr[middleInd])
        middleNode.left = this.buildTree(leftArr)
        middleNode.right = this.buildTree(rightArr)
        return middleNode;
    }

    getRoot() { return this.root }

    addValue(value) {
        this.addNode(this.root, value)
    }
    //this function has problems 
    addNode(node, value) {
        //This block of code runs once to check if the value is already in the Binary Tree
        if (node == this.root) {
            if (this.traverseAndFind(node, value) != null) {
                console.log('Error: This value already exist in the tree.')
                return;
            }
        }
        //base case 
        if (node === null) {
            var newNode = new Node(value);
            node = newNode;
            this.assignDepth(node);
        }
        else {
            //If both left and right are not null, it needs to accout whether or not the branches are balanced. 
            var childData = value;

            if (node.data < value) {
                childData = node.data;
                node.data = value;
            }
            if (node.left === null && node.right === null) {
                node.left = new Node(childData)

                this.assignDepth(node.left)
            }
            else if (node.left !== null && node.right === null) {
                node.right = new Node(childData)

                this.assignDepth(node.right)
            }
            else if (node.left !== null && node.right !== null) {
                if ((this.isTreeBalanced(node.left) && this.isTreeBalanced(node.right)) ||
                    (!this.isTreeBalanced(node.left) && !this.isTreeBalanced(node.right))
                ) {
                    this.addNode(node.left, childData);
                }
                else if (this.isTreeBalanced(node.left) && !this.isTreeBalanced(node.right)) {
                    this.addNode(node.right, childData);
                }
            }
        }
    }

    find(value) {
        return this.traverseAndFind(this.root, value);
    }

    //this is also a way to check if there are duplicates in the tree
    traverseAndFind(node, value) {
        if (node === null)
            return null;
        if (node.data === value)
            return node;
        else {
            var result1 = this.traverseAndFind(node.left, value);
            var result2 = this.traverseAndFind(node.right, value);
            //since result1 and result2 will be the same thing if they are not null 
            if (result1 !== null)
                return result1;
            else if (result2 !== null)
                return result2;
            else {
                return null;
            }
        }
    }

    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    gatherNodes(node, divArr) {
        if (node === null) {
            return;
        }
        divArr.forEach(arr => {
            if (!!arr[0]) {
                if (arr[0].depth === node.depth) {
                    var obj = {
                        data: node.data,
                        depth: node.depth,
                        index: node.index,
                    }
                    arr.push(obj);
                }
            }
        })
    }
    //not in use
    assignDepth(node) {
        var found = false;
        var depth = 0;
        do {
            if (node.index + 1 >= Math.pow(2, depth) && node.index + 1 < Math.pow(2, depth + 1)) {
                found = true;
                console.log(depth)
                node.setDepth(depth);
            }
            depth++;
        } while (!found && Math.pow(2, depth) > this.size);
    }
    printToConsole(node) {
        if (node === null) {
            return;
        }
        this.printToConsole(node.left)
        this.printToConsole(node.right)
    }

    printToArray(node) {
        if (node === null) {
            return []
        }
        var leftArr = this.printToArray(node.left);
        var rightArr = this.printToArray(node.right);
        var arr = [...leftArr, node.data, ...rightArr]
        return arr;
    }
    count(node) {
        if (node === null)
            return 0;
        return this.count(node.left) + this.count(node.right) + 1;
    }

    isBalanced(node) {
        if (node.left === null && node.right === null)
            return true;
        var leftNodes = this.count(this.root.left)
        var rightNodes = this.count(this.root.right)
        var branch
        if (leftNodes === rightNodes || leftNodes === rightNodes + 1)
            branch = true
        else
            branch = false;
        return branch && this.isBalanced(node.left) && this.isBalanced(node.right)
    }

    reBalance() {
        var unsorted = this.traverseAndCollect(this.root);
        var sorted = sortArray(unsorted);
        this.root = this.buildTree(sorted)

    }
    //returns an array of all values that a node and its children hold
    traverseAndCollect(node) {
        if (node === null)
            return [];
        var leftArray = this.traverseAndCollect(node.left);
        var rightArray = this.traverseAndCollect(node.right);
        return [...leftArray, node.data, ...rightArray];
    }

    insert(value) {
        var arr = this.traverseAndCollect(this.root);
        var newArr = [...arr, value];
        newArr = sortArray([...new Set(newArr)]);
        this.root = this.buildTree(newArr)
    }
    delete(value) {
        var arr = this.traverseAndCollect(this.root);
        var newArr = sortArray(arr.filter(val => val !== value))
        this.root = this.buildTree(newArr)
    }

    //This takes a function as a parameter use level order format to traverse the tree 
    levelOrder(func) {
        if (func === null || func === undefined) {
            return; 
        }
        var arr = []; 
        var treeHeight = this.height(this.root)
        for (var i = 0; i <= treeHeight; i++) {
            var newArr = this.levelOrderSupplement(this.root, i)
            arr = [...arr, ...newArr]
        }
        console.log(arr)
        arr.forEach(node => {
            func(node)
        })
    }

    //this function supplements levelOrder
    levelOrderSupplement(node, depth) {
        var arr = [];  
        if (node === null) {
            return arr; 
        }
        var nodeDepth = this.depth(node); 
        console.log("nodeDepth = " + nodeDepth)
        if (nodeDepth == depth) {
            arr.push(node)
        }
        var leftArr = this.levelOrderSupplement(node.left, depth)
        var rightArr = this.levelOrderSupplement(node.right, depth)
        var newArr = [...arr, ...leftArr, ...rightArr]

        return newArr; 
    }

    //returns the height of a node, which is the number generations of children it has 
    height(node) {
        if (node.left === null && node.right === null)
            return 0;
        if (this.count(node.left) >= this.count(node.right))
            return this.height(node.left) + 1;
        else
            return this.height(node.right) + 1;
    }

    depth(node) {
        return this.returnDepth(node, this.root, 0)
    }
    //returns the depth from targetNode to the parent node
    returnDepth(targetNode, node, depth) {
        if (node === null) {
            return 0
        }
        if (node.data === targetNode.data) {
            return depth;
        }
        var newDepth = depth + 1;

        var leftDepth = this.returnDepth(targetNode, node.left, newDepth)
        var rightDepth = this.returnDepth(targetNode, node.right, newDepth)
        if (leftDepth !== 0 && leftDepth !== undefined)
            return leftDepth;
        if (rightDepth !== 0 && rightDepth !== undefined)
            return rightDepth;
    }
    buildLinkedList(arr) {
        if (arr.length === 0) {
            return null;
        }
        var arrClone = arr;
        var value = arrClone.pop();
        var node = new Node(value)
        node.left = this.buildLinkedList(arrClone)
        return node;
    }
    printLinkedListToArray(node) {
        if (node === null)
            return [];

        var newArr = this.printLinkedListToArray(node.left)
        return [...newArr, node.data]
    }

    //inorder traversal
    //left, root, right
    inorder(func, node) {
        if (func === null || func === undefined) {
            if (node === null) {
                return [];
            }
            var leftArr = this.inorder(func, node.left)
            var rightArr = this.inorder(func, node.right);
            return [...leftArr, node.data, ...rightArr]
        }
        if (node === null) {
            return func(null)
        }

        this.inorder(func, node.left)
        func(node)
        this.inorder(func, node.right)

    }

    //root, left, right
    preorder(func, node) {
        if (func === null || func === undefined) {
            if (node === null) {
                return [];
            }
            var leftArr = this.preorder(func, node.left)
            var rightArr = this.preorder(func, node.right);
            return [node.data, ...leftArr, ...rightArr]
        }
        if (node === null) {
            return func(null)
        }
        func(node)
        this.preorder(func, node.left)
        this.preorder(func, node.right)
    }

    //left, right, root
    postorder(func, node) {
        if (func === null || func === undefined) {
            if (node === null) {
                return [];
            }
            var leftArr = this.preorder(func, node.left)
            var rightArr = this.preorder(func, node.right);
            return [node.data, ...leftArr, ...rightArr]
        }
        if (node === null) {
            return func(null)
        }
        func(node)
        this.postorder(func, node.left)
        this.postorder(func, node.right)
    }
}

export function AddOne(node) {
    if (node == null)
        return; 
    node.data++; 
    console.log(node.data)
} 

export function PrintToConsole(node) {
    console.log(node.data)
}


class Node {
    constructor(value) {
        this.data = value; 

    } 
    data = null; 

    //The depth of the three that the node is located at. 
    depth = null; 
    left = null;
    right = null; 
    setDepth(val) { this.depth = val; }
}

//sorts array in ascending order
export const sortArrayByIndex = (mainArr) => {
    var arr = mainArr;
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].index > arr[j].index) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp; 
            }
        }
    }
    return arr; 
}

export const sortArray = (mainArr) => {
    var arr = mainArr;
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

const getRidofDuplicatesInArray = (arr) => {
    return [...new Set(arr)]; 
}