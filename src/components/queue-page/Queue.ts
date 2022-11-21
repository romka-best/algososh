import {IQueue, IValue} from "./queue-page.types";
import {ElementStates} from "../../types/element-states";

export default class Queue implements IQueue {
    queue: Array<IValue>;
    head: number;
    tail: number;

    _maxN: number;
    _size: number;

    constructor(n: number) {
        this.queue = new Array<IValue>(n).fill({
            value: "",
            type: ElementStates.Default,
        });
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

    * enqueue(newItem: IValue) {
        if (this._size !== this._maxN) {
            this.queue[this.tail] = {
                ...newItem,
                type: ElementStates.Changing,
            };
            const prevTail = this.tail;
            this.tail = (this.tail + 1) % this._maxN;
            this._size++;
            yield {
                queue: this.queue,
                tail: this.tail,
                head: this.head,
            };

            this.queue[prevTail] = {
                ...newItem,
                type: ElementStates.Default,
            };
            return {
                queue: this.queue,
                tail: this.tail,
                head: this.head,
            };
        } else {
            throw Error("Queue limit exceeded")
        }
    }

    * dequeue() {
        if (this.isEmpty()) {
            throw Error("Queue is empty")
        }
        const deletedItem = this.queue[this.head] as IValue;
        this.queue[this.head] = {
            ...deletedItem,
            type: ElementStates.Changing
        }
        yield {
            queue: this.queue,
            tail: this.tail,
            head: this.head,
        };

        this.queue[this.head] = {
            value: "",
            type: ElementStates.Default,
        };
        this.head = (this.head + 1) % this._maxN
        this._size--;
        return {
            queue: this.queue,
            tail: this.tail,
            head: this.head,
        };
    }
}
