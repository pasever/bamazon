DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(19, 2),
  stock_quantity INTEGER(10) NOT NULL,
  product_sales DECIMAL(19, 2),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
      VALUES ("apple", "fruits", 2.33, 100, 18.64), ("banana", "fruits", 2.56, 120, 30.72), ("orange", "fruits", 5.34, 75, 0),
             ("grape", "fruits", 1.78, 123, 0), ("pineapple", "fruits", 4.77, 65, 0), ("strawberry", "fruits", 2.55, 90, 0),
             ("mango", "fruits", 3.12, 214, 0), ("peach", "fruits", 3.33, 62, 0), ("watermelon", "fruits", 2.67, 999, 0),
             ("grapefruit", "fruits", 4.22, 825, 0), ("papaya", "fruits", 4.10, 272, 0), ("coconut", "fruits", 4.66, 733, 0);