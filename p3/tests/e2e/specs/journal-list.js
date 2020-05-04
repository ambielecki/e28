describe('Journal List', () => {
    it('Loads Journal Entries', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.location('pathname').should('eq', '/journal');
        cy.wait(1000);
        cy.get('[data-test="journal-card"]').its('length').should('be.gte', 5);
    });

    it('Loads More Journal Entries', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="load-more"').first().click();
        cy.wait(1000);
        cy.get('[data-test="journal-card"]').its('length').should('be.gte', 6);
    });

    it('Searches Beer', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="search"]').type('Automation Search Test Beer');
        cy.wait(1000);
        cy.get('[data-test="journal-card"]').its('length').should('be.gte', 1);
    });

    it('Expands a Beer', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="expand-button"]').first().click();
        cy.get('[data-test="expanded-content"]').its('length').should('be.eq', 1);
    });

    it('Collapses a Beer', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="expand-button"]').first().click();
        cy.get('[data-test="collapse-button"]').first().click();
        cy.get('[data-test="expanded-content"]').should('not.exist');
    });
})