DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT(40) NOT NULL,
  stock_quantity VARCHAR(50),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
      VALUES ("apple", "fruits", 2.33, 100), ("banana", "fruits", 2.56, 120), ("orange", "fruits", 5.34, 75),
             ("grape", "fruits", 1.78, 123), ("pineapple", "fruits", 4.77, 65), ("strawberry", "fruits", 2.55, 90),
             ("mango", "fruits", 3.12, 214), ("peach", "fruits", 3.33, 62), ("watermelon", "fruits", 2,67, 999),
             ("grapefruit", "fruits", 4.22, 825), ("papaya", "fruits", 4.10, 272), ("coconut", "fruits", 4.66, 733);
