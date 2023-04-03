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
   
    function viewDepartments() {
        // Display rows of departments in db
        emDb.allDepartments().then(([rows]) => {
          // Pass in departments, label the table 'Departments'
           let departments = rows;
            console.table('Departments', departments);
            
        }).then(() => navMenu())
    } 

    function viewRoles() {
        // Display rows of roles in db
        emDb.allRoles().then(([rows]) => {
          // Pass in roles and label table 'Roles'   
          let roles = rows;
          console.table('Roles', roles);
        }).then(() => navMenu())
    }

    function viewEmployees() {
        // Pass in employees and label table 'Employees'
        emDb.allEmployees().then(([rows]) => {
          let employees = rows;
          console.table('Employees', employees);
        }).then(() => navMenu())
    }

    function addDepartment() {
        // Add New departemnt name and pass it into INSERT query
        inquirer.prompt(createDepartment)
        .then((answer) => {
          let name = answer.newDep;
          emDb.insertDepartment(name);
          console.log(`'${name}' added to department database`)
        })
        .then(() => navMenu())
    }

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
                    name: "role_id",
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
                emDb.insertRole(answer)
                .then(() => console.log(`${answer.role_id} added to role database`))
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
                const listRoles = roles.map(({id, role_id}) => ({
                    name: role_id,
                    value: id
                }))
                
                    inquirer.prompt([{
                            type: "list",
                            name: "role_id",
                            message: "What is the employees role?",
                            choices: listRoles
                        }])
                        .then((answer) => {
                            let roleId = answer.role_id;
                        
                            emDb.allEmployees().then(([rows]) => {
                              let managers = rows;
                            
                              const listManagers = managers.map(({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                              }))
                          
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
                            
                                    // Set values to be passed into INSERT employee query
                                    let newEmployee = 
                                    ({
                                      first_name: firstName,
                                      last_name: lastName,
                                      role_id: roleId,
                                      manager_id: managerId
                                    })
                                    
                                    emDb.insertEmployee(newEmployee)

                                    console.log(`${firstName} ${lastName} has been add to the employee database.`)
                                }).then(() => navMenu())
                            })
                        })     
            })  
        })  
    }


    function updateEmployeeRole() {

        emDb.allEmployees().then(([rows]) => {
            let employees = rows;

            // User Selects employee by name and the id is passed in as the value
            const listEmployees = employees.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))

            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    choices: listEmployees
                }
            ])
            .then((answer) => {
                let employee_id = answer.employee;

                emDb.allRoles().then(([rows]) => {
                    let roles = rows;

                    // From roles, display role name to user and pass in value id 
                    const listRoles = roles.map(({id, title}) => ({
                        name: title,
                        value: id
                    })) 
                    inquirer.prompt([{
                        type: "list",
                        name: "role_id",
                        message: "What is the employees updated role?",
                        choices: listRoles
                    }])
                    .then((answer) => {
                        // Role title correspondes to role_id
                        let newRole = answer.role_id;

                        // Pass new role id, and employee id into query
                        emDb.updateEmployeeRole(newRole, employee_id)

                        console.log(`Employee Roles has been successfully updated`)
                    })
                    .then(() => navMenu())
                })
            }) 
        })  
    }

}

//call prompts to start
firstPrompt()