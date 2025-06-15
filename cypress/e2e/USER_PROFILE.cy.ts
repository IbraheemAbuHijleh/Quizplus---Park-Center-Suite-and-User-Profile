
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

    });


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


    afterEach(() => {
        cy.get('body').then(($body) => {
            if ($body.find('img.arrow-icon').length > 0) {
                cy.get('img.arrow-icon').first().click();
                cy.contains('span.link-text', 'Log Out').click();
            }
        });


});
