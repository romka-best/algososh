import Queue from './Queue';

export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    clear(): void;
    size(): number;
}

export enum OperationTypes {
    Enqueue = 'enqueue',
    Dequeue = 'dequeue',
    Clear = 'clear',
}

export interface Step<T> {
    queue: Queue<T>;
    index?: number,
    value?: T | null,
}
