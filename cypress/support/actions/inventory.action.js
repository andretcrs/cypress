import { inventoryPage } from "../pages/inventory.page"

export class InventoryAction {

  validarHome() {
    cy.get(inventoryPage.title).should("have.text", "Products")
  }

  adicionarProduto() {
    cy.get(inventoryPage.addBackpack).click()
  }

  removerProduto() {
    cy.get(inventoryPage.removeBackpack).click()
  }

  acessarCarrinho() {
    cy.get(inventoryPage.cartIcon).click()
  }

  ordenarProdutos(value) {
    cy.get(inventoryPage.sortContainer).select(value)
  }

  validarCarrinhoVazio() {
    cy.get(inventoryPage.cartBadge).should('not.exist')
  }
}