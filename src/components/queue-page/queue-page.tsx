import React from 'react';

import { SHORT_DELAY_IN_MS } from '../../constants/delays';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';

import Queue from './Queue';
import { clear, dequeue, enqueue, getLetterState } from './utils';
import { OperationTypes, Step } from './queue-page.types';
import styles from './queue-page.module.css';

const MAX_LENGTH_VALUE: number = 4;
const DEFAULT_SIZE_OF_QUEUE: number = 7;

export const QueuePage: React.FC = () => {
    const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
    const [ currentInputValue, setCurrentInputValue ] = React.useState<string>('');

    const queue = React.useRef<Queue<string>>(new Queue(DEFAULT_SIZE_OF_QUEUE));
    const intervalId = React.useRef<NodeJS.Timeout>();
    const [ steps, setSteps ] = React.useState<Step<string>[]>([ { queue: queue.current } ]);
    const [ currentStep, setCurrentStep ] = React.useState<number>(0);
    const [ currentOperation, setCurrentOperation ] = React.useState<OperationTypes | null>(null);

    React.useEffect(() => {
        if (!currentOperation) return;

        setIsLoading(true);

        let steps: Step<string>[] = [];

        switch (currentOperation) {
            case OperationTypes.Enqueue:
                steps = enqueue(currentInputValue, queue.current);
                break;
            case OperationTypes.Dequeue:
                steps = dequeue(queue.current);
                break;
            case OperationTypes.Clear:
                steps = clear(queue.current);
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
                        setSteps([ steps[steps.length - 1] ]);
                        setCurrentInputValue('');

                        return 0;
                    }
                    return currentStep + 1;
                });
            }, SHORT_DELAY_IN_MS);
        }
    }, [ currentOperation, currentInputValue ]);

    return (
        <SolutionLayout title="Очередь">
            <div className={ styles.root }>
                <form className={ styles.form } onSubmit={ (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                } } onReset={ (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                } }>
                    <Input
                        extraClass={ styles.input }
                        placeholder="Введите значение"
                        isLimitText={ true }
                        maxLength={ MAX_LENGTH_VALUE }
                        disabled={ isLoading }
                        value={ currentInputValue }
                        onChange={ (event: React.FormEvent<HTMLInputElement>) => {
                            if (event.currentTarget.value.length > MAX_LENGTH_VALUE) {
                                return;
                            }

                            setCurrentInputValue(event.currentTarget.value);
                        } }
                    />
                    <Button
                        text="Добавить"
                        disabled={ isLoading || queue.current.isFull() || !currentInputValue.length }
                        isLoader={ isLoading && currentOperation === OperationTypes.Enqueue }
                        onClick={ () => {
                            setCurrentOperation(OperationTypes.Enqueue);
                        } }
                        type="submit"
                    />
                    <Button
                        text="Удалить"
                        disabled={ isLoading || queue.current.isEmpty() }
                        isLoader={ isLoading && currentOperation === OperationTypes.Dequeue }
                        onClick={ () => {
                            setCurrentOperation(OperationTypes.Dequeue);
                        } }
                        type="submit"
                    />
                    <Button
                        extraClass={ styles.resetButton }
                        text="Очистить"
                        disabled={ isLoading || queue.current.isEmpty() }
                        isLoader={ isLoading && currentOperation === OperationTypes.Clear }
                        onClick={ () => {
                            setCurrentOperation(OperationTypes.Clear);
                        } }
                        type="reset"
                    />
                </form>
                <div className={ styles.circles }>
                    {
                        steps[currentStep].queue.queue.map((value, index) => (
                                <Circle
                                    key={ index }
                                    head={ index === steps[currentStep].queue.head && value !== null ? 'head' : undefined }
                                    tail={ (index === steps[currentStep].queue.tail - 1 ||
                                        (steps[currentStep].queue.tail === 0 && index === steps[currentStep].queue._maxN - 1))
                                    && value !== null ? 'tail' : undefined }
                                    letter={ value !== null ? String(value) : '' }
                                    state={ getLetterState(index, steps[currentStep], currentOperation) }
                                />
                            )
                        )
                    }
                </div>
            </div>
        </SolutionLayout>
    );
};
