import '@shelex/cypress-allure-plugin'
import { paginaInventario } from '@pages/paginaInventario.js'
import { paginaCheckout } from '@pages/paginaCheckout.js'
import { userFactory } from '@factories/user.factory.js'
import { paginaCarrinho } from '@pages/paginaCarrinho.js'
import { setupTests } from '@support/setup.js'
import comandosComuns from '@support/comandosComuns.js'

describe('Fluxo de compra', () => {
  setupTests()

  it('Deve finalizar compra com sucesso', () => {
    const user = userFactory.gerarDadosDeEntrega()
    paginaInventario.adicionarProduto()
    paginaCarrinho.acessarCarrinho()
    paginaCarrinho.clicarCheckout()

    paginaCheckout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
    paginaCheckout.finalizarCompra()
    comandosComuns.validarMensagem("Thank you for your order!")
    
  })

  it('Deve finalizar compra com múltiplos produtos no carrinho', () => {
    const user = userFactory.gerarDadosDeEntrega()

    paginaCarrinho.adicionarProdutosAoCarrinho(3)
    paginaCarrinho.acessarCarrinho()
    paginaCarrinho.validarQuantidadeCarrinho(3)
    paginaCarrinho.clicarCheckout()
    paginaCheckout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
    paginaCheckout.finalizarCompra()
    comandosComuns.validarMensagem("Thank you for your order!")
  })
})
