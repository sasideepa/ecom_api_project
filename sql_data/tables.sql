-- This file contains SQL queries used to create tables.
-- this is created just for tracking and not used anywhere in actual application


CREATE TABLE IF NOT EXISTS api_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_products (
    product_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES api_categories(category_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES api_users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_cart_items (
    item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES api_carts(cart_id),
    product_id INTEGER REFERENCES api_products(product_id),
    quantity INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES api_users(user_id),
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'placed',
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS api_order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES api_orders(order_id),
    product_id INTEGER REFERENCES api_products(product_id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL
);

-- Grant permission for the api_users table sequence
GRANT USAGE, SELECT, UPDATE ON SEQUENCE api_users_user_id_seq TO myname;

-- Grant permission for the api_carts table sequence
GRANT USAGE, SELECT, UPDATE ON SEQUENCE api_carts_cart_id_seq TO myname;

-- Grant permission for the api_cart_items table sequence
GRANT USAGE, SELECT, UPDATE ON SEQUENCE api_cart_items_item_id_seq TO myname;
