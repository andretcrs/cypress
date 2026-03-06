import { paginaInventario } from '@pages/paginaInventario.js'
import { paginaCarrinho } from '@pages/paginaCarrinho.js'
import { setupTests } from '@support/setup.js'
import comandosComuns from '@support/comandosComuns.js'
import { paginas } from '@support/rotas.js'

describe('Fluxo de Carrinho', () => {
  setupTests()

  it('Deve manter o produto no carrinho após fazer logout e login novamente', () => {
    paginaInventario.adicionarProduto()
    comandosComuns.abrirMenuLateral()
    comandosComuns.clicarNoTexto('Logout')
    cy.login(Cypress.env('standardUser'), Cypress.env('password'))
    paginaCarrinho.validarQuantidadeCarrinho(1)
  })

  it('Deve remover um produto diretamente de dentro da página do carrinho', () => {
    paginaInventario.adicionarProduto()
    paginaCarrinho.acessarCarrinho()
    comandosComuns.clicarNoDataTest('remove-sauce-labs-backpack')
    paginaCarrinho.validarCarrinhoVazio()
  })

  it('Deve limpar o carrinho ao clicar em Reset App State', () => {
    paginaInventario.adicionarProduto()
    paginaCarrinho.validarQuantidadeCarrinho(1)
    comandosComuns.abrirMenuLateral()
    comandosComuns.clicarNoTexto('Reset App State')
    paginaCarrinho.validarCarrinhoVazio()
  })

it('Deve validar se o produto adicionado corresponde ao item no carrinho', () => {
    paginaInventario.adicionarPrimeiroProdutoEGuardarDados().then((produto) => {
        paginaCarrinho.acessarCarrinho()
        paginaCarrinho.validarNomeProdutoNoCarrinho(produto.nome)
        paginaCarrinho.validarPrecoProdutoNoCarrinho(produto.preco)
    })
})

  it('Deve permitir retornar à vitrine a partir da página de detalhes do produto', () => {
    comandosComuns.clicarNoItemPeloId('1')
    comandosComuns.clicarNoDataTest('back-to-products')
    comandosComuns.validarURl(paginas.inventario)
  })
})
