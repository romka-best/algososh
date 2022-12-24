import { DELAY_IN_MS } from '../../src/constants/delays';

import {
    INPUT_SELECTOR,
    SUBMIT_BUTTON_SELECTOR,
    CIRCLE_DEFAULT_COLOR_CLASS,
    CIRCLE_CHANGING_COLOR_CLASS,
    CIRCLE_MODIFIED_COLOR_CLASS,
} from '../utils/constants';
import { checkCirclesByStep } from '../utils/functions';

const defaultState = [
    {
        head: 'head',
        letter: '0',
        tail: '',
        className: CIRCLE_DEFAULT_COLOR_CLASS,
    },
    {
        head: '',
        letter: '34',
        tail: '',
        className: CIRCLE_DEFAULT_COLOR_CLASS,
    },
    {
        head: '',
        letter: '8',
        tail: '',
        className: CIRCLE_DEFAULT_COLOR_CLASS,
    },
    {
        head: '',
        letter: '1',
        tail: 'tail',
        className: CIRCLE_DEFAULT_COLOR_CLASS,
    },
];

describe('ListPage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list');

        cy
            .get(INPUT_SELECTOR)
            .first()
            .as('inputValue');
        cy
            .get(INPUT_SELECTOR)
            .last()
            .as('inputIndex');

        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .eq(0)
            .as('addHeadButton');
        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .eq(1)
            .as('addTailButton');

        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .eq(2)
            .as('deleteHeadButton');
        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .eq(3)
            .as('deleteTailButton');

        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .eq(4)
            .as('addByIndexButton');
        cy
            .get(SUBMIT_BUTTON_SELECTOR)
            .eq(5)
            .as('deleteByIndexButton');
    });

    describe('Отображение задизабленной кнопки', () => {
        describe('Кнопка добавления в head', () => {
            it('В начальном состоянии при пустом инпуте', () => {
                cy
                    .get('@inputValue')
                    .should('be.empty');
                cy
                    .get('@addHeadButton')
                    .should('be.disabled');
            });

            it('В состоянии после очищения инпута', () => {
                cy
                    .get('@inputValue')
                    .type('Test');
                cy
                    .get('@addHeadButton')
                    .should('not.be.disabled');

                cy
                    .get('@inputValue')
                    .clear();
                cy
                    .get('@addHeadButton')
                    .should('be.disabled');
            });
        });

        describe('Кнопка добавления в tail', () => {
            it('В начальном состоянии при пустом инпуте', () => {
                cy
                    .get('@inputValue')
                    .should('be.empty');
                cy
                    .get('@addTailButton')
                    .should('be.disabled');
            });

            it('В состоянии после очищения инпута', () => {
                cy
                    .get('@inputValue')
                    .type('Test');
                cy
                    .get('@addTailButton')
                    .should('not.be.disabled');

                cy
                    .get('@inputValue')
                    .clear();
                cy
                    .get('@addTailButton')
                    .should('be.disabled');
            });
        });

        describe('Кнопка удаления из head', () => {
            it('В состоянии после удаления последнего элемента', () => {
                for (let i = 0; i < 4; i++) {
                    cy
                        .get('@deleteHeadButton')
                        .click();
                }

                cy
                    .get('@deleteHeadButton')
                    .should('be.disabled');
            });
        });

        describe('Кнопка удаления из tail', () => {
            it('В состоянии после удаления последнего элемента', () => {
                for (let i = 0; i < 4; i++) {
                    cy
                        .get('@deleteTailButton')
                        .click();
                }

                cy
                    .get('@deleteTailButton')
                    .should('be.disabled');
            });
        });

        describe('Кнопка добавления по индексу', () => {
            it('В начальном состоянии при пустом инпуте', () => {
                cy
                    .get('@inputIndex')
                    .should('be.empty');
                cy
                    .get('@addByIndexButton')
                    .should('be.disabled');
            });

            it('При пустом инпуте со значением', () => {
                cy
                    .get('@inputIndex')
                    .type('1');

                cy
                    .get('@addByIndexButton')
                    .should('be.disabled');
            });

            it('В состоянии после очищения инпута с индексом', () => {
                cy
                    .get('@inputValue')
                    .type('Test');
                cy
                    .get('@inputIndex')
                    .type('1');
                cy
                    .get('@addByIndexButton')
                    .should('not.be.disabled');

                cy
                    .get('@inputIndex')
                    .clear();
                cy
                    .get('@addByIndexButton')
                    .should('be.disabled');
            });

            it('В состоянии после очищения инпута со значением', () => {
                cy
                    .get('@inputValue')
                    .type('Test');
                cy
                    .get('@inputIndex')
                    .type('1');
                cy
                    .get('@addByIndexButton')
                    .should('not.be.disabled');

                cy
                    .get('@inputValue')
                    .clear();
                cy
                    .get('@addByIndexButton')
                    .should('be.disabled');
            });
        });

        describe('Кнопка удаления по индексу', () => {
            it('В начальном состоянии при пустом инпуте', () => {
                cy
                    .get('@inputIndex')
                    .should('be.empty');
                cy
                    .get('@deleteByIndexButton')
                    .should('be.disabled');
            });

            it('В состоянии после очищения инпута', () => {
                cy
                    .get('@inputIndex')
                    .type('1');
                cy
                    .get('@deleteByIndexButton')
                    .should('not.be.disabled');

                cy
                    .get('@inputIndex')
                    .clear();
                cy
                    .get('@deleteByIndexButton')
                    .should('be.disabled');
            });
        });
    });

    describe('Отображение', () => {
        it('Дефолтное состояние списка', () => {
            checkCirclesByStep({
                currentStep: defaultState,
                checkElements: {
                    checkHead: true,
                    checkIndex: true,
                    checkTail: true,
                }
            });
        });
    });

    describe('Добавление', () => {
        it('В head', () => {
            const steps = [
                [
                    {
                        head: '-10',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                        smallClassName: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    ...defaultState.slice(1),
                ],
                [
                    {
                        head: 'head',
                        letter: '-10',
                        tail: '',
                        className: CIRCLE_MODIFIED_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                    ...defaultState.slice(1),
                ],
                [
                    {
                        head: 'head',
                        letter: '-10',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                    ...defaultState.slice(1),
                ],
            ];

            cy.clock();

            cy
                .get('@inputValue')
                .type('-10');
            cy
                .get('@addHeadButton')
                .click();

            isLoadingButtons(
                true,
                false,
                false,
                false,
                false,
                false
            );

            for (let step = 0; step < steps.length; step++) {
                checkCirclesByStep(
                    {
                        currentStep: steps[step],
                        checkElements: {
                            checkHead: true,
                            checkIndex: true,
                            checkTail: true
                        }
                    }
                );

                cy.tick(DELAY_IN_MS);
            }

            isLoadingButtons(
                false,
                false,
                false,
                false,
                false,
                false
            );
        });

        it('В tail', () => {
            const steps = [
                [
                    ...defaultState.slice(0, defaultState.length - 1),
                    {
                        head: '100',
                        letter: '1',
                        tail: 'tail',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                        smallClassName: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                ],
                [
                    ...defaultState.slice(0, defaultState.length - 1),
                    {
                        head: '',
                        letter: '1',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '100',
                        tail: 'tail',
                        className: CIRCLE_MODIFIED_COLOR_CLASS,
                    },
                ],
                [
                    ...defaultState.slice(0, defaultState.length - 1),
                    {
                        head: '',
                        letter: '1',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '100',
                        tail: 'tail',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                ],
            ];

            cy.clock();

            cy
                .get('@inputValue')
                .type('100');
            cy
                .get('@addTailButton')
                .click();

            isLoadingButtons(
                false,
                true,
                false,
                false,
                false,
                false
            );

            for (let step = 0; step < steps.length; step++) {
                checkCirclesByStep(
                    {
                        currentStep: steps[step],
                        checkElements: {
                            checkHead: true,
                            checkIndex: true,
                            checkTail: true
                        }
                    }
                );

                cy.tick(DELAY_IN_MS);
            }

            isLoadingButtons(
                false,
                false,
                false,
                false,
                false,
                false
            );
        });

        it('По индексу', () => {
            const steps = [
                [
                    {
                        head: '38',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                        smallClassName: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    ...defaultState.slice(1)
                ],
                [
                    {
                        head: 'head',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    {
                        head: '38',
                        letter: '34',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                        smallClassName: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    ...defaultState.slice(2)
                ],
                [
                    ...defaultState.slice(0, 2),
                    {
                        head: '',
                        letter: '38',
                        tail: '',
                        className: CIRCLE_MODIFIED_COLOR_CLASS,
                    },
                    ...defaultState.slice(2)
                ],
                [
                    ...defaultState.slice(0, 2),
                    {
                        head: '',
                        letter: '38',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                    ...defaultState.slice(2)
                ],
            ];

            cy.clock();

            cy
                .get('@inputValue')
                .type('38');
            cy
                .get('@inputIndex')
                .type('2');
            cy
                .get('@addByIndexButton')
                .click();

            isLoadingButtons(
                false,
                false,
                true,
                false,
                false,
                false
            );

            for (let step = 0; step < steps.length; step++) {
                checkCirclesByStep(
                    {
                        currentStep: steps[step],
                        checkElements: {
                            checkHead: true,
                            checkIndex: true,
                            checkTail: true
                        }
                    }
                );

                cy.tick(DELAY_IN_MS);
            }

            isLoadingButtons(
                false,
                false,
                false,
                false,
                false,
                false
            );
        });
    });

    describe('Удаление', () => {
        it('Из head', () => {
            const steps = [
                [
                    {
                        head: 'head',
                        letter: '',
                        tail: '0',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                        smallClassName: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    ...defaultState.slice(1),
                ],
                [
                    {
                        head: 'head',
                        letter: '34',
                        tail: '',
                        className: CIRCLE_MODIFIED_COLOR_CLASS,
                    },
                    ...defaultState.slice(2),
                ],
                [
                    {
                        head: 'head',
                        letter: '34',
                        tail: '',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                    ...defaultState.slice(2),
                ],
            ];

            cy.clock();

            cy
                .get('@deleteHeadButton')
                .click();

            isLoadingButtons(
                false,
                false,
                false,
                true,
                false,
                false
            );

            for (let step = 0; step < steps.length; step++) {
                checkCirclesByStep(
                    {
                        currentStep: steps[step],
                        checkElements: {
                            checkHead: true,
                            checkIndex: true,
                            checkTail: true
                        }
                    }
                );

                cy.tick(DELAY_IN_MS);
            }

            isLoadingButtons(
                false,
                false,
                false,
                false,
                false,
                false
            );
        });

        it('Из tail', () => {
            const steps = [
                [
                    ...defaultState.slice(0, defaultState.length - 1),
                    {
                        head: '',
                        letter: '',
                        tail: '1',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                        smallClassName: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                ],
                [
                    ...defaultState.slice(0, defaultState.length - 2),
                    {
                        head: '',
                        letter: '8',
                        tail: 'tail',
                        className: CIRCLE_MODIFIED_COLOR_CLASS,
                    },
                ],
                [
                    ...defaultState.slice(0, defaultState.length - 2),
                    {
                        head: '',
                        letter: '8',
                        tail: 'tail',
                        className: CIRCLE_DEFAULT_COLOR_CLASS,
                    },
                ],
            ];

            cy.clock();

            cy
                .get('@deleteTailButton')
                .click();

            isLoadingButtons(
                false,
                false,
                false,
                false,
                true,
                false
            );

            for (let step = 0; step < steps.length; step++) {
                checkCirclesByStep(
                    {
                        currentStep: steps[step],
                        checkElements: {
                            checkHead: true,
                            checkIndex: true,
                            checkTail: true
                        }
                    }
                );

                cy.tick(DELAY_IN_MS);
            }

            isLoadingButtons(
                false,
                false,
                false,
                false,
                false,
                false
            );
        });

        it('По индексу', () => {
            const steps = [
                [
                    {
                        head: 'head',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    ...defaultState.slice(1)
                ],
                [
                    {
                        head: 'head',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '34',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    ...defaultState.slice(2)
                ],
                [
                    {
                        head: 'head',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '34',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '',
                        tail: '8',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                        smallClassName: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    ...defaultState.slice(3)
                ],
                [
                    {
                        head: 'head',
                        letter: '0',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '34',
                        tail: '',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                    {
                        head: '',
                        letter: '1',
                        tail: 'tail',
                        className: CIRCLE_CHANGING_COLOR_CLASS,
                    },
                ],
                [
                    ...defaultState.slice(0, 2),
                    ...defaultState.slice(3),
                ],
            ];

            cy.clock();

            cy
                .get('@inputIndex')
                .type('2');
            cy
                .get('@deleteByIndexButton')
                .click();

            isLoadingButtons(
                false,
                false,
                false,
                false,
                false,
                true
            );

            for (let step = 0; step < steps.length; step++) {
                checkCirclesByStep(
                    {
                        currentStep: steps[step],
                        checkElements: {
                            checkHead: true,
                            checkIndex: true,
                            checkTail: true
                        }
                    }
                );

                cy.tick(DELAY_IN_MS);
            }

            isLoadingButtons(
                false,
                false,
                false,
                false,
                false,
                false
            );
        });
    });
});

function isLoadingButtons(
    shouldAddHeadButton,
    shouldAddTailButton,
    shouldAddByIndexButton,
    shouldDeleteHeadButton,
    shouldDeleteTailButton,
    shouldDeleteByIndexButton
) {
    const contain = 'contain';
    const notContain = 'not.contain';

    cy
        .get('@addHeadButton')
        .invoke('attr', 'class')
        .should(shouldAddHeadButton ? contain : notContain, 'button_loader__');
    cy
        .get('@addTailButton')
        .invoke('attr', 'class')
        .should(shouldAddTailButton ? contain : notContain, 'button_loader__');
    cy
        .get('@addByIndexButton')
        .invoke('attr', 'class')
        .should(shouldAddByIndexButton ? contain : notContain, 'button_loader__');
    cy
        .get('@deleteHeadButton')
        .invoke('attr', 'class')
        .should(shouldDeleteHeadButton ? contain : notContain, 'button_loader__');
    cy
        .get('@deleteTailButton')
        .invoke('attr', 'class')
        .should(shouldDeleteTailButton ? contain : notContain, 'button_loader__');
    cy
        .get('@deleteByIndexButton')
        .invoke('attr', 'class')
        .should(shouldDeleteByIndexButton ? contain : notContain, 'button_loader__');
}
