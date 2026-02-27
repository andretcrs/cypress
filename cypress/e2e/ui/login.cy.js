import '@shelex/cypress-allure-plugin'
import { LoginAction } from "../../support/actions/login.action"
import { loginPage } from "../../support/pages/login.page"

describe("Login", () => {

  const login = new LoginAction()

  const user = Cypress.env("standardUser")
  const password = Cypress.env("password")
  const lockedUser = Cypress.env("lockedUser")

  beforeEach(() => {
    cy.visit("/")
  })

  it("Deve realizar login com sucesso", () => {

    expect(user).to.exist
    expect(password).to.exist

    cy.allure()
      .epic("E2E")
      .feature("Login")
      .story("Login com credenciais válidas")
      .severity("critical")
      .owner("Andre")
      .tag("smoke", "regressao")

    cy.login(user, password)

    cy.url().should("include", "/inventory.html")
  })

  it("Deve exibir erro ao informar senha inválida", () => {

    cy.allure()
      .epic("E2E")
      .feature("Login")
      .story("Senha inválida")
      .severity("normal")
      .owner("Andre")
      .tag("negativo", "regressao")

    login.logar(user, "senha_errada")

    cy.get(loginPage.error)
      .should("be.visible")
      .and("contain.text", "Username and password do not match")
  })

  it("Deve exibir erro para usuário bloqueado", () => {

    cy.allure()
      .epic("E2E")
      .feature("Login")
      .story("Usuário bloqueado")
      .severity("critical")
      .owner("Andre")
      .tag("negativo", "regressao")

    login.logar(lockedUser, password)

    cy.get(loginPage.error)
      .should("be.visible")
      .and("contain.text", "Sorry, this user has been locked out.")
  })

  it("Deve exibir erro ao enviar campos vazios", () => {

    cy.allure()
      .epic("E2E")
      .feature("Login")
      .story("Validação de campos obrigatórios")
      .severity("minor")
      .owner("Andre")
      .tag("negativo", "regressao")

    login.logar(null, null)

    cy.get(loginPage.error)
      .should("be.visible")
      .and("have.text", "Epic sadface: Username is required")
  })

  it("Deve exibir erro ao tentar logar sem informar o username", () => {

    cy.allure()
      .epic("E2E")
      .feature("Login")
      .story("Username obrigatório")
      .severity("minor")
      .owner("Andre")
      .tag("negativo")

    login.logar("", password)

    cy.get(loginPage.error)
      .should("have.text", "Epic sadface: Username is required")
  })

  it("Deve exibir erro ao tentar logar sem informar a senha", () => {

    cy.allure()
      .epic("E2E")
      .feature("Login")
      .story("Password obrigatória")
      .severity("minor")
      .owner("Andre")
      .tag("negativo")

    login.logar(user, "")

    cy.get(loginPage.error)
      .should("have.text", "Epic sadface: Password is required")
  })

  it("Deve impedir acesso à página de inventário sem login", () => {

    cy.allure()
      .epic("E2E")
      .feature("Segurança")
      .story("Acesso Direto via URL")
      .severity("blocker")
      .owner("Andre")
      .tag("seguranca", "regressao")

    cy.visit('/inventory.html', { failOnStatusCode: false })

    cy.get(loginPage.error)
      .should('be.visible')
      .and('contain.text', "You can only access")
      .and('contain.text', "/inventory.html")
      .and('contain.text', "when you are logged in")
  })

})