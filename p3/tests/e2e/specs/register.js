import moment from 'moment-timezone';

let user = {
    first_name: 'Automation',
    last_name: 'User',
    email: 'Automation' + moment.tz().format('YYYYMMDDHHmmss') + '@test.com',
    password: 'Password' + moment.tz().format('YYYYMMDDHHmmss'),
    new_password: 'NewPassword' + moment.tz().format('YYYYMMDDHHmmss'),
};

describe('Registers new users', () => {
    it('Does not register without email', () => {
        cy.visit('/register');
        cy.get('[data-test="form-first-name"]').first().clear().type(user.first_name);
        cy.get('[data-test="form-last-name"]').first().clear().type(user.last_name);
        cy.get('[data-test="form-email"]').first().clear().type(user.email);
        cy.get('[data-test="form-password-confirm"]').first().clear().type(user.password);
        cy.get('[data-test="form-submit"]').click();
        cy.get('[data-test="notification"]').first().should('have.class', 'is-danger');
        cy.location('pathname').should('eq', '/register');
    });

    it('Registers a user', () => {
        cy.visit('/register');
        cy.get('[data-test="form-first-name"]').first().clear().type(user.first_name);
        cy.get('[data-test="form-last-name"]').first().clear().type(user.last_name);
        cy.get('[data-test="form-email"]').first().clear().type(user.email);
        cy.get('[data-test="form-password"]').first().clear().type(user.password);
        cy.get('[data-test="form-password-confirm"]').first().clear().type(user.password);
        cy.get('[data-test="form-submit"]').click();
        cy.contains('[data-test="notification"]', 'Thank you for registering!!');
        cy.get('[data-test="notification"]').first().should('have.class', 'is-success');
        cy.location('pathname').should('eq', '/');
    });

    it('Changes passwords', () => {
        cy.visit('/login');
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        cy.get('[data-test="login-button"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="notification-dismiss"]').first().click();
        cy.get('[data-test="nav-password"]').first().click();
        cy.wait(1000);
        cy.get('[data-test="form-current-password"]').first().clear().type(user.password);
        cy.get('[data-test="form-new-password"]').first().clear().type(user.new_password);
        cy.get('[data-test="form-new-password-confirm"]').first().clear().type(user.new_password);
        cy.get('[data-test="form-submit"]').click();
        cy.contains('[data-test="notification"]', 'Password Reset');
        cy.get('[data-test="notification"]').first().should('have.class', 'is-success');
        cy.location('pathname').should('eq', '/');
    });
})