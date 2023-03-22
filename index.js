const inquirer = require('inquirer');
const cTable = require('console.table');

const empDB = require('./db/query')


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

const plusDepartment = [
    {
        type: "input",
        name: "newDep",
        message: "What is the name of the new department?"

    }
];

const createRole = [
    {
        type: "input",
        name: "role_title",
        message: "What is the name of the new role?"
    },
    {
        type: "number",
        name: "role_salary",
        message: "What is the salary for this role?"
    },
    {
        type: "list",
        name: "department_id",
        message: "Which department does this role belong to?",
        choices: allDepartments // to connect list of all departments from db
    }
];

const createEmployee = [
    {
        type: "input",
        name: "empFName",
        message: "What is the employees first name?"
    },
    {
        type: "input",
        name: "empLName",
        message: "What is the employees last name?"
    },
    {
        type: "input",
        name: "empRole",
        message: "What is the employees role?"
    },
    {
        type: "input",
        name: "empManager",
        message: "Who is the employees manager?"
    }
];

const updateEmpRole = [
    {
        type: "list",
        name: "selectEmp",
        choices: allEmployees // to connect list of all employees from db
    },
    {
        type: "list",
        name: "newRole",
        choices: allRoles, // connect list of all roles from db
    }
];


function initPrompt() { 
    
    navMenu = () => {
        inquirer.prompt(menuPrompt)
        .then(answer => {
            let choice = answer.choice
            switch(choice) {
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
                default:
                    //8 = exit application
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
        empDB.allDepartments().then(([rows]) => {
            
            cTable.getTable([rows]);
            
        }).then(() => {
            navMenu()
        })
    } 

    // WHEN I choose to view all roles
    function viewRoles() {
        // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    }

    // WHEN I choose to view all employees
    function viewEmployees() {
        // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    }

    // WHEN I choose to add a department
    function addDepartment() {
        // THEN I am prompted to enter the name of the department
        inquirer.prompt(plusDepartment)
        .then((answers) => {

        })  
    }

    // WHEN I choose to add a role
    function addRole() {
        // THEN I am prompted to enter the name, salary, and department for the role 
        inquirer.prompt(createRole)
        .then((answers) => {

        })  
    }

    // WHEN I choose to add an employee
    function addEmployee() {
        // THEN I am prompted to enter the employee’s first name, last name, role, and manager
        inquirer.prompt(createEmployee)
        .then((answers) => {

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
initPrompt();