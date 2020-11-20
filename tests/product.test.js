
const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll(async (done) => {
  await queryInterface.bulkDelete("Products");
  done();
})

// Please place here token admin and token user
let admin_access_token = "";
let customer_access_token = "";

let data = {};
let api_url = '/api/products/';
let name = "Product 1";
let image_url = "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg";
let price = 50000;
let stock = 11;

// IMPORTANT: FIRST RUN SEEDING DATABASE
// IMPORTANT: FIRST RUN SEEDING DATABASE
// IMPORTANT: FIRST RUN SEEDING DATABASE
// IMPORTANT: FIRST RUN SEEDING DATABASE

describe('POST /api/login', () => {
  it('Test Case 1: Login Admin succesfully', async (done) => {
    const fullname = 'Admin CMS'
    const email = 'admin@mail.com'
    const password = 'admin123'
    
    const response = await request(app)
      .post('/api/login')
      .send({ email, password });

    const { status, body } = response;
    const { user } = body;
    admin_access_token = body.access_token;

    expect(status).toBe(200);
    expect(body).toHaveProperty("status", 200);
    expect(body).toHaveProperty("access_token", expect.any(String));
    expect(user).toHaveProperty("id", expect.any(Number));
    expect(user).toHaveProperty("fullname", fullname);
    expect(user).toHaveProperty("email", email);
    done();
  });

  it('Test Case 2: Login Customer Succesfully', async (done) => {
    const fullname = 'Customer'
    const email = 'customer@mail.com'
    const password = 'customer123'

    const response = await request(app)
      .post('/api/login')
      .send({ email, password });

    const { status, body } = response;
    const { user } = body;
    customer_access_token = body.access_token;

    expect(status).toBe(200);
    expect(body).toHaveProperty("status", 200);
    expect(body).toHaveProperty("access_token", expect.any(String));
    expect(user).toHaveProperty("id", expect.any(Number));
    expect(user).toHaveProperty("fullname", fullname);
    expect(user).toHaveProperty("email", email);
    console.log("Use this Token: ", body.access_token)
    done();
  });
})

// Insert new product
describe('POST /api/products', () => {

  it('Test Case 1: Add new product', async (done) => {
    const response = await request(app)
      .post(api_url)
      .set("access_token", admin_access_token)
      .send({
        name, image_url, price, stock
      });

    const { status, body } = response;
    const { product } = body;
    expect(status).toBe(201);
    expect(body).toHaveProperty("status", 201);
    expect(product).toHaveProperty("id", expect.any(Number));
    expect(product).toHaveProperty("name", name);
    expect(product).toHaveProperty("image_url", image_url);
    expect(product).toHaveProperty("price", price);
    expect(product).toHaveProperty("stock", stock);
    data = product;
    done();
  });

  it('Test Case 2 : Test some value or all value empty', async (done) => {
    const response = await request(app)
      .post(api_url)
      .set("access_token", admin_access_token)
      .send({
        name: "", image_url: "", price: "", stock: ""
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Name is required, can't be empty", field: "name" },
          { error: "Image URL is required, can't be empty", field: "image_url" },
          { error: "Image must valid a url", field: "image_url" },
          { error: "Price is required, can't be empty", field: "price" },
          { error: "Price must be a number", field: "price" },
          { error: "Stock is required, can't be empty", field: "stock" },
          { error: "Stock must be a number", field: "stock" },
        ]
      });
    done();
  });

  it('Test Case 3 : Test when price or stock set minus', async (done) => {
    const response = await request(app)
      .post(api_url)
      .set("access_token", admin_access_token)
      .send({
        name, image_url, price: -1, stock: -2
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Price cannot set minus", field: "price" },
          { error: "Stock cannot set minus", field: "stock" },
        ]
      });
    done();
  });

  it('Test Case 4 : Test when price or stock set as string', async (done) => {
    const response = await request(app)
      .post(api_url)
      .set("access_token", admin_access_token)
      .send({
        name, image_url, price: "seratus ribu rupiah", stock: "seratus"
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Price must be a number", field: "price" },
          { error: "Stock must be a number", field: "stock" },
        ]
      });
    done();
  });

  it('Test Case 5 : Test when not contain access_token', async (done) => {
    const response = await request(app)
      .post(api_url)
      .send({
        name, image_url, price: "seratus ribu rupiah", stock: "seratus"
      })
      .expect(401, {
        status: 401,
        message: "Authentication Failed"
      });
    done();
  });

  it('Test Case 6 : Test when wrong access_token', async (done) => {
    const response = await request(app)
      .post(api_url)
      .set("access_token", "eyJhbGciOiJIUzI1NiJ9.sdsAo")
      .send({
        name: "Product 1",
        image_url: "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",
        price: "seratus ribu rupiah",
        stock: "seratus"
      })
      .expect(401, {
        status: 401,
        message: "Authentication Failed"
      });
    done();
  });

  it('Test Case 7 : Test when set token as access_token customer', async (done) => {
    const response = await request(app)
      .post(api_url)
      .set("access_token", customer_access_token)
      .send({
        name: "Product 1",
        image_url: "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",
        price: 1100000,
        stock: 100
      })
      .expect(401, {
        status: 401,
        message: "Not authorize"
      });
    done();
  });
});

