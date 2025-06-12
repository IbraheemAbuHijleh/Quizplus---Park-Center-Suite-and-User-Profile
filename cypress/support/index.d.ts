/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to login to Quizplus
         * @param email User email
         * @param password User password
         */
        login(email: string, password: string): Chainable<void>;
    }
}