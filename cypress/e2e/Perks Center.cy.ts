require('cypress-xpath');

describe('Quizplus - Perks Center Suite', () => {

    // Ignore uncaught exceptions to prevent test failures
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    // Run before each test: clear cookies, local storage, and set preferred language
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.setCookie('user_preferred_language', 'en');
        cy.visit('https://quizplus.com/');
    });

    // 1. Verify that the main URL loads successfully
    it('Main URL should load correctly', () => {
        cy.url().should('include', 'quizplus.com');
        cy.document().should('exist');
    });

    // 2. Navigate to Perks Center and verify the URL
    it('Redirect to Perks Center page and check URL', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.url().should('include', 'perks-center');
    });

    // 3. Click the first discount card and check if URL updates (e.g., to Grammarly)
    it('Clicking a discount card should navigate to correct URL', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.get('.discount-amount').first().click();
        cy.url().should('include', '/grammarly');
    });

    // 4. Click "Join Us" button and ensure it redirects to Sign Up page
    it('Join Us button should lead to Sign Up page', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.contains('Join us now').should('be.visible').click();
        cy.contains('Sign Up').should('exist');
    });

    // 5. Click "View Details" → "Get Offer" → Should show Sign Up
    it('View Details and Get Offer buttons work as expected', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.contains('View Details').should('be.visible').click();
        cy.contains('Get Offer').should('be.visible').click();
        cy.contains('Sign Up').should('exist');
    });

    // 6. Click on card → "Get Offer" → Should show Sign Up
    it('Card and Get Offer buttons work as expected', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.get('.discount-amount').first().click();
        cy.contains('Get Offer').should('be.visible').click();
        cy.contains('Sign Up').should('exist');
    });

    // 7. Join Us → Log In → Check that URL is updated and "Join Us" disappears
    it('Click Join Us then perform Login and update URL', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.contains('Join us now').should('be.visible').click();
        cy.get('#email').type('1203065@student.birzeit.edu');
        cy.get('#password').type('IIIIBBBB1234');
        cy.get('[data-cy="auth-btn"]').click();
        cy.url().should('include', 'perks-center');
        cy.contains('Join us now').should('not.be.visible');
    });

    // 8. View Details → Get Offer → Log In → Check if PayPal button appears
    it('Click Offer then perform Login', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.contains('View Details').should('be.visible').click();
        cy.contains('Get Offer').should('be.visible').click();
        cy.get('#email').type('1203065@student.birzeit.edu');
        cy.get('#password').type('IIIIBBBB1234');
        cy.get('[data-cy="auth-btn"]').click();
        cy.wait(1000);
        cy.get('button.paypal-btn.pointer.ng-tns-c4145632871-2', { timeout: 10000 }).should('be.visible');
    });

    // 9. Card → Get Offer → Log In → PayPal button should appear
    it('Card → Get Offer → Login works as expected', () => {
        cy.scrollTo('bottom');
        cy.contains('Perks Center').should('be.visible').click();
        cy.get('.discount-amount').first().click();
        cy.contains('Get Offer').should('be.visible').click();
        cy.get('#email').type('1203065@student.birzeit.edu');
        cy.get('#password').type('IIIIBBBB1234');
        cy.get('[data-cy="auth-btn"]').click();
        cy.wait(1000);
        cy.get('button.paypal-btn.pointer.ng-tns-c4145632871-2', { timeout: 10000 }).should('be.visible');
    });

    // 10. Log in directly, go to Perks Center, access an offer and verify PayPal button
    it('should log in and go to Perks Center and access a discounted offer', () => {

             cy.login('1203065@student.birzeit.edu','IIIIBBBB1234')

            cy.url().should('include', '/dashboard').then((currentUrl) => {
            const newUrl = currentUrl.replace('/dashboard', '/perks-center');
            cy.visit(newUrl);

            cy.get('.discount-amount',  { timeout: 5000 }).first().should('be.visible').click();
            cy.contains('Get Offer').should('be.visible').click();
            cy.get('button.paypal-btn.pointer', { timeout: 30000 }).should('be.visible');
        });
    });

});
