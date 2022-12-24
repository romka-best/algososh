import { DELAY_IN_MS } from '../../src/constants/delays';

import {
    INPUT_SELECTOR,
    SUBMIT_BUTTON_SELECTOR,
    RESET_BUTTON_SELECTOR,
    CIRCLE_ROOT_SELECTOR,
    CIRCLE_CHANGING_COLOR_CLASS,
    CIRCLE_DEFAULT_COLOR_CLASS,
    CIRCLE_DEFAULT_COLOR_SELECTOR,
    CIRCLE_CHANGING_COLOR_SELECTOR,
    CIRCLE_HEAD_SELECTOR,
    CIRCLE_LETTER_SELECTOR,
    CIRCLE_TAIL_SELECTOR,
} from '../utils/constants';
import { checkCirclesByStep, isLoadingButtons } from '../utils/functions';

describe('QueuePage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue');

        cy
            .get(INPUT_SELECTOR)
            .as('input');

        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .first()
            .as('addButton');

        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .last()
            .as('deleteButton');

        cy
            .get(RESET_BUTTON_SELECTOR)
            .as('resetButton');
    });

    describe('Отображение задизабленной кнопки', () => {
        describe('Кнопка добавления', () => {
            it('В начальном состоянии при пустом инпуте', () => {
                cy
                    .get('@input')
                    .should('be.empty');
                cy
                    .get('@addButton')
                    .should('be.disabled');
            });

            it('В состоянии после очищения инпута', () => {
                cy
                    .get('@input')
                    .type('Test');
                cy
                    .get('@addButton')
                    .should('not.be.disabled');

                cy
                    .get('@input')
                    .clear();
                cy
                    .get('@addButton')
                    .should('be.disabled');
            });
        });

        describe('Кнопка удаления', () => {
            it('В начальном состоянии при пустом инпуте', () => {
                cy
                    .get('@input')
                    .should('be.empty');
                cy
                    .get('@deleteButton')
                    .should('be.disabled');
            });

            it('В состоянии после удаления последнего элемента', () => {
                cy
                    .get('@input')
                    .type('Test');
                cy
                    .get('@addButton')
                    .click();
                cy
                    .get('@deleteButton')
                    .should('not.be.disabled');

                cy
                    .get('@deleteButton')
                    .click();
                cy
                    .get('@deleteButton')
                    .should('be.disabled');
            });
        });

        describe('Кнопка очищения', () => {
            it('В начальном состоянии при пустом инпуте', () => {
                cy
                    .get('@input')
                    .should('be.empty');
                cy
                    .get('@resetButton')
                    .should('be.disabled');
            });

            it('В состоянии после очистки всех элементов', () => {
                cy
                    .get('@input')
                    .type('Test');
                cy
                    .get('@addButton')
                    .click();
                cy
                    .get('@resetButton')
                    .should('not.be.disabled');

                cy
                    .get('@resetButton')
                    .click();
                cy
                    .get('@resetButton')
                    .should('be.disabled');
            });
        });
    });

    describe('Добавление', () => {
        it('Один элемент', () => {
            cy.clock();

            cy
                .get('@input')
                .type('1');
            cy
                .get('@addButton')
                .click();

            isLoadingButtons(true, false, false);

            cy
                .get(CIRCLE_CHANGING_COLOR_SELECTOR)
                .first()
                .should('be.visible');
            cy
                .get(CIRCLE_HEAD_SELECTOR)
                .first()
                .should('have.text', 'head');
            cy
                .get(CIRCLE_LETTER_SELECTOR)
                .first()
                .should('have.text', '1');
            cy
                .get(CIRCLE_TAIL_SELECTOR)
                .first()
                .should('have.text', 'tail');

            cy.tick(DELAY_IN_MS);

            cy
                .get(CIRCLE_DEFAULT_COLOR_SELECTOR)
                .first()
                .should('be.visible');
            cy
                .get(CIRCLE_HEAD_SELECTOR)
                .first()
                .should('have.text', 'head');
            cy
                .get(CIRCLE_LETTER_SELECTOR)
                .first()
                .should('have.text', '1');
            cy
                .get(CIRCLE_TAIL_SELECTOR)
                .first()
                .should('have.text', 'tail');

            cy.tick(DELAY_IN_MS);

            isLoadingButtons(false, false, false);
        });

        it('Несколько элементов', () => {
            const steps = [
                [
                    [
                        {
                            head: 'head',
                            letter: '1',
                            tail: 'tail',
                            className: CIRCLE_CHANGING_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                    ],
                    [
                        {
                            head: 'head',
                            letter: '1',
                            tail: 'tail',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                    ],
                ],
                [
                    [
                        {
                            head: 'head',
                            letter: '1',
                            tail: '',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            head: '',
                            letter: '2',
                            tail: 'tail',
                            className: CIRCLE_CHANGING_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                    ],
                    [
                        {
                            head: 'head',
                            letter: '1',
                            tail: '',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            head: '',
                            letter: '2',
                            tail: 'tail',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                    ],
                ],
            ];
            const inputs = [ '1', '2' ];

            cy.clock();

            for (let i = 0; i < inputs.length; i++) {
                cy
                    .get('@input')
                    .type(inputs[i]);
                cy
                    .get('@addButton')
                    .click();

                isLoadingButtons(true, false, false);

                for (let step = 0; step < steps[i].length; step++) {
                    checkCirclesByStep(
                        {
                            currentStep: steps[i][step],
                            checkElements: {
                                checkHead: true,
                                checkIndex: false,
                                checkTail: true,
                            },
                        });

                    cy.tick(DELAY_IN_MS);
                }

                isLoadingButtons(false, false, false);
            }
        });
    });

    describe('Удаление', () => {
        it('Один элемент', () => {
            cy.clock();

            cy
                .get('@input')
                .type('1');
            cy
                .get('@addButton')
                .click();

            cy.tick(DELAY_IN_MS);

            cy
                .get('@deleteButton')
                .click();

            isLoadingButtons(false, true, false);

            cy
                .get(CIRCLE_CHANGING_COLOR_SELECTOR)
                .should('be.visible');
            cy
                .get(CIRCLE_HEAD_SELECTOR)
                .should('have.text', 'head');
            cy
                .get(CIRCLE_LETTER_SELECTOR)
                .should('have.text', '1');
            cy
                .get(CIRCLE_TAIL_SELECTOR)
                .should('have.text', 'tail');

            cy.tick(DELAY_IN_MS);

            cy
                .get(CIRCLE_ROOT_SELECTOR)
                .first()
                .should('have.text', '');
            cy
                .get(CIRCLE_HEAD_SELECTOR)
                .first()
                .should('have.text', '');
            cy
                .get(CIRCLE_LETTER_SELECTOR)
                .should('not.exist');
            cy
                .get(CIRCLE_TAIL_SELECTOR)
                .first()
                .should('have.text', '');

            cy.tick(DELAY_IN_MS);

            isLoadingButtons(false, false, false);
        });

        it('Несколько элементов', () => {
            const steps = [
                [
                    [
                        {
                            head: 'head',
                            letter: '1',
                            tail: '',
                            className: CIRCLE_CHANGING_COLOR_CLASS,
                        },
                        {
                            head: '',
                            letter: '2',
                            tail: 'tail',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                    ],
                    [
                        {
                            head: '',
                            letter: '',
                            tail: '',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            head: 'head',
                            letter: '2',
                            tail: 'tail',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                    ],
                ],
                [
                    [
                        {
                            head: '',
                            letter: '',
                            tail: '',
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            head: 'head',
                            letter: '2',
                            tail: 'tail',
                            className: CIRCLE_CHANGING_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS,
                        },
                    ],
                ],
            ];
            const inputs = [ '1', '2' ];

            cy.clock();

            for (let input = 0; input < inputs.length; input++) {
                cy
                    .get('@input')
                    .type(inputs[input]);
                cy
                    .get('@addButton')
                    .click();

                cy.tick(DELAY_IN_MS);
            }

            for (let i = 0; i < steps.length; i++) {
                cy
                    .get('@deleteButton')
                    .click();

                isLoadingButtons(false, true, false);

                for (let step = 0; step < steps[i].length; step++) {
                    checkCirclesByStep(
                        {
                            currentStep: steps[i][step],
                            checkElements: {
                                checkHead: true,
                                checkIndex: false,
                                checkTail: true,
                            },
                        });

                    cy.tick(DELAY_IN_MS);
                }

                isLoadingButtons(false, false, false);
            }
        });
    });

    describe('Очищение', () => {
        it('Один элемент', () => {
            cy.clock();

            cy
                .get('@input')
                .type('1');
            cy
                .get('@addButton')
                .click();

            cy.tick(DELAY_IN_MS);

            cy
                .get('@resetButton')
                .click();

            isLoadingButtons(false, false, true);

            cy.tick(DELAY_IN_MS);

            checkCirclesByStep(
                {
                    currentStep: [
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                    ],
                    checkElements: {
                        checkHead: true,
                        checkIndex: false,
                        checkTail: true,
                    },
                });

            cy.tick(DELAY_IN_MS);

            isLoadingButtons(false, false, false);
        });

        it('Несколько элементов', () => {
            const inputs = [ '1', '2', '3' ];

            cy.clock();

            for (let input = 0; input < inputs.length; input++) {
                cy
                    .get('@input')
                    .type(inputs[input]);
                cy
                    .get('@addButton')
                    .click();

                cy.tick(DELAY_IN_MS);
            }

            cy
                .get('@resetButton')
                .click();

            isLoadingButtons(false, false, true);

            cy.tick(DELAY_IN_MS);

            checkCirclesByStep(
                {
                    currentStep: [
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                        {
                            className: CIRCLE_DEFAULT_COLOR_CLASS
                        },
                    ],
                    checkElements: {
                        checkHead: true,
                        checkIndex: false,
                        checkTail: true,
                    },
                });

            cy.tick(DELAY_IN_MS);

            isLoadingButtons(false, false, false);
        });
    });
});
