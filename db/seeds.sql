INSERT INTO department (name)

VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Service");


INSERT INTO role (title, salary, department_id )
VALUES
    ("Salesperson", 120001, 1),
    ("Lawyer", 100400, 4),
    ("Engineer", 10010, 2),
    ("Day Trader", 400070,3),
    ("Customer Service", 190300, 5),
    ("Book Keeper", 78002, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id )
VALUES
    ( 001, "Cesar", "Rolen", 1, null),
    ( 002, 'Bryan', 'Hoff', 2, null),
    ( 003, 'Billy', 'Hermano', 3, 1),
    ( 004, 'Steve', 'Jobs', 5, 2),
    ( 005, 'Mark', 'Cuban', 3, 1),
    ( 006, 'Albert', 'Pujols', 5, 2);