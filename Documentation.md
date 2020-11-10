# **API Documentation** Kanban
## Local server : 
  `http://localhost:3000/api`
---- 

<br>

# User
## 1. Register New User
<details>
  <summary>Click to expand!</summary> 

  * **URL**

    `/register`


  * **Method:**

    `POST`
  
  * **Data Params**
    
    *data*

    ```json
    { 
      "fullname": "Customer 1",
      "email": "customer1@mail.com", 
      "password": "rahasia" 
    } 
    ```

  * **Success Response**

    * **Code:** 201 <br />
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
  
  * **Error Response:**

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

  * **URL**

    `/login`


  * **Method:**

    `POST`
  
  * **Data Params**
    
    *data*

    ```json
    {  
      "email": "customer1@mail.com", 
      "password": "rahasia" 
    } 
    ```

  * **Success Response**

    * **Code:** 200 <br />
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
  
  * **Error Response:**

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

  * **URL**

    `/products`

  * **Method:**

    `POST`
  
  * **Headers** *

    ```json
    {"access_token": "eyJhbGciOiJIUzI1NiJ9. ..."}
    ```

  * **Data Params**
    
    *data*

    ```json
    {
      "name": "Product Name",
      "image_url": "http://cloou.img/product-img.jpg",
      "price": 10000,
      "stock": 30
    }
    ```

  * **Success Response**

    * **Code:** 201 <br />
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
          "UserId": 5,
          "updatedAt": "2020-11-10T23:07:09.098Z",
          "createdAt": "2020-11-10T23:07:09.098Z"
        }
      }
      ```
  
  * **Error Response:** *

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

  * **URL**

    `/products`

  * **Method:**

    `GET`

  * **Success Response**

    * **Code:** 200 <br />
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
          "createdAt": "2020-11-10T23:07:09.098Z"
        }, {...}]
      }
      ```
  
  * **Error Response:** *

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```json
      { "error" : "Internal Server Error" }
      ```  
</details>

## 3. Read Product by ID
<details>
  <summary>Click to expand!</summary>

  * **URL**

    `/products/:id`

  * **URL Params:**

    `id=[integer]`

  * **Method:**

    `GET`

  * **Success Response**

    * **Code:** 200 <br />
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
  
  * **Error Response:** *

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 
      ```json
      { "error" : "Internal Server Error" }
      ```  
</details>

## 4. Update Product
<details>
  <summary>Click to expand!</summary>

  * **URL**

    `/products/:id`

  * **URL Params:**

    `id=[integer]` 

  * **Method:**

    `PUT`
  
  * **Headers** *

    ```json
    {"access_token": "eyJhbGciOiJIUzI1NiJ9. ..."}
    ```

  * **Data Params**
    
    *data*

    ```json
    {
      "name": "Product Name Edit",
      "image_url": "http://cloou.img/product-img.jpg",
      "price": 12000,
      "stock": 5
    }
    ```

  * **Success Response**

    * **Code:** 200 <br />
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
          "updatedAt": "2020-11-10T23:17:09.098Z",
          "createdAt": "2020-11-10T23:07:09.098Z"
        }
      }
      ```
  
  * **Error Response:** *

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

  * **URL**

    `/products/:id`

  * **URL Params:**

    `id=[integer]` 

  * **Method:**

    `DELETE`
  
  * **Headers** *

    ```json
    {"access_token": "eyJhbGciOiJIUzI1NiJ9. ..."}
    ```

  * **Success Response**

    * **Code:** 200 <br />
      **Content:** 
      ```json
      {
        "status": 200,
        "message": "Success deleted product"
      }
      ```
  
  * **Error Response:** *

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