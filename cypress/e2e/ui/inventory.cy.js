/* global Cypress, cy, it, describe  */
import { InventoryAction } from '../../support/actions/inventory.action'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'
import { PAGINAS } from '../../support/rotas.js'

const Inventory = new InventoryAction()

setupTests()
describe('Fluxo de Carrinho', () => {
  it('Deve manter o produto no carrinho após fazer logout e login novamente', () => {
    Inventory.adicionarProduto()
    ComandosComuns.abrirMenuLateral()
    ComandosComuns.clicarNoTexto('Logout')
    cy.login(Cypress.env('standardUser'), Cypress.env('password'))
    ComandosComuns.validarQuantidadeCarrinho(1)
  })

  it('Deve remover um produto diretamente de dentro da página do carrinho', () => {
    Inventory.adicionarProduto()
    Inventory.acessarCarrinho()
    ComandosComuns.clicarNoDataTest('remove-sauce-labs-backpack')
    ComandosComuns.validarCarrinhoVazio()
  })

  it('Deve limpar o carrinho ao clicar em Reset App State', () => {
    Inventory.adicionarProduto()
    ComandosComuns.validarQuantidadeCarrinho(1)
    ComandosComuns.abrirMenuLateral()
    ComandosComuns.clicarNoTexto('Reset App State')
    ComandosComuns.validarCarrinhoVazio()
  })

  it('Deve validar se o produto adicionado corresponde ao item no carrinho', () => {
    ComandosComuns.clicarNoDataTest('add-to-cart-sauce-labs-fleece-jacket')
    Inventory.acessarCarrinho()

    ComandosComuns.validarNomeProdutoNoCarrinho('Sauce Labs Fleece Jacket')
    ComandosComuns.validarPrecoProdutoNoCarrinho('$49.99')
  })

  it('Deve permitir retornar à vitrine a partir da página de detalhes do produto', () => {
    ComandosComuns.clicarNoItemPeloId('4')
    ComandosComuns.clicarNoDataTest('back-to-products')
    ComandosComuns.validarURl(PAGINAS.INVENTARIO)
  })
})
