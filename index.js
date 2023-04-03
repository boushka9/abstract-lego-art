const inquirer = require('inquirer');
require("console.table");

const emDb = require('./db/query')


const menuPrompt = [
    {
        type: "list",
        name: "menuOpt",
        message: "What would you like to do?",
        choices: [
            {
                name:"View All Departments",
                value: 1
            },
            {
                name: "View All Roles",
                value: 2
            },
            {
                name: "View All Employees",
                value: 3
            },
            {
                name: "Add Department",
                value: 4
            },
            {
                name: "Add Role",
                value: 5
            },
            {
                name: "Add Employee",
                value: 6
            },
            {
                name: "Update Employee Role",
                value: 7
            },
            {
                name: "Finish",
                value: 8
            }
        ]
    }
];

const createDepartment = [
    {
        type: "input",
        name: "newDep",
        message: "What is the name of the new department?"

    }
];

// const createRole = [
//     {
//         type: "input",
//         name: "role_title",
//         message: "What is the name of the new role?"
//     },
//     {
//         type: "number",
//         name: "role_salary",
//         message: "What is the salary for this role?"
//     },
//     {
//         type: "list",
//         name: "department_id",
//         message: "Which department does this role belong to?",
//         choices: listDepartments// to connect list of all departments from db
//     }
// ];

// const createEmployee2 = [
//     {
//         type: "input",
//         name: "empRole",
//         message: "What is the employees role?"
//     },
//     {
//         type: "input",
//         name: "empManager",
//         message: "Who is the employees manager?"
//     }
// ]

const updateEmpRole = [
    // {
    //     type: "list",
    //     name: "selectEmp",
    //     choices: //allEmployees // to connect list of all employees from db
    // },
    // {
    //     type: "list",
    //     name: "newRole",
    //     choices: //allRoles, // connect list of all roles from db
    // }
];


function firstPrompt() {

  navMenu = () => {
    inquirer.prompt(menuPrompt)
        .then(answer => {
            
            switch(answer.menuOpt) {
                case 1:
                    viewDepartments()
                    break;
                case 2:
                    viewRoles();
                    break;
                case 3:
                    viewEmployees();
                    break;
                case 4:
                    addDepartment();
                    break;
                case 5:
                    addRole();
                    break;
                case 6:
                    addEmployee()
                    break;
                case 7:
                    updateEmployeeRole();
                    break;
                case 8: //8 = exit application
                  emDb.connection.end();
                  break;
            }
        })
      }

    // call nav menu on start
    navMenu()
   
    // var values = [
    //     ['max', 20],
    //     ['joe', 30]
    // ];
    // console.table('table name', [values]);

    // WHEN I choose to view all departments
    function viewDepartments() {
        // THEN I am presented with a formatted table showing department names and department ids
        emDb.allDepartments().then(([rows]) => {
          // console.log(rows)
           let departments = rows;
            console.table('Departments', departments);
            
        }).then(() => navMenu())
    } 

    // WHEN I choose to view all roles
    function viewRoles() {
        // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

        emDb.allRoles().then(([rows]) => {
          let roles = rows;
          console.table('Roles', roles);
        }).then(() => navMenu())
    }

    // WHEN I choose to view all employees
    function viewEmployees() {
        // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        emDb.allEmployees().then(([rows]) => {
          let employees = rows;
          console.table('Employees', employees);
        }).then(() => navMenu())
    }

    // WHEN I choose to add a department
    function addDepartment() {
        // THEN I am prompted to enter the name of the department
        inquirer.prompt(createDepartment)
        .then((answer) => {
          let name = answer.newDep;
          emDb.insertDepartment(name);
          console.log(`'${name}' added to department database`)
        })
        .then(() => navMenu())
    }

    // WHEN I choose to add a role
    function addRole() {
        emDb.allDepartments().then(([rows]) => {
             let departments = rows;
               
             // User will select dep. by name, but will pass in the id for the querey
             const listDepartments = departments.map(({id, name}) => ({
                name: name,
                value: id
             }));

             inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the name of the new role?"
                },
                {
                    type: "number",
                    name: "salary",
                    message: "What is the salary for this role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does this role belong to?",
                    choices: listDepartments// to connect list of all departments from db
                }
            ])
             .then((answer) => {
                console.log(answer)
                emDb.insertRole(answer)
                .then(() => console.log(`${answer.title} added to role database`))
             })
             .then(() => navMenu())
              
          })
              
    }

    
    function addEmployee() {
        
        inquirer.prompt([    
        {
            type: "input",
            name: "first_name",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?"
        }])
        .then((answer) => {
          let firstName = answer.first_name;
          let lastName = answer.last_name;

            emDb.allRoles().then(([rows]) => {
                let roles = rows;

                // User selects role by name, and the corresponding role id = value for query
                const listRoles = roles.map(({id, title}) => ({
                    name: title,
                    value: id
                }))

                    inquirer.prompt([{
                            type: "list",
                            name: "title",
                            message: "What is the employees role?",
                            choices: listRoles
                        }])
                        .then((answer) => {
                            let roleId = answer.title;
                        
                            emDb.allEmployees().then(([rows]) => {
                              let managers = rows;
                            
                              const listManagers = managers.map(({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                              }))
                          
                              listManagers.unshift({ name: "None", value: null });
                          
                              inquirer.prompt([
                                {
                                  type: "list",
                                  name: "manager_id",
                                  message: "What is the employees manager?",
                                  choices: listManagers
                                }
                              ])
                                .then((answer) => {
                                    let managerId = answer.manager_id;
                            
                                    let newEmployee = 
                                    ({
                                      first_name: firstName,
                                      last_name: lastName,
                                      role_id: roleId,
                                      manager_id: managerId
                                    })
                                    
                                    emDb.insertEmployee(newEmployee)
                                    //Currently inserting 0 and null for values even thought 
                                    console.log(newEmployee)
                                    console.log(`${firstName} ${lastName} has been add to the employee database.`)
                                }).then(() => navMenu())
                            })
                            
                        
                        
                        
                          //Add new employee to db
                            //   emDb.insertEmployee(newEmployee)
                            //   //Verify to user action completed
                            //   console.log(`${firstName} ${lastName} has been add to the employee database.`)
                        })
                    
            })  
        })  
    }


    // WHEN I choose to update an employee role
    function updateEmployeeRole() {
        // THEN I am prompted to select an employee to update and their new role
        inquirer.prompt(updateEmpRole)
        .then((answers) => {

        }) 
    }

}

//call prompts to start
firstPrompt()