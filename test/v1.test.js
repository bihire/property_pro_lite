
const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app');

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('User', () => {
  describe('Signup', () => {
    it('user should signup', (done) => {
      supertest('http://localhost:8081/api/v1/')
        .post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          address: "fgfghjhh",
          email: "muhirebori@yahoo.fr",
          first_name: "sdfgh",
          last_name: "bro",
          password: "bro1234333",
          confirm_password: "bro1234333",
          phone_number: "3341234333",
          is_admin: true
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          done();
        });
    });
  });
  describe('Login', () => {
    it('should check if user exist', (done) => {
      supertest('http://localhost:8081/api/v1')
        .post('/auth/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'muhirebori@yahoo.fr',
          password: 'bro1234333'
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
    it('user(agent) should create a propety', (done) => {
  describe('create', () => {

        supertest('http://localhost:8081/api/v1/')
        .post('/property')
        .set('Accept', 'application/json')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6MiwiYWRkcmVzcyI6ImZnZmdoamhoIiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiZmlyc3RfbmFtZSI6InNkZmdoIiwibGFzdF9uYW1lIjoiYnJvIiwicGFzc3dvcmQiOiJicm8xMjM0MzMzIiwiY29uZmlybV9wYXNzd29yZCI6ImJybzEyMzQzMzMiLCJwaG9uZV9udW1iZXIiOiIzMzQxMjM0MzMzIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTU2Mjg5NzQxOX0.vVwmgG0fF6rWz8PW-bLMdzKp7RN1Hj_iYfBHJK8OEJI')
          .send({
            address: 'fgfghjhh',
            status: 'available',
            is_admin: true,
            type: 'bro you wilding',
            price: 3.765,
            state: 'kigali',
            city: 'kigali',
            image_url: 'https://www.google.be/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
          })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          done();
      });
    });
  });
  describe('Update', () => {
    it('should update a property', (done) => {
      supertest('http://localhost:8081/api/v1')
        .patch('/property/1')
        .set('Accept', 'application/json')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6MiwiYWRkcmVzcyI6ImZnZmdoamhoIiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiZmlyc3RfbmFtZSI6InNkZmdoIiwibGFzdF9uYW1lIjoiYnJvIiwicGFzc3dvcmQiOiJicm8xMjM0MzMzIiwiY29uZmlybV9wYXNzd29yZCI6ImJybzEyMzQzMzMiLCJwaG9uZV9udW1iZXIiOiIzMzQxMjM0MzMzIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTU2Mjg5NzQxOX0.vVwmgG0fF6rWz8PW-bLMdzKp7RN1Hj_iYfBHJK8OEJI')
        .send({
            
              state: "ahhh",
              city: "bro",
              created_on: "2019-07-11T14:22:36+02:00",
              ownerEmail: "muhirebori@yahoo.fr",
              ownerPhoneNumber: "bro"
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
        .get('/properti/bro')
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
        .get('/properti/bro?type=bro')
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
        .delete('/property/1')
        .set('Accept', 'application/json')
        .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6MiwiYWRkcmVzcyI6ImZnZmdoamhoIiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiZmlyc3RfbmFtZSI6InNkZmdoIiwibGFzdF9uYW1lIjoiYnJvIiwicGFzc3dvcmQiOiJicm8xMjM0MzMzIiwiY29uZmlybV9wYXNzd29yZCI6ImJybzEyMzQzMzMiLCJwaG9uZV9udW1iZXIiOiIzMzQxMjM0MzMzIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTU2Mjg5NzQxOX0.vVwmgG0fF6rWz8PW-bLMdzKp7RN1Hj_iYfBHJK8OEJI')
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

describe('Flag', () => {
      describe('Create', () => {
        it('user should create a flag', (done) => {
          supertest('http://localhost:8081/api/v1/')
            .post('/flag/create')
            .set('Accept', 'application/json')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6MiwiYWRkcmVzcyI6ImZnZmdoamhoIiwiZW1haWwiOiJtdWhpcmVib3JpQHlhaG9vLmZyIiwiZmlyc3RfbmFtZSI6InNkZmdoIiwibGFzdF9uYW1lIjoiYnJvIiwicGFzc3dvcmQiOiJicm8xMjM0MzMzIiwiY29uZmlybV9wYXNzd29yZCI6ImJybzEyMzQzMzMiLCJwaG9uZV9udW1iZXIiOiIzMzQxMjM0MzMzIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTU2Mjg5NzQxOX0.vVwmgG0fF6rWz8PW-bLMdzKp7RN1Hj_iYfBHJK8OEJI')
            .send({
              description: 'dcfgvhbjnkjmlk,njhfxdfg',
              created_on: '2019-07-13T23:37:37+02:00'
            })
            .expect('Content-Type', /json/)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.a('object');
              done();
            });
        });
      });});