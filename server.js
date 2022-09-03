const inquirer = require('inquirer')


const questions = {
    main: [
     {
     type: 'list',
     message: 'What would you like to do?',
     choices: ['View all Employees', 'Add Employee', 'Update Employee Roll', 'Add Roll', 'View All Departments', 'Add Department'],
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
            message: 'What is the name of the roll you would like to add?',
            name: 'newRole'
        },
        {
            type: 'input',
            messge: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Which department does the roll belong to?',
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
            message: 'What is the Employees roll in the company?',
            // will need to add into as well choices: ['Sales Lead','Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            name: 'newEmpRoll'
        },
        {
            type: 'list',
            messgage:'Who is the employees Manager',
            //choices: "This will need to be input with data somehow"
            name: 'empManager'
        }
    ],
    updateRoll: [
        {
            type:'list',
            message: 'Which Employees roll do you want to update?',
            //choices: This will have to be updated somehow
            name: 'empUpdate'
        },
        {
            type:'list',
            message: 'Which role would you like to assign to the selected employee?',
            //choices this will also have so be updated somehow
            name: 'assignedRoll'
        }
    ]
}
