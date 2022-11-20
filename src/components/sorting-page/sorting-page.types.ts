import {ElementStates} from "../../types/element-states";

export interface IValue {
    number: number;
    type: ElementStates;
}

export type byTypeSort = "По возрастанию" | "По убыванию" | "Нет";
export type choiceTypeSort = "Выбор" | "Пузырёк";
