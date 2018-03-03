const inquirer = require('inquirer');
const customer = require('./bamazonCustomer.js');
const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');
const SQL = require('./mysql.js');

SQL.connection.connect(err => {
  if (err) throw err;
  users();
});

 function users() {
  
    inquirer.prompt([
      {
          name: 'position',
          type: 'list',
          message: 'What is your Level of Access?',
          choices: ['Customer','Manager','Supervisor','Exit']
      }
     ,{
          name: "guest",
          type: "input",
          message: "Please type in your name (or user ID)"
      }
  ])
  
  .then( answer => {
      
      switch(answer.position) {

          case 'Customer' :            
              customer.customerJS(answer.guest, SQL);
              break;
          case 'Manager' :
              manager.managerJS(answer.guest, SQL);
              break;
          case 'Supervisor' :
              supervisor.supervisorJS(answer.guest, SQL);
              break;
          case 'Exit' :
              console.log(`Thank for visiting us ${answer.guest}`);
              process.exit();
              break;
    }
  });
 }

exports.users = users;