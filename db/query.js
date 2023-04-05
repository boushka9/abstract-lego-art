// Import connection to database
const connection = require('./connection')

// Class constructor to export SQL query functions
class EmployeeDataBase {

    constructor(connection) {
        this.connection = connection
    }
   
    //Return dep ID & name to display to user
    allDepartments() {
        return this.connection.promise().query(
            `SELECT 
            department.id, 
            department.name 
            FROM department;`
        )
    }

    // Return the role id, job title, the department that role belongs to, and the salary for that role as one table
    allRoles() {
        return this.connection.promise().query(
            `SELECT 
            role.id, 
            role.title, 
            department.name department, 
            role.salary FROM role 
            LEFT JOIN department on role.department_id = department.id;`
        )
    }

    // formatted table showing employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    allEmployees() {
        return this.connection.promise().query(
            `SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name department, 
            role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) manager 
            FROM employee 
            LEFT JOIN role on employee.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT JOIN employee manager on employee.manager_id = manager.id;`
        )
    }

    // Use sub query to select the manager_id from employee and display that employees first/last name AS manager
    allManagers() {
        return this.connection.promise().query(
            `SELECT
            employee.id, 
            CONCAT(first_name, ' ', last_name) manager 
            FROM employee WHERE (id IN (SELECT manager_id FROM employee));`
        )
    }


    // Pass in new dep. name
    insertDepartment(newDepartment) {
        return this.connection.promise().query(
            `INSERT INTO department (name) VALUES (?);`, newDepartment
        )
    }

    //Pass in title, salary, and dep._id from prompt
    insertRole(newRole) {
        return this.connection.promise().query(
            `INSERT INTO role SET ?;`, newRole
        )
    }

    //Pass in first/last name, role, and manager from prompt
    insertEmployee(newEmployee) {
        return this.connection.promise().query(
            `INSERT INTO employee SET ?;`, newEmployee
        )
    }

    // Update role_id where the employee id = inserted id#
    updateEmployeeRole(role_id, employee_id) {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?;`, [role_id, employee_id]
        )
    }

    //FUTURE DEVELOPMENT:

    // employeesByDepartment() {
    //     return this.connection.promise().query(
    //         `SELECT`
    //     )
    // }
    
    // deleteDepartment() {
    //     return this.connection.promise().query(
    //         `DELETE FROM table_name WHERE condition;`
    //     )
    // }

    // deleteRole(){
    //     return this.connection.promise().query(
    //         `DELETE FROM table_name WHERE condition;`
    //     )
    // }

    // deleteEmployee(){
    //     return this.connection.promise().query(
    //         `DELETE FROM table_name WHERE condition;`
    //     )
    // }

    // budgetByDepartment() {
    //     return this.connection.promise().query(
    //         ``
    //     )
    // }

 
}

module.exports = new EmployeeDataBase(connection);