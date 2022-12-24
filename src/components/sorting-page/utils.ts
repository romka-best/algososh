import { ElementStates } from '../../types/element-states';

import { byTypeSort, IValue } from './sorting-page.types';

export function randomArr(): Array<IValue> {
    const MAX_LEN = 17;
    const MIN_LEN = 3;
    const MIN_NUMBER = 0;
    const MAX_NUMBER = 100;
    const lenNumbers = Math.floor(Math.random() * (MAX_LEN - MIN_LEN + 1) + MIN_LEN);

    const numbers: Array<IValue> = [];
    for (let i = 0; i < lenNumbers; i++) {
        const number = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER);
        numbers.push({
            number,
            type: ElementStates.Default,
        });
    }

    return numbers;
}

export function* choiceSortAlgorithm(array: Array<IValue>, type: byTypeSort): Generator<Array<IValue>> {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        let minOrMax = i;
        for (let j = i; j < length; j++) {
            if ((type === 'По возрастанию' && array[j].number < array[minOrMax].number) ||
                (type === 'По убыванию' && array[j].number > array[minOrMax].number)) {
                minOrMax = j;
            }
        }
        if (minOrMax !== i) {
            array[i] = {
                ...array[i],
                type: ElementStates.Changing,
            };
            array[minOrMax] = {
                ...array[minOrMax],
                type: ElementStates.Changing,
            };
            yield array;

            const temp = array[i];
            array[i] = {
                number: array[minOrMax].number,
                type: ElementStates.Modified,
            };
            array[minOrMax] = {
                number: temp.number,
                type: ElementStates.Default,
            };
            yield array;
        } else {
            array[i] = {
                ...array[i],
                type: ElementStates.Changing,
            };
            yield array;

            array[i] = {
                ...array[i],
                type: ElementStates.Modified,
            };
            array[minOrMax] = {
                ...array[minOrMax],
                type: ElementStates.Modified,
            };
            yield array;
        }
    }
    return array;
}

export function* bubbleSortAlgorithm(array: Array<IValue>, type: byTypeSort): Generator<Array<IValue>> {
    for (let j = array.length - 1; j >= 0; j--) {
        for (let i = 0; i < j; i++) {
            if ((type === 'По возрастанию' && array[i].number > array[i + 1].number) ||
                (type === 'По убыванию' && array[i].number < array[i + 1].number)) {
                const temp = array[i];
                array[i] = {
                    number: array[i + 1].number,
                    type: ElementStates.Changing,
                };
                array[i + 1] = {
                    number: temp.number,
                    type: ElementStates.Changing,
                };
                yield array;
            }
            array[i] = {
                ...array[i],
                type: ElementStates.Default,
            };
            array[i + 1] = {
                ...array[i + 1],
                type: ElementStates.Default,
            };
        }
        array[j] = {
            ...array[j],
            type: ElementStates.Modified,
        };
        yield array;
    }
    return array;
}
