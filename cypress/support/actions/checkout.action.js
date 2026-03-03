import { checkoutPage } from '../pages/checkout.page'

export class CheckoutAction {
  preencherDados (nome, sobrenome, cep) {
    if (nome) cy.get(checkoutPage.primeiroNome).type(nome)
    if (sobrenome) cy.get(checkoutPage.sobreNome).type(sobrenome)
    if (cep) cy.get(checkoutPage.codigoPostal).type(cep)
    cy.get(checkoutPage.botaoContinue).click()
  }

  finalizarCompra () {
    cy.get(checkoutPage.botaoFinalizar).click()
  }

  validarSucesso () {
    cy.get(checkoutPage.successoHeader).should('have.text', 'Thank you for your order!')
  }

  validarSubtotal (valorEsperado) {
    cy.get(checkoutPage.valorItemSemImposto)
      .should('be.visible')
      .and('contain', valorEsperado)
  }

  validarImposto (valorImposto) {
    cy.get(checkoutPage.valorImposto)
      .should('be.visible')
      .and('contain', valorImposto)
  }

  validarTotalFinal (valorTotal) {
    cy.get(checkoutPage.valorTotalItemComImposto)
      .should('be.visible')
      .and('contain', valorTotal)
  }
}
