import { paginaInventario } from '@pages/paginaInventario.js'
import { paginaCheckout } from '@pages/paginaCheckout.js'
import { userFactory } from '@factories/user.factory.js'
import { paginaCarrinho } from '@pages/paginaCarrinho.js'
import { setupTests } from '@support/setup.js'
import comandosComuns from '@support/comandosComuns.js'





describe('Validação de Valores no Checkout', () => {
  setupTests()

  it('Deve validar se a soma dos preços e taxas está correta de forma dinâmica', () => {
    const user = userFactory.gerarDadosDeEntrega()
    paginaCarrinho.executarComValoresCalculados((subtotal, imposto, totalGeral) => {
      paginaInventario.adicionarProduto()
      paginaCarrinho.acessarCarrinho()
      comandosComuns.clicarNoBotaoComTexto('Checkout')
      paginaCheckout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
      paginaCheckout.validarSubtotal(`$${subtotal}`)
      paginaCheckout.validarImposto(`$${imposto}`)
      paginaCheckout.validarTotalFinal(`$${totalGeral}`)
      comandosComuns.clicarNoBotaoComTexto('Finish')
      comandosComuns.validarMensagem('Thank you for your order!')
    })
  })
})
