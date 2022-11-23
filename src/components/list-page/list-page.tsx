import React from "react";

import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";

import {useForm} from "../../hooks/useForm";

import LinkedList from "./LinkedList";

import {
    addByIndex,
    addHead,
    addTail, deleteByIndex,
    deleteHead, deleteTail,
    getLetterElementHead,
    getLetterElementTail,
    getLetterState
} from "./utils";

import {DELAY_IN_MS} from "../../constants/delays";

import {OperationTypes, Step} from "./list-page.types";

import styles from "./list-page.module.css";

const DEFAULT_VALUE = ["0", "34", "8", "1"]

export const ListPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    // const [currentInputValue, setCurrentInputValue] = React.useState<string>("");
    // const [currentInputIndex, setCurrentInputIndex] = React.useState<string>("");

    const {values, handleChange, setValues} = useForm({
        value: '',
        index: '',
    });

    const list = React.useRef(new LinkedList(DEFAULT_VALUE));
    const intervalId = React.useRef<NodeJS.Timeout>();
    const [steps, setSteps] = React.useState<Step<string>[]>([{list: list.current.toArray()}]);
    const [currentStep, setCurrentStep] = React.useState<number>(0);
    const [currentOperation, setCurrentOperation] = React.useState<OperationTypes | null>(null);

    React.useEffect(() => {
        if (!currentOperation) return;

        setIsLoading(true);

        let steps: Step<string>[] = [];

        switch (currentOperation) {
            case OperationTypes.AddHead:
                steps = addHead<string>(values.value, list.current);
                break;
            case OperationTypes.AddTail:
                steps = addTail<string>(values.value, list.current);
                break;
            case OperationTypes.AddByIndex:
                steps = addByIndex<string>(values.value, Number(values.index), list.current);
                break;
            case OperationTypes.DeleteHead:
                steps = deleteHead<string>(list.current);
                break;
            case OperationTypes.DeleteTail:
                steps = deleteTail<string>(list.current);
                break;
            case OperationTypes.DeleteByIndex:
                steps = deleteByIndex<string>(Number(values.index), list.current);
                break;
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
                        setValues({
                            value: '',
                            index: '',
                        })

                        return 0;
                    }
                    return currentStep + 1;
                })
            }, DELAY_IN_MS);
        }
    }, [currentOperation, values]);

    return (
        <SolutionLayout title="Связный список">
            <div className={styles.root}>
                <form className={styles.form} onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                }}>
                    <Input
                        extraClass={styles.input}
                        placeholder="Введите значение"
                        name="value"
                        isLimitText={true}
                        maxLength={4}
                        disabled={isLoading}
                        value={values.value}
                        onChange={handleChange}
                    />
                    <Button
                        text="Добавить в head"
                        disabled={isLoading || !values.value.length}
                        isLoader={isLoading && currentOperation === OperationTypes.AddHead}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.AddHead);
                        }}
                        type="submit"
                    />
                    <Button
                        text="Добавить в tail"
                        disabled={isLoading || !values.value.length}
                        isLoader={isLoading && currentOperation === OperationTypes.AddTail}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.AddTail);
                        }}
                        type="submit"
                    />
                    <Button
                        text="Удалить из head"
                        disabled={isLoading || !steps[currentStep].list.length}
                        isLoader={isLoading && currentOperation === OperationTypes.DeleteHead}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.DeleteHead);
                        }}
                        type="submit"
                    />
                    <Button
                        text="Удалить из tail"
                        disabled={isLoading || !steps[currentStep].list.length}
                        isLoader={isLoading && currentOperation === OperationTypes.DeleteTail}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.DeleteTail);
                        }}
                        type="submit"
                    />
                    <Input
                        extraClass={styles.input}
                        placeholder="Введите индекс"
                        name="index"
                        type="number"
                        disabled={isLoading}
                        value={values.index}
                        onChange={handleChange}
                    />
                    <Button
                        extraClass={styles.button_big}
                        text="Добавить по индексу"
                        disabled={isLoading ||
                            !values.index.length ||
                            !values.value.length ||
                            Number.isNaN(Number(values.index)) ||
                            Number(values.index) < 0 ||
                            Number(values.index) >= steps[currentStep].list.length
                        }
                        isLoader={isLoading && currentOperation === OperationTypes.AddByIndex}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.AddByIndex);
                        }}
                        type="submit"
                    />
                    <Button
                        extraClass={styles.button_big}
                        text="Удалить по индексу"
                        disabled={isLoading ||
                            !values.index.length ||
                            !steps[currentStep].list.length ||
                            Number.isNaN(Number(values.index)) ||
                            Number(values.index) < 0 ||
                            Number(values.index) >= steps[currentStep].list.length
                        }
                        isLoader={isLoading && currentOperation === OperationTypes.DeleteByIndex}
                        onClick={() => {
                            setCurrentOperation(OperationTypes.DeleteByIndex);
                        }}
                        type="submit"
                    />
                </form>
                <div className={styles.circles}>
                    {
                        steps[currentStep].list?.map((node, index) => (
                            <React.Fragment key={index}>
                                <Circle
                                    index={index}
                                    letter={node._value ? node._value : ""}
                                    tail={getLetterElementTail(steps[currentStep], index, currentOperation, steps[currentStep].list.length)}
                                    head={getLetterElementHead(steps[currentStep], index, currentOperation)}
                                    state={getLetterState(index, steps[currentStep], currentOperation)}
                                />
                                {steps[currentStep].list.length - 1 !== index && <ArrowIcon/>}
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        </SolutionLayout>
    );
};
