USE employee_db;

INSERT INTO department (name) VALUES
("IT"),
("Helpdesk"),
("Legal"),
("Sales"),
("Human Resources");

INSERT INTO role (title, salary, department_id) VALUES
("Web Developer", 120000, 1),
("QA Engineer", 65000, 2),
("Product Manager", 125000, 3),
("CSR", 40000, 4),
("Business Partner", 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Tana", "Larrabee", 1, 2),
("Darian", "Everett", 2, 4),
("Martin", "McFly", 2, 3),
("Stannis", "Baratheon", 4, 3),
("Chappie", "Kappie", 5, 2);