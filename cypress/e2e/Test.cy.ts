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

    it('update eduction',() => {

        cy.intercept('GET', '**/api/users/user-profile').as('updateUserProfile');

        cy.get('img.w-16px.h-16px.ml-4').should('be.visible').click({force: true});

        cy.get('div.input-mim').click();

        cy.contains('Diploma').click();

        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary.ripple').should('be.visible').click();


        cy.wait('@updateUserProfile', {timeout: 10000}).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            const responseBody = interception.response.body;


            expect(responseBody).to.have.property('data');

            expect(responseBody.data).to.be.an('array');

            const collage_degree='DIPLOMA' ;

            expect(collage_degree).to.eq('DIPLOMA');


        });
        cy.get('img.w-16px.h-16px.ml-4').should('be.visible').click({force: true});
        cy.get('div.input-mim').click();
        cy.contains('Doctorate').click();
        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary.ripple').should('be.visible').click();

    });
});


