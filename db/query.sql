-- department.. salary from role



SELECT sum(salary) AS Total_Salary FROM role 
JOIN department ON department_id = department.id WHERE department.id = 4;