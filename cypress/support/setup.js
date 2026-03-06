export const setupTests = (options = {}) => {
  beforeEach(() => {
    if (!options.skipLogin) {
      cy.login(
        Cypress.env('standardUser'),
        Cypress.env('password')
      )
    }
  })
}