import { faker } from '@faker-js/faker'

export class userFactory {
  static gerarDadosDeEntrega () {
    return {
      primeiroNome: faker.person.firstName(),
      sobreNome: faker.person.lastName(),
      codigoPostal: faker.location.zipCode('#####')
    }
  }
}
