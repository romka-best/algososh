import { IValue } from './string-page.types';
import { ElementStates } from '../../types/element-states';

export function* reverseAlgorithm(oldValue: Array<IValue>): Generator<Array<IValue>> {
    const newValue: Array<{ letter: string, type: ElementStates }> = [ ...oldValue ];
    const fullLength = oldValue.length;
    const halfLength = fullLength / 2;
    for (let i = 0; i < halfLength; i++) {
        newValue[i] = {
            ...newValue[i],
            type: ElementStates.Changing,
        };
        newValue[fullLength - i - 1] = {
            ...newValue[fullLength - i - 1],
            type: ElementStates.Changing,
        };
        yield newValue;

        const temp = newValue[i];
        newValue[i] = {
            letter: newValue[fullLength - i - 1].letter,
            type: ElementStates.Modified,
        };
        newValue[fullLength - i - 1] = {
            letter: temp.letter,
            type: ElementStates.Modified,
        };
        yield newValue;
    }

    return newValue;
}
