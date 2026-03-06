import { paginaCarrinho } from '@pages/paginaCarrinho';
import { paginaInventario } from '@pages/paginaInventario';

export class acaoCarrinho {
  removerProduto () {
    cy.get(paginaCarrinho.BtnRemover).click()
  }

  clicarCheckout () {
    cy.get(paginaCarrinho.BtnCheckout).click()
  }

  adicionarProdutosAoCarrinho (quantidade) {
    cy.get(paginaCarrinho.btnRemoverProduto).each(($el, index) => {
      if (index < quantidade) {
        cy.wrap($el).click()
      }
    })
  }

  validarQuantidadeCarrinho (quantidade) {
    if (quantidade === 0 || quantidade === null) {
      cy.get(paginaCarrinho.qtdeItemCarrinho).should('not.exist')
    } else {
      cy.get(paginaCarrinho.qtdeItemCarrinho)
        .should('be.visible')
        .and('have.text', quantidade.toString())
    }
  }

  validarCarrinhoVazio () {
    cy.get(paginaCarrinho.itemCarrinho).should('not.exist')
    this.validarQuantidadeCarrinho(0)
  }

  validarNomeProdutoNoCarrinho (nomeEsperado) {
    cy.get(paginaCarrinho.nomeItemCarrinho)
      .should('be.visible')
      .and('have.text', nomeEsperado)
  }

  validarPrecoProdutoNoCarrinho (precoEsperado) {
    cy.get(paginaCarrinho.precoItemCarrinho)
      .should('be.visible')
      .and('have.text', precoEsperado)
  }

  executarComValoresCalculados (callback) {
    cy.get(paginaCarrinho.precoItemCarrinho).first().invoke('text').then((textoPreco) => {
      const subtotal = parseFloat(textoPreco.replace('$', ''))
      const imposto = parseFloat((subtotal * 0.08).toFixed(2))
      const totalGeral = (subtotal + imposto).toFixed(2)

      callback(subtotal, imposto, totalGeral)
    })
  }

  acessarCarrinho () {
    cy.get(paginaInventario.iconeCarrinho).click()
  }
}
