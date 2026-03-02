# QA E2E Automation - Cypress





Framework de automação de testes End-to-End desenvolvido com **Cypress**, utilizando arquitetura escalável, boas práticas de mercado e integração contínua com GitHub Actions.

---

## Objetivo

Este projeto tem como objetivo demonstrar a construção de um framework de automação moderno, com foco em:

 Escalabilidade  
 Reutilização de código  
 Facilidade de manutenção  
 Execução em CI/CD  
 Geração de relatórios ricos  

---

## Tecnologias utilizadas

- Cypress
- JavaScript
- Node.js
- Allure Report
- Faker
- ESLint
- Prettier
- GitHub Actions

---

##  Arquitetura do projeto

```
cypress
├── e2e
│   ├── ui
│   └── api
├── fixtures
└── support
    ├── pages
    ├── actions
    ├── commands
    ├── dataFactory
    └── utils
```

### Padrões utilizados

-  Page Objects → Mapeamento dos elementos  
-  Actions → Regras de negócio  
-  Custom Commands → Reutilização de código  
-  Data Factory → Massa de dados dinâmica  
-  Configuração multiambiente  

---

##  Instalação do projeto

```bash
git clone https://github.com/andretcrs/cypress.git

cd SEU-REPO

npm install
```

---

##  Execução dos testes

### Modo interativo

```bash
npm run cy:open
```

### Modo headless

```bash
npm run cy:run
```

### Executar em um browser específico

```bash
npm run cy:run:chrome
```

---

## Relatório Allure

### Gerar e abrir o relatório

```bash
npm run allure:report
```

O relatório apresenta:

-  Evidências de falha  
-  Screenshots automáticos  
-  Tempo de execução  
-  Histórico de execuções  
-  Status dos testes  

---

## Multiambiente

Configuração feita no `cypress.config.js`.

### Executar por ambiente:

```bash
npx cypress run --env environment=dev
npx cypress run --env environment=hml
```

---

## Integração Contínua (CI/CD)

Pipeline configurada no **GitHub Actions** para:

- Instalar dependências  
- Executar os testes  
- Gerar o Allure Report  
- Publicar o relatório automaticamente no GitHub Pages  

### Acesse o relatório online

```
https://SEU-USUARIO.github.io/SEU-REPO
```

---

## Evidências

Em caso de falha são gerados automaticamente:

-  Screenshots  
-  Vídeos da execução  

---

## Plano de Testes & Cobertura

| Módulo | Tipo | Cenário de Teste | Camada | Severidade |
| :--- | :--- | :--- | :--- | :--- |
| **Login** |  Sucesso | Autenticação com credenciais válidas e redirecionamento | UI |
| **Login** |  Erro | Validação de senha inválida, usuário bloqueado e campos vazios | UI |
| **Segurança** |  URL | Bloqueio de acesso direto a páginas internas sem sessão ativa | UI |
| **Inventário** |  Lógica | Ordenação de produtos por preço e nome (Filtros) | UI |
| **Carrinho** |  Estado | Persistência de itens após ciclo de Logout/Login | UI | 
| **Carrinho** |  Ação | Remoção de itens via vitrine e via página de checkout | UI |
| **Checkout** |  E2E | Fluxo completo de compra utilizando dados do **Faker** | UI |
| **Checkout** |  Lógica | Verificação matemática de Subtotal, Taxas e Valor Total | UI |
| **Checkout** |  Erro | Validação de campos obrigatórios no formulário de entrega | UI | 
| **API** |  Health | Validação de disponibilidade do host e tempo de resposta (SLA) | API |

---

##  Boas práticas aplicadas

- Separação de responsabilidades  
- Testes independentes  
- Dados dinâmicos com Faker  
- Retry automático em falhas  
- Configuração por ambiente  
- Estrutura escalável  
- Código reutilizável  

---

##  Scripts disponíveis

```bash
npm run cy:open
npm run cy:run
npm run cy:run:chrome

npm run allure:clear
npm run allure:generate
npm run allure:open
npm run allure:report
```

---

##  Topics

```
cypress
e2e
test-automation
allure-report
qa
github-actions
page-objects
```

---

##  Autor

**André Scheffer**  
QA Engineer 

---

##  Diferenciais deste projeto

Este projeto demonstra na prática:

- Automação pronta para CI/CD  
- Geração de relatórios profissionais  
- Estrutura escalável para grandes aplicações  
