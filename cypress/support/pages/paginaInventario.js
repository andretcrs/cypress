export const paginaInventario = {
  elements: {
    itemContainer: '.inventory_item',
    nomeProduto: '[data-test="inventory-item-name"]',
    precoProduto: '.inventory_item_price',
    btnAdicionarCarrinho: '[data-test^="add-to-cart"]', 
    btnRemoverCarrinho: '[data-test^="remove"]',
    iconeCarrinho: '.shopping_cart_link',
    carrinhoBadge: '.shopping_cart_badge',
    selectOrdenar: '[data-test="product_sort_container"]'
  },

  adicionarPrimeiroProdutoEGuardarDados() {
    let dadosProduto = {};

    return cy.get(this.elements.nomeProduto).first()
      .invoke('text')
      .then((nome) => {
        dadosProduto.nome = nome.trim();

        return cy.get(this.elements.itemContainer).first().within(() => {
          cy.get(this.elements.precoProduto).invoke('text').then((preco) => {
            dadosProduto.preco = preco.trim();
            this.adicionarProduto(); 
          });
        }).then(() => {
          return dadosProduto;
        });
      });
  },

  adicionarProduto() {
    cy.get(this.elements.btnAdicionarCarrinho).first().click()
  },

  removerProduto() {
    cy.get(this.elements.btnRemoverCarrinho).click()
  },

  ordenarProdutos(value) {
    cy.get(this.elements.selectOrdenar).select(value)
  },

  validarCarrinhoVazio() {
    cy.get(this.elements.carrinhoBadge).should('not.exist')
  }
}