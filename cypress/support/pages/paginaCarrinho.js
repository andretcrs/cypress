import { paginaInventario } from '@pages/paginaInventario.js';

export const paginaCarrinho = {
 
  elements: {
    btnCheckout: '[data-test="checkout"]',
    btnRemover: '[data-test^="remove-"]',
    btnAdicionarAoCarrinho: '[data-test^="add-to-cart"]',
    badgeQuantidade: '.shopping_cart_badge',
    itemNoCarrinho: '.cart_item',
    nomeItem: '.inventory_item_name',
    precoItem: '.inventory_item_price',
  },

  removerProduto() {
    cy.get(this.elements.btnRemover).click()
  },

  clicarCheckout() {
    cy.get(this.elements.btnCheckout).click()
  },

  adicionarProdutosAoCarrinho(quantidade) {
    cy.get(this.elements.btnAdicionarAoCarrinho).each(($el, index) => {
      if (index < quantidade) {
        cy.wrap($el).click()
      }
    })
  },

  validarQuantidadeCarrinho(quantidade) {
    if (quantidade === 0 || !quantidade) {
      cy.get(this.elements.badgeQuantidade).should('not.exist')
    } else {
      cy.get(this.elements.badgeQuantidade)
        .should('be.visible')
        .and('have.text', quantidade.toString())
    }
  },

  validarCarrinhoVazio() {
    cy.get(this.elements.itemNoCarrinho).should('not.exist')
    this.validarQuantidadeCarrinho(0)
  },

  validarNomeProdutoNoCarrinho(nomeEsperado) {
    cy.get(this.elements.nomeItem)
      .should('be.visible')
      .and('have.text', nomeEsperado)
  },

  validarPrecoProdutoNoCarrinho(precoEsperado) {
    cy.get(this.elements.precoItem)
      .should('be.visible')
      .and('have.text', precoEsperado)
  },

  executarComValoresCalculados(callback) {
    cy.get(this.elements.precoItem).first().invoke('text').then((textoPreco) => {
      const subtotal = parseFloat(textoPreco.replace('$', ''))
      const imposto = parseFloat((subtotal * 0.08).toFixed(2))
      const totalGeral = (subtotal + imposto).toFixed(2)

      callback(subtotal, imposto, totalGeral)
    })
  },

  acessarCarrinho() {
    cy.get(paginaInventario.elements.iconeCarrinho).click()
  }
}