import { sortArray, sortArrayByIndex, BinaryTree, AddOne, PrintToConsole } from '../binaryTree.js'; 

describe("Test creating a binary tree", () => {
    var sampleTree = new BinaryTree(12); 
    it.skip("Create one node of a tree", () => {
        expect(sampleTree.root.data).toBe(12)
    })

    it.skip("AddNode to tree", () => {
        sampleTree.addValue(23); 
        expect(sampleTree.root.data).toBe(23)
        expect(sampleTree.root.left.data).toBe(12)
    })
})

describe("Test build tree functionality", () => {
    var arr = [10, 45, 4, 78, 84, 54, 53];
    var sortedArray = sortArray(arr);
    var sampleTree = new BinaryTree();
    sampleTree.root = sampleTree.buildTree(sortedArray);
    it("[10, 45, 4, 78, 84]", () => {
        sampleTree.printToConsole(sampleTree.root)
    })

    it("Test find function", () => {
        var targetNode = sampleTree.find(84);
        console.log(targetNode)
        expect(targetNode.data).toEqual(84);

    })
    it("Test count function", () => {
        expect(sampleTree.count(sampleTree.root)).toEqual(7)
    })
    it("Test TraverseAndCollect", () => {
        var arr = sampleTree.traverseAndCollect(sampleTree.root)
        expect(arr).toEqual(sortedArray)
    })
    it("Test reBalance function", () => {
        var unsorted = [43, 54, 12, 4, 6, 2]
        var unsortedTree = new BinaryTree()
        unsortedTree.root = unsortedTree.buildTree(unsorted)
        unsortedTree.reBalance(); 
        var sorted = sortArray(unsorted)
        expect(unsortedTree.printToArray(unsortedTree.root)).toEqual(sorted)
    })
    it("Insert 14 to sampleTree", () => {
        sampleTree.insert(14)
        var newArr = sampleTree.printToArray(sampleTree.root); 
        expect(newArr).toEqual([4, 10, 14, 45, 53, 54, 78, 84])
    })
    it("Delete 78", () => {
        sampleTree.delete(78)
        var newArr = sampleTree.printToArray(sampleTree.root);
        expect(newArr).toEqual([4, 10, 14, 45, 53, 54, 84])
    })
    it("Test height function", () => {
        var height = sampleTree.height(sampleTree.root); 
        expect(height).toEqual(2)
    })
    it("Test height function after inserting 33", () => {
        sampleTree.insert(33)
        var height = sampleTree.height(sampleTree.root);
        expect(height).toEqual(3)
    })
    it("Test depth function", () => {
        var node = sampleTree.find(84)
        var depth = sampleTree.depth(node)
        expect(depth).toEqual(2)
    })
    it("Test depth function after increasing the height of the tree to be 4 ", () => {
        sampleTree.insert(31)
        sampleTree.insert(32)
        sampleTree.insert(33)
        sampleTree.insert(34)
        sampleTree.insert(35)
        sampleTree.insert(36)
        sampleTree.insert(37)
        sampleTree.insert(38)
        var node = sampleTree.find(84)
        var depth = sampleTree.depth(node)
        expect(depth).toEqual(3)
    })
    var linkedList = new BinaryTree();
    var arr = [3, 6, 4, 32, 23];
    linkedList.root = linkedList.buildLinkedList(arr)
    it("Test isBalanced on linkedList", () => {
        var boolVal = linkedList.isBalanced(linkedList.root); 
        expect(boolVal).toEqual(false)
    })

    it("Test isBalanced on binary tree", () => {
        var boolVal = sampleTree.isBalanced(sampleTree.root);
        expect(boolVal).toEqual(true)
    })
    

})

describe("Test with another tree [4, 5, 6, 7, 8, 9]", () => {
    var sampleTree = new BinaryTree();
    var array = [4, 5, 6, 7, 8, 9]; 
    sampleTree.root = sampleTree.buildTree(array);
    //console.log(sampleTree.printToArray(sampleTree.root))
    it("Test levelOrder transversal", () => {
        sampleTree.levelOrder(PrintToConsole)
    })
    
})

describe('test the functionality of sortArray', () => {
    it('[3, 6, 4, 32, 23]', () => {
        var arr = [{ index: 3 }, { index: 6 }, { index: 4 }, { index: 32 }, { index: 23 }]; 
        var sortedArr = sortArrayByIndex(arr); 
        expect(sortedArr).toEqual([{ index: 3 }, { index: 4 }, { index: 6 }, { index: 23 }, { index: 32 } ])
    })
})

describe("test linked list", () => {
    it('[3, 6, 4, 32, 23]', () => {
        var sampleTree = new BinaryTree(); 
        var arr = [3, 6, 4, 32, 23]; 
        sampleTree.root = sampleTree.buildLinkedList(arr)
        var array = sampleTree.printLinkedListToArray(sampleTree.root)
        expect(array).toEqual([3, 6, 4, 32, 23])
    })
})