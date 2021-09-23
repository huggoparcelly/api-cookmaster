const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHttp);
const { expect } = chai;
const {MongoClient} = require('mongodb');

const app = require('../api/app');
const { getConnection } = require('./connectionMock');

// createRecipe
describe('POST /recipes', () => { 

  let connectionMock;
  let token;
  const users = [
    { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }
  ];
  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const db = connectionMock.db('Cookmaster');
    await db.collection('users').insertMany(users);

    const login = await chai.request(app).post('/login')
      .send({
      email: 'root@email.com',
      password: 'admin'
      });
    token = login.body.token;
  });

  after( async () => {
    MongoClient.connect.restore();
  });

  describe('Quando o "name" não é informado', () => {
    let response;
    const payloadWithoutName = {
      ingredients: "Frango, sazon",
      preparation: "10 minutos no forno"
    }

    before(async () => {
      response = await chai.request(app)
      .post('/recipes')
      .set('authorization', token)
      .send(payloadWithoutName)
    })

    it('retorna código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', 
      () => {
        expect(response.body.message).to.be.equal("Invalid entries. Try again.")
     });
  });

  describe('Quando o "ingredients" não é informado', () => {
    let response;
    const payloadWithoutIngredients = {
      name: "Frango delicioso",
      preparation: "10 minutos no forno"
    }

    before(async () => {
      response = await chai.request(app)
      .post('/recipes')
      .set('authorization', token)
      .send(payloadWithoutIngredients)
    })

    it('retorna código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', 
      () => {
        expect(response.body.message).to.be.equal("Invalid entries. Try again.")
     });
  });

  describe('Quando o "preparation" não é informado', () => {
    let response;
    const payloadWithoutPreparation = {
      name: "Frango delicioso",
      ingredients: "Frango, sazon"
    }

    before(async () => {
      response = await chai.request(app)
      .post('/recipes')
      .set('authorization', token)
      .send(payloadWithoutPreparation)
    })

    it('retorna código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', 
      () => {
        expect(response.body.message).to.be.equal("Invalid entries. Try again.")
     });
  });

  describe('Quando o token é inválido', () => {
    let response;
    const payloadRecipe = {
      name: "Frango delicioso",
      ingredients: "Frango, sazon",
      preparation: "10 minutos no forno"
    }

    before(async () => {
      response = await chai.request(app)
      .post('/recipes')
      .set('authorization', token.replace('a', '1'))
      .send(payloadRecipe)
    })

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "jwt malformed"', 
      () => {
        expect(response.body.message).to.be.equal("jwt malformed")
     });
  })

  describe('Quando uma receita é cadastrada com sucesso', () => {
    let response;
    const payloadRecipe = {
      name: "Frango delicioso",
      ingredients: "Frango, sazon",
      preparation: "10 minutos no forno"
    }

    before(async () => {
      response = await chai.request(app)
      .post('/recipes')
      .set('authorization', token)
      .send(payloadRecipe)
    })

    it('retorna código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('a propriedade "recipe" possui as propriedades "name", "ingredients", "preparation", "userId", "_id"', 
      () => {
        expect(response.body.recipe)
          .to.have.all.keys(["name", "ingredients", "preparation", "userId", "_id"])
     });
  })
});

// getRecipe
describe('GET /recipes', () => { 

  let connectionMock;

  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after( async () => {
    MongoClient.connect.restore();
  });

  describe('É possível listar as receitas quando não estiver autenticado', () => {
    let response;

    before(async () => {
      response = await chai.request(app).get('/recipes')
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.an('array');
    });

    it('array de resposta possui objetos', () => {
      expect(response.body[0]).to.be.an('object')
    });

    it('o objeto possui as propriedades "name", "ingredients", "preparation", "userId", "_id"', 
      () => {
        expect(response.body[0])
          .to.have.all.keys(["name", "ingredients", "preparation", "userId", "_id"])
     });

  });

  describe('É possível listar as receitas estando autenticado', () => {
    let response;
    let token;

    const payloadOk = {
      email: "joão@email.com",
      password: "12345678"
    }

    const payloadUser = {
      name: 'João da Silva',
      email: "joão@email.com",
      password: "12345678"
    }
    
    before(async () => {
      await chai.request(app).post('/users').send(payloadUser)
      const login = await chai.request(app).post('/login').send(payloadOk)
      token = login.body.token;
      response = await chai.request(app)
      .get('/recipes')
      .set('authorization', token)
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.an('array');
    });

    it('array de resposta possui objetos', () => {
      expect(response.body[0]).to.be.an('object')
    });

    it('o objeto possui as propriedades "name", "ingredients", "preparation", "userId", "_id"', 
      () => {
        expect(response.body[0])
          .to.have.all.keys(["name", "ingredients", "preparation", "userId", "_id"])
     });

  })
});

// getRecipeByid
describe('GET /recipes/id', () => {
  let connectionMock;
  let idRecipe;
  
  const users = [
    { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }
  ];

  const payloadRecipe = { 
    name: "Frango delicioso",
    ingredients: "Frango, sazon",
    preparation: "10 minutos no forno"
  }

  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const db = connectionMock.db('Cookmaster');
    await db.collection('users').insertMany(users);

    const login = await chai.request(app).post('/login')
      .send({
      email: 'root@email.com',
      password: 'admin'
      });
    const token = login.body.token;
    
    const newRecipe = await chai.request(app).post('/recipes')
        .send(payloadRecipe)
        .set('authorization', token)
    idRecipe = newRecipe.body.recipe._id
  });

  after( async () => {
    MongoClient.connect.restore();
  });

  describe('É possível listar uma receita quando não estiver autenticado', () => {
    let response;

    before(async () => {
      response = await chai.request(app).get(`/recipes/${idRecipe}`)
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui as propriedades "name", "ingredients", "preparation", "userId", "_id"', 
      () => {
        expect(response.body)
          .to.have.all.keys(["name", "ingredients", "preparation", "userId", "_id"])
     });
  });

  describe('É possível listar uma receita estando autenticado', () => {
    let response;
    let tokenUser;

    const payloadOk = {
      email: "joão@email.com",
      password: "12345678"
    }

    const payloadUser = {
      name: 'João da Silva',
      email: "joão@email.com",
      password: "12345678"
    }
    
    before(async () => {
      await chai.request(app).post('/users').send(payloadUser)
      const login = await chai.request(app).post('/login').send(payloadOk)
      tokenUser = login.body.token;
      response = await chai.request(app)
      .get(`/recipes/${idRecipe}`)
      .set('authorization', tokenUser)
    });

    before(async () => {
      await chai.request(app).post('/login').send()
      response = await chai.request(app).get(`/recipes/${idRecipe}`)
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui as propriedades "name", "ingredients", "preparation", "userId", "_id"', 
      () => {
        expect(response.body)
          .to.have.all.keys(["name", "ingredients", "preparation", "userId", "_id"])
     });
  });

  describe('Não é possível listar uma receita que não existe', () => {
    let response;
    const idWrong = 1234567897;
    before(async () => {
      response = await chai.request(app).get(`/recipes/${idWrong}`)
    });

    it('retorna código de status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "recipe not found"', 
      () => {
        expect(response.body.message).to.be.equal("recipe not found")
     });
  });
 });

// // updateRecipe
// describe('PUT /recipes/id', () => { });

// // addImage
// describe('PUT /recipes/id/image', () => { });

// // deleteRecipe
// describe('DELETE /recipes/id', () => { });
