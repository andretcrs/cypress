/* global cy, Cypress */
import { checkoutPage } from './pages/checkout.page'

class ComandosComuns {
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

  validarQuantidadeCarrinho (quantidade) {
    if (quantidade === 0 || quantidade === null) {
      cy.get('.shopping_cart_badge').should('not.exist')
    } else {
      cy.get('.shopping_cart_badge')
        .should('be.visible')
        .and('have.text', quantidade.toString())
    }
  }

  validarCarrinhoVazio () {
    cy.get('.cart_item').should('not.exist')
    this.validarQuantidadeCarrinho(0)
  }

  validarNomeProdutoNoCarrinho (nomeEsperado) {
    cy.get('.inventory_item_name')
      .should('be.visible')
      .and('have.text', nomeEsperado)
  }

  validarPrecoProdutoNoCarrinho (precoEsperado) {
    cy.get('.inventory_item_price')
      .should('be.visible')
      .and('have.text', precoEsperado)
  }

  clicarNoItemPeloId (id) {
    cy.get(`#item_${id}_title_link`)
      .should('be.visible')
      .click()
  }

  adicionarProdutosAoCarrinho (quantidade) {
    cy.get('[data-test^="add-to-cart"]').each(($el, index) => {
      if (index < quantidade) {
        cy.wrap($el).click()
      }
    })
  }

  validarMensagemErro (mensagem) {
    cy.get(checkoutPage.errorMessage)
      .should('be.visible')
      .and('contain', mensagem)
  }

  validarSubtotal (valorEsperado) {
    cy.get('.summary_subtotal_label')
      .should('be.visible')
      .and('contain', valorEsperado)
  }

  validarImposto (valorImposto) {
    cy.get('.summary_tax_label')
      .should('be.visible')
      .and('contain', valorImposto)
  }

  validarTotalFinal (valorTotal) {
    cy.get('.summary_total_label')
      .should('be.visible')
      .and('contain', valorTotal)
  }

  executarComValoresCalculados (callback) {
    cy.get('.inventory_item_price').first().invoke('text').then((textoPreco) => {
      const subtotal = parseFloat(textoPreco.replace('$', ''))
      const imposto = parseFloat((subtotal * 0.08).toFixed(2))
      const totalGeral = (subtotal + imposto).toFixed(2)

      callback(subtotal, imposto, totalGeral)
    })
  }
}

export default new ComandosComuns()
