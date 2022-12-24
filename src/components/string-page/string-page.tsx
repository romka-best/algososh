import React from 'react';

import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';

import { IValue } from './string-page.types';
import { reverseAlgorithm } from './utils';
import styles from './string-page.module.css';

const MAX_LENGTH_VALUE: number = 11;

export const StringPage: React.FC = () => {
    const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
    const [ isFinished, setIsFinished ] = React.useState<boolean>(false);

    const [ inputValue, setInputValue ] = React.useState<string | undefined>();
    const [ newString, setNewString ] = React.useState<Array<IValue>>([]);

    const handleButtonClick = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        const defaultValues: Array<IValue> = [];
        for (let i = 0; i < newString.length; i++) {
            if (isFinished) {
                defaultValues.push({
                    letter: newString[newString.length - i - 1].letter, type: ElementStates.Default
                });
            } else {
                defaultValues.push({
                    letter: newString[i].letter, type: ElementStates.Default
                });
            }
        }
        setNewString(defaultValues);
        setIsLoading(true);
    }, [ newString, isLoading, isFinished ]);

    React.useEffect(() => {
        if (isLoading) {
            const generatorAlgorithm = reverseAlgorithm(newString);
            const interval = setInterval(() => {
                const generatorValue = generatorAlgorithm.next();

                setNewString(() => {
                    const newState: Array<IValue> = [];
                    for (let i = 0; i < generatorValue.value.length; i++) {
                        newState.push(generatorValue.value[i]);
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
    }, [ isLoading ]);

    return (
        <SolutionLayout title="Строка">
            <div className={ styles.root }>
                <form className={ styles.form } onSubmit={ handleButtonClick }>
                    <Input
                        extraClass={ styles.input }
                        isLimitText={ true }
                        maxLength={ MAX_LENGTH_VALUE }
                        disabled={ isLoading }
                        value={ inputValue }
                        onChange={ (event: React.FormEvent<HTMLInputElement>) => {
                            if (event.currentTarget.value.length > MAX_LENGTH_VALUE) {
                                return;
                            }

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
                            setInputValue(event.currentTarget.value);
                            setNewString(newInputValue);
                        } }
                        data-testid="input"
                    />
                    <Button
                        extraClass={ styles.button }
                        text="Развернуть"
                        disabled={ isLoading || !newString.length }
                        isLoader={ isLoading }
                        type="submit"
                        data-testid="button"
                    />
                </form>
                { newString.length && (isFinished || isLoading) ? (
                    <div className={ styles.circles } data-testid="circles">
                        {
                            newString.map((value, index) => (
                                    <Circle
                                        key={ index }
                                        letter={ value.letter }
                                        state={ value.type }
                                    />
                                )
                            )
                        }
                    </div>
                ) : null }
            </div>
        </SolutionLayout>
    );
};
