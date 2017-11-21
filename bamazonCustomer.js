var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({host: "localhost", port: 3306, user: "root", password: "root", database: "bamazon"});

connection.connect(function(err) {
  if (err) 
    throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) 
      throw err;
    console.log(res);
    availability();
    //connection.end();
  });
}

function availability() {
  // prompt for info about the item being put up for auction
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
      if (err) throw err;
    
      
    
        console.log("Pulling the information...");
        console.log(results);
        console.log(typeof parseInt(answer.itemID));
        console.log(parseInt(answer.itemQTY));
        var stock = false;
        
        //checking if itemID in database = itemID entered
        for (var i = 0; i < results.length; i++) {
          
          if (results[i].item_id == answer.itemID && results[i].stock_quantity > answer.itemQTY) {
            stock = true;
            console.log("Yep, we have that in stock...");
            console.log("Qty in more then enough...");
          }
        }      
      
      if (stock) {
        console.log("Qty is not enough...");
        availability();        
      }
    });
  });
}
