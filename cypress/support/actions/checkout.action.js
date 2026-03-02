/* global cy */
import { checkoutPage } from '../pages/checkout.page'

export class CheckoutAction {
  preencherDados (nome, sobrenome, cep) {
    if (nome) cy.get(checkoutPage.firstName).type(nome)
    if (sobrenome) cy.get(checkoutPage.lastName).type(sobrenome)
    if (cep) cy.get(checkoutPage.postalCode).type(cep)
    cy.get(checkoutPage.continueBtn).click()
  }

  finalizarCompra () {
    cy.get(checkoutPage.finishBtn).click()
  }

  validarSucesso () {
    cy.get(checkoutPage.successHeader).should('have.text', 'Thank you for your order!')
  }
}
