import { DELAY_IN_MS } from '../../src/constants/delays';

import {
    INPUT_SELECTOR,
    SUBMIT_BUTTON_SELECTOR,
    CIRCLE_ROOT_SELECTOR,
    CIRCLE_DEFAULT_COLOR_CLASS,
    CIRCLE_CHANGING_COLOR_CLASS,
    CIRCLE_MODIFIED_COLOR_CLASS,
    CIRCLE_DEFAULT_COLOR_SELECTOR,
    CIRCLE_CHANGING_COLOR_SELECTOR,
    CIRCLE_MODIFIED_COLOR_SELECTOR,
    BUTTON_LOADER_CLASS,
} from '../utils/constants';

describe('StringPage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion');
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
                .type('Test');
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
    });

    describe('Разворот строки', () => {
        it('Один символ', () => {
            cy.clock();

            cy
                .get('@input')
                .type('T');
            cy
                .get('@button')
                .click();

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('contain', BUTTON_LOADER_CLASS);

            cy
                .get(CIRCLE_DEFAULT_COLOR_SELECTOR)
                .should('be.visible');

            cy.tick(DELAY_IN_MS);

            cy
                .get(CIRCLE_CHANGING_COLOR_SELECTOR)
                .should('be.visible');

            cy.tick(DELAY_IN_MS);

            cy
                .get(CIRCLE_MODIFIED_COLOR_SELECTOR)
                .should('be.visible');

            cy.tick(DELAY_IN_MS);

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('not.contain', BUTTON_LOADER_CLASS);
        });

        it('Нечётного количества символов', () => {
            const steps = [ 'Hi!', '!iH' ];

            cy.clock();

            cy
                .get('@input')
                .type('Hi!');
            cy
                .get('@button')
                .click();

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('contain', BUTTON_LOADER_CLASS);

            cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                cy
                    .wrap($circle)
                    .should(($element) => {
                        const className = $element[0].className;
                        expect(className).to.match(new RegExp(CIRCLE_DEFAULT_COLOR_CLASS));
                    })
                    .and('have.text', steps[0][index]);
            });

            cy.tick(DELAY_IN_MS);

            cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                cy
                    .wrap($circle)
                    .should(($element) => {
                        const className = $element[0].className;
                        let expectedClassName;

                        if (index === 0 || index === 2) {
                            expectedClassName = new RegExp(CIRCLE_CHANGING_COLOR_CLASS);
                        } else {
                            expectedClassName = new RegExp(CIRCLE_DEFAULT_COLOR_CLASS);
                        }

                        expect(className).to.match(expectedClassName);
                    })
                    .and('have.text', steps[0][index]);
            });

            cy.tick(DELAY_IN_MS);

            cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                cy
                    .wrap($circle)
                    .should(($element) => {
                        const className = $element[0].className;
                        let expectedClassName;

                        if (index === 0 || index === 2) {
                            expectedClassName = new RegExp(CIRCLE_MODIFIED_COLOR_CLASS);
                        } else {
                            expectedClassName = new RegExp(CIRCLE_DEFAULT_COLOR_CLASS);
                        }

                        expect(className).to.match(expectedClassName);
                    }).and('have.text', steps[1][index]);
            });

            cy.tick(DELAY_IN_MS);

            cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                cy
                    .wrap($circle)
                    .should(($element) => {
                        const className = $element[0].className;
                        let expectedClassName;

                        if (index === 0 || index === 2) {
                            expectedClassName = new RegExp(CIRCLE_MODIFIED_COLOR_CLASS);
                        } else {
                            expectedClassName = new RegExp(CIRCLE_CHANGING_COLOR_CLASS);
                        }

                        expect(className).to.match(expectedClassName);
                    })
                    .and('have.text', steps[1][index]);
            });

            cy.tick(DELAY_IN_MS);

            cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                cy
                    .wrap($circle)
                    .should(($element) => {
                        const className = $element[0].className;
                        expect(className).to.match(new RegExp(CIRCLE_MODIFIED_COLOR_CLASS));
                    })
                    .and('have.text', steps[1][index]);
            });

            cy.tick(DELAY_IN_MS);

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('not.contain', BUTTON_LOADER_CLASS);
        });

        it('Чётного количества символов', () => {
            const steps = [ 'Task', 'kasT', 'ksaT' ];

            cy
                .clock();

            cy
                .get('@input')
                .type('Task');
            cy
                .get('@button')
                .click();

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('contain', BUTTON_LOADER_CLASS);

            for (let i = 0; i < steps.length; i++) {
                if (i === 0) {
                    cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                        cy
                            .wrap($circle)
                            .should(($element) => {
                                const className = $element[0].className;
                                expect(className).to.match(new RegExp(CIRCLE_DEFAULT_COLOR_CLASS));
                            })
                            .and('have.text', steps[i][index]);
                    });
                } else if (i !== steps.length - 1) {
                    cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                        cy
                            .wrap($circle)
                            .should(($element) => {
                                const className = $element[0].className;
                                let expectedClassName;

                                if (index === 0 || index === steps[i].length - 1) {
                                    expectedClassName = new RegExp(CIRCLE_CHANGING_COLOR_CLASS);
                                } else {
                                    expectedClassName = new RegExp(CIRCLE_DEFAULT_COLOR_CLASS);
                                }

                                expect(className).to.match(expectedClassName);
                            })
                            .and('have.text', steps[0][index]);
                    });

                    cy.tick(DELAY_IN_MS);

                    cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                        cy
                            .wrap($circle)
                            .should(($element) => {
                                const className = $element[0].className;
                                let expectedClassName;

                                if (index === 0 || index === steps[i].length - 1) {
                                    expectedClassName = new RegExp(CIRCLE_MODIFIED_COLOR_CLASS);
                                } else {
                                    expectedClassName = new RegExp(CIRCLE_DEFAULT_COLOR_CLASS);
                                }

                                expect(className).to.match(expectedClassName);
                            }).and('have.text', steps[1][index]);
                    });

                    cy.tick(DELAY_IN_MS);

                    cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                        cy
                            .wrap($circle)
                            .should(($element) => {
                                const className = $element[0].className;
                                let expectedClassName;

                                if (index === 0 || index === steps[i].length - 1) {
                                    expectedClassName = new RegExp(CIRCLE_MODIFIED_COLOR_CLASS);
                                } else {
                                    expectedClassName = new RegExp(CIRCLE_CHANGING_COLOR_CLASS);
                                }

                                expect(className).to.match(expectedClassName);
                            })
                            .and('have.text', steps[1][index]);
                    });
                } else {
                    cy.get(CIRCLE_ROOT_SELECTOR).each(($circle, index) => {
                        cy
                            .wrap($circle)
                            .should(($element) => {
                                const className = $element[0].className;
                                expect(className).to.match(new RegExp(CIRCLE_MODIFIED_COLOR_CLASS));
                            })
                            .and('have.text', steps[2][index]);
                    });
                }

                cy.tick(DELAY_IN_MS);
            }

            cy
                .get('@button')
                .invoke('attr', 'class')
                .should('not.contain', BUTTON_LOADER_CLASS);
        });
    });
});
