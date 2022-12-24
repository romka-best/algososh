import { MAIN_PAGE_ROOT_SELECTOR, MAIN_PAGE_CARD_SELECTOR } from '../utils/constants';

describe('MainPage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Открытие стартовой страницы по умолчанию', () => {
        cy
            .get(MAIN_PAGE_ROOT_SELECTOR)
            .should('be.visible');

        cy.contains('МБОУ АЛГОСОШ');

        cy.percySnapshot();
    });

    describe('Роутинг', () => {
        it('Переход на страницу "Строка"', () => {
            cy
                .get(MAIN_PAGE_CARD_SELECTOR)
                .first()
                .click();

            cy.contains('Строка');

            cy.percySnapshot();
        });

        it('Переход на страницу "Последовательность Фибоначчи"', () => {
            cy
                .get(MAIN_PAGE_CARD_SELECTOR)
                .eq(1)
                .click();

            cy.contains('Последовательность Фибоначчи');

            cy.percySnapshot();
        });

        it('Переход на страницу "Сортировка массива"', () => {
            cy
                .get(MAIN_PAGE_CARD_SELECTOR)
                .eq(2)
                .click();

            cy.contains('Сортировка массива');

            cy.percySnapshot();
        });

        it('Переход на страницу "Стек"', () => {
            cy
                .get(MAIN_PAGE_CARD_SELECTOR)
                .eq(3)
                .click();

            cy.contains('Стек');

            cy.percySnapshot();
        });

        it('Переход на страницу "Очередь"', () => {
            cy
                .get(MAIN_PAGE_CARD_SELECTOR)
                .eq(4)
                .click();

            cy.contains('Очередь');

            cy.percySnapshot();
        });

        it('Переход на страницу "Связный список"', () => {
            cy
                .get(MAIN_PAGE_CARD_SELECTOR)
                .last()
                .click();

            cy.contains('Связный список');

            cy.percySnapshot();
        });
    });
});
