import React from 'react';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';

import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { Direction } from '../../types/direction';

import { byTypeSort, choiceTypeSort, IValue } from './sorting-page.types';
import { bubbleSortAlgorithm, choiceSortAlgorithm, randomArr } from './utils';
import styles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
    const [ currentChoiceTypeSort, setCurrentChoiceTypeSort ] = React.useState<choiceTypeSort>('Выбор');
    const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
    const [ byTypeSort, setByTypeSort ] = React.useState<byTypeSort>('Нет');

    const [ arrayOfNumbers, setArrayOfNumbers ] = React.useState<Array<IValue>>([]);

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
    }, [ arrayOfNumbers, isLoading ]);

    const handleResetButton = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        setArrayOfNumbers(randomArr());
    }, []);

    React.useEffect(() => {
        if (isLoading) {
            const generatorAlgorithm = currentChoiceTypeSort === 'Выбор' ?
                choiceSortAlgorithm(arrayOfNumbers, byTypeSort) :
                bubbleSortAlgorithm(arrayOfNumbers, byTypeSort);

            const interval = setInterval(() => {
                const generatorValue = generatorAlgorithm.next();

                setArrayOfNumbers(() => {
                    const newState: Array<IValue> = [];
                    for (let i = 0; i < generatorValue.value.length; i++) {
                        newState.push(generatorValue.value[i]);
                    }
                    return newState;
                });

                if (generatorValue.done) {
                    clearInterval(interval);
                    setIsLoading(false);
                }
            }, DELAY_IN_MS);
        }
    }, [ isLoading ]);

    React.useEffect(() => {
        setArrayOfNumbers(randomArr());
    }, []);

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={ styles.root }>
                <form className={ styles.form } onSubmit={ handleSubmitButton } onReset={ handleResetButton }>
                    <div className={ styles.radioButtons }>
                        <RadioInput
                            id="ChoiceRadioInput"
                            label="Выбор"
                            checked={ currentChoiceTypeSort === 'Выбор' }
                            disabled={ isLoading }
                            onChange={ () => {
                                setCurrentChoiceTypeSort('Выбор');
                            } }
                        />
                        <RadioInput
                            id="BubbleRadioInput"
                            label="Пузырёк"
                            checked={ currentChoiceTypeSort === 'Пузырёк' }
                            disabled={ isLoading }
                            onChange={ () => {
                                setCurrentChoiceTypeSort('Пузырёк');
                            } }
                        />
                    </div>
                    <div className={ styles.choiceButtons }>
                        <Button
                            text="По возрастанию"
                            sorting={ Direction.Ascending }
                            disabled={ isLoading }
                            isLoader={ isLoading && byTypeSort === 'По возрастанию' }
                            onClick={ () => {
                                setByTypeSort('По возрастанию');
                            } }
                            type="submit"
                        />
                        <Button
                            text="По убыванию"
                            sorting={ Direction.Descending }
                            disabled={ isLoading }
                            isLoader={ isLoading && byTypeSort === 'По убыванию' }
                            onClick={ () => {
                                setByTypeSort('По убыванию');
                            } }
                            type="submit"
                        />
                    </div>
                    <Button
                        extraClass={ styles.generateButton }
                        text="Новый массив"
                        disabled={ isLoading }
                        type="reset"
                    />
                </form>
                <div className={ styles.columns }>
                    {
                        arrayOfNumbers.map((value, index) => (
                                <Column
                                    key={ index }
                                    value={ value.number }
                                    state={ value.type }
                                />
                            )
                        )
                    }
                </div>
            </div>
        </SolutionLayout>
    );
};
