// Import connection to database
const connection = require('./connection')

// Class constructore to export SQL query functions
class EmployeeDataBase {

    constructor(connection) {
        this.connection = connection
    }

//ASK MO ? if get/set could be useful
    // class ClassWithGetSet {
    //     #msg = "hello world";
    //     get msg() {
    //       return this.#msg;
    //     }
    //     set msg(x) {
    //       this.#msg = `hello ${x}`;
    //     }
    // }
      

    // Return formatted table showing department names and department ids
   
    allDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        )
    }

    // Return the role id, job title, the department that role belongs to, and the salary for that role as one table
    allRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        )
    }

    // formatted table showing employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    allEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = employee.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
            // SELECT CONCAT(first_name, " ", last_name) AS manager  FROM employee WHERE (id IN (SELECT manager_id FROM employee));
        )
    }

    // connection.query(
    //     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    //     ['Page', 45],
    //     function(err, results) {
    //       console.log(results);
    //     }
    //   );
    
    insertDepartment() {
        return this.connection.promise().query(
            "INSERT INTO department (name) VALUES ?;"
        )
    }

    insertRole() {
        return this.connection.promise().query(
            "INSERT INTO role (title, salary, department_id) VALUES ?;"
        )
    }

    insertEmployee() {
        return this.connection.promise().query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?;"
        )
    }

    updateEmployeeRole() {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?;"
        )
    }
}

module.exports = new EmployeeDataBase(connection);