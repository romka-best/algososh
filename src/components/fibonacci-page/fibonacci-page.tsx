import React from "react";

import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

import {SHORT_DELAY_IN_MS} from "../../constants/delays";

import {ElementStates} from "../../types/element-states";

import styles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isFinished, setIsFinished] = React.useState<boolean>(false);

    const [number, setNumber] = React.useState<number>(0);
    const [numbers, setNumbers] = React.useState<Array<number>>([]);

    const handleButtonClick = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        setNumbers([]);
        setIsLoading(true);
    }, [isLoading]);

    React.useEffect(() => {
        if (isLoading) {
            const generatorAlgorithm = fibonacciAlgorithm(number);
            const interval = window.setInterval(() => {
                const generatorValue = generatorAlgorithm.next();

                setNumbers(() => {
                    const newState: Array<number> = [];
                    for (let i = 0; i < generatorValue.value.length; i++) {
                        newState.push(generatorValue.value[i])
                    }
                    return newState;
                });

                if (generatorValue.done) {
                    window.clearInterval(interval);
                    setIsLoading(false);
                    setIsFinished(true);
                }
            }, SHORT_DELAY_IN_MS);
        }
    }, [isLoading]);

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles.root}>
                <form className={styles.form} onSubmit={handleButtonClick}>
                    <Input
                        extraClass={styles.input}
                        placeholder="Введите число"
                        type="number"
                        isLimitText={true}
                        min={1}
                        max={19}
                        maxLength={2}
                        disabled={isLoading}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            setNumber(Number(event.currentTarget.value));
                            setIsFinished(false);
                        }}
                    />
                    <Button
                        extraClass={styles.button}
                        text="Рассчитать"
                        disabled={isLoading || !(number && (number >= 1 && number <= 19))}
                        isLoader={isLoading}
                        type="submit"
                    />
                </form>
                {
                    number && (isLoading || isFinished) ? (
                        <div className={styles.circles}>
                            {
                                numbers.map((value, index) => (
                                        <Circle
                                            key={index}
                                            letter={String(value)}
                                            tail={String(index)}
                                            state={ElementStates.Default}
                                        />
                                    )
                                )
                            }
                        </div>
                    ) : null
                }
            </div>
        </SolutionLayout>
    );
};

function* fibonacciAlgorithm(number: number): Generator<Array<number>> {
    const numbers: Array<number> = [];
    for (let i = 0; i <= number; i++) {
        if (i < 2) {
            numbers.push(1);
        } else {
            numbers.push(numbers[i - 2] + numbers[i - 1])
        }
        yield numbers;
    }

    return numbers;
}
