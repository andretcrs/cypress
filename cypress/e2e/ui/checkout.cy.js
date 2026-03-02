/* global cy, describe, it */
import '@shelex/cypress-allure-plugin'

import { InventoryAction } from '../../support/actions/inventory.action'
import { CheckoutAction } from '../../support/actions/checkout.action'
import { UserFactory } from '../../support/dataFactory/user.factory'
import { cartPage } from '../../support/pages/cart.page'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'

setupTests()
describe('Fluxo de compra', () => {
  const Inventory = new InventoryAction()
  const Checkout = new CheckoutAction()

  it('Deve finalizar compra com sucesso', () => {
    const user = UserFactory.gerarDadosDeEntrega()
    Inventory.adicionarProduto()
    Inventory.acessarCarrinho()

    cy.get(cartPage.checkoutBtn).click()

    Checkout.preencherDados(user.firstName, user.lastName, user.zipCode)
    Checkout.finalizarCompra()
    Checkout.validarSucesso()
  })

  it('Deve finalizar compra com múltiplos produtos no carrinho', () => {
    const user = UserFactory.gerarDadosDeEntrega()

    ComandosComuns.adicionarProdutosAoCarrinho(3)
    Inventory.acessarCarrinho()
    ComandosComuns.validarQuantidadeCarrinho(3)
    cy.get(cartPage.checkoutBtn).click()
    Checkout.preencherDados(user.firstName, user.lastName, user.zipCode)
    Checkout.finalizarCompra()
    Checkout.validarSucesso()
  })
})
