# **API Documentation** Ecommerce

# **VUESHOP**

## Development :

`http://localhost:3000/api`

## Production

`https://cmsvueshop.herokuapp.com/api`

---

<br>

# User

## 1. Register New User

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/register`

- **Method:**

  `POST`

- **Data Params**

  _data_

  ```json
  {
    "fullname": "Customer 1",
    "email": "customer1@mail.com",
    "password": "rahasia"
  }
  ```

- **Success Response**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "status": 201,
      "user": {
        "id": 1,
        "fullname": "Customer 1",
        "email": "customer1@mail.com"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**
        ```json
        // Email already exists
        {
          "status": 400,
          "message": [
            { "error": "Email already exists", "field": "email" }
          ]
        }
        // Validation not pass
        {
          "status": 400,
          "message": [
            { "error": "Fullname is required, can't be empty", "field": "fullname" },
            { "error": "Email is required, can't be empty", "field": "email" },
            { "error": "Password is required, can't be empty", "field": "password" },
            { "error": "Password is minimal 8 character", "field": "password" }
          ]
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

<!-- ---- -->

## 2. Login

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/login`

- **Method:**

  `POST`

- **Data Params**

  _data_

  ```json
  {
    "email": "customer1@mail.com",
    "password": "rahasia"
  }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "user": {
        "id": 1,
        "fullname": "Customer 1",
        "email": "customer1@mail.com"
      },
      "access_token": "eyJhbGciOiJIUzI1NiJ9. ..."
    }
    ```

- **Error Response:**

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Wrong Username / Password"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

<br>

# Product

## 1. Create New Product

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/products`

- **Method:**

  `POST`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Data Params**

  _data_

  ```json
  {
    "name": "Product Name",
    "image_url": "http://cloou.img/product-img.jpg",
    "price": 10000,
    "stock": 30,
    "CategoryId: 1
  }
  ```

- **Success Response**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "status": 201,
      "product": {
        "id": 1,
        "name": "Product Name",
        "image_url": "http://cloou.img/product-img.jpg",
        "price": 10000,
        "stock": 30,
        "CategoryId": 1,
        "UserId": 5,
        "updatedAt": "2020-11-10T23:07:09.098Z",
        "createdAt": "2020-11-10T23:07:09.098Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": [
            { "error": "Name is required, can't be empty", "field": "name" },
            { "error": "Image URL is required, can't be empty", "field": "image_url" },
            { "error": "Image must valid a url", "field": "image_url" },
            { "error": "Price is required, can't be empty", "field": "price" },
            { "error": "Price must be a number", "field": "price" },
            { "error": "Stock is required, can't be empty", "field": "stock" },
            { "error": "Stock must be a number", "field": "stock" },
            { "error": "Category must be a number", "field": "CategoryId" },
          ]
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 2. Read All Product

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/products`

- **Method:**

  `GET`

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "product": [{
        "id": 1,
        "name": "Product Name",
        "image_url": "http://cloou.img/product-img.jpg",
        "price": 10000,
        "stock": 30,
        "UserId": 5,
        "updatedAt": "2020-11-10T23:07:09.098Z",
        "createdAt": "2020-11-10T23:07:09.098Z",
        "Category": {
          "id": 1,
          "name": "Pakaian Pria",
          "type": "product",
          "createdAt": "2020-11-13T23:49:29.099Z",
          "updatedAt": "2020-11-13T23:49:29.099Z"
        }
      }, {...}]
    }
    ```

- **Error Response:**

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 3. Read Product by ID

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/products/:id`

- **URL Params:**

  `id=[integer]`

- **Method:**

  `GET`

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "product": {
        "id": 1,
        "name": "Product Name",
        "image_url": "http://cloou.img/product-img.jpg",
        "price": 10000,
        "stock": 30,
        "UserId": 5,
        "updatedAt": "2020-11-10T23:07:09.098Z",
        "createdAt": "2020-11-10T23:07:09.098Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 4. Update Product

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/products/:id`

- **URL Params:**

  `id=[integer]`

- **Method:**

  `PUT`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Data Params**

  _data_

  ```json
  {
    "name": "Product Name Edit",
    "image_url": "http://cloou.img/product-img.jpg",
    "price": 12000,
    "stock": 5,
    "CategoryId: 1
  }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "product": {
        "id": 1,
        "name": "Product Name Edit",
        "image_url": "http://cloou.img/product-img.jpg",
        "price": 12000,
        "stock": 5,
        "CategoryId": 1,
        "updatedAt": "2020-11-10T23:17:09.098Z",
        "createdAt": "2020-11-10T23:07:09.098Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": [
            { "error": "Name is required, can't be empty", "field": "name" },
            { "error": "Image URL is required, can't be empty", "field": "image_url" },
            { "error": "Image must valid a url", "field": "image_url" },
            { "error": "Price is required, can't be empty", "field": "price" },
            { "error": "Price must be a number", "field": "price" },
            { "error": "Stock is required, can't be empty", "field": "stock" },
            { "error": "Stock must be a number", "field": "stock" },
            { "error": "Category must be a number", "field": "CategoryId" },
          ]
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }

        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 5. Delete Product

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/products/:id`

- **URL Params:**

  `id=[integer]`

- **Method:**

  `DELETE`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "message": "Success deleted product"
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": "Failed to delete, stock is not empty"
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }

        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

