// Import connection to database
const connection = require('./connection')

// Class constructore to export SQL query functions
class EmployeeDataBase {

    constructor(connection) {
        this.connection = connection
    }
   
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

    allManagers() {
        return this.connection.promise().query(
            `SELECT
            employee.id, 
            CONCAT(first_name, ' ', last_name) manager 
            FROM employee WHERE (id IN (SELECT manager_id FROM employee));`
        )
    }

    employeesByDepartment() {
        return this.connection.promise().query(
            `SELECT`
        )
    }

    insertDepartment(newDepartment) {
        return this.connection.promise().query(
            `INSERT INTO department (name) VALUES (?);`, newDepartment
        )
    }

    insertRole(newRole) {
        //Pass in title, salary, and dep._id from prompt
        return this.connection.promise().query(
            `INSERT INTO role SET ?;`, newRole
        )
    }

    insertEmployee(newEmployee) {
        return this.connection.promise().query(
            `INSERT INTO employee SET ?;`, newEmployee
        )
    }

    updateEmployeeRole(employee_id, role_id) {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?;`, [employee_id, role_id]
        )
    }

    deleteDepartment() {
        return this.connection.promise().query(
            ``
        )
    }

    deleteRole(){
        return this.connection.promise().query(
            ``
        )
    }

    deleteEmployee(){
        return this.connection.promise().query()
    }

    budgetByDepartment() {
        return this.connection.promise().query(
            ``
        )
    }

 
}

module.exports = new EmployeeDataBase(connection);