// Update product
describe('PUT /api/products/:id', () => {

  let ProductId = -1;

  it('Test Case 1 : Test edit product', async (done) => {
    ProductId = data.id;
    name = "Product 1 EDIT";
    price = 123000;
    stock = 132;

    const response = await request(app)
      .put(api_url + ProductId)
      .set("access_token", admin_access_token)
      .send({
        name: name, image_url, price, stock
      });

    const { status, body } = response;
    const product = body.product;
    data = product;
    expect(status).toBe(200);
    expect(body).toHaveProperty("status", 200);
    expect(product).toHaveProperty("id", ProductId);
    expect(body.product).toHaveProperty("name", name);
    expect(product).toHaveProperty("image_url", image_url);
    expect(product).toHaveProperty("price", price);
    expect(product).toHaveProperty("stock", stock);
    done();
  });

  it('Test Case 2 : Test when some value or all value empty', async (done) => {
    // console.log("Product ID: " + ProductId)
    const response = await request(app)
      .put('/api/products/' + ProductId)
      .set("access_token", admin_access_token)
      .send({
        name: "", image_url: "", price: "", stock: ""
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Name is required, can't be empty", field: "name" },
          { error: "Image URL is required, can't be empty", field: "image_url" },
          { error: "Image must valid a url", field: "image_url" },
          { error: "Price is required, can't be empty", field: "price" },
          { error: "Price must be a number", field: "price" },
          { error: "Stock is required, can't be empty", field: "stock" },
          { error: "Stock must be a number", field: "stock" },
        ]
      });
    done();
  });

  it('Test Case 3 : Test when price or stock set minus', async (done) => {
    const response = await request(app)
      .put(api_url + ProductId)
      .set("access_token", admin_access_token)
      .send({
        name, image_url, price: -1, stock: -2
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Price cannot set minus", field: "price" },
          { error: "Stock cannot set minus", field: "stock" },
        ]
      });
    done();
  });

  it('Test Case 4 : Test when price or stock set as string', async (done) => {
    const response = await request(app)
      .put(api_url + ProductId)
      .set("access_token", admin_access_token)
      .send({
        name, image_url, price: "seratus ribu rupiah", stock: "seratus"
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Price must be a number", field: "price" },
          { error: "Stock must be a number", field: "stock" },
        ]
      });
    done();
  });

  it('Test Case 5 : Test when not contain access_token', async (done) => {
    const response = await request(app)
      .put(api_url)
      .send({
        name, image_url, price: "seratus ribu rupiah", stock: "seratus"
      })
      .expect(401, {
        status: 401,
        message: "Authentication Failed"
      });
    done();
  });

  it('Test Case 6 : Test when not wrong access_token', async (done) => {
    const response = await request(app)
      .put(api_url)
      .set("access_token", "asasKyH78FDHNJn.jnjs")
      .send({
        name, image_url, price: "seratus ribu rupiah", stock: "seratus"
      })
      .expect(401, {
        status: 401,
        message: "Authentication Failed"
      });
    done();
  });

  it('Test Case 7 : Test when set token as access_token customer', async (done) => {
    const response = await request(app)
      .put(api_url + ProductId)
      .set("access_token", customer_access_token)
      .send({
        name, image_url, price, stock
      })
      .expect(401, {
        status: 401,
        message: "Not authorize"
      });
    done();
  });
});

