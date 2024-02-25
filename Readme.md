# E-commerce API with Node.js

This document outlines the API endpoints available in the E-commerce API, including how to test each endpoint using Postman.

## Testing Setup

### Common Steps for All Endpoints

Before testing each endpoint, ensure you have Postman installed and your API server is running. Replace `localhost:3000` with your API's base URL if it's different. For endpoints requiring authentication, ensure you have a valid JWT token obtained from the login endpoint.

#### Obtaining a JWT Token:

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
    ```plaintext
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
    ```plaintext
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
    ```plaintext
    Method: GET
    URL: http://localhost:3000/api/categories
    ```

## Products

### 4. List Products by Category

- **Path:** `/api/products`
- **Method:** `GET`
- **Description:** Retrieves a list of products filtered by category ID.
- **Testing:**
    ```plaintext
    Method: GET
    URL: http://localhost:3000/api/products?categoryId=1
    ```

### 5. Get Product Details

- **Path:** `/api/products/:productId`
- **Method:** `GET`
- **Description:** Fetches detailed information of a specific product by its ID.
- **Testing:**
    ```plaintext
    Method: GET
    URL: http://localhost:3000/api/products/1
    ```

## Cart Management

### 6. Add Product to Cart

- **Path:** `/api/cart`
- **Method:** `POST`
- **Description:** Adds a product to the user's cart.
- **Testing:**
    ```plaintext
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
    ```plaintext
    Method: GET
    URL: http://localhost:3000/api/cart
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

### 8. Update Cart Item

- **Path:** `/api/cart/:itemId`
- **Method:** `PUT`
- **Description:** Updates the quantity of an item in the cart.
- **Testing:**
    ```plaintext
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
    ```plaintext
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
    ```plaintext
    Method: POST
    URL: http://localhost:3000/api/orders
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

### 11. View Order History

- **Path:** `/api/orders/history`
- **Method:** `GET`
- **Description:** Retrieves a list of orders placed by the authenticated user.
- **Testing:**
    ```plaintext
    Method: GET
    URL: http://localhost:3000/api/orders/history
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

### 12. Get Order Details

- **Path:** `/api/orders/:orderId`
- **Method:** `GET`
- **Description:** Fetches detailed information about a specific order.
- **Testing:**
    ```plaintext
    Method: GET
    URL: http://localhost:3000/api/orders/1
    Headers: Authorization: Bearer YOUR_JWT_TOKEN
    ```

### Notes
- Each of these routes will require corresponding controllers to handle the request and interact with the database.
- Ensure proper authentication middleware is applied to routes that require user authentication, such as cart management and order placement.
- The product listing might optionally support query parameters for filtering, sorting, or pagination.
- Error handling should be consistent across all routes, providing meaningful messages and status codes.

### Considerations
- We used a hard coded JWT token since this is a sample project. in an actual project we will make use of env variables to retrieve JWT token.
- For simplicity we assume each user has only one cart for now. In future this can be extended further to make carts device specific or region specific etc.,

This will cover the basic requirements of an API for ECOM backend.