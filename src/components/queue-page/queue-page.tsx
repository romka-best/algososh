import React from "react";

import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

import Queue from "./Queue";

import {SHORT_DELAY_IN_MS} from "../../constants/delays";

import {ElementStates} from "../../types/element-states";
import {IQueue} from "./queue-page.types";

import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [choiceAction, setChoiceAction] = React.useState<"Добавить" | "Удалить" | "Нет">("Нет");
    const [currentInputValue, setCurrentInputValue] = React.useState<string>("");

    const [queueObject] = React.useState(new Queue(7));
    const [queue, setQueue] = React.useState<IQueue>({
        queue: queueObject.queue,
        tail: queueObject.tail,
        head: queueObject.head,
    });

    const handleSubmitButton = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        setIsLoading(true);
    }, []);
    const handleResetButton = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        setQueue(queueObject.clearStack());
    }, []);

    React.useEffect(() => {
        if (isLoading) {
            const generatorAlgorithm = choiceAction === "Добавить" ?
                queueObject.enqueue({value: currentInputValue, type: ElementStates.Default}) :
                queueObject.dequeue();
            setCurrentInputValue("");

            const interval = window.setInterval(() => {
                const generatorValue = generatorAlgorithm.next();

                setQueue(() => {
                    const newState: IQueue = {
                        queue: [],
                        head: generatorValue.value.head,
                        tail: generatorValue.value.tail,
                    };
                    for (let i = 0; i < generatorValue.value.queue.length; i++) {
                        newState.queue.push(generatorValue.value.queue[i])
                    }
                    return newState;
                });

                if (generatorValue.done) {
                    window.clearInterval(interval);
                    setIsLoading(false);
                }
            }, SHORT_DELAY_IN_MS);
        }
    }, [isLoading]);

    return (
        <SolutionLayout title="Очередь">
            <div className={styles.root}>
                <form className={styles.form} onSubmit={handleSubmitButton} onReset={handleResetButton}>
                    <Input
                        extraClass={styles.input}
                        placeholder="Введите значение"
                        isLimitText={true}
                        maxLength={4}
                        disabled={isLoading}
                        value={currentInputValue}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            setCurrentInputValue(event.currentTarget.value);
                        }}
                    />
                    <Button
                        text="Добавить"
                        disabled={isLoading || queueObject.isFull() || !currentInputValue.length}
                        isLoader={isLoading && choiceAction === "Добавить"}
                        onClick={() => {
                            setChoiceAction("Добавить");
                        }}
                        type="submit"
                    />
                    <Button
                        text="Удалить"
                        disabled={isLoading || queueObject.isEmpty()}
                        isLoader={isLoading && choiceAction === "Удалить"}
                        onClick={() => {
                            setChoiceAction("Удалить");
                        }}
                        type="submit"
                    />
                    <Button
                        extraClass={styles.resetButton}
                        text="Очистить"
                        disabled={isLoading || queueObject.isEmpty()}
                        type="reset"
                    />
                </form>
                <div className={styles.circles}>
                    {
                        queue.queue.map((value, index) => (
                                <Circle
                                    key={index}
                                    head={index === queue.head && value?.value ? "head" : undefined}
                                    tail={(index === queue.tail - 1 || (queue.tail === 0 && index === queue.queue.length - 1)) && value?.value ? "tail" : undefined}
                                    letter={String(value?.value)}
                                    state={value?.type as ElementStates}
                                />
                            )
                        )
                    }
                </div>
            </div>
        </SolutionLayout>
    );
};