<br>

# Live Banner

## 1. Create New Banner

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/banners`

- **Method:**

  `POST`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Data Params**

  _data_

  ```json
  {
    "name": "Banner Live 1",
    "image_url": "http://image_url.png",
    "start_date": "2020-11-14",
    "end_date": "2020-11-14",
    "CategoryId": "2"
  }
  ```

- **Success Response**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "status": 201,
      "banner": {
        "id": 1,
        "name": "Banner Live 1",
        "image_url": "http://image_url.png",
        "is_active": "true",
        "start_date": "2020-11-14T00:00:00.000Z",
        "end_date": "2020-11-14T00:00:00.000Z",
        "CategoryId": 2,
        "UserId": 5,
        "updatedAt": "2020-11-14T00:31:05.407Z",
        "createdAt": "2020-11-14T00:31:05.407Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": [
            { "error": "Name is required, can't be empty!", "field": "name" },
            { "error": "Image URL is required, can't be empty!", "field": "image_url" },
            { "error": "Banner must be an Valid URL adress", "field": "image_url" },
            { "error": "Validation notEmpty on start_date failed", "field": "start_date"   },
            { "error": "Must be valid date!", "field": "start_date" },
            { "error": "Validation notEmpty on end_date failed", "field": "end_date" },
            { "error": "Must be valid date!", "field": "end_date" },
            { "error": "Please select banner category", "field": "CategoryId"  },
            { "error": "Start date cannot be set less than today!", "field": "checkStartDate" },
            { "error": "End date cannot be set less than start date!", "field": "checkEndDate" }
          ]
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 2. Read All Banner

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/banners`

- **Method:**

  `GET`

**Headers**

```json
{ "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "banners": [
        {
          "id": 1,
          "name": "Banner Live 1",
          "image_url": "http://image_url.png",
          "is_active": "true",
          "start_date": "2020-11-14T00:00:00.000Z",
          "end_date": "2020-11-14T00:00:00.000Z",
          "CategoryId": 2,
          "UserId": 5,
          "createdAt": "2020-11-14T00:31:05.407Z",
          "updatedAt": "2020-11-14T00:31:05.407Z",
          "Category": {
            "id": 2,
            "name": "November Ceria",
            "type": "banner",
            "createdAt": "2020-11-14T07:45:09.270Z",
            "updatedAt": "2020-11-14T07:45:09.270Z"
          }
        }, {...}
      ]
    }
    ```

