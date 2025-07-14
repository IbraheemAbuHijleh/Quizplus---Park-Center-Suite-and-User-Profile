// =====================================
// Test Suite: USER Profile / Education
// =====================================
describe('Test Suite: USER Profile / Education', () => {

    // Handle uncaught exceptions to avoid test failure
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false;
    });

    // Login and navigate before each test
    beforeEach(() => {
        cy.clearCookies();
        cy.setCookie('user_preferred_language', 'en');
        cy.visit('/', {
            failOnStatusCode: false,
            auth: {
                username: "quizplus",
                password: "QuizPlus@123"
            }
        });
        cy.loginViaToken("YOUR_FIRST_TOKEN_HERE");
        cy.reload();
        cy.go_to_Eduction_button(); // Navigate to Education section
    });

    it('Navigates to Education tab and checks URL', () => {
        cy.get('button.btn-handle-focus.avatar').should('be.visible').click({ force: true });
        cy.contains('span.link-text', 'Settings').click();
        cy.contains('button.tab-links', 'Education').click({ force: true });
        cy.url().should('contain', '/account/about/education');
    });

    it('Opens Add Another modal', () => {
        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('be.visible').click();
        cy.get('button.a-center.btn.d-flex.j-center.outline.ripple').should('be.visible');
    });

    it('Adds new education entry and verifies API payload', () => {
        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.addEducationEntry({
            university: 'Birzeit University',
            major: 'Animal Training',
            degree: 'Diploma',
            year: '2025'
        });

        cy.wait('@addUserProfile').its('response.statusCode').should('eq', 202);

        cy.get('@addUserProfile').then(({ request }) => {
            const body = request.body;
            expect(body.graduation_year).to.eq(2025);
            expect(body.collage_degree).to.eq('DIPLOMA');
            expect(body.university_id).to.eq(10001867);
            expect(body.major_id).to.eq(151);
        });
    });

    it('Discards education form and ensures no API call is made', () => {
        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.addEducationEntry({
            university: 'Birzeit University',
            major: 'Animal Training',
            degree: 'Diploma',
            year: '2025',
            discard: true
        });

        cy.wait(1000);
        cy.get('@addUserProfile.all').should('have.length', 0);
    });

    it('Deletes an education entry and verifies it is removed', () => {
        cy.intercept('GET', '**/api/users/user-profile').as('getUserProfile');
        cy.intercept('DELETE', '**/api/users/user-profile/*').as('deleteEducation');

        cy.reload();
        let Id_Before_Delete = 0;

        cy.wait('@getUserProfile').then((interception) => {
            const educationEntries = interception.response.body.data;
            expect(educationEntries.length).to.be.greaterThan(0);
            Id_Before_Delete = educationEntries[1].id;
        });

        cy.get('img.w-15x.h-20px.filter-red.wrapped-image.ng-star-inserted')
            .first().click({ force: true });

        cy.wait('@deleteEducation').its('response.statusCode').should('eq', 202);

        cy.reload();
        cy.intercept('GET', '**/api/users/user-profile').as('getUserProfile2');

        cy.wait('@getUserProfile2').then((interceptionAfter) => {
            const educationEntries = interceptionAfter.response.body.data;
            const deleted = educationEntries.every(entry => entry.id !== Id_Before_Delete);
            expect(deleted).to.be.true;
        });
    });
});

// ==========================================
// Test Suite: Update Education from Another Account
// ==========================================
describe('Update education using another Account', () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.setCookie('user_preferred_language', 'en');
        cy.visit('/', {
            failOnStatusCode: false,
            auth: {
                username: "quizplus",
                password: "QuizPlus@123"
            }
        });
        cy.loginViaToken("YOUR_SECOND_TOKEN_HERE");
        cy.reload();
        cy.go_to_Eduction_button();
    });

    it('Adds education entry with another account', () => {
        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.addEducationEntry({
            university: 'Birzeit University',
            major: 'Computer Since ',
            degree: 'Diploma',
            year: '2025'
        });

        cy.wait('@addUserProfile').its('response.statusCode').should('eq', 202);

        cy.get('@addUserProfile').then(({ request }) => {
            const body = request.body;
            expect(body.graduation_year).to.eq(2025);
            expect(body.collage_degree).to.eq('DIPLOMA');
            expect(body.university_id).to.eq(10001867);
            expect(body.major_id).to.eq(4);
        });
    });

    it('Updates degree and verifies update request', () => {
        cy.intercept('GET', '**/api/users/user-profile').as('updateUserProfile');

        cy.get('img.w-16px.h-16px.ml-4').first().click({ force: true });
        cy.get('div.input-mim').click();
        cy.contains('Bachelor').click();

        cy.get('button.a-center.btn.d-flex.edit-btn.j-center.primary.ripple').first().click({ force: true });

        cy.wait('@updateUserProfile').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.data).to.be.an('array');
        });
    });

    it('Discards update and verifies no API request', () => {
        cy.intercept('POST', '**/api/users/user-profile').as('addUserProfile');

        cy.get('img.w-16px.h-16px.ml-4').first().click({ force: true });
        cy.get('div.input-mim').click();
        cy.contains('Diploma').click();
        cy.contains('button', 'Discard').click();

        cy.wait(1000);
        cy.get('@addUserProfile.all').should('have.length', 0);
    });
});
