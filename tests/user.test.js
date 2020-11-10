const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

// afterAll(async (done) => {
//   await queryInterface.bulkDelete("Users");
//   done();
// })

// Customer 
const email = "customer@mail.com";
const password = "customer123";
const fullname = "Customer Permata";

describe('POST /api/register', () => {
  it('Test Case 1 : Test Register Success', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname, role, email, password });
    const { body, status } = response;
    // Expectation
    const { user } = body;
    expect(status).toBe(201);
    expect(body).toHaveProperty("status", 201);
    expect(user).toHaveProperty("id", expect.any(Number));
    expect(user).toHaveProperty("fullname", fullname);
    expect(user).toHaveProperty("email", email);
    done();
  });

  it('Test Case 2 : Test Register Failed, Email already exists', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname, role, email, password })
      .expect(400, {
        status: 400,
        message: [
          { error: "Email already exists", field: "email" }
        ]
      });
    done();
  });

  it('Test Case 3 : Test Register Failed, all value empty', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname: "", email: "", password: "" })
      .expect(400, {
        status: 400,
        message: [
          { error: "Fullname is required, can't be empty", field: "fullname" },
          { error: "Email is required, can't be empty", field: "email" },
          { error: "Password is required, can't be empty", field: "password" },
          { error: "Password is minimal 8 character", field: "password" }
        ]
      });
    done();
  });

  it('Test Case 4 : Test Register Failed, some value empty', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname, email: "", password: "" })
      .expect(400, {
        status: 400,
        message: [
          { error: "Email is required, can't be empty", field: "email" },
          { error: "Password is required, can't be empty", field: "password" },
          { error: "Password is minimal 8 character", field: "password" }
        ]
      });
    done();
  });

  it('Test Case 5 : Test Register Failed, Email empty & Password less than 8 character', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname, email: "", password: "123456" })
      .expect(400, {
        status: 400,
        message: [
          { error: "Email is required, can't be empty", field: "email" },
          { error: "Password is minimal 8 character", field: "password" }
        ]
      });
    done();
  });

  it('Test Case 6 : Test Register Failed, email not empty & Password less than 8 character', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname, email, password: "123456" })
      .expect(400, {
        status: 400,
        message: [
          { error: "Password is minimal 8 character", field: "password" }
        ]
      });
    done();
  });
});

describe('POST /api/login', () => {

  it('Test Case 1: Login succesfully', async (done) => {
    const response = await request(app)
      .post('/api/login')
      .send({ email, password });

    const { status, body } = response;
    const { user } = body;
    expect(status).toBe(200);
    expect(body).toHaveProperty("status", 200);
    expect(body).toHaveProperty("access_token", expect.any(String));
    expect(user).toHaveProperty("id", expect.any(Number));
    expect(user).toHaveProperty("fullname", fullname);
    expect(user).toHaveProperty("email", email);
    console.log("Use this Token: ", body.access_token)
    done();
  });

  it('Test Case 2: Login failed blank password and email', async (done) => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: "", password: "" })
      .expect(401, {
        status: 401,
        message: "Wrong Username / Password"
      });
    done();
  });

  it('Test Case 3: Login with wrong password', async (done) => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: "satria@mail.com", password: "wrong" })
      .expect(401, {
        status: 401,
        message: "Wrong Username / Password"
      });
    done();
  });

  it('Test Case 4: Login with not registered email', async (done) => {
    const response = await request(app)
      .post('/api/login')
      .send({ email: "satria.wrong@mail.com", password: "randompassword" })
      .expect(401, {
        status: 401,
        message: "Wrong Username / Password"
      });
    done();
  });
});
