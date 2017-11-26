const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');

const connection = mysql.createConnection(
  {
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "root", 
    database: "bamazon"
  }); 
 

function managerJS(name){
  console.log("");
  console.log(`Welcome to the manager's portal ${name.trim()}`);
  console.log("");  
  options();
}

function options() {
inquirer.prompt([     
    {
       name: 'option',
       type: 'list',
       message: 'Your optins are:',
       choices: [
                   'View Products for Sale',
                   'View Low Inventory', 
                   'Add to Inventory', 
                   'Add New Product',
                   'Exit'
                ]
    }
   ,{
      name: "pass",
      type: "input",
      message: "Please type in your password for security purposes"
    }
])
.then(
  function(answer) {
    
      switch(answer.option) {

          case 'View Products for Sale' :            
              //console.log("Welcome Customer");
              //forSale();
              break;
          case 'View Low Inventory' :
              //console.log("Welcome Manager");
              lowInv();
              break;
          case 'Add to Inventory' :
              //console.log("Welcome Supervisor");
              addToInv();
              break;
          case 'Add New Product' :
              //console.log("Welcome Supervisor");
              //addProduct();
              break;      
          case 'Exit' :
              console.log(`Thank for visiting...`);
              process.exit();
              break;
      }
  });
}

function lowInv(){    
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) 
      throw err; 
      
      // instantiate 
      var table = new Table({
          head: ['Item#', 'Name', 'Price', 'Qty', 'Sales'],
          colWidths: [8, 20, 12, 12, 12]
          //style: { 'padding': 5 }
      });
  
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
    }
    //console.log(res)
    console.log(table.toString());
    
  });
}

exports.managerJS = managerJS;