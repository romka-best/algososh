import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { ListPage } from './list-page';

describe('ListPage', () => {
    describe('Отображение', () => {
        it('Начальное состяние', () => {
            const page = renderer
                .create(
                    <BrowserRouter>
                        <ListPage/>
                    </BrowserRouter>
                )
                .toJSON();

            expect(page).toMatchSnapshot();
        });
    });
});
