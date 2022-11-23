import {IQueue} from "./queue-page.types";

export default class Queue<T> implements IQueue<T> {
    queue: Array<T | null>;
    head: number;
    tail: number;

    _maxN: number;
    _size: number;

    constructor(n: number) {
        this.queue = new Array<T | null>(n).fill(null);
        this._maxN = n;
        this.head = 0;
        this.tail = 0;
        this._size = 0;
    }

    isEmpty() {
        return this._size === 0;
    }

    isFull() {
        return this._size === this._maxN;
    }

    enqueue(newItem: T) {
        if (this._size !== this._maxN) {
            this.queue[this.tail] = newItem;
            this.tail = (this.tail + 1) % this._maxN;
            this._size++;
        } else {
            throw Error("Queue limit exceeded")
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            throw Error("Queue is empty");
        }

        const deletedItem = this.queue[this.head];
        if (deletedItem === null) {
            throw Error("Queue is empty");
        }

        this.queue[this.head] = null;
        this.head = (this.head + 1) % this._maxN
        this._size--;

        return deletedItem;
    }

    clear() {
        this.queue = new Array<T | null>(this._maxN).fill(null);
        this.head = 0;
        this.tail = 0;
        this._size = 0;
    }

    size() {
        return this._size;
    }
}
