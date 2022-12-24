import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { StackPage } from './stack-page';

describe('StackPage', () => {
    describe('Отображение', () => {
        it('Начальное состяние', () => {
            const page = renderer
                .create(
                    <BrowserRouter>
                        <StackPage/>
                    </BrowserRouter>
                )
                .toJSON();

            expect(page).toMatchSnapshot();
        });
    });
});
