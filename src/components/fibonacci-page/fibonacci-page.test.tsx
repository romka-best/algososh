import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { FibonacciPage } from './fibonacci-page';

describe('FibonacciPage', () => {
    describe('Отображение', () => {
        it('Начальное состяние', () => {
            const page = renderer
                .create(
                    <BrowserRouter>
                        <FibonacciPage/>
                    </BrowserRouter>
                )
                .toJSON();

            expect(page).toMatchSnapshot();
        });
    });
});
