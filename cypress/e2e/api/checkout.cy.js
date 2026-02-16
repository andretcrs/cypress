import { LoginAction } from "../../support/actions/login.action"
import { InventoryAction } from "../../support/actions/inventory.action"
import { CheckoutAction } from "../../support/actions/checkout.action"
import { cartPage } from "../../support/pages/cart.page"

describe("Fluxo de compra", () => {

  const login = new LoginAction()
  const inventory = new InventoryAction()
  const checkout = new CheckoutAction()

  it("Deve finalizar compra com sucesso", () => {

    login.acessarLogin()
    login.logar("standard_user", "secret_sauce")

    inventory.validarHome()
    inventory.adicionarProduto()
    inventory.acessarCarrinho()

    cy.get(cartPage.checkoutBtn).click()

    checkout.preencherDados()
    checkout.finalizarCompra()
    checkout.validarSucesso()

  })

})
