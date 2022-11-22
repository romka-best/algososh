import Stack from "./Stack";

import {ElementStates} from "../../types/element-states";

import {Step} from "./stack-page.types";
import {OperationTypes} from "./stack-page.types";

export function push<T>(value: T, list: Stack<T>) {
    const steps: Step<T>[] = [];

    steps.push({
        index: list.size(),
        value,
        list: list,
    });

    list.push(value);

    steps.push({
        list: list,
    });

    return steps;
}

export function pop<T>(list: Stack<T>) {
    const steps: Step<T>[] = [];

    steps.push({
        index: list.size(),
        list: list,
    });

    list.pop();

    steps.push({
        list: list,
    });

    return steps;
}

export function getLetterState<T>(
    index: number,
    currentStep: Step<T>,
    operationType: OperationTypes | null,
): ElementStates {
    if (!operationType || currentStep.index === undefined) {
        return ElementStates.Default;
    }

    if (index === currentStep.index) {
        return ElementStates.Changing;
    }

    return ElementStates.Default;
}
