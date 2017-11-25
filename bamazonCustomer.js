var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection(
  {
      host: "localhost", 
      port: 3306, 
      user: "root", 
      password: "root", 
      database: "bamazon"
});

connection.connect(function(err) {
  if (err) 
    throw err;
  
  //console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) 
      throw err;
    console.log("Welcome to BAMAZON!")
    console.log("Items in stock:");
    console.log("_________________________________________");
    console.log("");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + "ea" + " | Qty: " + res[i].stock_quantity);
    }
    console.log("_________________________________________");
    console.log("");
    //console.log(res);
    availability();
  });
}

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
      console.log("Qty is enough to fulfill your order...");
      console.log("Your total is going to be $" + total);
      console.log("");

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
          //database.updateStock(id, newQty);
          
          // update sales qty
          //database.addSale(department, total);

          inquirer.prompt([
            {
              name: 'confirm',
              type: 'confirm',
              message: 'Return to home page?'
            }
          ]).then(function(answer) {
            if (answer.confirm) {
              availability();
            } else {
              console.log('Thank you for BAMAZONing!');
              process.exit();
            }
          });
        } else {
          console.log("");
          console.log('Returning to home page...');
          console.log("");
          availability();

        }
      });
    }
  });
}
