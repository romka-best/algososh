import React from "react";

import {Circle} from "../ui/circle/circle";

import LinkedList from "./LinkedList";

import {HEAD, TAIL} from "../../constants/element-captions";
import {ADD_OPERATION_TYPE, DELETE_OPERATION_TYPE} from "./constants";

import {ElementStates} from "../../types/element-states";
import {OperationTypes, Step} from "./list-page.types";

export function addHead<T>(value: T, list: LinkedList<T>): Step<T>[] {
    const steps: Step<T>[] = [];

    steps.push({
        index: 0,
        value,
        list: list.toArray(),
    });

    list.prepend(value);

    steps.push({
        index: 0,
        list: list.toArray(),
    });

    steps.push({
        list: list.toArray(),
    });

    return steps;
}

export function addTail<T>(value: T, list: LinkedList<T>): Step<T>[] {
    const steps: Step<T>[] = [];

    let currentList = list.toArray();
    steps.push({
        index: currentList.length - 1,
        value,
        list: currentList,
    });

    list.append(value);

    currentList = list.toArray();
    steps.push({
        index: currentList.length - 1,
        list: currentList,
    });

    steps.push({
        list: currentList,
    });

    return steps;
}

export function addByIndex<T>(value: T, index: number, list: LinkedList<T>): Step<T>[] {
    const steps: Step<T>[] = [];
    const currentList = list.toArray();

    let currentIndex = 0;
    while (currentIndex !== index) {
        steps.push({
            index: currentIndex,
            value,
            list: currentList,
        });
        currentIndex++;
    }

    list.addByIndex(index, value);

    steps.push({
        index: currentIndex,
        list: list.toArray(),
    });

    steps.push({
        list: list.toArray(),
    });

    return steps;
}

export function deleteHead<T>(list: LinkedList<T>): Step<T>[] {
    const steps: Step<T>[] = [];

    const currentList = list.toArray();
    const value = list.head?._value;
    currentList[0]._value = null;
    steps.push({
        index: 0,
        value,
        list: currentList,
    });

    list.deleteHead();

    steps.push({
        index: 0,
        list: list.toArray(),
    });

    steps.push({
        list: list.toArray(),
    });

    return steps;
}

export function deleteTail<T>(list: LinkedList<T>): Step<T>[] {
    const steps: Step<T>[] = [];

    let currentList = list.toArray();
    const value = list.tail?._value;
    currentList[currentList.length - 1]._value = null;
    steps.push({
        index: currentList.length - 1,
        value,
        list: currentList,
    });

    list.deleteTail();

    currentList = list.toArray();

    steps.push({
        index: currentList.length - 1,
        list: currentList,
    });

    steps.push({
        list: currentList,
    });

    return steps;
}

export function deleteByIndex<T>(index: number, list: LinkedList<T>): Step<T>[] {
    const steps: Step<T>[] = [];

    let currentList = list.toArray();

    let currentIndex = 0;
    while (currentIndex !== index) {
        steps.push({
            index: currentIndex,
            list: currentList,
        });
        currentIndex++;
    }

    const prevList = new LinkedList(list.toInitialArray()).toArray();
    const value = prevList[currentIndex]._value;
    prevList[currentIndex]._value = null;
    steps.push({
        index: currentIndex,
        value,
        list: prevList,
    });

    list.deleteByIndex(index);

    currentList = list.toArray();

    steps.push({
        index: currentIndex,
        list: currentList,
    });

    steps.push({
        list: currentList,
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

    if ((currentStep.value && ((operationType === "addHead" || operationType === "addByIndex") &&
            index < currentStep.index) || (operationType === "addTail" && index > currentStep.index)) ||
        (operationType === "deleteByIndex" && index <= currentStep.index)
    ) {
        return ElementStates.Changing;
    }

    if (!currentStep.value && currentStep.index === index) {
        return ElementStates.Modified;
    }

    return ElementStates.Default;
}

export function getLetterElementHead(step: Step<string>, index: number, operation: OperationTypes | null): string | React.ReactElement {
    if (operation &&
        step.value &&
        step.index === index &&
        ADD_OPERATION_TYPE.includes(operation)) {
        return (
            <Circle
                letter={step.value}
                state={ElementStates.Changing}
                isSmall
            />
        )
    }

    if (!index) {
        return HEAD;
    }

    return "";
}

export function getLetterElementTail(step: Step<string>,
                                     index: number,
                                     operation: OperationTypes | null,
                                     length: number): string | React.ReactElement {
    if (operation &&
        step.value &&
        step.index === index &&
        DELETE_OPERATION_TYPE.includes(operation)) {
        return (
            <Circle
                letter={step.value}
                state={ElementStates.Changing}
                isSmall
            />
        )
    }

    if (index === length - 1) {
        return TAIL;
    }

    return "";
}
