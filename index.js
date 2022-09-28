const inquirer = require('inquirer');
const department = require("./models/Department");
const employee = require("./models/Employee")
const role = require("./models/Role");

const prompt = inquirer.createPromptModule();

const actions = [{
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [  'View All Employees',
                'Add An Employee',
                'Update Employee Role',
                'Delete An Employee',
                'View All Roles',
                "Add A Role", 
                "Delete A Role", 
                'View All Departments', 
                "Add A Department", 
                "Delete A Department",
                "Update Employee Managers",
                "View Employees By Manager",
                "View Employees By Department",
                "View Total Utilized Budget Of A Department",
                "Quit"
            ]
}];

// to start the application:
promptActions();
async function promptActions() {
    let answer = await prompt(actions);

    switch(answer.action) {
        case "View All Employees":
            employee.view();
            break;
            
        case "Add An Employee":
            var addingEmployee = await prompt([{
                type: "input",
                name: "firstName",
                message: "Please enter first name of the employee."
            },{
                type: "input",
                name: "lastName",
                message: "Please enter last name of the employee."
            }, {
                type: "list",
                name: "role",
                message: "Please pick the role that the employee belongs to.",
                choices: role.get()
            }, {
                type: "list",
                name: "manager",
                message: "Please pick the manager for that employee.",
                choices: ["None", ...employee.get()]
            }]);
            employee.add(addingEmployee.firstName, addingEmployee.lastName, addingEmployee.role, addingEmployee.manager);
            break;

        case "Update Employee Role":
            var updatingEmployee = await prompt([{
                type: "list",
                name: "name",
                message: "Please pick the employee you want to update role.",
                choices: employee.get()
            },{
                type: "list",
                name: "role",
                message: "Please pick the role that the employee belongs to.",
                choices: role.get()
            }]);
            employee.updateRole(updatingEmployee.name, updatingEmployee.role);
            break;

        case "Delete An Employee":
            var deletingEmployee = await prompt([{
                type: "list",
                name: "name",
                message: "Please pick the employee you want to delete.",
                choices: employee.get()
            }]);
            employee.delete(deletingEmployee.name);
            break;

        case "View All Roles":
            role.view();
            break;

        case "Add A Role":
            var addingRole = await prompt([{
                type: "input",
                name: "title",
                message: "Please enter the title of the role."
            }, {
                type: "input",
                name: "salary",
                message: "Please enter the salary of the role."
            }, {
                type: "list",
                name: "department",
                message: "Please pick the department that the role belongs to.",
                choices: department.get()
            }]);
            role.add(addingRole.title, addingRole.salary, addingRole.department);
            break;

        case "Delete A Role":
            var deletingRole = await prompt([{
                type: "list",
                name: "name",
                message: "Please pick the role you want to delete.",
                choices: role.get()
            }]);
            role.delete(deletingRole.name);
            break;

        case "View All Departments":
            department.view();
            break;

        case "Add A Department":
            var addingDep = await prompt([{
                type: "input",
                name: "name",
                message: "Please enter the name of department."
            }]);
            department.add(addingDep.name);
            break;

        case "Delete A Department":
            var deletingDep = await prompt([{
                type: "list",
                name: "name",
                message: "Please pick the department you want to delete.",
                choices: department.get()
            }]);
            department.delete(deletingDep.name);
            break;

        case "Update Employee Managers":
            var updatingEmployee = await prompt([{
                type: "list",
                name: "name",
                message: "Please pick the employee you want to update manager.",
                choices: employee.get()
            }, {
                type: "list",
                name: "manager",
                message: "Please pick a new manager.",
                choices: employee.get()
            }])
            employee.updateManager(updatingEmployee.name, updatingEmployee.manager);
            break;

        case "View Employees By Manager":
            var managerChoice = await prompt([{
                type: "list",
                name: "manager",
                message: "Please pick a manager.",
                choices: employee.getManager()
            }]);
            employee.viewByManager(managerChoice.manager);
            break;

        case "View Employees By Department":
            var depChoice = await prompt([{
                type: "list",
                name: "department",
                message: "Please pick a department.",
                choices: department.get()
            }]);
            employee.viewByDepartment(depChoice.department);
            break;

        case "View Total Utilized Budget Of A Department":
            var depChoice = await prompt([{
                type: "list",
                name: "department",
                message: "Please pick a department.",
                choices: department.get()
            }]);
            employee.viewBudget(depChoice.department);
            break;
    }

    if (answer.action == "Quit") process.exit(0);
    
    setTimeout(() => promptActions(), 15);
}