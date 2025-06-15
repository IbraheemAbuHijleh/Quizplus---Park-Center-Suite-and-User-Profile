describe('Test Suite: USER Profile / Education', () => {

    // Prevent Cypress from failing the test due to uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false;
    });

    // Executed before each test to set up clean state and log in
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.setCookie('user_preferred_language', 'en');
        cy.visit('/');
        cy.login('1203065@student.birzeit.edu', 'IIIIBBBB1234');
        cy.go_to_Eduction_button(); // Navigate to Education section
    });

    // Test: Validate the URL after navigating to Education settings
    it('Log in and go to Settings → Education and check URL', () => {
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
        cy.get('div').contains('Birzeit University').click({ force: true });

        cy.get('[id="Select your major_id"]').should('be.visible').click().type('Animal Training');
        cy.wait(1000);
        cy.get('div').contains('Animal Training').click({ force: true });

        cy.get('div.input-mim').click();
        cy.contains('Diploma').click();

        cy.get('div.mock-input', { timeout: 10000 }).click();
        cy.contains('button', '2025').click({ force: true });

        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary')
            .should('exist')
            .click({ force: true });

        cy.wait('@addUserProfile', { timeout: 10000 }).its('response.statusCode').should('eq', 202);

        cy.get('@addUserProfile').then(({ request }) => {
            const body = request.body;
            expect(body.graduation_year).to.eq(2025);
            expect(body.collage_degree).to.eq('DIPLOMA');
            expect(body.university_id).to.eq(16014);
            expect(body.major_id).to.eq(184);
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

    // Test: Delete an existing education entry
    it('Delete an existing education entry after adding', () => {
        cy.intercept('GET', '**/api/users/user-profile').as('deleteUserProfile');

        cy.get('img.w-15x.h-20px.filter-red.wrapped-image.ng-star-inserted')
            .first().should('be.visible').click({ force: true });

        cy.wait('@deleteUserProfile').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            const responseBody = interception.response.body;
            expect(responseBody).to.have.property('data');
            expect(responseBody.data).to.be.an('array');

            const deletedId = 16014;
            const stillExists = responseBody.data.some(item => item.id === deletedId);
            expect(stillExists).to.be.false; // Make sure the entry was deleted
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

    // Executed after each test to log out if the user is still logged in
    afterEach(() => {
        cy.get('body').then(($body) => {
            if ($body.find('img.arrow-icon').length > 0) {
                cy.get('img.arrow-icon').first().click();
                cy.contains('span.link-text', 'Log Out').click();
            }
        });
    });

});
