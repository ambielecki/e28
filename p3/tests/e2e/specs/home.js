describe('Visits the homepage', () => {
    it('Visits the home page', () => {
        cy.visit('/')
        cy.contains('p', 'Welcome to Homebrew Helper')
    });
})
