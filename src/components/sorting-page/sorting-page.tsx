import React from "react";

import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Column} from "../ui/column/column";

import {DELAY_IN_MS} from "../../constants/delays";

import {ElementStates} from "../../types/element-states";
import {Direction} from "../../types/direction";
import {byTypeSort, choiceTypeSort, IValue} from "./sorting-page.types";

import styles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
    const [currentChoiceTypeSort, setCurrentChoiceTypeSort] = React.useState<choiceTypeSort>("Выбор");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [byTypeSort, setByTypeSort] = React.useState<byTypeSort>("Нет");

    const [arrayOfNumbers, setArrayOfNumbers] = React.useState<Array<IValue>>([]);

    const handleSubmitButton = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        const defaultValues: Array<IValue> = [];
        for (let i = 0; i < arrayOfNumbers.length; i++) {
            defaultValues.push({
                number: arrayOfNumbers[i].number, type: ElementStates.Default
            });
        }
        setArrayOfNumbers(defaultValues);
        setIsLoading(true);
    }, [arrayOfNumbers, isLoading]);

    const handleResetButton = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        setArrayOfNumbers(randomArr());
    }, [randomArr]);

    React.useEffect(() => {
        if (isLoading) {
            const generatorAlgorithm = currentChoiceTypeSort === "Выбор" ?
                choiceSortAlgorithm(arrayOfNumbers, byTypeSort) :
                bubbleSortAlgorithm(arrayOfNumbers, byTypeSort);

            const interval = setInterval(() => {
                const generatorValue = generatorAlgorithm.next();

                setArrayOfNumbers(() => {
                    const newState: Array<IValue> = [];
                    for (let i = 0; i < generatorValue.value.length; i++) {
                        newState.push(generatorValue.value[i])
                    }
                    return newState;
                });

                if (generatorValue.done) {
                    clearInterval(interval);
                    setIsLoading(false);
                }
            }, DELAY_IN_MS);
        }
    }, [isLoading]);

    React.useEffect(() => {
        setArrayOfNumbers(randomArr());
    }, []);

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.root}>
                <form className={styles.form} onSubmit={handleSubmitButton} onReset={handleResetButton}>
                    <div className={styles.radioButtons}>
                        <RadioInput
                            label="Выбор"
                            checked={currentChoiceTypeSort === "Выбор"}
                            disabled={isLoading}
                            onChange={() => {
                                setCurrentChoiceTypeSort("Выбор");
                            }}
                        />
                        <RadioInput
                            label="Пузырёк"
                            checked={currentChoiceTypeSort === "Пузырёк"}
                            disabled={isLoading}
                            onChange={() => {
                                setCurrentChoiceTypeSort("Пузырёк");
                            }}
                        />
                    </div>
                    <div className={styles.choiceButtons}>
                        <Button
                            text="По возрастанию"
                            sorting={Direction.Ascending}
                            disabled={isLoading}
                            isLoader={isLoading && byTypeSort === "По возрастанию"}
                            onClick={() => {
                                setByTypeSort("По возрастанию");
                            }}
                            type="submit"
                        />
                        <Button
                            text="По убыванию"
                            sorting={Direction.Descending}
                            disabled={isLoading}
                            isLoader={isLoading && byTypeSort === "По убыванию"}
                            onClick={() => {
                                setByTypeSort("По убыванию");
                            }}
                            type="submit"
                        />
                    </div>
                    <Button
                        extraClass={styles.generateButton}
                        text="Новый массив"
                        disabled={isLoading}
                        type="reset"
                    />
                </form>
                <div className={styles.columns}>
                    {
                        arrayOfNumbers.map((value, index) => (
                                <Column
                                    key={index}
                                    value={value.number}
                                    state={value.type}
                                />
                            )
                        )
                    }
                </div>
            </div>
        </SolutionLayout>
    );
};

function randomArr(): Array<IValue> {
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

function* choiceSortAlgorithm(array: Array<IValue>, type: byTypeSort): Generator<Array<IValue>> {
    const length = array.length;

    for (let i = 0; i < length; i++) {
        let minOrMax = i;
        for (let j = i; j < length; j++) {
            if ((type === "По возрастанию" && array[j].number < array[minOrMax].number) ||
                (type === "По убыванию" && array[j].number > array[minOrMax].number)) {
                minOrMax = j;
            }
        }
        if (minOrMax !== i) {
            array[i] = {
                ...array[i],
                type: ElementStates.Changing,
            }
            array[minOrMax] = {
                ...array[minOrMax],
                type: ElementStates.Changing,
            }
            yield array;

            const temp = array[i];
            array[i] = {
                number: array[minOrMax].number,
                type: ElementStates.Modified,
            }
            array[minOrMax] = {
                number: temp.number,
                type: ElementStates.Default,
            }
            yield array;
        } else {
            array[i] = {
                ...array[i],
                type: ElementStates.Changing,
            }
            yield array;

            array[i] = {
                ...array[i],
                type: ElementStates.Modified,
            }
            array[minOrMax] = {
                ...array[minOrMax],
                type: ElementStates.Modified,
            }
            yield array;
        }
    }
    return array;
}

function* bubbleSortAlgorithm(array: Array<IValue>, type: byTypeSort): Generator<Array<IValue>> {
    for (let j = array.length - 1; j >= 0; j--) {
        for (let i = 0; i < j; i++) {
            if ((type === "По возрастанию" && array[i].number > array[i + 1].number) ||
                (type === "По убыванию" && array[i].number < array[i + 1].number)) {
                const temp = array[i];
                array[i] = {
                    number: array[i + 1].number,
                    type: ElementStates.Changing,
                }
                array[i + 1] = {
                    number: temp.number,
                    type: ElementStates.Changing,
                }
                yield array;
            }
            array[i] = {
                ...array[i],
                type: ElementStates.Default,
            }
            array[i + 1] = {
                ...array[i + 1],
                type: ElementStates.Default,
            }
        }
        array[j] = {
            ...array[j],
            type: ElementStates.Modified,
        }
        yield array;
    }
    return array;
}
