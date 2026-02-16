import { LoginAction } from "../../support/actions/login.action"
import { loginPage } from "../../support/pages/login.page"

describe("Login inválido", () => {

  const login = new LoginAction()

  it("Deve exibir mensagem de erro", () => {

    login.acessarLogin()
    login.logar("standard_user", "errado")

    cy.get(loginPage.error).should("be.visible")

  })

})
