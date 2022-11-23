import React from "react";

import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

import Stack from "./Stack";

import {clear, getLetterState, pop, push} from "./utils";

import {SHORT_DELAY_IN_MS} from "../../constants/delays";

import {OperationTypes, Step} from "./stack-page.types";

import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [currentInputValue, setCurrentInputValue] = React.useState<string>("");

    const list = React.useRef<Stack<string>>(new Stack());
    const intervalId = React.useRef<NodeJS.Timeout>();
    const [steps, setSteps] = React.useState<Step<string>[]>([{list: list.current}]);
    const [currentStep, setCurrentStep] = React.useState<number>(0);
    const [currentOperation, setCurrentOperation] = React.useState<OperationTypes | null>(null);

    React.useEffect(() => {
        if (!currentOperation) return;

        setIsLoading(true);

        let steps: Step<string>[] = [];

        switch (currentOperation) {
            case OperationTypes.Push:
                steps = push(currentInputValue, list.current);
                break
            case OperationTypes.Pop:
                steps = pop(list.current);
                break
            case OperationTypes.Clear:
                steps = clear(list.current);
                break
        }

        if (steps.length > 1) {
            setSteps(steps);
            setCurrentStep(0);

            intervalId.current = setInterval(() => {
                setCurrentStep((currentStep) => {
                    if (currentStep === steps.length - 1 && intervalId.current) {
                        clearInterval(intervalId.current);
                        setCurrentOperation(null);
                        setIsLoading(false);
                        setSteps([steps[steps.length - 1]]);
                        setCurrentInputValue("");

                        return 0;
                    }
                    return currentStep + 1;
                })
            }, SHORT_DELAY_IN_MS);
        }
    }, [currentOperation, currentInputValue]);

    return (
        <SolutionLayout title="Стек">
            <div className={styles.root}>
                <form className={styles.form} onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                }} onReset={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                }}>
                    <Input
                        extraClass={styles.input}
                        placeholder="Введите значение"
                        isLimitText={true}
                        maxLength={4}
                        disabled={isLoading}
                        value={currentInputValue}
                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                            setCurrentInputValue(String(event.currentTarget.value));
                        }}
                    />
                    <Button
                        text="Добавить"
                        disabled={isLoading || list.current.size() > 20 || !currentInputValue.length}
                        isLoader={isLoading && currentOperation === OperationTypes.Push}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.Push);
                        }}
                        type="submit"
                    />
                    <Button
                        text="Удалить"
                        disabled={isLoading || !list.current.size()}
                        isLoader={isLoading && currentOperation === OperationTypes.Pop}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.Pop);
                        }}
                        type="submit"
                    />
                    <Button
                        extraClass={styles.resetButton}
                        text="Очистить"
                        disabled={isLoading || !list.current.size()}
                        isLoader={isLoading && currentOperation === OperationTypes.Clear}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.Clear)
                        }}
                        type="reset"
                    />
                </form>
                {steps[currentStep].list.size() || isLoading ? (
                    <div className={styles.circles}>
                        {
                            steps[currentStep].list.storage.map((value, index) => (
                                    <Circle
                                        key={index}
                                        head={index === steps[currentStep].list.size() - 1 ? "top" : undefined}
                                        tail={String(index)}
                                        letter={value}
                                        state={getLetterState(index, steps[currentStep], currentOperation)}
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
