import moment from 'moment-timezone';

describe('Journal Create', () => {
    let beer = {
        name: 'Api Test Beer ' + moment.tz().format(),
    };

    it('Creates a new entry', () => {
        cy.visit('/login');
        cy.get('#email').type('testy@test.com');
        cy.get('#password').type('foobarfizzbuzz');
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="create-entry"]').first().click();
        cy.location('pathname').should('eq', '/journal/create');
        cy.get('[data-test="form-name"]').first().type(beer.name);
        cy.get('[data-test="form-create"').first().click();
        cy.contains('[data-test="notification"]', 'Beer created successfully');
        cy.location('pathname').should('eq', '/journal');
        cy.contains('[data-test="beer-name"]', beer.name);
    });

    it('Fails without a name', () => {
        cy.visit('/login');
        cy.get('#email').type('testy@test.com');
        cy.get('#password').type('foobarfizzbuzz');
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="notification-dismiss"]').first().click;
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="create-entry"]').first().click();
        cy.get('[data-test="form-create"').first().click();
        cy.get('[data-test="notification"]').first().should('have.class', 'is-danger');
        cy.location('pathname').should('eq', '/journal/create');
    });
});