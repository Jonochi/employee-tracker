const mysql = require("mysql2");
const inquirer = require("inquirer");

// import mysql from "mysql2";
// import inquirer from "inquirer";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "24601root",
    database: "employee_db"
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all deptartments",
                "View all employees",
                "View all roles",
                "Add a department",
                "Add an employee",
                "Add a role",
                "Update employee role",
                "Quit"
            ],
        }).then(function (answer) {
            switch (answer.action) {
                case "View all deptartments":
                    viewDepts();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "Add a department":
                    addDept();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "Quit":
                    connection.end();
                    break;
                default:
                    break;
            }
        });
};

const viewDepts = () => {
    let query = "SELECT * FROM department";

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewRoles = () => {
    let query = "SELECT role.title, role.salary, role.id, department.name from role RIGHT JOIN department ON role.department_id = department.id";

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const viewEmployees = () => {
    let query = "SELECT t1.first_name, t1.last_name, t1.role_id, t2.first_name AS manager FROM employee t1 INNER JOIN employee t2 ON t1.manager_id = t2.id";

    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res);
        start();
    })
}

const addEmployee = () => {

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "New employee's first name: "
            },
            {
                name: "lastName",
                type: "input",
                message: "New employee's last name: "
            },
            {
                name: "managerId",
                type: "input",
                message: "New employee's Manager ID: "
            },
            {
                name: "addRole",
                type: "list",
                choices: function () {
                    return res.map((role) => ({ name: role.title, value: role.id }))
                },
                message: "New employee's role: "
            },
        ]).then(function (answer) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    manager_id: answer.managerId,
                    role_id: answer.addRole,
                }),
                start();
        });
    });
}

// const addRole = () => {

//     connection.query("SELECT * FROM role", function (err, res) {
//         if (err) throw (err);
//         inquirer.prompt([
//             {
//                 name: "newRole",
//                 type: "input",
//                 message: "New role title: "
//             },
//             {
//                 name: "salary",
//                 type: "input",
//                 message: "New role salary: "
//             },
            
//         ]).then(function (answer) {
//             connection.query("INSERT INTO role SET ?",
//                 {
//                     title: answer.newRole,
//                     salary: answer.salary,
//                 }),
//                 start();
//         });
//     });
// }

const updateEmployeeRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err);
        inquirer
            .prompt([
                {
                    name: "employeeId",
                    type: "input",
                    message: "employee Id?",
                },
                {
                    name: "updatedRole",
                    type: "list",
                    choices: function () {
                        return res.map((role) => ({ name: role.title, value: role.id }));
                    },
                    message: "Employee's new role?",
                },
            ])
            .then(function (answer) {
                console.log(answer.updatedRole);
                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        { role_id: answer.updatedRole },
                        { id: answer.employeeId }
                    ]);
                    start();
            });
    });
};

start();