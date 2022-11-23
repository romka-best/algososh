export class LinkedListNode<T> {
    _value: T | null;
    next: LinkedListNode<T> | null;

    constructor(value: T | null, next: LinkedListNode<T> | null = null) {
        this._value = value;
        this.next = next;
    }
}

export default class LinkedList<T> {
    head: LinkedListNode<T> | null;
    tail: LinkedListNode<T> | null;

    constructor(defaultValues?: T[]) {
        this.head = null;
        this.tail = null;

        defaultValues?.forEach(value => this.append(value));
    }

    append(value: T): void {
        const node = new LinkedListNode(value);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
        }

        this.tail.next = node;
        this.tail = node;
    }

    prepend(value: T): void {
        const node = new LinkedListNode(value, this.head);
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }
    }

    addByIndex(index: number, value: T): void {
        if (index < 0 || index > this.toArray().length) return;

        let current = this.head;
        let currentIndex = 0;
        let previous;
        const node = new LinkedListNode(value);

        if (index === 0) {
            node.next = current;
            this.head = node;
        } else {
            while (currentIndex++ < index && current) {
                previous = current;
                current = current.next;
            }
            node.next = current;
            if (previous) {
                previous.next = node;
            }
        }
    }

    deleteByIndex(index: number): void {
        if (index > 0 && index > this.toArray().length) return;

        let current,
            previous,
            currentIndex = 0;
        current = this.head;
        previous = current;

        if (index === 0) {
            this.head = current ? current.next : null;
        } else {
            while (currentIndex < index) {
                currentIndex++;
                previous = current;
                current = current?.next;
            }
            if (previous) {
                previous.next = current ? current.next : null;
            }
        }
    }

    deleteHead(): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        const deletedNode = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedNode;
    }

    deleteTail(): LinkedListNode<T> | null {
        if (!this.tail) {
            return null;
        }
        const deletedNode = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedNode;
        }

        let currentNode = this.head;
        while (currentNode?.next) {
            if (!currentNode.next.next) {
                this.tail = currentNode;
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        return deletedNode;
    }

    toArray(): LinkedListNode<T>[] {
        const nodes = [];
        let currentNode = this.head;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toInitialArray(): T[] {
        const nodes: T[] = [];
        let currentNode = this.head;

        while (currentNode) {
            nodes.push(currentNode._value as T);
            currentNode = currentNode.next;
        }

        return nodes;
    }
}
