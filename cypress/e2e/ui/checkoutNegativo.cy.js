import { acaoCheckout } from '@actions/acaoCheckout.js'
import { acaoInventario } from '@actions/acaoInventario.js'
import { acaoCarrinho } from '@actions/acaoCarrinho.js'
import { userFactory } from '@factories/user.factory.js'
import { setupTests } from '@support/setup.js'
import { paginas } from '@support/rotas.js'
import comandosComuns from '@support/comandosComuns.js'



setupTests()

describe('Fluxo de Checkout - Negativo', () => {
  setupTests()
  const checkout = new acaoCheckout()
  const inventario = new acaoInventario()
  const carrinho = new acaoCarrinho()
  it('Deve exibir erro ao omitir o sobrenome no checkout', () => {
    inventario.adicionarProduto()
    carrinho.acessarCarrinho()
    comandosComuns.clicarNoBotaoComTexto('Checkout')
    const user = userFactory.gerarDadosDeEntrega()

    checkout.preencherDados(user.primeiroNome, null, user.codigoPostal)
    comandosComuns.validarMensagemErro('Error: Last Name is required')
    comandosComuns.clicarNoTexto('Cancel')
    comandosComuns.validarURl(paginas.carrinho)
  })
})
