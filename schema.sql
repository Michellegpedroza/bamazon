-- Delete database if currently exists
DROP DATABASE IF EXISTS bamazon_db;

-- Create database bamazon
CREATE DATABASE bamazon_db;

USE bamazon_db;

-- Create a table in bamazon_db for the store inventory
CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

USE bamazon_db;
-- Insert data into the products table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Smart Watch', 'Electronics', 199.99, 100),
              ('Paper Towels 6 pack', 'Grocery', 7.99, 325),
              ('Tylenol', 'Pharmacy ', 11.99, 500),
              ('Adidas Womens Sweater', 'Clothing', 34.50, 20),
              ('Mens Socks', 'Clothing', 6.00, 210),
              ('Sony Earphones', 'Electronics', 9.99, 600),
              ('Maybeline Mascara', 'Cosmetics', 7.99, 450),
              ('Soccer Ball', 'Sports', 12.79, 35),
              ('Tennis Racket', 'Sports', 22.75, 600),
              ('Ibuprofen', 'Pharmacy', 8.99, 120);
             
            