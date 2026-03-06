import { acaoInventario } from '@actions/acaoInventario.js'
import { acaoCarrinho } from '@actions/acaoCarrinho.js'
import { setupTests } from '@support/setup.js'
import { paginas } from '@support/rotas.js'
import comandosComuns from '@support/comandosComuns.js'




describe('Fluxo de Carrinho', () => {
  setupTests()
  const inventario = new acaoInventario()
  const carrinho = new acaoCarrinho()
  it('Deve manter o produto no carrinho após fazer logout e login novamente', () => {
    inventario.adicionarProduto()
    comandosComuns.abrirMenuLateral()
    comandosComuns.clicarNoTexto('Logout')
    cy.login(Cypress.env('standardUser'), Cypress.env('password'))
    carrinho.validarQuantidadeCarrinho(1)
  })

  it('Deve remover um produto diretamente de dentro da página do carrinho', () => {
    inventario.adicionarProduto()
    carrinho.acessarCarrinho()
    comandosComuns.clicarNoDataTest('remove-sauce-labs-backpack')
    carrinho.validarCarrinhoVazio()
  })

  it('Deve limpar o carrinho ao clicar em Reset App State', () => {
    inventario.adicionarProduto()
    carrinho.validarQuantidadeCarrinho(1)
    comandosComuns.abrirMenuLateral()
    comandosComuns.clicarNoTexto('Reset App State')
    carrinho.validarCarrinhoVazio()
  })

it('Deve validar se o produto adicionado corresponde ao item no carrinho', () => {
    inventario.adicionarPrimeiroProdutoEGuardarDados().then((produto) => {
        carrinho.acessarCarrinho()
        carrinho.validarNomeProdutoNoCarrinho(produto.nome)
        carrinho.validarPrecoProdutoNoCarrinho(produto.preco)
    })
})

  it('Deve permitir retornar à vitrine a partir da página de detalhes do produto', () => {
    comandosComuns.clicarNoItemPeloId('1')
    comandosComuns.clicarNoDataTest('back-to-products')
    comandosComuns.validarURl(paginas.inventario)
  })
})
