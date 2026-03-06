import { paginaInventario } from '@pages/paginaInventario.js'
import { paginaCheckout } from '@pages/paginaCheckout.js'
import { userFactory } from '@factories/user.factory.js'
import { paginaCarrinho } from '@pages/paginaCarrinho.js'
import { setupTests } from '@support/setup.js'
import comandosComuns from '@support/comandosComuns.js'
import { paginas } from '@support/rotas.js'



setupTests()

describe('Fluxo de Checkout - Negativo', () => {
  setupTests()

  it('Deve exibir erro ao omitir o sobrenome no checkout', () => {
    paginaInventario.adicionarProduto()
    paginaCarrinho.acessarCarrinho()
    comandosComuns.clicarNoBotaoComTexto('Checkout')
    const user = userFactory.gerarDadosDeEntrega()

    paginaCheckout.preencherDados(user.primeiroNome, null, user.codigoPostal)
    comandosComuns.validarMensagemErro('Error: Last Name is required')
    comandosComuns.clicarNoTexto('Cancel')
    comandosComuns.validarURl(paginas.carrinho)
  })
})
