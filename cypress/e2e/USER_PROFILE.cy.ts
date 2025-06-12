

describe('Test Suit USER Profile /Education', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception:', err.message);
        return false;
    });



    it('Log in and go Settings and enter Education and check URL', () => {

        cy.clearCookies();

        cy.clearLocalStorage();

        cy.setCookie('user_preferred_language', 'en');

        cy.visit('/');

        cy.get('[data-cy="loginCTA-header"]', { timeout: 5000 }).should('be.visible').click();

        cy.get('[data-cy="app-auth-modal"]').should('be.visible')

        cy.get('#email', { timeout: 50000 }).should('be.visible').type('1203065@student.birzeit.edu');

        cy.get('#password', { timeout: 50000 }).should('be.visible').type('IIIIBBBB1234');

        cy.get('[data-cy="auth-btn"]').should('be.visible').click();

        cy.get('img.arrow-icon').first().should('be.visible').click();

        cy.contains('span.link-text', 'Settings').should('be.visible').click();

        cy.contains('button.tab-links', 'Education').click({ force: true });

        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('exist');

        cy.url().should('contain','/account/about/education')
    });
    it('Click Buttoun and Show Model ',() =>{

        cy.clearCookies();

        cy.clearLocalStorage();

        cy.setCookie('user_preferred_language', 'en');

        cy.visit('/');

        cy.get('[data-cy="loginCTA-header"]', { timeout: 5000 }).should('be.visible').click();
        cy.get('[data-cy="app-auth-modal"]').should('be.visible').click();

        cy.get('#email', { timeout: 50000 }).should('be.visible').type('1203065@student.birzeit.edu');

        cy.get('#password', { timeout: 50000 }).should('be.visible').type('IIIIBBBB1234');

        cy.get('[data-cy="auth-btn"]').should('be.visible').click();

        cy.get('img.arrow-icon').first().should('be.visible').click();

        cy.contains('span.link-text', 'Settings').should('be.visible').click();

        cy.contains('button.tab-links', 'Education').click({ force: true });

        cy.get('button.a-center.btn.d-flex.img-wrapper-hover-supported-primary-to-white.j-center.outline.ripple')
            .should('be.visible').click();

        cy.get('button.a-center.btn.d-flex.j-center.outline.ripple').should('exist');
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

        cy.get('div.col-md-6.mb-4').eq(3).should('contain','');

        cy.get('div.col-md-6.mb-4').eq(4).should('contain','');

        cy.get('div.col-md-6.mb-4').eq(5).should('contain','');

        cy.get('div.edu-info.font-weight-bold.ng-star-inserted').eq(1).should('contain','');
    });

    it('after click eduction the data show correct If the user has not entered data before',() =>{

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
            .should('exist');

        cy.get('div.col-md-6.mb-4').eq(3).should('contain','Bethel College');

        cy.get('div.col-md-6.mb-4').eq(4).should('contain','Diploma');

        cy.get('div.col-md-6.mb-4').eq(5).should('contain','Biophysics');

        cy.get('div.edu-info.font-weight-bold.ng-star-inserted').eq(7).should('contain','2025');

    });

    it('after click eduction the data show correct If the user has not entered data before',() =>{

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

});
