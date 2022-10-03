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

    connection.query(query, function(err,res){
      if(err) throw err;
      console.table(res);
      db_prompt();      
    });
};


// add new employee to db
function addEmployee() {
   
    // SQL command to get data from roles table
    let query = "SELECT title FROM roles";

     // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employees, roles, and department tables
     let query2 =

     "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.dept_name, employees.manager_id " +
     "FROM employees " +
     "JOIN roles ON roles.id = employees.role_id " +
     "JOIN department ON roles.department_id = department.id " +
     "ORDER BY employees.id;"

 ;
 connection.query(query, function(err, res){    

      if(err) throw err;
      let rolesList = res;

    connection.query(query2, function(err,res) {

        if(err) throw err;

        for(i = 0; i < res.length; i++) {
            if(res[i].manager_id == 0) {
                    
                res[i].manager = "None"             
            }else{

                res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;

            };
            
            delete res[i].manager_id;
         };
         console.table(res);

         let managerList = res;
         let addEmpPrompt = [
            {        
                name: "first_name",
                type: "input",
                message: "Enter new employee's first name."                
            },
            {
            
                name: "last_name",
                type: "input",
                message: "Enter new employee's last name."
                
            },
            {
            
                name: "select_role",
                type: "list",
                message: "Select new employee's role.",

                choices:function(){

                 // init roles array - used to return existing roles titles as choises array prompted to user
                roles = [];
                        
                // loop through rolesList to extract the role titles from rolesList which is an object array containing data from roles table in the form of rowPackets
                for(i = 0; i < rolesList.length; i++) {
                            
                    // looping parameter "i" will allways align with the table index, therefore by adding 1 we have effectivly converted it to match table id's
                    const roleId = i + 1;

                    // concat roleId and title strings and push the resulting string into our roles (choises) array 
                    roles.push(roleId + ": " + rolesList[i].title);
                    };
                    roles.unshift("0: Exit");

                    return roles;
                }
            },
            {
            
                name: "select_manager",
                type: "list",
                message: "Select new employee's manager",

                choices:function(){

                    // init manager array - used to return existing employee names as choises array prompted to user
                   managers = [];
                           
                   for(i = 0; i < managerList.length; i++) {
                               
                       const mId = i + 1;
   
                       managers.push(mId + ": " + managerList[i].first_name + " " + managerList[i].last_name);
                       };

                       managers.unshift("0: Exit");
                       managers.unshift("E: Exit");
   
                       return managers;
            },
            when: function( answers ) {
                                
              return answers.select_role !== "0: Exit";            
            }          
           }
        ];
        inquirer.prompt(addEmpPrompt)
        .then(function(answer){
            if(answer.select_role == "0: Exit" || answer.select_manager =="E: Exit"){
                db_prompt();
            }else{
                console.log(answer);

                let query ="INSERT INTO employees SET?"

                connection.query(query,{
                    first_name:answer.first_name,
                    last_name:answer.last_name,

                    role_id: parseInt(answer.select_role.split(":")[0]),
                    manager_id: parseInt(answer.select_manager.split(":")[0])
                },
                function(err, res){                  
                    if (err) throw err;
                })
                let addagainPrompt = [
                    
                    {                
                        name: "again",
                        type: "list",
                        message: "Would you like to add another employee?",
                        choices: ["Yes","Exit"]                    
                    }
                ];
                inquirer.prompt(addagainPrompt)

                .then(function(answer) {
                    // SQL command to get employee first_name/ last_name/ manager id, role title/ salary and department name data from employees, roles, and department tables
                    let query =

                        "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.dept_name, employees.manager_id " +
                        "FROM employees " +
                        "JOIN roles ON roles.id = employees.role_id " +
                        "JOIN department ON roles.department_id = department.id " +
                        "ORDER BY employees.id;"

                    ;
                    connection.query(query, function(err,res) {

                        if (err) throw err;
                        if(answer.again == "Yes") {

                          addEmployee();            
                        
                        }else if(answer.again == "Exit") {

                            for(i = 0; i < res.length; i++) {

                            if(res[i].manager_id == 0) {
                                    
                                    res[i].manager = "None" 
                                
                                }else{

                                    res[i].manager = res[res[i].manager_id - 1].first_name + " " + res[res[i].manager_id - 1].last_name;

                                };

                                delete res[i].manager_id;
                            };
                            console.table(res);
                            db_prompt(); 
                        };  
                    });
                }); 
            };
        });
      })
     }) 
};
  //add new department to employeed_db
  function addDept(){           
    let query = "SELECT department.dept_name FROM department;";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);

        let addDeptPrompt = [
            {        
                name: "new_department",
                type: "input",
                message: "Enter a new company department."                
            },        
        ];
        inquirer.prompt(addDeptPrompt)
        .then(function(answer) {

            console.log(answer);

            let query = "INSERT INTO department SET ?";
              
            connection.query(query,
            {                
                dept_name: answer.new_department

            }, function(err, res){
                if (err) throw err;                
            });
            let addagainPrompt = [
                {        
                    name: "again",
                    type: "list",
                    message: "Would you like to add another department?",
                    choices: ["Yes","Exit"]    
                },
            ];
            inquirer.prompt(addagainPrompt)
            .then(function(answer) {

                let query = "SELECT department.dept_name FROM department" ;
                   connection.query(query, function(err, res){
                    if (err) throw err;
    
                    if(answer.again == "Yes") {

                        addDept();

                            }else if(answer.again == "Exit") {

                        console.table(res);
                        db_prompt
                    }; 
                });
            });
        });
    });         

  };
