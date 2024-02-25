# E-commerce API with Node.js

This document outlines the API endpoints available in the E-commerce API, including how to test each endpoint using Postman.

## Testing Setup

### Common Steps for All Endpoints

Before testing each endpoint, ensure you have Postman installed and your API server is running. Replace `localhost:3000` with your API's base URL if it's different. For endpoints requiring authentication, ensure you have a valid JWT token obtained from the login endpoint.

#### Obtaining a JWT Token

1. Use the **Login User** endpoint to log in.
2. Copy the JWT token from the response.

#### Setting Authorization Header

For endpoints requiring authentication:
- In Postman, go to the **Headers** tab.
- Key: `Authorization`, Value: `Bearer YOUR_JWT_TOKEN` (replace `YOUR_JWT_TOKEN` with the actual token).

## User Authentication

### 1. Register User

- **Path:** `/api/users/register`
- **Method:** `POST`
- **Description:** Registers a new user with email and password.
- **Testing:**
    ```
    Method: POST
    URL: http://localhost:3000/api/users/register
    Headers: Content-Type: application/json
    Body:
    {
      "email": "user@example.com",
      "password": "yourPassword"
    }
    ```

### 2. Login User

- **Path:** `/api/users/login`
- **Method:** `POST`
- **Description:** Authenticates user and returns a JWT.
- **Testing:**
    ```
    Method: POST
    URL: http://localhost:3000/api/users/login
    Headers: Content-Type: application/json
    Body:
    {
      "email": "user@example.com",
      "password": "yourPassword"
    }
    ```

## Categories

### 3. List Categories

- **Path:** `/api/categories`
- **Method:** `GET`
- **Description:** Retrieves a list of all categories.
- **Testing:**
    ```
    Method: GET
    URL: http://localhost:3000/api/categories
    ```

## Products

### 4. List Products by Category

- **Path:** `/api/products`
- **Method:** `GET`
- **Description:** Retrieves a list of products filtered by category ID.
- **Testing:**
    ```
    Method: GET
    URL: http://localhost:3000/api/products?categoryId=1
    ```

### 5. Get Product Details

- **Path:** `/api/products/:productId`
- **Method:** `GET`
- **Description:** Fetches detailed information of a specific product by its ID.
- **Testing:**
    ```
    Method: GET
    URL: http://localhost:3000/api/products/1
    ```

## Cart Management

### 6. Add Product to Cart

- **Path:** `/api/cart`
- **Method:** `POST`
- **Description:** Adds a product to the user's cart.
- **Testing:**
    ```
    Method: POST
    URL: http://localhost:3000/api/cart
    Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
    Body:
    {
      "productId": 1,
      "quantity": 2
    }
    ```

### 7. View Cart

- **Path:** `/api/cart`
- **Method:** `GET`
- **Description:** Retrieves the contents of the user's cart.
- **Testing:**
    ```
    Method: GET
    URL: http://localhost:3000/api/cart
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

### 8. Update Cart Item

- **Path:** `/api/cart/:itemId`
- **Method:** `PUT`
- **Description:** Updates the quantity of an item in the cart.
- **Testing:**
    ```
    Method: PUT
    URL: http://localhost:3000/api/cart/1
    Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
    Body:
    {
      "quantity": 3
    }
    ```

### 9. Remove Item from Cart

- **Path:** `/api/cart/:itemId`
- **Method:** `DELETE`
- **Description:** Removes an item from the cart.
- **Testing:**
    ```
    Method: DELETE
    URL: http://localhost:3000/api/cart/1
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

## Order Processing

### 10. Place Order

- **Path:** `/api/orders`
- **Method:** `POST`
- **Description:** Places an order with the items currently in the cart.
- **Testing:**
    ```
    Method: POST
    URL: http://localhost:3000/api/orders
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

### 11. View Order History

- **Path:** `/api/orders/history`
- **Method:** `GET`
- **Description:** Retrieves a list of orders placed by the authenticated user.
- **Testing:**
    ```
    Method: GET
    URL: http://localhost:3000/api/orders/history
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

### 12. Get Order Details

- **Path:** `/api/orders/:orderId`
- **Method:** `GET`
- **Description:** Fetches detailed information about a specific order.
- **Testing:**
    ```
    Method: GET
    URL: http://localhost:3000/api/orders/1
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

## Database Setup

This section provides step-by-step instructions on how to set up the database environment for the E-commerce API project. Ensure you have PostgreSQL installed and can execute SQL commands either through `psql` or another PostgreSQL client.

### 1. Create Database User

First, we need to create a user named `myname` with the necessary permissions. Open your PostgreSQL client, login with root user and execute the following command:

```
CREATE USER myname WITH PASSWORD 'api_pass';
```

### 2. Connect to Your Target Database

Connect to your target database, `api_project_db`, where the E-commerce API will be set up. If you're using `psql`, you can connect by executing:

```
\c api_project_db
```

### 3. Create Tables and Grant Permissions

Within the `sql_data` folder of this project, you will find a file named `tables.sql`. This file contains SQL commands to create the necessary tables for the API and grant the required permissions to the `myname` user.

### 4. Populate Categories and Products Tables

To populate the `api_categories` and `api_products` tables with initial data, run the SQL commands from `api_categories.sql` and `api_products.sql` files located in the `sql_data` folder.

## Notes

- It is essential to replace placeholders such as `myname` and `api_pass` with the actual values intended for your database setup. you need to change the values in `db.js` accordingly.
- The paths to SQL files (`sql_data/tables.sql`, `sql_data/api_categories.sql`, and `sql_data/api_products.sql`) are relative to where you run your PostgreSQL client command. Adjust paths accordingly if your current directory differs.

By following these steps, you will have successfully set up the database environment for the E-commerce API, including user creation, schema setup, and initial data population.

### Considerations

- We used hardcoded JWT tokens since this is a sample project. In an actual project, we will make use of env variables to retrieve JWT tokens.
- For simplicity, we assume each user has only one cart for now. In the future, this can be extended further to make carts device-specific or region-specific, etc.

This will cover the basic requirements of an API for ECOM backend.
