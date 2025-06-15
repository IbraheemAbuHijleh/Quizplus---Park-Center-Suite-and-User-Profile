import {text} from "node:stream/consumers";


describe('Quizplus - Park Center Suite', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false;
    });
    beforeEach(() => {
        cy.clearCookies();

        cy.clearLocalStorage();

        cy.setCookie('user_preferred_language', 'en');

        cy.visit('/');

        cy.login('1203065@student.birzeit.edu','IIIIBBBB1234');

        cy.go_to_Eduction_button();
    })

    it('Discard in the update flow ',() =>{

        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.get('img.w-16px.h-16px.ml-4').should('be.visible').click({force: true});

        cy.get('div.input-mim').click();

        cy.contains('Diploma').click();

        cy.contains('button', 'Discard').should('be.visible').click();

        cy.wait(1000);

        cy.get('@addUserProfile.all').should('have.length', 0);


    })
});


