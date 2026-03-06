import '@shelex/cypress-allure-plugin'
import { acaoInventario } from '@actions/acaoInventario.js'
import { acaoCheckout } from '@actions/acaoCheckout.js'
import { userFactory } from '@factories/user.factory.js'
import { paginaCarrinho } from '@pages/paginaCarrinho.js'
import { setupTests } from '@support/setup.js'
import { acaoCarrinho } from '@actions/acaoCarrinho'
import comandosComuns from '@support/comandosComuns.js'

describe('Fluxo de compra', () => {
  setupTests()
  const inventario = new acaoInventario()
  const checkout = new acaoCheckout()
  const carrinho = new acaoCarrinho()

  it('Deve finalizar compra com sucesso', () => {
    const user = userFactory.gerarDadosDeEntrega()
    inventario.adicionarProduto()
    carrinho.acessarCarrinho()

    cy.get(paginaCarrinho.BtnCheckout).click()

    checkout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
    checkout.finalizarCompra()
    comandosComuns.validarMensagem("Thank you for your order!")
    
  })

  it('Deve finalizar compra com múltiplos produtos no carrinho', () => {
    const user = userFactory.gerarDadosDeEntrega()

    carrinho.adicionarProdutosAoCarrinho(3)
    carrinho.acessarCarrinho()
    carrinho.validarQuantidadeCarrinho(3)
    cy.get(paginaCarrinho.BtnCheckout).click()
    checkout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
    checkout.finalizarCompra()
    comandosComuns.validarMensagem("Thank you for your order!")
  })
})
