-- =========================
-- ROLES
-- =========================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD CONSTRAINT fk_users_roles
FOREIGN KEY (role_id)
REFERENCES roles(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);

-- =========================
-- EMPLOYEES
-- =========================
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE,
    poste VARCHAR(100),
    salaire DECIMAL(10,2),
    date_embauche DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE employees
ADD CONSTRAINT fk_employees_users
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- =========================
-- CLIENTS
-- =========================
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_email ON clients(email);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    description TEXT,
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_name ON products(name);

-- =========================
-- SERVICES
-- =========================
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    description TEXT,
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ORDERS
-- =========================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INT,
    user_id INT,
    client_name VARCHAR(255),
    client_email VARCHAR(255),
    client_phone VARCHAR(50),
    client_address TEXT,
    tenant_id INT DEFAULT 1,
    total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE orders
ADD CONSTRAINT fk_orders_clients
FOREIGN KEY (client_id)
REFERENCES clients(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE orders
ADD CONSTRAINT fk_orders_users
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE SET NULL
ON UPDATE CASCADE;

CREATE INDEX idx_orders_client_id ON orders(client_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- =========================
-- ORDER ITEMS
-- =========================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    service_id INT,
    quantity INT,
    price DECIMAL(10,2)
);

ALTER TABLE order_items
ADD CONSTRAINT fk_items_orders
FOREIGN KEY (order_id)
REFERENCES orders(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE order_items
ADD CONSTRAINT fk_items_products
FOREIGN KEY (product_id)
REFERENCES products(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE order_items
ADD CONSTRAINT fk_items_services
FOREIGN KEY (service_id)
REFERENCES services(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;

CREATE INDEX idx_items_order_id ON order_items(order_id);
CREATE INDEX idx_items_product_id ON order_items(product_id);

-- =========================
-- PROFORMAS
-- =========================
CREATE TABLE proformas (
    id SERIAL PRIMARY KEY,
    client_id INT,
    total DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE proformas
ADD CONSTRAINT fk_proformas_clients
FOREIGN KEY (client_id)
REFERENCES clients(id)
ON DELETE SET NULL
ON UPDATE CASCADE;

-- =========================
-- PAYMENTS
-- =========================
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT UNIQUE,
    amount DECIMAL(10,2),
    method VARCHAR(50),
    status VARCHAR(50),
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE payments
ADD CONSTRAINT fk_payments_orders
FOREIGN KEY (order_id)
REFERENCES orders(id)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);

-- =========================
-- TRANSACTIONS
-- =========================
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20),
    amount DECIMAL(10,2),
    source VARCHAR(50),
    source_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE transactions
ADD CONSTRAINT check_transaction_type
CHECK (type IN ('income', 'expense'));

CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_source_id ON transactions(source_id);
