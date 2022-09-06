SELECT *
FROM employee
-- -- SELECT department.name
-- -- FROM department;
JOIN role ON employee.role_id = role.id
ALTER TABLE employee
DROP role_id;


-- SELECT name FROM department;