import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { getValueFromGenerator } from '../../utils/getValueFromGenerator';
import { ElementStates } from '../../types/element-states';

import { SortingPage } from './sorting-page';
import { bubbleSortAlgorithm, choiceSortAlgorithm } from './utils';

describe('SortingPage', () => {
    describe('Отображение', () => {
        it('Начальное состяние', () => {
            const page = renderer
                .create(
                    <BrowserRouter>
                        <SortingPage/>
                    </BrowserRouter>
                )
                .toJSON();

            expect(page).toMatchSnapshot();
        });
    });

    describe('Логика', () => {
        describe('Работа с алгоритмом', () => {
            describe('Сортировка выбором', () => {
                it('Пустой массив: По возрастанию', () => {
                    const generator = choiceSortAlgorithm([], 'По возрастанию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([]);
                });

                it('Пустой массив: По убыванию', () => {
                    const generator = choiceSortAlgorithm([], 'По убыванию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([]);
                });

                it('Массив из одного элемента: По возрастанию', () => {
                    const generator = choiceSortAlgorithm([
                        { number: 10, type: ElementStates.Default },
                    ], 'По возрастанию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 10, type: ElementStates.Modified },
                    ]);
                });

                it('Массив из одного элемента: По убыванию', () => {
                    const generator = choiceSortAlgorithm([
                        { number: 10, type: ElementStates.Default },
                    ], 'По убыванию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 10, type: ElementStates.Modified },
                    ]);
                });

                it('Массив из нескольких элементов: По возрастанию', () => {
                    const generator = choiceSortAlgorithm([
                        { number: 15, type: ElementStates.Default },
                        { number: 5, type: ElementStates.Default },
                        { number: 10, type: ElementStates.Default },
                        { number: 13, type: ElementStates.Default },
                        { number: 7, type: ElementStates.Default },
                    ], 'По возрастанию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 5, type: ElementStates.Modified },
                        { number: 7, type: ElementStates.Modified },
                        { number: 10, type: ElementStates.Modified },
                        { number: 13, type: ElementStates.Modified },
                        { number: 15, type: ElementStates.Modified },
                    ]);
                });

                it('Массив из нескольких элементов: По убыванию', () => {
                    const generator = choiceSortAlgorithm([
                        { number: 15, type: ElementStates.Default },
                        { number: 5, type: ElementStates.Default },
                        { number: 10, type: ElementStates.Default },
                        { number: 13, type: ElementStates.Default },
                        { number: 7, type: ElementStates.Default },
                    ], 'По убыванию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 15, type: ElementStates.Modified },
                        { number: 13, type: ElementStates.Modified },
                        { number: 10, type: ElementStates.Modified },
                        { number: 7, type: ElementStates.Modified },
                        { number: 5, type: ElementStates.Modified },
                    ]);
                });
            });

            describe('Сортировка пузыриком', () => {
                it('Пустой массив: По возрастанию', () => {
                    const generator = bubbleSortAlgorithm([], 'По возрастанию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([]);
                });

                it('Пустой массив: По убыванию', () => {
                    const generator = bubbleSortAlgorithm([], 'По убыванию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([]);
                });

                it('Массив из одного элемента: По возрастанию', () => {
                    const generator = bubbleSortAlgorithm([
                        { number: 10, type: ElementStates.Default },
                    ], 'По возрастанию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 10, type: ElementStates.Modified },
                    ]);
                });

                it('Массив из одного элемента: По убыванию', () => {
                    const generator = bubbleSortAlgorithm([
                        { number: 10, type: ElementStates.Default },
                    ], 'По убыванию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 10, type: ElementStates.Modified },
                    ]);
                });

                it('Массив из нескольких элементов: По возрастанию', () => {
                    const generator = bubbleSortAlgorithm([
                        { number: 15, type: ElementStates.Default },
                        { number: 5, type: ElementStates.Default },
                        { number: 10, type: ElementStates.Default },
                        { number: 13, type: ElementStates.Default },
                        { number: 7, type: ElementStates.Default },
                    ], 'По возрастанию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 5, type: ElementStates.Modified },
                        { number: 7, type: ElementStates.Modified },
                        { number: 10, type: ElementStates.Modified },
                        { number: 13, type: ElementStates.Modified },
                        { number: 15, type: ElementStates.Modified },
                    ]);
                });

                it('Массив из нескольких элементов: По убыванию', () => {
                    const generator = bubbleSortAlgorithm([
                        { number: 15, type: ElementStates.Default },
                        { number: 5, type: ElementStates.Default },
                        { number: 10, type: ElementStates.Default },
                        { number: 13, type: ElementStates.Default },
                        { number: 7, type: ElementStates.Default },
                    ], 'По убыванию');

                    const value = getValueFromGenerator(generator);
                    expect(value).toStrictEqual([
                        { number: 15, type: ElementStates.Modified },
                        { number: 13, type: ElementStates.Modified },
                        { number: 10, type: ElementStates.Modified },
                        { number: 7, type: ElementStates.Modified },
                        { number: 5, type: ElementStates.Modified },
                    ]);
                });
            });
        });
    });
});
