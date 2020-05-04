describe('Tools', () => {
    it('Calculates ABV', () => {
        cy.visit('/tools')
        cy.get('[data-test="form-original-gravity"]').first().clear().type('1.060');
        cy.get('[data-test="form-final-gravity"]').first().clear().type('1.008');
        cy.contains('[data-test="abv"]', '6.8 %');
    });
})
