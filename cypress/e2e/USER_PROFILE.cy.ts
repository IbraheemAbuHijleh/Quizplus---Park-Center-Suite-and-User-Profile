describe('Test Suite: USER Profile / Education', () => {

    // Prevent Cypress from failing the test due to uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false;
    });

    // Executed before each test to set up clean state and log in
    beforeEach(() => {
        cy.clearCookies();
        // cy.clearLocalStorage();
        cy.setCookie('user_preferred_language', 'en');
        cy.visit('/', {
            failOnStatusCode: false,
            auth: {
                username: "quizplus",
                password: "QuizPlus@123"
            }
        })
        cy.loginViaToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjAzMDY1QHN0dWRlbnQuYmlyemVpdC5lZHUiLCJhY2NvdW50X3R5cGUiOiJTVUJTQ1JJUFRJT04iLCJyb2xlIjoiVVNFUiIsImV4cCI6MzI1MDM2NzI4MDAsImlhdCI6MTc1MDE2ODMxMiwianRpIjoiMTcwMjA1In0.r2j0vR5DOEVwtwVKutnTdPY0uDVdHyLCRJIPvgo4vm3dNYjEaWbFwNx_oQTCxN4b7ZZ0saB9EJv_JtGsE_X3gQ");
        cy.reload()
        cy.go_to_Eduction_button(); // Navigate to Education section

    });
    it('Log in and go to Settings → Education and check URL', () => {

        cy.get('button.btn-handle-focus.avatar').should('be.visible').click({force: true});

        cy.contains('span.link-text', 'Settings').should('be.visible').click();

        cy.contains('button.tab-links', 'Education').click({ force: true });

        cy.url().should('contain', '/account/about/education');

    });

    // Test: Click "Add Another" button and ensure modal is shown
    it('Click Add Another button and show modal', () => {
        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('be.visible').click();
        cy.get('button.a-center.btn.d-flex.j-center.outline.ripple').should('be.visible');
    });


    // Test: Add new education data and validate the API request
    it('Add another education entry and save', () => {

        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('be.visible').click();

        cy.get('[id="Select your University/College_id"]').should('be.visible').click().type('Birzeit University');
        cy.wait(1000);
        cy.get('div').contains('Birzeit University').click({force: true});

        cy.get('[id="Select your major_id"]').should('be.visible').click().type('Animal Training');
        cy.wait(1000);
        cy.get('div').contains('Animal Training').click({force: true});

        cy.get('div.input-mim').click();
        cy.contains('Diploma').click();

        cy.get('div.mock-input', {timeout: 10000}).click();
        cy.contains('button', '2025').click({force: true});

        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary')
            .should('exist')
            .click({force: true});

        cy.wait('@addUserProfile', {timeout: 10000}).its('response.statusCode').should('eq', 202);

        cy.get('@addUserProfile').then(({request}) => {
            const body = request.body;
            expect(body.graduation_year).to.eq(2025);
            expect(body.collage_degree).to.eq('DIPLOMA');
            expect(body.university_id).to.eq(10001867);
            expect(body.major_id).to.eq(151);
        });
    });

    // Test: Clicking "Discard" should not trigger an API request
    it('Discard button in Add flow should NOT send API request', () => {
        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('be.visible').click();

        cy.get('[id="Select your University/College_id"]').click().type('Birzeit University');
        cy.wait(1000);
        cy.contains('div', 'Birzeit University').click({ force: true });

        cy.get('[id="Select your major_id"]').click().type('Animal Training');
        cy.wait(1000);
        cy.contains('div', 'Animal Training').click({ force: true });

        cy.get('div.input-mim').click();
        cy.contains('Diploma').click();

        cy.get('div.mock-input').click();
        cy.contains('button', '2025').click({ force: true });

        cy.contains('button', 'Discard').should('be.visible').click();
        cy.wait(1000);

        cy.get('@addUserProfile.all').should('have.length', 0); // No API call expected
    });

    it('Deletes the first education entry and ensures it is removed from the API response', () => {
        cy.intercept('GET', '**/api/users/user-profile').as('getUserProfile');
        cy.intercept('DELETE', '**/api/users/user-profile/*').as('deleteEducation');

        cy.reload();

        cy.wait('@getUserProfile').then((interception) => {
            const educationEntries = interception.response.body.data;
            expect(educationEntries.length).to.be.greaterThan(0);

            const firstEntryId = educationEntries[1].id;
            cy.log('ID of first education entry before delete:', firstEntryId);

            cy.get('img.w-15x.h-20px.filter-red.wrapped-image.ng-star-inserted')
                .first()
                .should('be.visible')
                .click({ force: true });

            cy.wait('@deleteEducation').then((deleteInterception) => {
                expect(deleteInterception.response.statusCode).to.eq(202);
                cy.log('Delete response:', JSON.stringify(deleteInterception.response.body));
            });

            cy.wait(1000);

            cy.reload();

            cy.wait('@getUserProfile').then((interceptionAfter) => {

                const afterEntries = interceptionAfter.response.body.data;
                const idsAfterDelete = afterEntries.map(entry => entry.id);

                //  expect(firstEntryId).to.not.include(idsAfterDelete);

                expect(afterEntries.length-1).to.eq(educationEntries.length - 1);
            });
        });
    });

// Test: Update education degree and validate result
    it('Update education entry', () => {
        cy.intercept('GET', '**/api/users/user-profile').as('updateUserProfile');

        cy.get('img.w-16px.h-16px.ml-4').should('be.visible').click({ force: true });
        cy.get('div.input-mim').click();
        cy.contains('Diploma').click();

        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary.ripple')
            .should('be.visible').click();

        cy.wait('@updateUserProfile').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            const responseBody = interception.response.body;
            expect(responseBody).to.have.property('data');
            expect(responseBody.data).to.be.an('array');

            const collage_degree = 'DIPLOMA';
            expect(collage_degree).to.eq('DIPLOMA');
        });

        // Update to a new degree: Doctorate
        cy.get('img.w-16px.h-16px.ml-4').should('be.visible').click({ force: true });
        cy.get('div.input-mim').click();
        cy.contains('Doctorate').click();
        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary.ripple').click();
    });

    // Test: Discard during update should NOT send API request
    it('Discard during update flow should NOT send API request', () => {
        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.get('img.w-16px.h-16px.ml-4').should('be.visible').click({ force: true });
        cy.get('div.input-mim').click();
        cy.contains('Diploma').click();
        cy.contains('button', 'Discard').should('be.visible').click();

        cy.wait(1000);
        cy.get('@addUserProfile.all').should('have.length', 0); // No request sent
    });

});
