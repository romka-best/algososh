import {IStack} from "./stack-page.types";

export default class Stack<T> implements IStack<T> {
    storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    clear(): void {
        this.storage = [];
    }

    size(): number {
        return this.storage.length;
    }
}
