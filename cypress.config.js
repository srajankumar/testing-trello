const { defineConfig } = require("cypress");
async function setupNodeEvents(on, config) {
  // implement node event listeners here
  return config;
}
module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    // specPattern: "cypress/test/test.cy.js",
    // specPattern: "cypress/test/*.cy.js",
    // the below one is for skill lab testing workshop
    // specPattern: "cypress/api/*.cy.js",
    specPattern: "cypress/integration/APITest/*.cy.js",
  },
});
