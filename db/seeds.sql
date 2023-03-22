USE employees;

INSERT INTO department (name)
VALUES
    ('Project Development'),
    ('Human Resources'),
    ('Accounting');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('Project Manager', 108000, 1),
    ('HR Manager', 80000, 2),
    ('HR Assistant', 55000, 2),
    ('Junior Developer', 65000, 1),
    ('Accountant', 100000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Hayley', 'Penny', 1, NULL),
    ('Julio', 'DeCosta', 3, 4),
    ('Danny', 'Boushka', 4, 1),
    ('Diana', 'Aguilar', 2, NULL),
    ('Xochitl', 'West', 4, NULL);
