


describe('Test Suit USER Profile /Education', () => {

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



    it('Log in and go Settings and click Education and check URL', () => {

        cy.url().should('contain','/account/about/education')
    });

    it('Click Buttoun and Show Model ',() =>{

        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('be.visible').click();

        cy.get('button.a-center.btn.d-flex.j-center.outline.ripple').should('be.visible');
    });

  it('Click Add Another, enter university, major, degree and save', () => {

      cy.intercept('POST', '**/api/users/user-profile').as('updateUserProfile');

     cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
         .should('be.visible')
            .click();

       cy.get('[id="Select your University/College_id"]')
           .should('be.visible')
           .click()
           .type('Birzeit University');

        cy.wait(1000);

        cy.get('div').contains('Birzeit University').click({ force: true });

        cy.get('[id="Select your major_id"]')
            .should('be.visible')
            .click()
           .type('Animal Training');

        cy.wait(1000);

        cy.get('div').contains('Animal Training').click({ force: true });

        cy.get('div.input-mim').click();
       cy.contains('Diploma').click();

        cy.get('div.mock-input', { timeout: 10000 }).click();
        cy.contains('button', '2025').click({ force: true });

        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary')
            .should('exist')
            .click({ force: true });

       
        cy.wait('@updateUserProfile', { timeout: 10000 }).its('response.statusCode').should('eq', 202);

           cy.get('@updateUserProfile').then(({ request }) => {
           const body = request.body;

           expect(body.graduation_year).to.eq(2025);
           expect(body.collage_degree).to.eq('DIPLOMA');
           expect(body.university_id).to.eq(16014);
           expect(body.major_id).to.eq(184);
       });
    });


    it('after add onther delete the eduction',() =>{

        cy.intercept('GET', '**/api/users/user-profile').as('deleteUserProfile');

        cy.get('img.w-15x.h-20px.filter-red.wrapped-image.ng-star-inserted').first().should('be.visible').click({force:true});

        cy.wait('@deleteUserProfile', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            const responseBody = interception.response.body;


            expect(responseBody).to.have.property('data');

            expect(responseBody.data).to.be.an('array');


            cy.log(`Number of education entries after delete: ${responseBody.data.length}`);


            const deletedId =16014 ;
            const stillExists = responseBody.data.some(item => item.id === deletedId);
            expect(stillExists).to.be.false;
        });

       /* cy.wait('@deleteUserProfile', { timeout: 10000 }).then((interception) => {
            console.log('RESPONSE BODY:', interception.response.body);
            cy.log(JSON.stringify(interception.response.body));
        });
        */


    });

  /*  it('after click eduction the data show correct If the user has not entered data before',() =>{

        ///   cy.clearCookies();

        //   cy.clearLocalStorage();

        cy.setCookie('user_preferred_language', 'en');

        cy.visit('/');

        cy.get('[data-cy="loginCTA-header"]', { timeout: 5000 }).should('be.visible').click();

        cy.get('#email', { timeout: 50000 }).should('be.visible').type('1203065@student.birzeit.edu');

        cy.get('#password', { timeout: 50000 }).should('be.visible').type('IIIIBBBB1234');

        cy.get('[data-cy="auth-btn"]').should('be.visible').click();

        cy.get('img.arrow-icon').first().should('be.visible').click();

        cy.contains('span.link-text', 'Settings').should('be.visible').click();

        cy.contains('button.tab-links', 'Education').click({ force: true });

        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('be.visible').click();

        cy.get('div.col-md-6.mb-4').eq(3).click();

        cy.contains('div',('Birzeit University')).click();

        cy.get('div.col-md-6.mb-4').eq(4).click();

        cy.contains('div',('Commonwealth Studies')).click();

        cy.get('div.input-mim').click();

        cy.contains('div', 'Diploma').click();

        const currentYear = new Date().getFullYear();

        cy.contains('span', 'Select your graduation year').click();

        cy.wait(1000);

        cy.get('*').contains(currentYear.toString()).click();

        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary.ripple').should('be.visible').click();

    });

    afterEach(() => {
        cy.get('body').then(($body) => {
            if ($body.find('img.arrow-icon').length > 0) {
                cy.get('img.arrow-icon').first().click();
                cy.contains('span.link-text', 'Log Out').click();
            }
        });

    });
*/
});
