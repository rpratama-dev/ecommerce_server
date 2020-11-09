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

// Insert new product
describe('POST /api/products', () => {
  it('Test Case 1: Succesfully add new product', async (done) => {
    const response = await request(app)
      .post('/api/products')
      .set("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZnVsbG5hbWUiOiJTYXRyaWEgUGVybWF0YSIsImVtYWlsIjoic2F0cmlhQG1haWwuY29tIn0.0GqXe1te9rVDtUs7MkWsbl35yQk6IWI-_MWUpVTEfr0")
      .send({
        name: "Product 1",
        image_url: "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",
        price: 500000,
        stock: 10
      });

    const { status, body } = response;
    const { product } = body;
    expect(status).toBe(201);
    expect(body).toHaveProperty("status", 201);
    expect(product).toHaveProperty("id", expect.any(Number));
    expect(product).toHaveProperty("name", "Product 1",);
    expect(product).toHaveProperty("image_url", "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",);
    expect(product).toHaveProperty("price", 500000,);
    expect(product).toHaveProperty("stock", 10);
    done();
  });

  it('Test Case 2 : Error when some value or all value empty', async (done) => {
    const response = await request(app)
      .post('/api/products')
      .set("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZnVsbG5hbWUiOiJTYXRyaWEgUGVybWF0YSIsImVtYWlsIjoic2F0cmlhQG1haWwuY29tIn0.0GqXe1te9rVDtUs7MkWsbl35yQk6IWI-_MWUpVTEfr0")
      .send({
        name: "",
        image_url: "",
        price: "",
        stock: ""
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Name is required, can't be empty", field: "name" },
          { error: "Iamge URL is required, can't be empty", field: "image_url" },
          { error: "Image must valid a url", field: "image_url" },
          { error: "Price is required, can't be empty", field: "price" },
          { error: "Price cannot set minus", field: "price" },
          { error: "Price must be a number", field: "price" },
          { error: "Stock required, can't be empty", field: "stock" },
          { error: "Stock cannot set minus", field: "stock" },
          { error: "Stock must be a number", field: "stock" },
        ]
      });
    done();
  });

  it('Test Case 3 : Error when price or stock set minus', async (done) => {
    const response = await request(app)
      .post('/api/products')
      .set("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZnVsbG5hbWUiOiJTYXRyaWEgUGVybWF0YSIsImVtYWlsIjoic2F0cmlhQG1haWwuY29tIn0.0GqXe1te9rVDtUs7MkWsbl35yQk6IWI-_MWUpVTEfr0")
      .send({
        name: "Product 1",
        image_url: "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",
        price: -1,
        stock: -2
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

  it('Test Case 4 : Error when price or stock set as string', async (done) => {
    const response = await request(app)
      .post('/api/products')
      .set("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZnVsbG5hbWUiOiJTYXRyaWEgUGVybWF0YSIsImVtYWlsIjoic2F0cmlhQG1haWwuY29tIn0.0GqXe1te9rVDtUs7MkWsbl35yQk6IWI-_MWUpVTEfr0")
      .send({
        name: "Product 1",
        image_url: "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",
        price: "seratus ribu rupiah",
        stock: "seratus"
      })
      .expect(400, {
        status: 400,
        message: [
          { error: "Stock must be a number", field: "stock" },
          { error: "Stock cannot set minus", field: "stock" },
          { error: "Price must be a number", field: "price" },
          { error: "Price cannot set minus", field: "price" },  
        ]
      });
    done();
  });

  it('Test Case 6 : Error when not contain access_token', async (done) => {
    const response = await request(app)
      .post('/api/products') 
      .send({
        name: "Product 1",
        image_url: "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",
        price: "seratus ribu rupiah",
        stock: "seratus"
      })
      .expect(401, {
        status: 401,
        message: "Not authorize"
      });
    done();
  });

  it('Test Case 7 : Error when not wrong access_token', async (done) => {
    const response = await request(app)
      .post('/api/products') 
      .set("access_token", "eyJhbGciOiJIUzI1NiJ9.sdsAo")
      .send({
        name: "Product 1",
        image_url: "https://www.jakartanotebook.com/images/products/100/63/37709/2/sepatu-sneaker-huarache-sporty-size-37-black-1.jpg",
        price: "seratus ribu rupiah",
        stock: "seratus"
      })
      .expect(401, {
        status: 401,
        message: "Not authorize"
      });
    done();
  });

  it('Test Case 8 : Error when set token as access_token customer', async (done) => {
    const response = await request(app)
      .post('/api/products')
      .set("access_token", "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEsImZ1bGxuYW1lIjoiQ3VzdG9tZXIgMSIsImVtYWlsIjoiY3VzdG9tZXJAbWFpbC5jb20ifQ.L2UZkRCnbFKI1OIDHF3TLxT3GL5oByHbd2AA8BgF1ro")
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