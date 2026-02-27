import { CheckoutAction } from "../../support/actions/checkout.action"
import { InventoryAction } from "../../support/actions/inventory.action"
import { UserFactory } from "../../support/dataFactory/user.factory" 
import { cartPage } from "../../support/pages/cart.page" 

const checkout = new CheckoutAction()
const inventory = new InventoryAction()

describe("Fluxo de Checkout - Negativo", () => {
  beforeEach(() => {
    cy.login(
      Cypress.env("standardUser"),
      Cypress.env("password")
    )
    
    inventory.adicionarProduto()
    inventory.acessarCarrinho()
    cy.get(cartPage.checkoutBtn).click()
  })

  it("Deve exibir erro ao omitir o sobrenome no checkout", () => {
    const user = UserFactory.gerarDadosDeEntrega()

    cy.allure()
      .epic("E2E")
      .feature("Checkout")
      .story("Validação de Campos")
      .severity("normal")
      .owner("Andre")
      .tag("negativo", "regressao")
    checkout.preencherDados(user.firstName, null, user.zipCode)
    checkout.validarMensagemErro("Error: Last Name is required")
  })

  it("Deve permitir cancelar o checkout e retornar ao carrinho", () => {
    cy.allure()
      .epic("E2E")
      .feature("Checkout")
      .story("Cancelamento")
      .severity("minor")
      .owner("Andre")
      .tag("regressao")

    cy.get('[data-test="cancel"]').click()
    cy.url().should("include", "/cart.html")
  })
})