const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
//const SQL = require('./mysql.js');
const display = require('./mysql.js');
const users = require('./bamazon.js');
 
var mSQL; 

//greetings 
function managerJS(name, SQL){
  mSQL = SQL;
  
  console.log('###############################');
  console.log('');
  console.log(`Welcome to the manager's portal ${name.trim()}`);
  console.log('');
  console.log('###############################');
  console.log(''); 
  options();
}

//manager's menu options
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
                       'Main Menu',
                       'Exit'
                    ]
        }
      //  ,{
      //     name: "pass",
      //     type: "input",
      //     message: "For security purposes, please type in your password"
      //   }
    ])
    .then(
      function(answer) {
        
          switch(answer.option) {

              case 'View Products for Sale' :            
                  display.displayTable();
                  setTimeout(mainPage, 5000);
                  break;
              case 'View Low Inventory' :
                  lowInv();
                  break;
              case 'Add to Inventory' :
                  addToInv();
                  break;
              case 'Add New Product' :
                  addProduct();
                  break;   
              case 'Main Menu' :
                  users.users();
                  break;     
              case 'Exit' :
                  console.log(`Thank for visiting...`);
                  process.exit();
                  break;
          }
      });
}

//checking databases for items with qty less then 5
function lowInv(){    
  mSQL.connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) 
      throw err; 
      
      // instantiate 
      var table = new Table({
          head: ['Item#', 'Name', 'Department', 'Price', 'Qty', 'Sales'],
          colWidths: [8, 18, 18, 12, 12, 12]
      });
  
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]);
    }
    console.log(table.toString());
    setTimeout(mainPage, 5000);
      
  });
  //SQL.connection.end();
}

//adding items to the Inventory 
function addToInv(){
    inquirer.prompt([
      {
            name: "itemID",
            type: "input",
            message: "Which item # you want to add qty to?"
      }, {
            name: "itemQTY",
            type: "input",
            message: "How many do you want to add?"
          }
        ])
        .then(function(answer) {
          
          mSQL.connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: answer.itemID }, function(err, res) {
            if (err) 
              throw err;  
              let oldQty = res[0].stock_quantity;
              addQty(oldQty);
          });
          
      function addQty(q){
          mSQL.connection.query('UPDATE products SET ? WHERE ?', [{
             stock_quantity: parseInt(answer.itemQTY) + q
         }, {
             item_id: answer.itemID
         }]);
       }
         console.log("Databases have been updated");
         setTimeout(display.displayTable, 2000);
         setTimeout(mainPage, 3000);
      });    
    }

function mainPage(){  
    inquirer.prompt([
      {
        name: 'confirm',
        type: 'confirm',
        message: 'Would you like to return to the options page?'
      }
    ]).then(function(answer) {
      if (answer.confirm) {
        options();
    } else {
        //SQL.connection.end();
        users.users();
        
    }
  });
}

//addind a new product
function addProduct(){
  inquirer.prompt([
    {
          name: "productName",
          type: "input",
          message: "What is the name of the new product?"
    }, {
          name: "productDept",
          type: "input",
          message: "Which department new product is going to?"
    }, {
          name: "productCost",
          type: "input",
          message: "What is the cost (per each) of the new product?"
    }, {
          name: "productQty",
          type: "input",
          message: "How many (in eaches) did store received?"                
    }
      ])
      .then(function(answer, err) {        
        mSQL.connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', 
          [
            answer.productName, answer.productDept, answer.productCost, answer.productQty                       
          ]);
           if (err) throw err;
           console.log("Databases have been successfully updated");
           setTimeout(display.displayTable, 2000);
           setTimeout(mainPage, 4000);
    });    
}

exports.managerJS = managerJS;