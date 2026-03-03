import { inventoryPage } from '../pages/inventory.page'

export class InventoryAction {
  
  adicionarPrimeiroProdutoEGuardarDados() {
  let dadosProduto = {};

  return cy.get(inventoryPage.nomeProduto).first()
    .invoke('text')
    .then((nome) => {
      dadosProduto.nome = nome.trim();

      return cy.get(inventoryPage.itemContainer).first().within(() => {
        cy.get(inventoryPage.precoProduto).invoke('text').then((preco) => {
          dadosProduto.preco = preco.trim();
          this.adicionarProduto(); 
        });
      }).then(() => {
        return dadosProduto;
      });
    });
}
  adicionarProduto () {
    cy.get(inventoryPage.adicionarCarrinho).first().click()
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