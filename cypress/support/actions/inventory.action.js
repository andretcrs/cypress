import { inventoryPage } from '../pages/inventory.page'

export class InventoryAction {
  adicionarProduto () {
    cy.get(inventoryPage.adicionarCarrinho).click()
  }

  removerProduto () {
    cy.get(inventoryPage.removerCarrinho).click()
  }

  ordenarProdutos (value) {
    cy.get(inventoryPage.ordenarProdutos).select(value)
  }

  validarCarrinhoVazio () {
    cy.get(inventoryPage.carrinhoBadge).should('not.exist')
  }
}
