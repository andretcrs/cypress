export const setupTests = () => {
  beforeEach(() => {
    if (!Cypress.env('skipLogin')) {
      cy.login(
        Cypress.env('standardUser'),
        Cypress.env('password')
      )
    }
  })
}
