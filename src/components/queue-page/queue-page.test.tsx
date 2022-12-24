import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

import { QueuePage } from './queue-page';

describe('QueuePage', () => {
    describe('Отображение', () => {
        it('Начальное состяние', () => {
            const page = renderer
                .create(
                    <BrowserRouter>
                        <QueuePage/>
                    </BrowserRouter>
                )
                .toJSON();

            expect(page).toMatchSnapshot();
        });
    });
});
