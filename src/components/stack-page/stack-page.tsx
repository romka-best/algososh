import React from "react";

import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

import {SHORT_DELAY_IN_MS} from "../../constants/delays";

import {ElementStates} from "../../types/element-states";
import {IValue} from "./stack-page.types";

import styles from './stack-page.module.css';
import {Circle} from "../ui/circle/circle";

export const StackPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [choiceAction, setChoiceAction] = React.useState<"Добавить" | "Удалить" | "Нет">("Нет");
    const [currentInputValue, setCurrentInputValue] = React.useState<string>("");
    const [stack, setStack] = React.useState<Array<IValue>>([]);

    const handleSubmitButton = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        setIsLoading(true);
    }, []);
    const handleResetButton = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        setStack(clearStack());
    }, [clearStack]);

    React.useEffect(() => {
        if (isLoading) {
            const generatorAlgorithm = choiceAction === "Добавить" ?
                pushToStack(stack, {value: currentInputValue, type: ElementStates.Default}) :
                popFromStack(stack);
            setCurrentInputValue("");
            const interval = window.setInterval(() => {
                const generatorValue = generatorAlgorithm.next();

                setStack(() => {
                    const newState: Array<IValue> = [];
                    for (let i = 0; i < generatorValue.value.length; i++) {
                        newState.push(generatorValue.value[i])
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
        <SolutionLayout title="Стек">
            <div className={styles.root}>
                <form className={styles.form} onSubmit={handleSubmitButton} onReset={handleResetButton}>
                    <Input
                        extraClass={styles.input}
                        isLimitText={true}
                        maxLength={4}
                        disabled={isLoading}
                        value={currentInputValue}
                        onChange={(event: React.SyntheticEvent) => {
                            // @ts-ignore
                            setCurrentInputValue(String(event.target.value));
                        }}
                    />
                    <Button
                        text="Добавить"
                        disabled={isLoading || stack.length > 20 || !currentInputValue.length}
                        isLoader={isLoading && choiceAction === "Добавить"}
                        onClick={() => {
                            setChoiceAction("Добавить");
                        }}
                        type="submit"
                    />
                    <Button
                        text="Удалить"
                        disabled={isLoading || !stack.length}
                        isLoader={isLoading && choiceAction === "Удалить"}
                        onClick={() => {
                            setChoiceAction("Удалить");
                        }}
                        type="submit"
                    />
                    <Button
                        extraClass={styles.resetButton}
                        text="Очистить"
                        disabled={isLoading || !stack.length}
                        type="reset"
                    />
                </form>
                {stack.length || isLoading ? (
                    <div className={styles.circles}>
                        {
                            stack.map((value, index) => (
                                    <Circle
                                        key={index}
                                        head={index === stack.length - 1 ? "top" : undefined}
                                        tail={String(index)}
                                        letter={value.value}
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

function* pushToStack(stack: Array<IValue>, item: IValue): Generator<Array<IValue>> {
    stack.push({
        ...item,
        type: ElementStates.Changing,
    });
    yield stack;

    stack[stack.length - 1] = {
        ...item,
        type: ElementStates.Default
    }
    return stack;
}

function* popFromStack(stack: Array<IValue>): Generator<Array<IValue>> {
    stack[stack.length - 1] = {
        ...stack[stack.length - 1],
        type: ElementStates.Changing,
    }
    yield stack;

    stack.pop();
    return stack;
}

function clearStack(): Array<IValue> {
    return [];
}
