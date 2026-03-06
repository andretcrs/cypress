import { acaoInventario } from '@actions/acaoInventario.js'
import { acaoCheckout } from '@actions/acaoCheckout.js'
import { userFactory } from '@factories/user.factory.js'
import { setupTests } from '@support/setup'
import { acaoCarrinho } from '@actions/acaoCarrinho.js'
import comandosComuns from '@support/comandosComuns.js'




describe('Validação de Valores no Checkout', () => {
  setupTests()
  
  const inventario = new acaoInventario()
  const checkout = new acaoCheckout()
  const carrinho = new acaoCarrinho()
  it('Deve validar se a soma dos preços e taxas está correta de forma dinâmica', () => {
    const user = userFactory.gerarDadosDeEntrega()
    carrinho.executarComValoresCalculados((subtotal, imposto, totalGeral) => {
      inventario.adicionarProduto()
      carrinho.acessarCarrinho()
      comandosComuns.clicarNoBotaoComTexto('Checkout')
      checkout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
      checkout.validarSubtotal(`$${subtotal}`)
      checkout.validarImposto(`$${imposto}`)
      checkout.validarTotalFinal(`$${totalGeral}`)
      comandosComuns.clicarNoBotaoComTexto('Finish')
      comandosComuns.validarMensagem('Thank you for your order!')
    })
  })
})
