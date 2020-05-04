describe('Journal View', () => {
    it('Views a single beer', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="notification-dismiss"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="expand-button"]').first().click();
        cy.get('[data-test="view-button"]').first().click();
        cy.location('pathname').should('contain', '/journal');
        cy.get('[data-test="journal-card"]').its('length').should('be.eq', 1);
    });
});