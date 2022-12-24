import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Direction } from '../../../types/direction';

import { Button } from './button';

describe('Button', () => {
    describe('Отображение', () => {
        it('С текстом', () => {
            const button = renderer
                .create(
                    <Button
                        text="Жмяк!"
                    />
                )
                .toJSON();

            expect(button).toMatchSnapshot();
        });

        it('Без текста', () => {
            const button = renderer
                .create(
                    <Button/>
                )
                .toJSON();

            expect(button).toMatchSnapshot();
        });

        it('Заблокированная', () => {
            const button = renderer
                .create(
                    <Button
                        disabled={ true }
                    />
                )
                .toJSON();

            expect(button).toMatchSnapshot();
        });

        it('С индикацией загрузки', () => {
            const button = renderer
                .create(
                    <Button
                        isLoader={ true }
                    />
                )
                .toJSON();

            expect(button).toMatchSnapshot();
        });

        describe('Разные типы', () => {
            it('По умолчанию', () => {
                const button = renderer
                    .create(
                        <Button/>
                    )
                    .toJSON();

                expect(button).toMatchSnapshot();
            });

            it('Submit', () => {
                const button = renderer
                    .create(
                        <Button
                            type="submit"
                        />
                    )
                    .toJSON();

                expect(button).toMatchSnapshot();
            });

            it('Reset', () => {
                const button = renderer
                    .create(
                        <Button
                            type="reset"
                        />
                    )
                    .toJSON();

                expect(button).toMatchSnapshot();
            });
        });

        describe('Разная сортировка', () => {
            it('По возрастанию', () => {
                const button = renderer
                    .create(
                        <Button
                            sorting={ Direction.Ascending }
                        />
                    )
                    .toJSON();

                expect(button).toMatchSnapshot();
            });

            it('По убыванию', () => {
                const button = renderer
                    .create(
                        <Button
                            sorting={ Direction.Descending }
                        />
                    )
                    .toJSON();

                expect(button).toMatchSnapshot();
            });
        });

        describe('Разный размер', () => {
            it('Маленький', () => {
                const button = renderer
                    .create(
                        <Button
                            linkedList="small"
                        />
                    )
                    .toJSON();

                expect(button).toMatchSnapshot();
            });

            it('Большой', () => {
                const button = renderer
                    .create(
                        <Button
                            linkedList="big"
                        />
                    )
                    .toJSON();

                expect(button).toMatchSnapshot();
            });
        });

        it('С дополнительным классом', () => {
            const button = renderer
                .create(
                    <Button
                        extraClass="newClass"
                    />
                )
                .toJSON();

            expect(button).toMatchSnapshot();
        });
    });

    describe('Логика', () => {
        it('Вызов колбека при клике', () => {
            console.log = jest.fn();
            const onClick = () => {
                console.log('Жмяк!');
            };

            render(
                <Button
                    title="Жмяк!"
                    onClick={ onClick }
                />
            );

            const button = screen.getByTitle('Жмяк!');

            fireEvent.click(button);
            expect(console.log).toHaveBeenCalledWith('Жмяк!');
        });
    });
});
