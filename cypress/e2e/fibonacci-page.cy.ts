import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

import {
    SUBMIT_BUTTON_SELECTOR,
    INPUT_SELECTOR,
    CIRCLE_DEFAULT_COLOR_CLASS,
    BUTTON_LOADER_CLASS,
} from '../utils/constants';
import { checkCirclesByStep } from '../utils/functions';

describe('FibonacciPage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci');
        cy
            .get(INPUT_SELECTOR)
            .as('input');
        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .as('button');
    });

    describe('Отображение задизабленной кнопки', () => {
        it('В начальном состоянии при пустом инпуте', () => {
            cy
                .get('@input')
                .should('be.empty');
            cy
                .get('@button')
                .should('be.disabled');
        });

        it('В состоянии после очищения инпута', () => {
            cy
                .get('@input')
                .type('7');
            cy
                .get('@button')
                .should('not.be.disabled');

            cy
                .get('@input')
                .clear();
            cy
                .get('@button')
                .should('be.disabled');
        });

        it('При вводе нижней допустимой границы', () => {
            cy
                .get('@input')
                .type('0');
            cy
                .get('@button')
                .should('be.disabled');
        });

        it('При вводе верхней допустимой границы', () => {
            cy
                .get('@input')
                .type('20');
            cy
                .get('@button')
                .should('be.disabled');
        });
    });

    describe('Логика генераций чисел Фибоначчи', () => {
        it('Минимальное значение', () => {
            const sequence = [
                [ '1' ],
                [ '1', '1' ],
            ];

            cy.clock();

            cy
                .get('@input')
                .type('1');
            cy
                .get('@button')
                .click();

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('contain', BUTTON_LOADER_CLASS);

            cy.tick(SHORT_DELAY_IN_MS);

            for (let i = 0; i < sequence.length; i++) {
                const currentStep = [];
                for (let j = 0; j < sequence[i].length; j++) {
                    currentStep.push({
                        letter: sequence[i][j],
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    });
                }
                cy.log(JSON.stringify(currentStep));
                checkCirclesByStep(
                    {
                        currentStep,
                        checkElements: {
                            checkIndex: true,
                            checkTail: false,
                            checkHead: false,
                        }
                    }
                );

                cy.tick(SHORT_DELAY_IN_MS);
            }

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('not.contain', BUTTON_LOADER_CLASS);
        });

        it('Значение из середины', () => {
            const sequence = [
                [ '1' ],
                [ '1', '1' ],
                [ '1', '1', '2' ],
                [ '1', '1', '2', '3' ],
                [ '1', '1', '2', '3', '5' ],
            ];

            cy.clock();

            cy
                .get('@input')
                .type('4');
            cy
                .get('@button')
                .click();

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('contain', BUTTON_LOADER_CLASS);

            cy.tick(SHORT_DELAY_IN_MS);

            for (let i = 0; i < sequence.length; i++) {
                const currentStep = [];
                for (let j = 0; j < sequence[i].length; j++) {
                    currentStep.push({
                        letter: sequence[i][j],
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    });
                }
                cy.log(JSON.stringify(currentStep));
                checkCirclesByStep(
                    {
                        currentStep,
                        checkElements: {
                            checkIndex: true,
                            checkTail: false,
                            checkHead: false,
                        }
                    }
                );

                cy.tick(SHORT_DELAY_IN_MS);
            }

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('not.contain', BUTTON_LOADER_CLASS);
        });

        it('Максимальное значение', () => {
            const sequence = [
                [ '1' ],
                [ '1', '1' ],
                [ '1', '1', '2' ],
                [ '1', '1', '2', '3' ],
                [ '1', '1', '2', '3', '5' ],
                [ '1', '1', '2', '3', '5', '8' ],
                [ '1', '1', '2', '3', '5', '8', '13' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597', '2584' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597', '2584', '4181' ],
                [ '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233', '377', '610', '987', '1597', '2584', '4181', '6765' ],
            ];

            cy.clock();

            cy
                .get('@input')
                .type('19');
            cy
                .get('@button')
                .click();

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('contain', BUTTON_LOADER_CLASS);

            cy.tick(SHORT_DELAY_IN_MS);

            for (let i = 0; i < sequence.length; i++) {
                const currentStep = [];
                for (let j = 0; j < sequence[i].length; j++) {
                    currentStep.push({
                        letter: sequence[i][j],
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    });
                }
                cy.log(JSON.stringify(currentStep));
                checkCirclesByStep(
                    {
                        currentStep,
                        checkElements: {
                            checkIndex: true,
                            checkTail: false,
                            checkHead: false,
                        }
                    }
                );

                cy.tick(SHORT_DELAY_IN_MS);
            }

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('not.contain', BUTTON_LOADER_CLASS);
        });
    });
});
