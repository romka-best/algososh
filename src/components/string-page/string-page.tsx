import React from "react";

import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";

import {DELAY_IN_MS} from "../../constants/delays";

import {ElementStates} from "../../types/element-states";
import {IValue} from "./string-page.types";

import styles from './string-page.module.css';

export const StringPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isFinished, setIsFinished] = React.useState<boolean>(false);

    const [inputValue, setInputValue] = React.useState<Array<IValue>>([]);

    const handleButtonClick = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        const defaultValues: Array<IValue> = [];
        for (let i = 0; i < inputValue.length; i++) {
            if (isFinished) {
                defaultValues.push({
                    letter: inputValue[inputValue.length - i - 1].letter, type: ElementStates.Default
                });
            } else {
                defaultValues.push({
                    letter: inputValue[i].letter, type: ElementStates.Default
                });
            }
        }
        setInputValue(defaultValues);
        setIsLoading(true);
    }, [inputValue, isLoading, isFinished]);

    React.useEffect(() => {
        if (isLoading) {
            const generatorAlgorithm = reverseAlgorithm(inputValue);
            const interval = setInterval(() => {
                const generatorValue = generatorAlgorithm.next();

                setInputValue(() => {
                    const newState: Array<IValue> = [];
                    for (let i = 0; i < generatorValue.value.length; i++) {
                        newState.push(generatorValue.value[i])
                    }
                    return newState;
                });

                if (generatorValue.done) {
                    clearInterval(interval);
                    setIsLoading(false);
                    setIsFinished(true);
                }
            }, DELAY_IN_MS);
        }
    }, [isLoading]);

    return (
        <SolutionLayout title="Строка">
            <div className={styles.root}>
                <form className={styles.form} onSubmit={handleButtonClick}>
                    <Input
                        extraClass={styles.input}
                        isLimitText={true}
                        maxLength={11}
                        disabled={isLoading}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            const newInputValue = [];
                            for (let i = 0; i < event.currentTarget.value.length; i++) {
                                if (event.currentTarget.value[i]) {
                                    newInputValue.push({
                                        letter: event.currentTarget.value[i],
                                        type: ElementStates.Default
                                    });
                                }
                            }
                            setIsFinished(false);
                            setInputValue(newInputValue);
                        }}
                    />
                    <Button
                        extraClass={styles.button}
                        text="Развернуть"
                        disabled={isLoading || !inputValue.length}
                        isLoader={isLoading}
                        type="submit"
                    />
                </form>
                {inputValue.length && (isFinished || isLoading) ? (
                    <div className={styles.circles}>
                        {
                            inputValue.map((value, index) => (
                                    <Circle
                                        key={index}
                                        letter={value.letter}
                                        state={value.type}
                                    />
                                )
                            )
                        }
                    </div>
                ) : null}
            </div>
        </SolutionLayout>
    );
};

function* reverseAlgorithm(oldValue: Array<IValue>): Generator<Array<IValue>> {
    const newValue: Array<{ letter: string, type: ElementStates }> = [...oldValue];
    const fullLength = oldValue.length;
    const halfLength = fullLength / 2;
    for (let i = 0; i < halfLength; i++) {
        newValue[i] = {
            ...newValue[i],
            type: ElementStates.Changing,
        }
        newValue[fullLength - i - 1] = {
            ...newValue[fullLength - i - 1],
            type: ElementStates.Changing,
        }
        yield newValue;

        const temp = newValue[i];
        newValue[i] = {
            letter: newValue[fullLength - i - 1].letter,
            type: ElementStates.Modified,
        };
        newValue[fullLength - i - 1] = {
            letter: temp.letter,
            type: ElementStates.Modified,
        }
        yield newValue;
    }

    return newValue;
}
