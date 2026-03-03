import { InventoryAction } from '../../support/actions/inventory.action'
import { CheckoutAction } from '../../support/actions/checkout.action'
import { UserFactory } from '../../support/dataFactory/user.factory'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'
import { CartAction } from '../../support/actions/cart.action.js'

const Inventory = new InventoryAction()
const Checkout = new CheckoutAction()
const Carrinho = new CartAction()

setupTests()
describe('Validação de Valores no Checkout', () => {
  it('Deve validar se a soma dos preços e taxas está correta de forma dinâmica', () => {
    const user = UserFactory.gerarDadosDeEntrega()
    Carrinho.executarComValoresCalculados((subtotal, imposto, totalGeral) => {
      Inventory.adicionarProduto()
      Carrinho.acessarCarrinho()
      ComandosComuns.clicarNoBotaoComTexto('Checkout')
      Checkout.preencherDados(user.primeiroNome, user.sobreNome, user.codigoPostal)
      Checkout.validarSubtotal(`$${subtotal}`)
      Checkout.validarImposto(`$${imposto}`)
      Checkout.validarTotalFinal(`$${totalGeral}`)
      ComandosComuns.clicarNoBotaoComTexto('Finish')
      ComandosComuns.validarMensagem('Thank you for your order!')
    })
  })
})
