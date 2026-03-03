import { InventoryAction } from '../../support/actions/inventory.action'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'
import { PAGINAS } from '../../support/rotas'
import { CartAction } from '../../support/actions/cart.action'

const Inventory = new InventoryAction()
const Carrinho = new CartAction()

setupTests()
describe('Fluxo de Carrinho', () => {
  it('Deve manter o produto no carrinho após fazer logout e login novamente', () => {
    Inventory.adicionarProduto()
    ComandosComuns.abrirMenuLateral()
    ComandosComuns.clicarNoTexto('Logout')
    cy.login(Cypress.env('standardUser'), Cypress.env('password'))
    Carrinho.validarQuantidadeCarrinho(1)
  })

  it('Deve remover um produto diretamente de dentro da página do carrinho', () => {
    Inventory.adicionarProduto()
    Carrinho.acessarCarrinho()
    ComandosComuns.clicarNoDataTest('remove-sauce-labs-backpack')
    Carrinho.validarCarrinhoVazio()
  })

  it('Deve limpar o carrinho ao clicar em Reset App State', () => {
    Inventory.adicionarProduto()
    Carrinho.validarQuantidadeCarrinho(1)
    ComandosComuns.abrirMenuLateral()
    ComandosComuns.clicarNoTexto('Reset App State')
    Carrinho.validarCarrinhoVazio()
  })

  it('Deve validar se o produto adicionado corresponde ao item no carrinho', () => {
    ComandosComuns.clicarNoDataTest('add-to-cart-sauce-labs-fleece-jacket')
    Carrinho.acessarCarrinho()

    Carrinho.validarNomeProdutoNoCarrinho('Sauce Labs Fleece Jacket')
    Carrinho.validarPrecoProdutoNoCarrinho('$49.99')
  })

  it('Deve permitir retornar à vitrine a partir da página de detalhes do produto', () => {
    ComandosComuns.clicarNoItemPeloId('4')
    ComandosComuns.clicarNoDataTest('back-to-products')
    ComandosComuns.validarURl(PAGINAS.INVENTARIO)
  })
})
