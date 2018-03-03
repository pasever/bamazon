const mysql = require("mysql"),
      Table = require('cli-table');

const connection = mysql.createConnection(
  {
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "", 
    database: "bamazon"
  }); 
  
  //connection.connect();
  function displayTable() {
    connection.query("SELECT * FROM products", (err, res) => {
      if (err) 
        throw err;  
      
        // instantiate 
        let table = new Table({
            head: ['Item#', 'Name', 'Price', 'Qty'],
            colWidths: [7, 20, 13, 13]
            //style: { 'padding': 5 }
        });
    
      for (let i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity] );
      }
      console.log(table.toString());    
    });
  }
  
  exports.displayTable = displayTable;
  exports.connection = connection;