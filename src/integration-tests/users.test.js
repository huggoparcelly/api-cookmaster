const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHttp);
const { expect } = chai;
const {MongoClient} = require('mongodb');

const app = require('../api/app');
const { getConnection } = require('./connectionMock');

// createuser
describe('POST /users ', () => {

  let connectionMock;
  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after( async () => {
    MongoClient.connect.restore();
  });


  describe('Quando não é passado o "name"', () => {
    let response;
    const payloadWithoutName = {
      email: "email@mail.com",
      password: "12345678"
    }

    before(async () => {
      response = await chai.request(app).post('/users').send(payloadWithoutName)
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

  describe('Quando não é passado o "email"', () => {
    let response;
    const payloadWithoutEmail = {
      name: "João da Silva",
      password: "12345678"
    }

    before(async () => {
      response = await chai.request(app).post('/users').send(payloadWithoutEmail)
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

  describe('Quando não é passado o "password"', () => {
    let response;
    const payloadWithoutPassword = {
      name: "João da Silva",
      email: "email@mail.com"
    }

    before(async () => {
      response = await chai.request(app).post('/users').send(payloadWithoutPassword)
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

  describe('Quando o email já existe', () => {
    let response;
    const payloadUser1 = {
      name: "João da Silva",
      email: "email@mail.com",
      password: "12345678"
    }

    const payloadUser2 = {
      name: "José da Silva",
      email: "email@mail.com",
      password: "12345678"
    }

    before(async () => {
      await chai.request(app).post('/users').send(payloadUser1)
      response = await chai.request(app).post('/users').send(payloadUser2)
    });
    

    it('retorna código de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Email already registered"', 
      () => {
        expect(response.body.message).to.be.equal("Email already registered")
     });
  });

  describe('Quando o cadastro é realizado com sucesso', () => {
    let response;
    const payloadUser = {
      name: "João da Silva",
      email: "joão@mail.com",
      password: "12345678"
    }

    before(async () => {
      response = await chai.request(app).post('/users').send(payloadUser)
    })

    it('retorna código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" possui as propriedades "name", "email", "role", "_id"', 
      () => {
        expect(response.body.user).to.have.all.keys(["name", "email", "role", "_id"])
     });

     it('a propriedade "role" possui o valor "user"', 
      () => {
        expect(response.body.user.role).to.equal('user')
     });
  });

});

// login
describe('POST /login', () => {
  let connectionMock;
  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after( async () => {
    MongoClient.connect.restore();
  });

  describe('Quando não é passado o "email"', () => {
    let response;
    const payloadWithoutEmail = {
      password: "12345678"
    }

    before(async () => {
      response = await chai.request(app).post('/login').send(payloadWithoutEmail)
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "All fields must be filled"', 
      () => {
        expect(response.body.message).to.be.equal("All fields must be filled")
     });
  })

  describe('Quando não é passado o "password"', () => {
    let response;
    const payloadWithoutPassword = {
      email: "email@mail.com"
    }

    before(async () => {
      response = await chai.request(app).post('/login').send(payloadWithoutPassword)
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "All fields must be filled"', 
      () => {
        expect(response.body.message).to.be.equal("All fields must be filled")
     });
  })

  describe('Quando é passado um "email" invalido', () => {
    let response;
    const payloadWrongEmail = {
      email: "email@",
      password: "12345678"
    }

    before(async () => {
      response = await chai.request(app).post('/login').send(payloadWrongEmail)
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Incorrect username or password"', 
      () => {
        expect(response.body.message).to.be.equal("Incorrect username or password")
     });
  })

  describe('Quando é passado um "password" invalido', () => {
    let response;
    const payloadWrondPassword = {
      email: "email@mail.com",
      password: "1234"
    }

    before(async () => {
      response = await chai.request(app).post('/login').send(payloadWrondPassword)
    });

    it('retorna código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Incorrect username or password"', 
      () => {
        expect(response.body.message).to.be.equal("Incorrect username or password")
     });
  })

  describe('Quando o login é realizado com sucesso', () => {
    let response;

    const payloadUser = {
      name: "João da Silva",
      email: "joão@mail.com",
      password: "12345678"
    }

    const payloadOk = {
      email: "joão@mail.com",
      password: "12345678"
    }

    before(async () => {
      await chai.request(app).post('/users').send(payloadUser)
      response = await chai.request(app).post('/login').send(payloadOk)
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  })

});

// createAdmin
describe('POST /users/admin', () => {
  let connectionMock;
  const users = [
    { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }
  ];
  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    const db = connectionMock.db('Cookmaster');
    await db.collection('users').insertMany(users);
  });

  after( async () => {
    MongoClient.connect.restore();
  });

  describe('Quando o cadastro de admin é feito, sem estar logado como admin', () => {
    let response;
    let authorization;

    const payloadUser = {
      name: "João da Silva",
      email: "joão@mail.com",
      password: "12345678"
    }

    const payloadOk = {
      email: "joão@mail.com",
      password: "12345678"
    }

    const payloadAdmin = {
      name: "admin",
      email: "root@email.com",
      password: "admin"
    }

    before(async () => {
      await chai.request(app).post('/users').send(payloadUser)
      authorization = await chai.request(app).post('/login').send(payloadOk) 
      response = await chai.request(app)
        .post('/users/admin')
        .set('authorization', authorization.body.token)
        .send(payloadAdmin)
    });

    it('retorna código de status 403', () => {
      expect(response).to.have.status(403);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Only admins can register new admins"', 
      () => {
        expect(response.body.message).to.be.equal("Only admins can register new admins")
     });
  })

  describe('Quando o cadastro de admin é feito, logado como admin', () => {
    let response;
    let authorization;

    const payloadOk = {
      email: "root@email.com",
      password: "admin"
    }

    const payloadNewAdmin = {
      name: 'admin2',
      email: "roott@email.com",
      password: "adminn"
    }

    before(async () => {
      authorization = await chai.request(app).post('/login').send(payloadOk) 
      response = await chai.request(app)
        .post('/users/admin')
        .set('authorization', authorization.body.token)
        .send(payloadNewAdmin)
      
    });

    it('retorna código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um object no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui uma propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a propriedade "user" possui as propriedades "name", "email", "role", "_id"', 
      () => {
        expect(response.body.user).to.have.all.keys(["name", "email", "role", "_id"])
     });

    it('a propriedade "role" possui o valor "admin"', 
    () => {
      expect(response.body.user.role).to.equal('admin')
    });
  })

});

