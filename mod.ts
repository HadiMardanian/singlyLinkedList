class Node { 
    public data: any;
    public next: Node;
    constructor(data){
        this.data = data;
        this.next = null;
    }    
}


export default class SinglyLinkedList {
    public head: Node;
    public tail: Node;
    public length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    public push(val: any): SinglyLinkedList {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    public pop(): Node {
        if (this.length == 0) {
            throw new Error('List is empty');
        }
        let current: Node;
        if (this.length == 1) {
            current = this.head;
            this.head = null;
            this.tail = null;
        } else {
            current = this.get(this.length - 1);
            let before = this.get(this.length - 2);
            this.tail = before;
            this.tail.next = null;
        }
        this.length--;
        return current;
    }
    public shift(): Node {
        if (this.length == 0) {
            throw new Error('List is empty');
        }
        if (this.length == 1) {
            this.tail = null;
        }
        let old = this.head;
        this.head = old.next;
        this.length--;

        return old;
    }
    public unshift(val: any): SinglyLinkedList {
        let newNode = new Node(val);
        newNode.next = this.head;
        this.head = newNode;
        if (this.length == 0) {
            this.tail = this.head;
        }
        this.length++;
        return this;
    }
    public insert(position: number, val: any): SinglyLinkedList {
        if (position < 0 || position > this.length) {
            throw new Error(`index ${position} is out of bound`);
        }
        if (position == 0) {
            this.unshift(val);
        } else if (position == this.length) {
            this.push(val);
        } else {
            let before = this.get(position - 1);
            let next = before.next;
            let newNode = new Node(val);
            before.next = newNode;
            newNode.next = next;
            this.length++;
        }

        return this;
    }
    public set(position: number, val: any): SinglyLinkedList {
        if (position < 0 || position > this.length - 1) {
            throw new Error(`index ${position} is out of bound`);
        }
        let node = this.get(position);
        node.data = val;
        return this;
    }
    public get(position: number): Node {
        if (position < 0 || position > this.length - 1) {
            throw new Error(`index ${position} is out of bound`);
        }
        let counter = 0;
        let current = this.head;
        while (counter != position) {
            current = current.next;
            counter++;
        }
        return current;
    }
    public remove(position: number): Node {
        if (position < 0 || position > this.length - 1) {
            throw new Error(`index ${position} is out of bound`);
        }
        let node: Node;
        if (position == 0) {
            node = this.shift();
        } else if (position == this.length - 1) {
            node = this.pop();
        } else {
            let before = this.get(position - 1);
            let after = this.get(position).next;
            node = this.get(position);
            before.next = after;
            this.length--;
        }
        return node;
    }
    public reverse(): SinglyLinkedList {
        let pointer = this.head;
        this.head = this.tail;
        this.tail = pointer;
        let prev = null;
        let next;
        while (pointer != null) {
            next = pointer.next;
            pointer.next = prev;
            prev = pointer;
            pointer = next;
        }
        return this;
    }
    public print() {
        if (this.length == 0) {
            console.log('List is empty');
            return;
        }
        for (let i = 0; i < this.length; i++) {
            console.log(`Node[${i}] : ${this.get(i).data}`);
        }
    }
}