import { InventoryAction } from "../../support/actions/inventory.action"
import { CheckoutAction } from "../../support/actions/checkout.action"
import { UserFactory } from "../../support/dataFactory/user.factory"

const inventory = new InventoryAction()
const checkout = new CheckoutAction()

describe("Validação de Valores no Checkout", () => {

  beforeEach(() => {
    cy.login(
      Cypress.env("standardUser"),
      Cypress.env("password")
    )
  })

  it("Deve validar se a soma dos preços e taxas está correta", () => {

    const user = UserFactory.gerarDadosDeEntrega()

    cy.allure()
      .epic("E2E")
      .feature("Checkout")
      .story("Validação Matemática")
      .severity("critical")
      .owner("Andre")
      .tag("regressao")

    inventory.adicionarProduto()
    inventory.acessarCarrinho()

    cy.get('[data-test="checkout"]').click()

    checkout.preencherDados(
      user.firstName,
      user.lastName,
      user.zipCode
    )

    cy.get('.summary_subtotal_label').should('contain', '$29.99')
    cy.get('.summary_tax_label').should('contain', '$2.40')
    cy.get('.summary_total_label').should('contain', '$32.39')
  })
})