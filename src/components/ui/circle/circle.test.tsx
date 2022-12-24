import React from 'react';
import renderer from 'react-test-renderer';

import { ElementStates } from '../../../types/element-states';

import { Circle } from './circle';

describe('Circle', () => {
    describe('Отображение', () => {
        it('Без буквы', () => {
            const circle = renderer
                .create(
                    <Circle/>
                )
                .toJSON();

            expect(circle).toMatchSnapshot();
        });

        it('С буквой', () => {
            const circle = renderer
                .create(
                    <Circle
                        letter="F"
                    />
                )
                .toJSON();

            expect(circle).toMatchSnapshot();
        });

        describe('С head', () => {
            it('Строка', () => {
                const circle = renderer
                    .create(
                        <Circle
                            head="top"
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });

            it('React-элемент', () => {
                const circle = renderer
                    .create(
                        <Circle
                            head={
                                (
                                    <div>
                                        Здесь будет голова!
                                    </div>
                                )
                            }
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });
        });

        describe('С tail', () => {
            it('Строка', () => {
                const circle = renderer
                    .create(
                        <Circle
                            tail="bottom"
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });

            it('React-элемент', () => {
                const circle = renderer
                    .create(
                        <Circle
                            tail={
                                (
                                    <div>
                                        Здесь будет хвост!
                                    </div>
                                )
                            }
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });
        });

        it('С index', () => {
            const circle = renderer
                .create(
                    <Circle
                        index={ 0 }
                    />
                )
                .toJSON();

            expect(circle).toMatchSnapshot();
        });

        describe('Разные размеры', () => {
            it('Дефолтный', () => {
                const circle = renderer
                    .create(
                        <Circle
                            isSmall={ false }
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });

            it('Маленький', () => {
                const circle = renderer
                    .create(
                        <Circle
                            isSmall={ true }
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });
        });

        describe('Разные состояния', () => {
            it('Default', () => {
                const circle = renderer
                    .create(
                        <Circle
                            state={ ElementStates.Default }
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });

            it('Changing', () => {
                const circle = renderer
                    .create(
                        <Circle
                            state={ ElementStates.Changing }
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });

            it('Modified', () => {
                const circle = renderer
                    .create(
                        <Circle
                            state={ ElementStates.Modified }
                        />
                    )
                    .toJSON();

                expect(circle).toMatchSnapshot();
            });
        });
    });
});
