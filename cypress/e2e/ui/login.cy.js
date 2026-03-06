import '@shelex/cypress-allure-plugin'
import { setupTests } from '@support/setup.js'
import { paginas } from '@support/rotas.js'
import comandosComuns from '@support/comandosComuns.js'


describe('Login com sucesso', () => {
  setupTests()
  it('Deve realizar login com sucesso', () => {
    comandosComuns.validarMensagem('Swag Labs')
    comandosComuns.validarURl(paginas.inventario)
  })
})

describe('Login sem sucesso', () => {
  setupTests({ skipLogin: true })
  it('Deve exibir erro ao informar senha inválida', () => {
    cy.login("standardUser", "standardUser")
    comandosComuns.validarMensagem('Username and password do not match')
  })

  it('Deve exibir erro para usuário bloqueado', () => {
    cy.login("locked_out_user", "secret_sauce")
    comandosComuns.validarMensagem('Epic sadface: Sorry, this user has been locked out.')
  })
 
  it('Deve exibir erro ao enviar campos vazios', () => {
    cy.login(null, null)
    comandosComuns.validarMensagem('Epic sadface: Username is required')
  })

  it('Deve exibir erro ao tentar logar sem informar o username', () => {
    cy.login("nome_invalido", "senha_errada")
    comandosComuns.validarMensagem('Epic sadface: Username and password do not match any user in this service')
  })

  it('Deve exibir erro ao tentar logar sem informar a senha', () => {
    cy.login("standard_user")
    comandosComuns.validarMensagem('Epic sadface: Password is required')
  })
})
