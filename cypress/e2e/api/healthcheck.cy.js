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

  it("Deve validar o carregamento dos assets principais (manifest/css)", () => {
    cy.allure()
      .epic("API")
      .feature("Performance")
      .severity("normal")
      .owner("Andre")


    cy.request('/static/css/main.7067882d.chunk.css').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.include('text/css')
    })
  })
})