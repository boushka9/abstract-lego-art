const inquirer = require('inquirer');
// const cTable = require('console.table');

// const db = require('./db')


const menuPrompt = [
    {
        type: "list",
        name: "menuOpt",
        message: "Would you like to add another employee to your team?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Finish"
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
    
    teamMenu = () => {
        inquirer.prompt(menuPrompt)
        .then(answer => {
            let choice = answer.choice
            switch(choice) {
                case "View All Departments":
                    viewDepartments()
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee()
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                default:
                    //exit application
            }
        })
    }

    //call team menu as first prompt
    teamMenu()

    // WHEN I choose to view all departments
    function viewDepartments() {
        // THEN I am presented with a formatted table showing department names and department ids
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