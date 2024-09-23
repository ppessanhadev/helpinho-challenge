# Helpinho | LBCA Fullstack challenge

Essa aplicação tem como objetivo ser uma aplicação onde pessoas podem ajudar e pedir ajuda de forma monetáiria. Você pode se cadastrar e criar o seu helpinho, onde outras pessoas lhe darão todo o apoio que precisar.

Ela foi desenvolvida como um monorepo, ou seja, possuí backend e frontend em conjunto.

## Overview da aplicação

Para o desenvolvimento geral, utilizei as principais ferramentas e conceitos:
- [Typescript] como linguagem principal de desenvolvimento
- [NestJS](https://docs.nestjs.com) para o desenvolvimento do backend
- [Angular 17+](https://v17.angular.io/docs) para o desenvolvimento frontend
- Backend foi projetado com arquitetura hexagonal e conceitos de SOLID e Clean Code visando o crescimento exponencial da aplicação
- Pode ser rodada separadamente com [pnpm](https://pnpm.io)

## Backend RESTFUL API

O Backend foi desenvolvido com [NestJS](https://nestjs.com), toda a lógica da aplicação está centralizada nele, sendo resposável por listar, criar, alterar e deletar usuários e helps.

Também tomei a liberdade de desnvolver a aplicação do backend utilizando conceitos de TDD para melhor garantia de funcionamento geral das implementações.

**Tecnologias utilizadas**
- [Prisma ORM](https://www.prisma.io) para simplificar a comunicação com o banco de dados, criação de models e tabelas, utilizando o banco relacional [postgres](https://www.postgresql.org)
- [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) para documentar as rotas da aplicação
- [vitest](https://vitest.dev) para testes unitários e de intgração.
- [superagent](https://www.npmjs.com/package/superagent) para testes e2e.
- [Docker compose](https://docs.docker.com/compose/) para rodar o banco em containers
- [serveless](https://www.serverless.com/framework/docs) para rodar a aplicação em um ambiente cloud simulando aws lambda
- Lint com [ESlint](https://eslint.org/) + [Prettier](https://prettier.io/) para manter a consistencia do código

**Rotas**

Os dados que devem ser enviados e são opcionais podem ser vistos a partir da documentação gerada pelo Swagger em `/docs`

> **Usuários**

| **Método** | **Rota**            | **Auth** | **Parâmetro** | **Descrição**              |
|--------|-----------------|------|-----------|--------------------------------------------|
| POST   | /v1/users       | -    | -         | Cria um novo usuário                       |
| POST   | /v1/users/login | -    | -         | Registra um novo usuário no banco de dados |

>**Helps**

| Método | Rota       | Auth         | Parâmetro                  | Descrição                                   |
|--------|------------|--------------|----------------------------|---------------------------------------------|
| GET    | /v1/orders | Bearer token | page[number];<br/>limit[number] | Lista os helpinhos criados com paginação    |
| POST   | /v1/orders | Bearer token | -                          | Registra um novo helpinho no banco de dados |


**Arquitetura**

O Backend foi organizado e está divida nas seguintes camadas:

- `presentation`: Responsável por conter tudo relacionado a fluxo de entrada e saída da aplicação, podendo incluir validações de entrada, tratativa de erro e segurança caso seja necessário.
- `application`: Responsável por conter mapeadores, pipes para adptar dados e centralizar as regras de negocio em `use-cases`.
- `domain`: Responsável por lidar com todas as entidades, validadores e schemas da aplicação.
- `infra`: Responsável por conter e gerenciar comunicações externas, seja com banco de dados, com provedores como APIs externas e microserviços.
- `shared`: Responsável por conter tud que pode ser compartilhado entre outras camadas, como tipagens, utilitários, custom decorators e etc.

**Como rodar o projeto**

**OBS**: As aplicações foram desenvolvidas na versão v20 do node, então é necessário que mude sua versão.

A partir da raiz do projeto em seu terminal, siga os próximos passos para rodar a API localmente:

**Rodando localmente**

1. `cd backend`
2. `pnpm i`
3. `cp .env.example .env`
4. `docker-compose up -d`
5. `pnpm start:dev`

>> A aplicação estará rodando em http://localhost:4000

**Rodando testes**

```bash
pnpm test:unit # para testes unitários

pnpm test:integration # para testes de integração

pnpm test:e2e # para testes e2e
```

## Frontend Angular 17+

O Frontend foi construído usando [Angular 17+](https://v17.angular.io/docs), sendo responsável por consumir o backend, exigindo menos lógica possível, se importando mais com as regras de usuário da aplicação.

**Tecnologias utilizadas**

- Lint com [ESlint](https://eslint.org) para consistencia do código
- [Tailwind](https://tailwindcss.com) para estilização das páginas de forma simplificada
- [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt) para gerencimaneto login/logout da aplicação
- [ngx-mask](https://www.npmjs.com/package/ngx-mask) para formatar visualmente os inputs para o usuário


**Rodando localmente**

**OBS**: As aplicações foram desenvolvidas na versão v20 do node, então é necessário que mude sua versão.

O projeto em si foi desenvolvido utilizado o gerenciador de pacote pnpm, para instalar, no seu terminal execute o comando `npm i -g pnpm`, e siga os próximos passos:

1. `cd frontend`
3. `pnpm install`
6. `pnpm start`

>> A aplicação estará rodando em http://localhost:4000

## Considerações gerais e melhorias

Incialmente, existiam diversos planos para aplicação em si seguindo o figma de maneira fiel a dark theme, ci/cd e páginas extras.
Entretanto, pela extensividade do desafio e com a ausencia de tempo, muitos planos ficaram de foram, inclusive tornando a aplicação incompleta no atual momento.

Futuras implementações e melhorias:
  - `backend`:
    - [ ] Rotas para Upload de imagem no bucket S3
    - [ ] Rotas para efetuar doação
    - [ ] CI/CD para deploy do ambiente em serveless
  - `frontend`:
    - [ ] Melhor consistencia de token e refresh token
    - [ ] Integração com registro de usuário no backend
    - [ ] Integração com criação de novo helpinho
    - [ ] Adição de validadores para cadastro de novo helpinho
    - [ ] Adição de prévia ao finalizar o cadastro
    - [ ] Adição de visualização de cards criados no dashboard
    - [ ] Integração para listar helpinho já criados e que receberam ajuda dos usuários
    - [ ] Implementação de infinite loading + virtualização de conteúdo na home
    - [ ] Adição de pagina de detalhes de helpinho e realização de doação em valor X
    - [ ] Responsividade em todas as páginas (atualmente está apenas presente na landing page e dashboard)
    - [ ] CI/CD do frontend em uma instância na AWS
    - [ ] Dark theme

