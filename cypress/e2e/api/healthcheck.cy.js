import '@shelex/cypress-allure-plugin'

describe("API & Health Check - SauceDemo", () => {
  
  it("Deve validar se a página inicial está respondendo com status 200", () => {
    cy.allure()
      .epic("API")
      .feature("Health Check")
      .severity("blocker")
      .owner("Andre")

    cy.request({
      method: 'GET',
      url: '/', 
      failOnStatusCode: true
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.duration).to.be.lessThan(2000) 
    })
  })

  it("Deve validar o carregamento dos assets principais (manifest e CSS dinâmico)", () => {
    cy.allure()
      .epic("API")
      .feature("Performance")
      .severity("normal")
      .owner("Andre")

    cy.request('/manifest.json').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.request('/').then((response) => {
      const html = response.body
      
      const cssRegex = /\/[^"']+\/main\.[a-z0-9.]+\.css|\/main\.[a-z0-9.]+\.css/
      const foundMatch = html.match(cssRegex)

      if (foundMatch) {
        const cssPath = foundMatch[0]
        cy.request(cssPath).then((cssResponse) => {
          expect(cssResponse.status).to.eq(200)
          expect(cssResponse.headers['content-type']).to.include('text/css')
        })
      } else {
        cy.log('HTML recebido:', html)
        throw new Error("Não foi possível encontrar o arquivo CSS principal. O site pode ter mudado a estrutura de arquivos.")
      }
    })
  })
})