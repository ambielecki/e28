import moment from 'moment-timezone';

describe('Journal Edit', () => {
    let beer = {
        name: 'Api Edit Beer ' + moment.tz().format(),
    };

    it('Edits an existing beer', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="notification-dismiss"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="expand-button"]').first().click();
        cy.get('[data-test="edit-button"]').first().click();
        cy.location('pathname').should('contain', '/journal/edit');
        cy.get('[data-test="form-name"]').first().clear().type(beer.name);
        cy.get('[data-test="form-edit"').first().click();
        cy.contains('[data-test="notification"]', 'Beer updated successfully');
        cy.get('[data-test="notification"]').first().should('have.class', 'is-success');
        cy.contains('[data-test="beer-name"]', beer.name);
    });
});