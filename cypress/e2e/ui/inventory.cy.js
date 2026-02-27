import { InventoryAction } from "../../support/actions/inventory.action"

const inventory = new InventoryAction()

describe("Fluxo de Carrinho", () => {

  beforeEach(() => {
    cy.login(
      Cypress.env("standardUser"),
      Cypress.env("password")
    )
    inventory.validarHome()
  })

  it("Deve manter o produto no carrinho após fazer logout e login novamente", () => {
    cy.allure()
      .epic("E2E")
      .feature("Carrinho")
      .story("Persistência de itens")
      .severity("critical")
      .owner("Andre")
      .tag("regressao")

    inventory.adicionarProduto()
    
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
    
    cy.login(
      Cypress.env("standardUser"),
      Cypress.env("password")
    )
    
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  it("Deve remover um produto diretamente de dentro da página do carrinho", () => {
    cy.allure()
      .epic("E2E")
      .feature("Carrinho")
      .story("Remoção de itens")
      .severity("normal")
      .owner("Andre")
      .tag("smoke", "regressao")

    inventory.adicionarProduto()
    inventory.acessarCarrinho()
    
    cy.get('[data-test^="remove-"]').click()
    cy.get('.cart_item').should('not.exist')
  })

  it("Deve limpar o carrinho ao clicar em Reset App State", () => {
    cy.allure()
      .epic("E2E")
      .feature("Configurações")
      .story("Reset do Sistema")
      .severity("normal")
      .owner("Andre")
      .tag("regressao")

    inventory.adicionarProduto()
    cy.get('.shopping_cart_badge').should('have.text', '1')

    cy.get('#react-burger-menu-btn').click()
    cy.get('#reset_sidebar_link').click()

    cy.get('.shopping_cart_badge').should('not.exist')
  })

  it("Deve validar se o produto adicionado corresponde ao item no carrinho", () => {
    cy.allure()
      .epic("E2E")
      .feature("Carrinho")
      .story("Integridade de Dados")
      .severity("critical")
      .owner("Andre")
      .tag("regressao")

    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    inventory.acessarCarrinho()

    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Fleece Jacket')
    cy.get('.inventory_item_price').should('have.text', '$49.99')
  })

  it("Deve permitir retornar à vitrine a partir da página de detalhes do produto", () => {
    cy.allure()
      .epic("E2E")
      .feature("Navegação")
      .story("Detalhes do Produto")
      .severity("minor")
      .owner("Andre")
      .tag("regressao")

    cy.get('#item_4_title_link').click()
    cy.url().should('include', '/inventory-item.html?id=4')

    cy.get('[data-test="back-to-products"]').click()
    
    inventory.validarHome()
  })
})