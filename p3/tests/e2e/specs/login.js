describe('Authentication and Authorization', () => {
    it('Goes to login page', () => {
        cy.visit('/');
        cy.get('[data-test="nav-login"]').first().click();
        cy.contains('[data-test="header-login"]', 'Login');
    });

    it('Logs In', () => {
        cy.visit('/login');
        cy.contains('[data-test="header-login"]', 'Login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.contains('[data-test="nav-logout"]', 'Log Out');
        cy.location('pathname').should('eq', '/');
    });

    it('Logs Out', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.contains('[data-test="nav-logout"]', 'Log Out');
        cy.get('[data-test="nav-logout"]').first().click();
        cy.contains('p', 'Welcome to Homebrew Helper');
        cy.contains('[data-test="nav-login"]', 'Log In');
    });

    it('Cannot visit journal when logged out', () => {
        cy.visit('/journal');
        cy.location('pathname').should('not.eq', '/journal');
    });

    it('Can visit journal when logged in', () => {
        cy.visit('/login');
        cy.get('#email').type(Cypress.env('test_user'));
        cy.get('#password').type(Cypress.env('test_password'));
        cy.get('[data-test="login-button"]').first().click();
        cy.get('[data-test="nav-journal"]').first().click();
        cy.location('pathname').should('eq', '/journal');
    });
})
