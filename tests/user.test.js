const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll(async (done) => {
  await queryInterface.bulkDelete("Users");
  done();
})

describe('POST /api/register', () => {
  // Test Case 1 : Register Success
  it('Test Case 1 : Register Success', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname: "Satria Permata", email: "satria@mail.com", password: "admin123" });
    const { body, status } = response;
    // Expectation
    const { user } = body;
    expect(status).toBe(201);
    expect(body).toHaveProperty("status", 201);
    expect(user).toHaveProperty("id", expect.any(Number));
    expect(user).toHaveProperty("fullname", "Satria Permata");
    expect(user).toHaveProperty("email", "satria@mail.com");
    done();
  });

  // Test Case 2 : Register Failed, Email already exists
  it('Test Case 2 : Register Failed, Email already exists', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname: "Satria Permata", email: "satria@mail.com", password: "admin123" })
      .expect(400, {
        status: 400,
        message: [
          { error: "Email already exists", field: "email" }
        ]
      });
    done();
  });

  // Test Case 3 : Register Failed, Value Empty
  it('Test Case 3 : Register Failed, Value Empty', async (done) => {
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

  // Test Case 4 : Register Failed, Some Value Empty
  it('Test Case 4 : Register Failed, Value Empty', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname: "Riyan Pratama", email: "", password: "" })
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

  // Test Case 6 : Register Failed, Password minimal 8 character
  it('Test Case 6 : Register Failed, Password minimal 8 character', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname: "Riyan Pratama", email: "", password: "123456" })
      .expect(400, {
        status: 400,
        message: [
          { error: "Email is required, can't be empty", field: "email" },
          { error: "Password is minimal 8 character", field: "password" }
        ]
      });
    done();
  });

  // Test Case 7 : Register Failed, Password minimal 8 character
  it('Test Case 7 : Register Failed, Password minimal 8 character', async (done) => {
    const response = await request(app)
      .post('/api/register')
      .send({ fullname: "Riyan Pratama", email: "satria@mail.com", password: "123456" })
      .expect(400, {
        status: 400,
        message: [
          { error: "Password is minimal 8 character", field: "password" }
        ]
      });
    done();
  });
});
