import {ElementStates} from "../../types/element-states";

export interface IValue {
    value: string;
    type: ElementStates;
}

export interface IQueue {
    queue: Array<IValue>,
    tail: number,
    head: number,
}
