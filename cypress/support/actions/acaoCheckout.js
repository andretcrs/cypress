import { paginaCheckout } from '@pages/paginaCheckout'

export class acaoCheckout {
  preencherDados (nome, sobrenome, cep) {
    if (nome) cy.get(paginaCheckout.primeiroNome).type(nome)
    if (sobrenome) cy.get(paginaCheckout.sobreNome).type(sobrenome)
    if (cep) cy.get(paginaCheckout.codigoPostal).type(cep)
    cy.get(paginaCheckout.botaoContinue).click()
  }

  finalizarCompra () {
    cy.get(paginaCheckout.botaoFinalizar).click()
  }
  
  validarSubtotal (valorEsperado) {
    cy.get(paginaCheckout.valorItemSemImposto)
      .should('be.visible')
      .and('contain', valorEsperado)
  }

  validarImposto (valorImposto) {
    cy.get(paginaCheckout.valorImposto)
      .should('be.visible')
      .and('contain', valorImposto)
  }

  validarTotalFinal (valorTotal) {
    cy.get(paginaCheckout.valorTotalItemComImposto)
      .should('be.visible')
      .and('contain', valorTotal)
  }
}
