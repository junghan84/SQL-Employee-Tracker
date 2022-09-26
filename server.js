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

// prompt user with inquirer and execute function
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

//View all employees in db

function viewAll(){

   // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employees, roles, and department tables
   let query= 
      
    
   "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.dept_name AS department, employees.manager_id " +
   "FROM employees " +
   "JOIN roles ON roles.id = employees.role_id " +
   "JOIN department ON roles.department_id = department.id " +
   "ORDER BY employees.id;"

   ;

   connection.query(query, function(err,res){

      if(err) throw err;

      for(i=0; i<res.length; i++){

          // if manager_Id contains a "0" then lable it as "None"
         if(res[i].manager_id ==0){
            res[i].manager ="None"
         }else{

            // create new row called manager, containing each employee's manager name
            res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;
         };
            // remove manager id from res so as to not display it
            delete res[i].manager_id;        
      };
      console.table(res);

      db_prompt();
   });

};

// view all department
function viewDept() {

   // SQL command to get data from department table
   let query = "SELECT department.dept_name AS departments FROM department;"
   ;
   connection.query(query, function(err, res){
      if(err) throw err;
      console.table(res);
      db_prompt();
   });   
};

// view all roles 
function viewRoles() {

    // SQL command to get data from roles table
    let query = "SELECT roles.title, roles.salary, department.dept_name AS department FROM roles INNER JOIN department ON department.id = roles.department_id;";

}
