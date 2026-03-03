import { CheckoutAction } from '../../support/actions/checkout.action'
import { InventoryAction } from '../../support/actions/inventory.action'
import { UserFactory } from '../../support/dataFactory/user.factory'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'
import { PAGINAS } from '../../support/rotas.js'
import { CartAction } from '../../support/actions/cart.action.js'

const Checkout = new CheckoutAction()
const Inventory = new InventoryAction()
const Carrinho = new CartAction()

setupTests()

describe('Fluxo de Checkout - Negativo', () => {
  it('Deve exibir erro ao omitir o sobrenome no checkout', () => {
    Inventory.adicionarProduto()
    Carrinho.acessarCarrinho()
    ComandosComuns.clicarNoBotaoComTexto('Checkout')
    const user = UserFactory.gerarDadosDeEntrega()

    Checkout.preencherDados(user.primeiroNome, null, user.codigoPostal)
    ComandosComuns.validarMensagemErro('Error: Last Name is required')
    ComandosComuns.clicarNoTexto('Cancel')
    ComandosComuns.validarURl(PAGINAS.CARRINHO)
  })
})
