USE employees;

INSERT INTO department (name)
VALUES
    ('Project Management'),
    ('Human Resources'),
    ('Accounting');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('Project Manager', 100000, 1),
    ('HR Manager', 75000, 2),
    ('Junior Developer', 60000, 1),
    ('Accountant', 90000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Hayley', 'Penny', 1, NULL ),
    ('Julio', 'DeCosta', 4, NULL),
    ('Danny', 'Boushka', 3, 1),
    ('Diana', 'Aguilar', 2, NULL),
    ('Xochitl', 'West', 3, 1);
