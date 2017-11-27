const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
const SQL = require('./mysql.js');
const display = require('./mysql.js');
const users = require('./bamazon.js');
 
//calling a display function and passing the guest name given to us on the main page
function customerJS(name) {
  SQL.connection.connect(function(err) {
    if (err) 
      throw err;
      console.log('###############################');
      console.log("");
      console.log(`Welcome to BAMAZON ${name.trim()}!`);
      console.log("");
      console.log('###############################');
    //console.log("connected as id " + connection.threadId);
    setTimeout(afterConnection, 2000);
  });
}

function afterConnection(){
  display.displayTable();
  setTimeout(availability, 4000);
}


//staring placing an order
function availability() {

  inquirer.prompt([
    {
      name: "itemID",
      type: "input",
      message: "What is the ID# of the item you are looking for?"
    }, {
      name: "itemQTY",
      type: "input",
      message: "How many items you are interested in?"
    }
  ]).then(function(answer) {

    SQL.connection.query("SELECT * FROM products", {
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
  SQL.connection.query("SELECT price, stock_quantity, product_sales FROM products WHERE ?", {
    item_id: item
  }, function(err, result) {
    if (err) 
      throw err;
    
    if (quantity > result[0].stock_quantity) {
      console.log("Insufficient Stock for this Item!");
      afterConnection();      
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
              message: 'Do you want to continue shopping?'
            }
          ]).then(function(answer) {
            if (answer.confirm) {
              afterConnection();                          
            } else {
              console.log('Returning to the Users Menu');
              users.users();
            }
          });
        } 
      });
    }
  });
}

//updating qty in our databases
function updateQty(item, newQty) {  
  
    SQL.connection.query('UPDATE products SET ? WHERE ?', [{
        stock_quantity: newQty
    }, {
        item_id: item
    }]);
    console.log("Databases have been successfully updated");
}

exports.customerJS = customerJS;