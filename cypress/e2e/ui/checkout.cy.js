import '@shelex/cypress-allure-plugin'

import { InventoryAction } from "../../support/actions/inventory.action"
import { CheckoutAction } from "../../support/actions/checkout.action"
import { UserFactory } from "../../support/dataFactory/user.factory"
import { cartPage } from "../../support/pages/cart.page"

describe("Fluxo de compra", () => {
  const inventory = new InventoryAction()
  const checkout = new CheckoutAction()

  beforeEach(() => {
    cy.login("standard_user", "secret_sauce")
    inventory.validarHome()
  })

  it("Deve finalizar compra com sucesso", () => {
    const user = UserFactory.gerarDadosDeEntrega()

    cy.allure()
      .epic("E2E")
      .feature("Checkout")
      .story("Finalizar compra com sucesso")
      .severity("critical")
      .owner("Andre")
      .tag("regressao", "smoke")

    inventory.adicionarProduto()
    inventory.acessarCarrinho()

    cy.get(cartPage.checkoutBtn).click()

    checkout.preencherDados(user.firstName, user.lastName, user.zipCode)
    checkout.finalizarCompra()
    checkout.validarSucesso()
  })

  it("Deve finalizar compra com múltiplos produtos no carrinho", () => {
    const user = UserFactory.gerarDadosDeEntrega()

    cy.allure()
      .epic("E2E")
      .feature("Checkout")
      .story("Finalizar compra com múltiplos itens")
      .severity("critical")
      .owner("Andre")
      .tag("regressao")

    cy.get('[data-test^="add-to-cart"]').each(($el, index) => {
      if (index < 3) cy.wrap($el).click()
    })

    inventory.acessarCarrinho()
    cy.get('.cart_item').should('have.length', 3)
    
    cy.get(cartPage.checkoutBtn).click()

    checkout.preencherDados(user.firstName, user.lastName, user.zipCode)
    checkout.finalizarCompra()
    checkout.validarSucesso()
  })
})