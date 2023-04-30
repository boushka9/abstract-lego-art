DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) UNIQUE NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_index (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) UNIQUE NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_index (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    foreign key manager_id references employee(id)
);


-- W/O self referential fk
-- create table employee_manager(
--   employee_id int not null,
--   manager_id int,
--   constraint employee_manager_pk primary key(employee_id, manager_id),
--   foreign key employee_id references employee(id),
--   foreign key manager_id references employee(id)
-- );


