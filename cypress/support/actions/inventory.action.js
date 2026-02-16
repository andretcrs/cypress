import { inventoryPage } from "../pages/inventory.page"

export class InventoryAction {

  validarHome() {
    cy.get(inventoryPage.title).should("have.text", "Products")
  }

  adicionarProduto() {
    cy.get(inventoryPage.addBackpack).click()
  }

  acessarCarrinho() {
    cy.get(inventoryPage.cartIcon).click()
  }

}
