import moment from 'moment-timezone';

describe('Journal Create', () => {
    it('Creates a new entry with minimum content', () => {
        let beer = {
            name: 'Automation Minimal Test Beer ' + moment.tz().format(),
        };

        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="notification-dismiss"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="create-entry"]').first().click();
        cy.location('pathname').should('eq', '/journal/create');
        cy.get('[data-test="form-name"]').first().type(beer.name);
        cy.get('[data-test="form-create"').first().click();
        cy.contains('[data-test="notification"]', 'Beer created successfully');
        cy.get('[data-test="notification"]').first().should('have.class', 'is-success');
        cy.location('pathname').should('eq', '/journal');
        cy.contains('[data-test="beer-name"]', beer.name);
    });

    it('Creates a fuller entry', () => {
        let beer = {
            name: 'Automation Full Test Beer ' + moment.tz().subtract(1, 'months').format(),
            style: 'IPA',
            yeast: 'Automation Yeast',
            rating: '5',
            recipe: 'Automation Test Recipe',
            brew_notes: 'Automation Brew Notes',
            tasting_notes: 'Automation Tasting notes',
        };

        // skipping the datepicker inputs, needs more research and should be tested in package
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="notification-dismiss"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="create-entry"]').first().click();
        cy.get('[data-test="form-name"]').first().clear().type(beer.name);
        cy.get('[data-test="form-style"]').first().select(beer.style);
        cy.get('[data-test="form-yeast"]').first().clear().type(beer.yeast);
        cy.get('[data-test="form-recipe"]').first()
            .find('[contenteditable="true"]')
            .type(beer.recipe);
        cy.get('[data-test="form-brew"]').first()
            .find('[contenteditable="true"]')
            .type(beer.brew_notes);
        cy.get('[data-test="form-tasting"]').first()
            .find('[contenteditable="true"]')
            .type(beer.tasting_notes);
        cy.get('[data-test="form-rating"]').first().select(beer.rating);
        cy.get('[data-test="form-create"').first().click();
        cy.contains('[data-test="notification"]', 'Beer created successfully');
        cy.get('[data-test="notification"]').first().should('have.class', 'is-success');
        cy.location('pathname').should('eq', '/journal');
        cy.contains('a', beer.name).first().click();
        cy.contains('.content', beer.style);
        cy.contains('.content', beer.yeast);
        cy.contains('.content', beer.rating);
        cy.contains('.content', beer.recipe);
        cy.contains('.content', beer.brew_notes);
        cy.contains('.content', beer.tasting_notes);
    });

    it('Fails without a name', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="notification-dismiss"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="create-entry"]').first().click();
        cy.get('[data-test="form-create"').first().click();
        cy.get('[data-test="notification"]').first().should('have.class', 'is-danger');
        cy.location('pathname').should('eq', '/journal/create');
    });
});