
const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('user', () => {
  describe('Register', () => {
    it('should create new user', (done) => {
      chai
        .request('http://localhost:8081/api/v1')
        .post('/register')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
  describe('Login', () => {
    it('should check if user exist', (done) => {
      supertest('http://localhost:8081/api/v1')
        .get('/login')
        .set('Accept', 'application/json')
        .send({
          email: 'bro',
          password: 'bro'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
});

describe('Property', () => {
  describe('create', () => {
    it('user(agent) should create a propety', (done) => {

        supertest('http://localhost:8081/api/v1/')
        .post('/property/add')
        .set('Accept', 'application/json')
          .send({
            id: 1,
            address: 'bro',
            owner: 1,
            status: 'bro',
            price: 2.0847,
            state: 'bro',
            city: 'bro',
            type: 'bro i am',
            created_on: '2018-11-13T20:20:39+00:00',
            image_url: 'https://www.google.be/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
            ownerEmail: 'muhireboris@yahoo.fr',
            ownerPhoneNumber: '0798734567'
          })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
      });
    });
  });
  describe('Update', () => {
    it('should update a property', (done) => {
      supertest('http://localhost:8081/api/v1')
        .post('/property/update')
        .set('Accept', 'application/json')
        .send({
          id: 1,
            address: 'bro',
            owner: 1,
            status: 'bro',
            price: 2.0847,
            image_url: 'https://www.google.be/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
            ownerEmail: 'muhireboris@yahoo.fr',
            ownerPhoneNumber: '079876546'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });

  describe('get property', () => {
    it('should get propert information', (done) => {
      supertest('http://localhost:8081/api/v1')
        .get('/property/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });

  describe('all properties', () => {
    it('should get all the properties', (done) => {
      supertest('http://localhost:8081/api/v1')
        .get('/property')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });

  describe('get property type', () => {
    it('should get property by type', (done) => {
      supertest('http://localhost:8081/api/v1')
        .get('/property?search="bro"')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });

  describe('By userId', () => {
    it('should all the user properties', (done) => {
      supertest('http://localhost:8081/api/v1')
        .get('/property/user/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });

  describe('delete', () => {
    it('should delete property', (done) => {
      supertest('http://localhost:8081/api/v1')
        .delete('/property/del')
        .set('Accept', 'application/json')
        .send({
          owner: 1,
          id: 1
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
});
