const inquirer = require('inquirer');
const mysql = require('mysql');

//create connection to sql db
const connection = mysql.createConnection({
   host:'localhost',
   port:3306,
   user:'root',
   password:'123456789',
   database:'employee_db'
});

//connects to sql server and sql database
connection.connect(function(err){

   // throw error if there is issue connecting 
   if (err) throw err;

   // prompt user with inquirer
   db_prompt();

});


// array of actions to prompt user
const mainPrompt = [
    
   {

       name: "action",
       type: "list",
       message: "Select an action",
       choices: [
           
           "View employees",
           "View roles",
           "View departments",
           "Add department",
           "Add role",
           "Add employee",
           "Edit employee",
           "Remove employee",
           "EXIT"
           
       ]       
   }
];

// prompt user with inquirer and execute function corresponding to user selection
function db_prompt() {
   inquirer.prompt(mainPrompt)
   .then(function(answer) {
       if(answer.action == "View employees") {           
           viewAll();
       }else if(answer.action == "View departments") {
           viewDept();
       }else if(answer.action == "View roles") {
           viewRoles();
       }else if(answer.action == "Add employee") {
           addEmployee();
       }else if(answer.action == "Add department") {
           addDept();
       }else if(answer.action == "Add role") {
           addRole();
       }else if(answer.action == "Edit employee") {
           updateEmployee();
       }else if(answer.action == "Remove employee") {
           deleteEmployee();
       }else if(answer.action == "EXIT") {
           exit();
       };       
   });    
};
