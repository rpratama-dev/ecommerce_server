// name
// image_url
// price
// stock

const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll(async (done) => {
  await queryInterface.bulkDelete("Products");
  done();
})

// Please place here token admin and token user
const admin_access_token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NDIsImZ1bGxuYW1lIjoiU2F0cmlhIFBlcm1hdGEiLCJlbWFpbCI6InNhdHJpYUBtYWlsLmNvbSJ9.arVTAdaeX-Jdz-SCC6bPY4JSgu7nMeTBzeuzOHA0F2U";
const customer_access_token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NDQsImZ1bGxuYW1lIjoiQ3VzdG9tZXIgUGVybWF0YSIsImVtYWlsIjoiY3VzdG9tZXJAbWFpbC5jb20ifQ.4_1mc1yXZbJ1bbQhMD6z-rH_eCh9iSRjuUZe71ZbQ2s";

let data = "blablabla"
// Insert new product
describe('POST /api/products', () => {

  let api_url = '/api/products/';
  let name = "Product 1";
  let image_url = "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg";
  let price = 50000;
  let stock = 11;

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
  // ProductId = 31; 
  let api_url = '/api/products/';
  let name = "Product 1 EDIT";
  let image_url = "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg";
  let price = 50000;
  let stock = 11;
  let ProductId = -1;

  it('Test Case 1 : Test edit product', async (done) => {
    const priceEdit = 123000;
    const stockEdit = 132;
    ProductId = data.id;
    const response = await request(app)
      .put(api_url + ProductId)
      .set("access_token", admin_access_token)
      .send({
        name: name + " EDIT", image_url, price: priceEdit, stock: stockEdit
      });

    const { status, body } = response;
    const product = body.product;
    expect(status).toBe(200);
    expect(body).toHaveProperty("status", 200);
    expect(product).toHaveProperty("id", ProductId);
    expect(body.product).toHaveProperty("name", name + " EDIT");
    expect(product).toHaveProperty("image_url", image_url);
    expect(product).toHaveProperty("price", priceEdit);
    expect(product).toHaveProperty("stock", stockEdit);
    done();
  });

  it('Test Case 2 : Test when some value or all value empty', async (done) => {
    // console.log("Product ID: " + ProductId)
    const response = await request(app)
      .put(api_url = '/api/products/' + ProductId)
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
      .put(api_url)
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
      .put(api_url)
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
      .put(api_url)
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

