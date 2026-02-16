import { faker } from '@faker-js/faker'

export class UserFactory {
  static gerarDadosDeEntrega() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      zipCode: faker.location.zipCode('#####') // Gera um CEP de 5 dígitos
    }
  }
}