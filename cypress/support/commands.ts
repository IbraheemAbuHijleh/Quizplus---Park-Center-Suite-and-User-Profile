Cypress.Commands.add('loginViaEmaill', (email: string, password: string) => {
    cy.wait(5000);

    cy.get('[data-cy="loginCTA-header"]',{timeout:5000}).click({force: true});
    cy.wait(5000);
    cy.get('[data-cy="app-auth-modal"]',{timeout:5000}).should('be.visible')

    cy.get('#email').should('be.visible').type(email);

    cy.get('#password').should('be.visible').type(password);

    cy.get(`[data-cy="app-auth-modal"]`).within(()=>{
        cy.get('[type="submit"]').click();
    })
    cy.wait(10000)

    cy.url().should('include', '/dashboard');
    // cy.reload()

});
Cypress.Commands.add('loginViaToken', (token: string) => {
    cy.setCookie('token', token)
});

Cypress.Commands.add('go_to_Eduction_button', () => {

    cy.get('button.btn-handle-focus.avatar').should('be.visible').click();

    cy.contains('span.link-text', 'Settings').should('be.visible').click();

    cy.contains('button.tab-links', 'Education').click({ force: true });

});