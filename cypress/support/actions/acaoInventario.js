import { paginaInventario } from '@pages/paginaInventario.js'

export class acaoInventario {
  
  adicionarPrimeiroProdutoEGuardarDados() {
  let dadosProduto = {};

  return cy.get(paginaInventario.nomeProduto).first()
    .invoke('text')
    .then((nome) => {
      dadosProduto.nome = nome.trim();

      return cy.get(paginaInventario.itemContainer).first().within(() => {
        cy.get(paginaInventario.precoProduto).invoke('text').then((preco) => {
          dadosProduto.preco = preco.trim();
          this.adicionarProduto(); 
        });
      }).then(() => {
        return dadosProduto;
      });
    });
}
  adicionarProduto () {
    cy.get(paginaInventario.adicionarCarrinho).first().click()
  }

  removerProduto () {
    cy.get(paginaInventario.removerCarrinho).click()
  }

  ordenarProdutos (value) {
    cy.get(paginaInventario.ordenarProdutos).select(value)
  }

  validarCarrinhoVazio () {
    cy.get(paginaInventario.carrinhoBadge).should('not.exist')
  }
}