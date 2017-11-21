DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  stock_quantity VARCHAR(50),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, stock_quantity)
      VALUES ("apple", "fruits", 100), ("banana", "fruits", 120), ("orange", "fruits", 75),
             ("grape", "fruits", 123), ("pineapple", "fruits", 65), ("strawberry", "fruits", 90),
             ("mango", "fruits", 214), ("peach", "fruits", 62), ("watermelon", "fruits", 999),
             ("grapefruit", "fruits", 825), ("papaya", "fruits", 272), ("coconut", "fruits", 733);
