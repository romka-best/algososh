import Stack from "./Stack";

export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    clear(): void;
    size(): number;
}

export enum OperationTypes {
    Push = "push",
    Pop = "pop",
    Clear = "clear",
}

export interface Step<T> {
    list: Stack<T>;
    index?: number,
    value?: T | null,
}
