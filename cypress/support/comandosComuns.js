import { paginaCheckout } from '@pages/paginaCheckout.js'

class comandosComuns {
  validarURl (path) {
    const baseUrl = Cypress.config('baseUrl')
    cy.url().should('eq', `${baseUrl}${path}`)
  }

  validarMensagem (mensagem) {
    cy.contains(mensagem).should('be.visible')
  }

  clicarNoTexto (texto) {
    cy.contains(texto).click()
  }

  clicarNoBotaoComTexto (texto) {
    cy.contains('button', texto)
      .should('be.visible')
      .click()
  }

  clicarNoDataTest (valor) {
    cy.get(`[data-test="${valor}"]`)
      .should('be.visible')
      .click()
  }

  abrirMenuLateral () {
    cy.get('#react-burger-menu-btn')
      .should('be.visible')
      .click()
  }

  clicarNoItemPeloId (id) {
    cy.get(`#item_${id}_title_link`)
      .should('be.visible')
      .click()
  }

  validarMensagemErro (mensagem) {
  cy.get(paginaCheckout.elements.mensagemErro)
    .should('be.visible')
    .and('contain', mensagem)
}
}

export default new comandosComuns()
