import {text} from "node:stream/consumers";


describe('Quizplus - Park Center Suite', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false;
    });
    it('after click Eduction the model must be empty if First time I enter this data',() =>{


        cy.setCookie('user_preferred_language', 'en');

        cy.visit('/');

        cy.get('[data-cy="loginCTA-header"]', { timeout: 5000 }).should('be.visible').click();

        cy.get('#email', { timeout: 50000 }).should('be.visible').type('abuhijlehibrahim2002@gmail.com');

        cy.get('#password', { timeout: 50000 }).should('be.visible').type('IIIIBBBB1234');

        cy.get('[data-cy="auth-btn"]').should('be.visible').click();

        cy.get('img.arrow-icon').first().should('be.visible').click();

        cy.contains('span.link-text', 'Settings').should('be.visible').click();

        cy.contains('button.tab-links', 'Education').click({ force: true });

        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('exist');

        cy.get('div.col-md-6.mb-4').eq(3).should('not.contain.text');

        cy.get('div.col-md-6.mb-4').eq(4).should('not.contain.text');

        cy.get('span.ng-star-inserted').eq(15).should('not.contain.text');

        cy.get('div.edu-info.font-weight-bold.ng-star-inserted').eq(1).should('not.contain.text');
    });
});


