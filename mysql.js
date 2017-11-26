const mysql = require("mysql");
const Table = require('cli-table');

const connection = mysql.createConnection(
  {
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "root", 
    database: "bamazon"
  }); 
  
  function displayTable() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) 
        throw err;  
      
        // instantiate 
        var table = new Table({
            head: ['Item#', 'Name', 'Price', 'Qty'],
            colWidths: [8, 20, 12, 12]
            //style: { 'padding': 5 }
        });
    
      for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity] );
      }
      console.log(table.toString());    
    });
  }
  
  exports.displayTable = displayTable;
  exports.connection = connection;