// Get Product
describe('GET /api/products/', () => {

  it('Test Case 1 : Test get all product', async (done) => {
    ProductId = data.id;
    const response = await request(app)
      .get(api_url)
      .expect(200, {
        status: 200,
        products: [
          { id: data.id, name, image_url, price, stock, CategoryId: null, createdAt: data.createdAt, updatedAt: data.updatedAt, Category: null }
        ]
      });
    done();
  });

  it('Test Case 2 : Test get product by id', async (done) => {
    ProductId = data.id;
    const url = api_url + ProductId
    console.log(url)

    const response = await request(app)
      .get(url)
      .expect(200, {
        status: 200,
        product: {
          id: data.id, name, image_url, price, stock, CategoryId: null, createdAt: data.createdAt, updatedAt: data.updatedAt, Category: null
        }
      });
    done();
  });

});

// Delete product
describe('DELETE /api/products/:id', () => {

  let ProductId = -1;

  it('Test Case 1 : Test when not contain access_token', async (done) => {
    ProductId = data.id;
    const response = await request(app)
      .delete(api_url + ProductId)
      .expect(401, {
        status: 401,
        message: "Authentication Failed"
      });
    done();
  });

  it('Test Case 2 : Test when wrong access_token', async (done) => {
    const response = await request(app)
      .delete(api_url + ProductId)
      .set("access_token", "asasKyH78FDHNJn.jnjs")
      .expect(401, {
        status: 401,
        message: "Authentication Failed"
      });
    done();
  });

  it('Test Case 3 : Test when set token as access_token customer', async (done) => {
    const response = await request(app)
      .delete(api_url + ProductId)
      .set("access_token", customer_access_token)
      .expect(401, {
        status: 401,
        message: "Not authorize"
      });
    done();
  });

  it('Test Case 4 : Test deleted product stock greater than 0', async (done) => {
    const response = await request(app)
      .delete(api_url + ProductId)
      .set("access_token", admin_access_token)
      .expect(400, {
        "status": 400,
        "message": "Failed to delete, stock is not empty"
      });
    done();
  });

  it('Test Case 5 : Test edit product Stock to Zero', async (done) => {
    ProductId = data.id;
    name = "Product 1 EDIT";
    price = 123000;
    stock = 0;

    const response = await request(app)
      .put(api_url + ProductId)
      .set("access_token", admin_access_token)
      .send({
        name: name, image_url, price, stock
      });

    const { status, body } = response;
    const product = body.product;
    expect(status).toBe(200);
    expect(body).toHaveProperty("status", 200);
    expect(product).toHaveProperty("id", ProductId);
    expect(body.product).toHaveProperty("name", name);
    expect(product).toHaveProperty("image_url", image_url);
    expect(product).toHaveProperty("price", price);
    expect(product).toHaveProperty("stock", stock);
    done();
  });

  it('Test Case 6 : Test success deleted product', async (done) => {
    const response = await request(app)
      .delete(api_url + ProductId)
      .set("access_token", admin_access_token)
      .send({
        name, image_url, price, stock
      })
      .expect(200, {
        status: 200,
        message: "Success deleted product"
      });
    done();
  });
});

