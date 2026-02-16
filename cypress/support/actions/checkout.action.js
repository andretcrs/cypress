import { checkoutPage } from "../pages/checkout.page"

export class CheckoutAction {

  preencherDados() {
    cy.get(checkoutPage.firstName).type("QA")
    cy.get(checkoutPage.lastName).type("Automation")
    cy.get(checkoutPage.postalCode).type("12345")
    cy.get(checkoutPage.continueBtn).click()
  }

  finalizarCompra() {
    cy.get(checkoutPage.finishBtn).click()
  }

  validarSucesso() {
    cy.get(checkoutPage.successMsg)
      .should("have.text", "Thank you for your order!")
  }

}
