describe('App', () => {
    it('Сайт доступен', () => {
        cy.visit('http://localhost:3000');
    });
});
