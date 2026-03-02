/* global it, describe  */
import { CheckoutAction } from '../../support/actions/checkout.action'
import { InventoryAction } from '../../support/actions/inventory.action'
import { UserFactory } from '../../support/dataFactory/user.factory'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'
import { PAGINAS } from '../../support/rotas.js'

const Checkout = new CheckoutAction()
const Inventory = new InventoryAction()

setupTests()

describe('Fluxo de Checkout - Negativo', () => {
  it('Deve exibir erro ao omitir o sobrenome no checkout', () => {
    Inventory.adicionarProduto()
    Inventory.acessarCarrinho()
    ComandosComuns.clicarNoBotaoComTexto('Checkout')
    const user = UserFactory.gerarDadosDeEntrega()

    Checkout.preencherDados(user.firstName, null, user.zipCode)
    ComandosComuns.validarMensagemErro('Error: Last Name is required')
    ComandosComuns.clicarNoTexto('Cancel')
    ComandosComuns.validarURl(PAGINAS.CARRINHO)
  })
})
