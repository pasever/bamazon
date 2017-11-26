const inquirer = require('inquirer');
const customer = require('./bamazonCustomer.js');
const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');

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
.then(
  function(answer) {
    
    switch(answer.position) {

        case 'Customer' :            
            //console.log("Welcome Customer");
            customer.customerJS(answer.guest);
            break;
        case 'Manager' :
            //console.log("Welcome Manager");
            manager.managerJS(answer.guest);
            break;
        case 'Supervisor' :
            //console.log("Welcome Supervisor");
            supervisor.supervisorJS(answer.guest);
            break;
        case 'Exit' :
            console.log(`Thank for visiting ${answer.guest}`);
            process.exit();
            break;
    }
});

