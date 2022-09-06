INSERT INTO department (name)

VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Service");


INSERT INTO role (name, salary, department_id )
VALUES
    ("Salesperson", 120000, 1),
    ("Lawyer", 100000, 4),
    ("Engineer", 10010, 2),
    ("Day Trader", 400000,3);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id )
VALUES
    ( 001, "Cesar", "Rolen", 1, 46),
    ( 002, 'Bryan', 'Hoff', 2, 18),
    ( 003, 'Billy', 'Hermano', 3, 197);

