export const paginaCheckout = {
  elements: {
    primeiroNome: '[data-test="firstName"]',
    sobreNome: '[data-test="lastName"]',
    codigoPostal: '[data-test="postalCode"]',
    botaoContinue: '[data-test="continue"]',
    mensagemErro: '[data-test="error"]',
    botaoFinalizar: '[data-test="finish"]',
    successoHeader: '.complete-header',
    valorImposto: '.summary_tax_label',
    valorItemSemImposto: '.summary_subtotal_label',
    valorTotalItemComImposto: '.summary_total_label'
  },

  preencherDados(nome, sobrenome, cep) {
    if (nome) cy.get(this.elements.primeiroNome).type(nome)
    if (sobrenome) cy.get(this.elements.sobreNome).type(sobrenome)
    if (cep) cy.get(this.elements.codigoPostal).type(cep)
    cy.get(this.elements.botaoContinue).click()
  },

  finalizarCompra() {
    cy.get(this.elements.botaoFinalizar).click()
  },
  
  validarSubtotal(valorEsperado) {
    cy.get(this.elements.valorItemSemImposto)
      .should('be.visible')
      .and('contain', valorEsperado)
  },

  validarImposto(valorImposto) {
    cy.get(this.elements.valorImposto)
      .should('be.visible')
      .and('contain', valorImposto)
  },

  validarTotalFinal(valorTotal) {
    cy.get(this.elements.valorTotalItemComImposto)
      .should('be.visible')
      .and('contain', valorTotal)
  }
}