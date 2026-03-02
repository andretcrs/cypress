/* global Cypress, cy, before, it, describe  */
import '@shelex/cypress-allure-plugin'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'
import { PAGINAS } from '../../support/rotas.js'

setupTests()
describe('Login', () => {
  it('Deve realizar login com sucesso', () => {
    ComandosComuns.validarMensagem('Swag Labs')
    ComandosComuns.validarURl(PAGINAS.INVENTARIO)
  })
})

describe.only('Login', () => {
  before(() => {
    Cypress.env('skipLogin', true)
  })
  it('Deve exibir erro ao informar senha inválida', () => {
    const user = Cypress.env('standardUser')
    const senha = Cypress.env('pwErrada')
    cy.login(user, senha)
    ComandosComuns.validarMensagem('Username and password do not match')
  })
  before(() => {
    Cypress.env('skipLogin', true)
  })
  it('Deve exibir erro para usuário bloqueado', () => {
    const user = Cypress.env('lockedUser')
    const senha = Cypress.env('password')
    cy.login(user, senha)
    ComandosComuns.validarMensagem('Epic sadface: Sorry, this user has been locked out.')
  })

  before(() => {
    Cypress.env('skipLogin', true)
  })
  it('Deve exibir erro ao enviar campos vazios', () => {
    cy.login(null, null)
    ComandosComuns.validarMensagem('Epic sadface: Username is required')
  })

  before(() => {
    Cypress.env('skipLogin', true)
  })
  it('Deve exibir erro ao tentar logar sem informar o username', () => {
    const user = Cypress.env('userNameInvalid')
    const senha = Cypress.env('password')

    cy.login(user, senha)
    ComandosComuns.validarMensagem('Epic sadface: Username and password do not match any user in this service')
  })

  before(() => {
    Cypress.env('skipLogin', true)
  })

  it('Deve exibir erro ao tentar logar sem informar a senha', () => {
    const user = Cypress.env('standardUser')

    cy.login(user)
    ComandosComuns.validarMensagem('Epic sadface: Password is required')
  })
})