- **Error Response:**

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 3. Read Banner by ID

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/banners/:id`

- **Method:**

  `GET`

**URL Params**

`id=[integer]`

**Headers**

```json
{ "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "banners": {
        "id": 1,
        "name": "Banner Live 1",
        "image_url": "http://image_url.png",
        "is_active": "true",
        "start_date": "2020-11-14T00:00:00.000Z",
        "end_date": "2020-11-14T00:00:00.000Z",
        "CategoryId": 2,
        "UserId": 5,
        "createdAt": "2020-11-14T00:31:05.407Z",
        "updatedAt": "2020-11-14T00:31:05.407Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 4. Update Banner

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/banners/:id`

- **Method:**

  `PUT`

**URL Params**

`id=[integer]`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Data Params**

  _data_

  ```json
  {
    "name": "Banner Live 1 Edited",
    "image_url": "http://image_url.png",
    "start_date": "2020-11-14",
    "end_date": "2020-11-14",
    "CategoryId": "2"
  }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "banner": {
        "id": 1,
        "name": "Banner Live 1 Edited",
        "image_url": "http://image_url.png",
        "is_active": "true",
        "start_date": "2020-11-14T00:00:00.000Z",
        "end_date": "2020-11-14T00:00:00.000Z",
        "CategoryId": 2,
        "UserId": 5,
        "updatedAt": "2020-11-14T00:31:05.407Z",
        "createdAt": "2020-11-14T00:31:05.407Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": [
            { "error": "Name is required, can't be empty!", "field": "name" },
            { "error": "Image URL is required, can't be empty!", "field": "image_url" },
            { "error": "Banner must be an Valid URL adress", "field": "image_url" },
            { "error": "Validation notEmpty on start_date failed", "field": "start_date"   },
            { "error": "Must be valid date!", "field": "start_date" },
            { "error": "Validation notEmpty on end_date failed", "field": "end_date" },
            { "error": "Must be valid date!", "field": "end_date" },
            { "error": "Please select banner category", "field": "CategoryId"  },
            { "error": "Start date cannot be set less than today!", "field": "checkStartDate" },
            { "error": "End date cannot be set less than start date!", "field": "checkEndDate" }
          ]
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 5. Patch Banner is_active

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/banners/:id`

- **Method:**

  `PATCH`

**URL Params**

`id=[integer]`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Data Params**

  _data_

  ```json
  {
    "is_active": "false"
  }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "banner": {
        "id": 1,
        "name": "Banner Live 1 Edited",
        "image_url": "http://image_url.png",
        "is_active": "false",
        "start_date": "2020-11-14T00:00:00.000Z",
        "end_date": "2020-11-14T00:00:00.000Z",
        "CategoryId": 2,
        "UserId": 5,
        "updatedAt": "2020-11-14T00:31:05.407Z",
        "createdAt": "2020-11-14T00:31:05.407Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": [
            { "error": "Status must be true or false", "field": "is_active" }
          ]
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 6. Delete Banner

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/banners/:id`

- **URL Params:**

  `id=[integer]`

- **Method:**

  `DELETE`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "message": "Success deleted banner"
    }
    ```

- **Error Response:**

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }

        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

<br>

# Category

## 1. Create New Category

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/categories`

- **Method:**

  `POST`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Data Params**

  _data_

  ```json
  {
    "name": "Pakaian Pria",
    "type": "product or banner"
  }
  ```

- **Success Response**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "status": 201,
      "category": {
        "id": 1,
        "name": "Pakaian Pria",
        "type": "banner",
        "updatedAt": "2020-11-13T23:49:29.099Z",
        "createdAt": "2020-11-13T23:49:29.099Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": [
            { "error": "Category name is required, can't be empty!", "field": "name" },
            { "error": "Category type must be product or banner", "field": "type" },
            { "error": "Category already exist", "field": "name" },
          ]
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 2. Read All Categories

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/categories`

- **Method:**

  `GET`

**Headers**

```json
{ "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "categories": [
        {
          "id": 1,
          "name": "Pakaian Pria",
          "type": "product",
          "createdAt": "2020-11-14T01:05:25.273Z",
          "updatedAt": "2020-11-14T01:05:25.273Z"
        }, {...}
      ]
    }
    ```

- **Error Response:**

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 3. Read Categories by ID

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/categories/:id`

- **Method:**

  `GET`

**URL Params**

`id=[integer]`

**Headers**

```json
{ "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "categories": {
        "id": 1,
        "name": "Pakaian Pria",
        "createdAt": "2020-11-14T01:05:25.273Z",
        "updatedAt": "2020-11-14T01:05:25.273Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 4. Update Categories

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/categories/:id`

- **Method:**

  `PUT`

**URL Params**

`id=[integer]`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Data Params**

  _data_

  ```json
  {
    "name": "Pakaian Wanita"
  }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "category": {
        "id": 1,
        "name": "Pakaian Wanita",
        "type": "product",
        "updatedAt": "2020-11-13T23:49:29.099Z",
        "createdAt": "2020-11-13T23:49:29.099Z"
      }
    }
    ```

- **Error Response:**

      * **Code:** 400 BAD  REQUEST <br />
        **Content:**

        ```json
        {
          "status": 400,
          "message": [
            { "error": "Category name is required, can't be empty!", "field": "name" },
            { "error": "Category type must be product or banner!", "field": "type" },
            { "error": "Category already exist", "field": "name" },
          ]
        }
        ```

      OR

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }
        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>

## 5. Delete Categories

<details>
  <summary>Click to expand!</summary>

- **URL**

  `/categories/:id`

- **URL Params:**

  `id=[integer]`

- **Method:**

  `DELETE`

- **Headers**

  ```json
  { "access_token": "eyJhbGciOiJIUzI1NiJ9. ..." }
  ```

- **Success Response**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "status": 200,
      "message": "Success deleted categories"
    }
    ```

- **Error Response:**

      * **Code:** 401 UNAUTHORIZE <br />
        **Content:**
        ```json
        {
          "status": 401,
          "message": "Authentication Failed"
        }

        // OR

        {
          "status": 401,
          "message": "Not authorize"
        }

        ```

      OR

      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:**
        ```json
        { "error" : "Internal Server Error" }
        ```

  </details>
