/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.get('[data-cy="loginCTA-header"]',{timeout:5000}).click({force: true});
    cy.get('[data-cy="app-auth-modal"]',{timeout:5000})
    cy.get('[data-cy="app-auth-modal"]',{timeout:5000})
    cy.get('#email').should('be.visible').type(email);
    cy.get('#password').should('be.visible').type(password);
    cy.get('[data-cy="auth-btn"]').click();
});

Cypress.Commands.add('go_to_Eduction_button', () => {
    cy.get('img.arrow-icon').first().should('be.visible').click();
    cy.contains('span.link-text', 'Settings').should('be.visible').click();
    cy.contains('button.tab-links', 'Education').click({ force: true });
});
