
-- SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.name AS "Title", department.name AS "Department",
-- role.salary AS Salary, employee.manager_id AS Manager from role
-- JOIN employee ON employee.role_id = role.id
-- Join department ON role.department_id = department.id;


-- SELECT manager_id from employee
-- join employee on employee.manager_id = employee.first_name;

SELECT employee.id,  employee.first_name AS "First Name",  employee.last_name AS "Last Name", role.name AS Title, department.name AS Department,
                      role.salary AS Salary, 
                      dude.first_name AS WHO
               FROM employee
               
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee dude ON employee.manager_id = dude.id;



