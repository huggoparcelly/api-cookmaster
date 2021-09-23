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
// describe('GET /recipes', () => { });

// // getRecipeByid
// describe('GET /recipes/id', () => { });

// // updateRecipe
// describe('PUT /recipes/id', () => { });

// // addImage
// describe('PUT /recipes/id/image', () => { });

// // deleteRecipe
// describe('DELETE /recipes/id', () => { });
