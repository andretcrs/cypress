const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({

  viewportWidth: 1280,
  viewportHeight: 720,

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,

  video: true,
  screenshotOnRunFailure: true,

  chromeWebSecurity: false,

  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {

    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {

      // ✅ ALLURE
      allureWriter(on, config);

      // 🌍 MULTI-ENV
      const environments = {
        dev: "https://www.saucedemo.com",
        hml: "https://www.saucedemo.com",
      };

      const environment = config.env.environment || "dev";
      config.baseUrl = environments[environment];

      return config;
    },

    baseUrl: "https://www.saucedemo.com",

    env: {
      allure: true,
      allureReuseAfterSpec: true,

      environment: "dev",

      standardUser: "standard_user",
      password: "secret_sauce",
    },
  },
});
