
const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('user', () => {
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

// describe('Property', () => {
//   describe('create', () => {
//     it('user(agent) should create a propety', (done) => {

//         supertest('http://localhost:8081/api/v1/')
//         .post('/property')
//         .set('Accept', 'application/json')
//           .send({
//             property_id: 2,
//             address: "     @@@@@",
//             owner: 1,
//             status: "bro",
//             price: -45,
//             state: "bro",
//             city: "bro",
//             created_on: "2019-07-11T14:22:36+02:00",
//             ownerEmail: "muhirebori@yahoo.fr",
//             ownerPhoneNumber: "bro"
//           })
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.a('object');
//           done();
//       });
//     });
//   });
//   describe('Update', () => {
//     it('should update a property', (done) => {
//       supertest('http://localhost:8081/api/v1')
//         .post('/property/update')
//         .set('Accept', 'application/json')
//         .send({
            
//               state: "ahhh",
//               city: "bro",
//               created_on: "2019-07-11T14:22:36+02:00",
//               ownerEmail: "muhirebori@yahoo.fr",
//               ownerPhoneNumber: "bro"
//         })
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.a('object');
//           done();
//         });
//     });
//   });

//   describe('get property', () => {
//     it('should get propert information', (done) => {
//       supertest('http://localhost:8081/api/v1')
//         .get('/property/1')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.a('object');
//           done();
//         });
//     });
//   });

//   describe('all properties', () => {
//     it('should get all the properties', (done) => {
//       supertest('http://localhost:8081/api/v1')
//         .get('/property')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.a('object');
//           done();
//         });
//     });
//   });

//   describe('get property type', () => {
//     it('should get property by type', (done) => {
//       supertest('http://localhost:8081/api/v1')
//         .get('/property?search="bro"')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.a('object');
//           done();
//         });
//     });
//   });

//   describe('By userId', () => {
//     it('should all the user properties', (done) => {
//       supertest('http://localhost:8081/api/v1')
//         .get('/property/user/1')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.a('object');
//           done();
//         });
//     });
//   });

//   describe('delete', () => {
//     it('should delete property', (done) => {
//       supertest('http://localhost:8081/api/v1')
//         .delete('/property/del')
//         .set('Accept', 'application/json')
//         .send({
//           owner: 1,
//           id: 1
//         })
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.a('object');
//           done();
//         });
//     });
//   });
// });
