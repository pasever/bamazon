const mysql = require("mysql");
const inquirer = require("inquirer");

//connectin mysql
const connection = mysql.createConnection(
  {
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "root", 
    database: "bamazon"
  }); 

//calling a display function and passing the guest name given to us on the main page
function customerJS(name) {
  connection.connect(function(err) {
    if (err) 
      throw err;
      console.log("");
      console.log(`Welcome to BAMAZON ${name.trim()}!`);
      console.log("");
    //console.log("connected as id " + connection.threadId);
    setTimeout(afterConnection, 2000);
  });
}

//displaying all available products
function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) 
      throw err;  
  
    console.log(`Items we have in stock:`);
    console.log("_________________________________________");
    console.log("");
    for (var i = 0; i < res.length; i++) {
      console.log("| " + res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + "ea" + " | Qty: " + res[i].stock_quantity);
    }
    console.log("_________________________________________");
    console.log("");
    
    availability();
  });
}

//staring placing an order
function availability() {

  inquirer.prompt([
    {
      name: "itemID",
      type: "input",
      message: "What is the ID of item you are looking for?"
    }, {
      name: "itemQTY",
      type: "input",
      message: "How many items you are interested in?"
    }
  ]).then(function(answer) {

    connection.query("SELECT * FROM products", {
      item_id: answer.itemID,
      item_qty: answer.itemQTY
    }, function(err, results) {
      if (err) 
        throw err;
    
      checkAvailability(answer.itemID, answer.itemQTY);

    });
  });
}

//checking if we have enough qty in stock before placing the order 
function checkAvailability(item, quantity) {
  connection.query("SELECT price, stock_quantity, product_sales FROM products WHERE ?", {
    item_id: item
  }, function(err, result) {
    if (err) 
      throw err;
    
    if (quantity > result[0].stock_quantity) {
      console.log("Insufficient Stock for this Item!");
    } else {
      var total = parseFloat(result[0].price * quantity).toFixed(2);
      var newQty = result[0].stock_quantity - quantity;
      console.log("");
      console.log("We have enough in stock to fulfill your order...");
      console.log("Your total is going to be $" + total);
      console.log("");
      
      //order placing verification 
      inquirer.prompt([
        {
          name: 'confirm',
          type: 'confirm',
          message: 'Would you like to place this order?'
        }
      ]).then(function(answer) {
        if (answer.confirm) {
          console.log("");
          console.log('Thank you for your purchase!');
          console.log("Your credit card will be charged $" + total);
          console.log("");

          // update database qty
          updateQty(item, newQty);

          inquirer.prompt([
            {
              name: 'confirm',
              type: 'confirm',
              message: 'Return to the main page?'
            }
          ]).then(function(answer) {
            if (answer.confirm) {
              afterConnection();
            } else {
              console.log('Thank you for BAMAZONing!');
              process.exit();
            }
          });
        } else {
          console.log("");
          console.log('Returning to the order page ...');
          console.log("");
          afterConnection();

        }
      });
    }
  });
}

//updating qty in our databases
function updateQty(item, newQty) {
     connection.query('UPDATE products SET ? WHERE ?', [{
        stock_quantity: newQty
    }, {
        item_id: item
    }]);
    console.log("Databases have been updated");
}

exports.customerJS = customerJS;