/* global describe, it */
import { InventoryAction } from '../../support/actions/inventory.action'
import { CheckoutAction } from '../../support/actions/checkout.action'
import { UserFactory } from '../../support/dataFactory/user.factory'
import { setupTests } from '../../support/setup'
import ComandosComuns from '../../support/comandosComuns.js'

const Inventory = new InventoryAction()
const Checkout = new CheckoutAction()

setupTests()
describe('Validação de Valores no Checkout', () => {
  it('Deve validar se a soma dos preços e taxas está correta de forma dinâmica', () => {
    const user = UserFactory.gerarDadosDeEntrega()
    ComandosComuns.executarComValoresCalculados((subtotal, imposto, totalGeral) => {
      Inventory.adicionarProduto()
      Inventory.acessarCarrinho()
      ComandosComuns.clicarNoBotaoComTexto('Checkout')
      Checkout.preencherDados(user.firstName, user.lastName, user.zipCode)
      ComandosComuns.validarSubtotal(`$${subtotal}`)
      ComandosComuns.validarImposto(`$${imposto}`)
      ComandosComuns.validarTotalFinal(`$${totalGeral}`)
      ComandosComuns.clicarNoBotaoComTexto('Finish')
      ComandosComuns.validarMensagem('Thank you for your order!')
    })
  })
})
