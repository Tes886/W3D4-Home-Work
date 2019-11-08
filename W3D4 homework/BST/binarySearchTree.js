/* eslint-disable require-jsdoc */
"use strict";

// eslint-disable-next-line no-redeclare
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.count = 0;
    }
    max() {
        if (this.right !== null) {
            return this.right.max();
        }
        else {
            return this.value;
        }
    }
    min(){
        if(this.left !==null){
            return this.left.min();
        }else {
            return this.value;
        }
    }
    insertAll(value) {
        this.count++
    
        let newNode = new Node(value)
    
        const searchTree = node => {
          // if value < node.value, go left
          if (value < node.value) {
            // if no left child, append new node
            if (!node.left) {
              node.left = newNode
            } 
            // if left child, look left again
            else {
              searchTree(node.left)
            }
          }
          // if value > node.value, go right
          else if (value > node.value) {
            // if no right child, append new node
            if (!node.right) {
              node.right = newNode
            }
            // if right child, look right again
            else {
              searchTree(node.right)
            }
          }
        }
    
        searchTree(this.root)
      } 
      // in-order
    // left, root, right
        dfsInOrder() {
        let result = []
    
        const traverse = node => {
          // if left child exists, go left again
          if (node.left) traverse(node.left)
          // capture root node value
          result.push(node.value)
          // if right child exists, go right again
          if (node.right) traverse(node.right)
        }
    
        traverse(this.root)
    
        return result
      }
    add(element) {
        if (element > this.value) {
            if (this.right === null) {
                this.right = new Node(element);
            }
            else {
                this.right.add(element);
            }
        }
        else {
            if (this.left === null) {
                this.left = new Node(element);
            }
            else {
                this.left.add(element);
            }
        }
    }
    contains(element) {
        if (element === this.value) {
            return true;
        }
        if (element > this.value) {
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.contains(element);
            }
        }
        else {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.contains(element);
            }
        }
    }
    remove(parent, element) {
        if (element < this.value) {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.remove(this, element);
            }
        }
        else if (element > this.value) {
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.remove(this, element);
            }
        }
        else { //if (element === this.value) {
            // simply remove this node if it doesn't have children 
            if (this.left === null && this.right === null) {
                if (parent.left === this) {
                    parent.left = null;
                }
                else if (parent.right === this) {
                    parent.right = null;
                }
            }
            // if there is one child, put it in our place
            else if (this.left !== null && this.right === null) {
                    this.value = this.left.value;
                    this.right = this.left.right;
                    this.left = this.left.left;
                    return true;
            } else if (this.right !== null && this.left === null) {
                    this.value = this.right.value;
                    this.left = this.right.left;
                    this.right = this.right.right;
                    return true;
            } else if (this.left !== null && this.right !== null) {
                // if there are two children copy the largest of the small and prune that
                let largest = this.left.max();
                this.value = largest;
                this.left.remove(this, largest);
            }
            return true;
        } // end of "if this is the value to remove"
    } // end of remove method
} // end of Node class

class RootNode extends Node {
    constructor() {
        super(null);
    }
    add(element) {
        if (this.value === null) {
            this.value = element;
            return;
        }
        return super.add(element);
    }
    remove(element) {
        if (this.value === element && this.left === null && this.right === null) {
            this.value = null;
            return true;
        }
        else {
            return super.remove(this, element);
        }
    }
}

// eslint-disable-next-line no-unused-vars
class BinarySearchTree {
    constructor() {
        this.root = new RootNode();
    }
    add(element) {
        this.root.add(element);
    }
    contains(element) {
        return this.root.contains(element);
    }
    remove(element) {
        return this.root.remove(element);
    }
}





