import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { ElementStates } from '../../types/element-states';
import { getValueFromGenerator } from '../../utils/getValueFromGenerator';

import { StringPage } from './string-page';
import { reverseAlgorithm } from './utils';

describe('StringPage', () => {
    describe('Отображение', () => {
        it('Начальное состяние', () => {
            const button = renderer
                .create(
                    <BrowserRouter>
                        <StringPage/>
                    </BrowserRouter>
                )
                .toJSON();

            expect(button).toMatchSnapshot();
        });
    });

    describe('Логика', () => {
        describe('Работа с алгоритмом', () => {
            it('Возвращение значения: С чётным количеством символов', () => {
                const generator = reverseAlgorithm([
                    { letter: 'H', type: ElementStates.Default },
                    { letter: 'E', type: ElementStates.Default },
                    { letter: 'L', type: ElementStates.Default },
                    { letter: 'L', type: ElementStates.Default },
                    { letter: 'O', type: ElementStates.Default },
                    { letter: '!', type: ElementStates.Default },
                ]);

                const value = getValueFromGenerator(generator);
                expect(value).toStrictEqual([
                    { letter: '!', type: ElementStates.Modified },
                    { letter: 'O', type: ElementStates.Modified },
                    { letter: 'L', type: ElementStates.Modified },
                    { letter: 'L', type: ElementStates.Modified },
                    { letter: 'E', type: ElementStates.Modified },
                    { letter: 'H', type: ElementStates.Modified },
                ]);
            });

            it('Возвращение значения: С нечётным количеством символов', () => {
                const generator = reverseAlgorithm([
                    { letter: 'H', type: ElementStates.Default },
                    { letter: 'E', type: ElementStates.Default },
                    { letter: 'L', type: ElementStates.Default },
                    { letter: 'L', type: ElementStates.Default },
                    { letter: 'O', type: ElementStates.Default },
                ]);

                const value = getValueFromGenerator(generator);
                expect(value).toStrictEqual([
                    { letter: 'O', type: ElementStates.Modified },
                    { letter: 'L', type: ElementStates.Modified },
                    { letter: 'L', type: ElementStates.Modified },
                    { letter: 'E', type: ElementStates.Modified },
                    { letter: 'H', type: ElementStates.Modified },
                ]);
            });

            it('Возвращение значения: С одним символом', () => {
                const generator = reverseAlgorithm([
                    { letter: 'F', type: ElementStates.Default },
                ]);

                const value = getValueFromGenerator(generator);
                expect(value).toStrictEqual([
                    { letter: 'F', type: ElementStates.Modified },
                ]);
            });

            it('Возвращение значения: Пустота', () => {
                const generator = reverseAlgorithm([]);

                const value = getValueFromGenerator(generator);
                expect(value).toStrictEqual([]);
            });
        });
    });
});
