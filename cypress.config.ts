import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 100000,
  e2e: {
    baseUrl:'https://testing.quizplusdev.com/',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});