const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,

  video: false,
  screenshotOnRunFailure: true,

  chromeWebSecurity: false,

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      // 1. Configuração do Webpack Preprocessor
      const options = {
        // Importa as configurações de caminhos (aliases) do arquivo separado
        webpackOptions: require('./webpack.config.js'), 
      }
      on('file:preprocessor', webpackPreprocessor(options))

      // 2. Configuração do Allure
      allureWriter(on, config)

      // 3. Lógica de Ambientes
      const environments = {
        dev: 'https://www.saucedemo.com',
        hml: 'https://www.saucedemo.com'
      }

      const environment = config.env.environment || 'dev'
      config.baseUrl = environments[environment]

      return config
    },

    env: {
      allure: true,
      allureReuseAfterSpec: true,
      environment: 'dev'
    }
  }
})