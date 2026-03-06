import { faker } from '@faker-js/faker'

export class userFactory {
  
  static gerarDadosDeEntrega (
    nome = faker.person.firstName(), 
    sobreNome = faker.person.lastName(), 
    codigo = faker.location.zipCode('#####')
  ) {
    return {
      primeiroNome: nome, 
      sobreNome: sobreNome, 
      codigoPostal: codigo  
    }
  }
}