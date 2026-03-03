import '@shelex/cypress-allure-plugin'
import { InventoryAction } from '../../support/actions/inventory.action'
import { CheckoutAction } from '../../support/actions/checkout.action'
import { UserFactory } from '../../support/dataFactory/user.factory'
import { cartPage } from '../../support/pages/cart.page'
import { setupTests } from '../../support/setup'
import { CartAction } from '../../support/actions/cart.action'

setupTests()
describe('Fluxo de compra', () => {
  const Inventory = new InventoryAction()
  const Checkout = new CheckoutAction()
  const Carrinho = new CartAction()

  it('Deve finalizar compra com sucesso', () => {
    const user = UserFactory.gerarDadosDeEntrega()
    Inventory.adicionarProduto()
    Carrinho.acessarCarrinho()

    cy.get(cartPage.checkoutBtn).click()

    Checkout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
    Checkout.finalizarCompra()
    Checkout.validarSucesso()
  })

  it('Deve finalizar compra com múltiplos produtos no carrinho', () => {
    const user = UserFactory.gerarDadosDeEntrega()

    Carrinho.adicionarProdutosAoCarrinho(3)
    Carrinho.acessarCarrinho()
    Carrinho.validarQuantidadeCarrinho(3)
    cy.get(cartPage.checkoutBtn).click()
    Checkout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
    Checkout.finalizarCompra()
    Checkout.validarSucesso()
  })
})
