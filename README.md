# Boas vindas ao repositório do projeto Cookmaster!

Esse projeto foi realizado com o objetivo de colocar em prática o aprendizado sobre **API utilizando a arquitetura MSC** do módulo de back-end da Trybe. 🚀

Aqui você vai encontrar alguns detalhes de como o projeto foi desenvolvido, bem como instruções para acessar e baixar o projeto localmente.
Obrigado por acessar.

---

# Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [O que foi desenvolvido](#desenvolvimento)
- [Habilidades](#habilidades)
- [Instruções](#instruções)
- [Endpoints](#edpoints)

---

# Sobre o projeto

A proposta do projeto foi desenvolver seu app utilizando a arquitetura MSC!

Neste novo projeto deverá é possível fazer o cadastro e login de pessoas usuárias, onde apenas essas pessoas poderão acessar, modificar e deletar as receitas que cadastrou.

---

# Desenvolvimento


Foi desenvolvido todas as camadas da aplicação (Models, Service e Controllers).

Através dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜).

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) será necessário autenticar-se. Além disso, as pessoas usuárias podem ser clientes ou administradores. Pessoas clientes apenas poderão disparar ações nas receitas que ele mesmo criou. Já uma pessoa administradora pode disparar qualquer ação em qualquer receita.

---

# Habilidades

Para esse projeto, foi desenvolvido as seguintes habilidades

- Entender o que há por dentro de um token de autenticação;
- Gerar tokens a partir de informações como login e senha;
- Autenticar rotas do Express, usando o token JWT;
- Fazer upload de arquivos em APIs REST;
- Salvar arquivos no servidor através de uma API REST;
- Consultar arquivos do servidor através de uma api REST.

---

# Instruções

## Instruções para baixar o projeto

1. Clone o repositório

- `git clone git@github.com:huggoparcelly/api-store-manager.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd api-store-manager`
  - Vá para a branch principal do desenvolvimento, com `git checkout huggo-parcelly-sd-010-b-store-manager && git pull`.

2. Instale as dependências

- `npm install`

---

# Endpoints

### Endpoint para o cadastro de usuários

- A rota é (`/users`).

- No banco um usuário terá os campos Email, Senha, Nome e Role.

- Para criar um usuário através da API, todos os campos são obrigatórios, com exceção do Role.

- O campo Email é único.

- Usuários criados através desse endpoint possuem seu campo Role com o atributo _user_, ou seja, são usuários comuns, e não admins.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```


### Endpoint para o login de usuários

- A rota é (`/login`).

- A rota recebe os campos Email e Senha e esses campos são validados no banco de dados.

- Um token `JWT` é gerado e retornado caso haja sucesso no login. No seu payload está presente o id, email e role do usuário.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Endpoint para o cadastro de receitas

- A rota é (`/recipes`).

- A receita só é criada se o usuário esteja logado e o token `JWT` validado.

- No banco, a receita possui os campos Nome, Ingredientes, Modo de preparo, URL da imagem e Id do Autor.

- Nome, ingredientes e modo de preparo devem ser recebidos no corpo da requisição, com o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```

- O campo ID do autor, é preenchido automaticamente com o ID do usuário logado, que é extraído do token JWT.

- A URL da imagem será preenchida através de outro endpoint


### Endpoint para a listagem de receitas

- A rota é (`/recipes`).

- A rota pode ser acessada por usuários logados ou não

### Endpoint para visualizar uma receita específica

- A rota é (`/recipes/:id`), apenas a receita com o `id` presente na URL é retornado;

- A rota pode ser acessada por usuários logados ou não


### Endpoint para a edição de uma receita

- A rota deve ser (`/recipes/:id`).

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado, ou caso esse usuário seja um admin.

- O corpo da requisição deve receber o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```


### Endpoint para a exclusão de uma receita

- A rota é (`/recipes/:id`).

- A receita só pode ser excluída caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser excluída caso pertença ao usuário logado, ou caso o usuário logado seja um admin.


### Endpoint para a adição de uma imagem a uma receita

- A rota é (`/recipes/:id/image/`).

- A imagem é lida do campo `image`.

- O endpoint aceita requisições no formato `multipart/form-data`.

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado ou caso o usuário logado seja admin.

- O upload da imagem deverá ser feito utilizando o `Multer`.

- O nome do arquivo deve ser o ID da receita, e sua extensão `.jpeg`.

- A URL completa para acessar a imagem através da API é gravada no banco de dados, junto com os dados da receita.


### Endpoint para acessar a imagem de uma receita

- As imagens estão disponíveis através da rota `/images/<id-da-receita>.jpeg` na API.
