import { cartPage } from '../pages/cart.page'
import { inventoryPage } from '../pages/inventory.page'

export class CartAction {
  removerProduto () {
    cy.get(cartPage.BtnRemover).click()
  }

  clicarCheckout () {
    cy.get(cartPage.BtnCheckout).click()
  }

  adicionarProdutosAoCarrinho (quantidade) {
    cy.get(cartPage.btnRemoverProduto).each(($el, index) => {
      if (index < quantidade) {
        cy.wrap($el).click()
      }
    })
  }

  validarQuantidadeCarrinho (quantidade) {
    if (quantidade === 0 || quantidade === null) {
      cy.get(cartPage.qtdeItemCarrinho).should('not.exist')
    } else {
      cy.get(cartPage.qtdeItemCarrinho)
        .should('be.visible')
        .and('have.text', quantidade.toString())
    }
  }

  validarCarrinhoVazio () {
    cy.get(cartPage.itemCarrinho).should('not.exist')
    this.validarQuantidadeCarrinho(0)
  }

  validarNomeProdutoNoCarrinho (nomeEsperado) {
    cy.get(cartPage.nomeItemCarrinho)
      .should('be.visible')
      .and('have.text', nomeEsperado)
  }

  validarPrecoProdutoNoCarrinho (precoEsperado) {
    cy.get(cartPage.precoItemCarrinho)
      .should('be.visible')
      .and('have.text', precoEsperado)
  }

  executarComValoresCalculados (callback) {
    cy.get(cartPage.precoItemCarrinho).first().invoke('text').then((textoPreco) => {
      const subtotal = parseFloat(textoPreco.replace('$', ''))
      const imposto = parseFloat((subtotal * 0.08).toFixed(2))
      const totalGeral = (subtotal + imposto).toFixed(2)

      callback(subtotal, imposto, totalGeral)
    })
  }

  acessarCarrinho () {
    cy.get(inventoryPage.iconeCarrinho).click()
  }
}
