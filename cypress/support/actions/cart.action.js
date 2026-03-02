/* global cy */
import { cartPage } from '../pages/cart.page'

export class CartAction {
  removerProduto () {
    cy.get(cartPage.removeButton).click()
  }

  validarCarrinhoVazio () {
    cy.get(cartPage.cartItem).should('not.exist')
  }

  clicarCheckout () {
    cy.get(cartPage.checkoutBtn).click()
  }
}
