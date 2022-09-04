const inquirer = require('inquirer')
const express = require('express');
const mysql = require('mysql2');
const cTable = require ('console.table')

const PORT = process.env.PORT || 3001;

const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Hopie@89',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
  );
  


const questions = {
    main: [
     {
     type: 'list',
     message: 'What would you like to do?',
     choices: ['View all Employees', 'Add Employee', 'Update Employee Role', 'Add Role', 'View All Departments', 'Add Department'],
     name: 'mainChoice'
}],
    addDept: [
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'newDept'
        }
    ],
    addRole: [
        {
            type: 'input',
            message: 'What is the name of the role you would like to add?',
            name: 'newRole'
        },
        {
            type: 'input',
            messge: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service'],
            name: 'deptChoice'


        }
    ],
    newEmployee: [
        {
            type:'input',
            messgae:'What is the Employees first name?',
            name: 'fistName'
        },
        {
            type: 'input',
            message: 'What is the Employees last name?',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'What is the Employees role in the company?',
            choices: ['Sales Lead','Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            name: 'newEmpRole'
        },
        {
            type: 'list',
            messgage:'Who is the employees Manager',
            //choices: "This will need to be input with data somehow"
            name: 'empManager'
        }
    ],
    updateRole: [
        {
            type:'list',
            message: 'Which Employees role do you want to update?',
            choices: db.query('SELECT * FROM role.name',(err, result)=> {} ),
            name: 'empUpdate'
        },
        {
            type:'list',
            message: 'Which role would you like to assign to the selected employee?',
            //choices this will also have so be updated somehow
            name: 'assignedRole'
        }
    ]
}
    const startApp = () => {
        inquirer.prompt(questions.main)
        
        .then((answers) => {
           
            switch (answers.mainChoice) {
                case 'View all Employees':
                    console.log("view");
                    db.query('SELECT * FROM employee', function (err, results) {
                        console.table(results)
                      });
                     startApp()
                    break;

                case 'Add Employee':
                    console.log("addemploy");
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    console.log("emprole");
                    roleUpdate();
                    break;

                case 'Add Role':
                    console.log("role");
                    addingRole();
                    break;

                case 'View All Departments':
                    console.log("viewdept");
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                      });
                      
                    startApp();
                    break;

                case 'Add Department':
                    console.log("adddept");
                    addDepartment();
                    break;
               
            }
        })
    }
    const addDepartment = () => {
        inquirer.prompt(questions.addDept)
        .then((answers) => {
            //going to be a put or post
            startApp()
    })
}
const addingRole = () => {
    inquirer.prompt(questions.addRole)
    .then((answers) => {
        //going to be a put or post
        startApp();
})
}
const addEmployee = () => {
    inquirer.prompt(questions.newEmployee)
    .then((answers) => {
        db.query(`INSERT INTO employee` );
        startApp();
})
}
const roleUpdate = () => {
    inquirer.prompt(questions.updateRole)
    .then((answers) => {
        //going to be a put 
        startApp();
})
}

    startApp();