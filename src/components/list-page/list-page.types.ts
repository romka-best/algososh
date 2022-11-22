import {LinkedListNode} from "./LinkedList";

export enum OperationTypes {
    AddHead = 'addHead',
    AddTail = 'addTail',
    DeleteHead = 'deleteHead',
    DeleteTail = 'deleteTail',
    AddByIndex = 'addByIndex',
    DeleteByIndex = 'deleteByIndex',
}

export interface Step<T> {
    list: LinkedListNode<T>[];
    index?: number,
    value?: T | null,
}
