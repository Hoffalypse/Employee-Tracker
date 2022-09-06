const inquirer = require('inquirer')
const express = require('express');
const db = require('mysql-promise')();
const cTable = require ('console.table')

const PORT = process.env.PORT || 3001;

const app = express();

 db.configure(
    {
      host: 'localhost',
      user: 'root',
      password: 'Hopie@89',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
  );
console.log(' ___________________________________');
console.log('|                                   |');
console.log('|      Welcome to Employee          |');
console.log('|            Manager                |');
console.log('|                                   |');
console.log('|          Designed by              |');
console.log('|                                   |');
console.log('|         Bryan Wienhoff            |');
console.log('|                                   |');
console.log('`___________________________________/');

const questions = {
    main: [
     {
     type: 'list',
     message: 'What would you like to do?',
     choices: ['View all Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
     name: 'mainChoice'
}],
    addDept: [
        {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'newDept'
        }
    ]
}
    const startApp = () => {
        inquirer.prompt(questions.main)
        
        .then((answers) => {
           
            switch (answers.mainChoice) {
                case 'View all Employees':
                    viewALL()  
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Update Employee Role':
                    
                    roleUpdate();
                    break;
                
                case 'View All Roles':
                    viewRole();
                    break;

                case 'Add Role':
                    
                    addingRole();
                    break;

                case 'View All Departments':
                    viewDepts()
                    break;

                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    
                    break;
               
            }
        })
    }
    const addDepartment = () => {
        inquirer.prompt(questions.addDept)
        .then((answers) => {
            db.query(`INSERT INTO department(name) VALUES("${answers.newDept}")`)
            console.log('Added New Department!')
            startApp()
    })
}
    const addingRole = () => {
        db.query('SELECT * FROM department',(err, results) => {
            const addRole = {
                ques:[
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
                    name: 'deptChoice',
                    message: 'Which department does the role belong to?',
                    choices: function(){
                    let roleArr= []
                    for (let i = 0; i < results.length; i++) {  
                        roleArr.push(results[i].name) 
                    }
                    return roleArr;
                },
                    
                }
            ]}
        inquirer.prompt(addRole.ques)
        .then((answers) => {
            let department_id;
            for (let a = 0; a < results.length; a++) {
                
                console.log(answers.deptChoice)
                console.log(results[a].name + 'this is results')
                if (results[a].name == answers.deptChoice) {
                    department_id = results[a].id;
                    
                }
            }
                
            db.query(`INSERT INTO role(name, salary, department_id) VALUES("${answers.newRole}",${answers.salary}, ${department_id})`)
            console.log('Added New Role!')
            startApp();
        
    })
    })
}
//gets data for new employee name and role and converts role to integer 
    const addEmployee = () => {
        db.query('SELECT * FROM role', (err, results) => {
        inquirer.prompt([
            {
                type:'input',
                messgae:'What is the Employees first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the Employees last name?',
                name: 'lastName'
            },
            {
                type: 'list',
                name: 'newEmpRole',
                message: 'What is the Employees role in the company?',
                choices: function(){
                    let roleArr= []
                    for (let i = 0; i < results.length; i++) {  
                        roleArr.push(results[i].name) 
                    }
                    return roleArr;
                }
            }
          
        ])
    
        .then((answers) => {
            let role_id;
            for (let a = 0; a < results.length; a++) {
                if (results[a].name == answers.newEmpRole) {
                    role_id = results[a].id;
                }
            }
        addManager(answers.firstName, answers.lastName, role_id);
        }
    )})
    }
    //gets manager adds manager numer to existing data and inserts into db in correct format
    const addManager = (first, last, role) => {
        db.query('SELECT * FROM employee', (err, results) => {
            inquirer.prompt([ 
                 {
                type: 'list',
                messgage:'Who is the employees Manager?',
                name: 'empManager',
                choices: function(){
                    let empArr= []
                    for (let i = 0; i < results.length; i++) {  
                        empArr.push(results[i].first_name + ' ' + results[i].last_name) 
                    }
                    return empArr;
                },
            }
        ])
        .then((answers) => {
            let manager_id;
                for (let a = 0; a < results.length; a++) {
                    if (results[a].first_name + ' ' + results[a].last_name == answers.empManager) {
                        manager_id = results[a].id;
                    }
                }
                db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${first}","${last}",${role}, ${manager_id})`)
                    console.log('Your new Employee has been added!');
            
        startApp();
        })
    })
    }
//Gets employee name to update and turns outputs employee ID integer
    const roleUpdate = () => {
        db.query('SELECT * FROM employee',(err, results)=> {
     inquirer.prompt([
        {
            type:'list',
            message: 'Which Employees role do you want to update?',
            name: 'empUpdate',
            choices: function(){
                let empArr= []
                for (let i = 0; i < results.length; i++) {  
                    empArr.push(results[i].first_name + ' ' + results[i].last_name) 
                }
                return empArr;
            }
        }
    ])

     .then((answers) => {
        let employee_id;
        for (let a = 0; a < results.length; a++) {
            if (results[a].first_name + ' ' + results[a].last_name == answers.empUpdate) {
                employee_id = results[a].id;
            }
            
        
    }
    roleUpdate2(employee_id);
    
})
})
}   
//Takes in new role and updates new role by integer identifier 
const roleUpdate2 = (empID) => {
    db.query('SELECT * FROM role',(err, results)=> {
 inquirer.prompt([

    {
        type:'list',
        message: 'Which role would you like to assign to the selected employee?',
        name: 'assignedRole',
        choices: function(){
            let roleArr= []
            for (let i = 0; i < results.length; i++) {  
                roleArr.push(results[i].name) 
            }
            return roleArr;
        }
    }
])

 .then((answers) => {
    
    let newRole_id;
    for (let a = 0; a < results.length; a++) {
        if (results[a].name == answers.assignedRole) {
            newRole_id = results[a].id;
        }
    }
    
    db.query(`UPDATE employee SET role_id = ${newRole_id} WHERE employee.id = ${empID}`)
    console.log('Employee Role Updated!');
    startApp();
})
})
}
//the three different view commands logging correct table 
    const viewALL = () => {
        db.query('SELECT * FROM employee', function (err, results) {
        console.table(results)
        startApp()
      });
}
    const viewDepts = () => {
        db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        startApp()
      });
}
    const viewRole = () => {
        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
            startApp()
      });
}
    
    startApp()