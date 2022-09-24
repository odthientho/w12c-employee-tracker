const inquirer = require('inquirer');
const { add } = require('./models/Department');
const department = require("./models/Department");
const role = require("./models/Role");

const prompt = inquirer.createPromptModule();

const actions = [{
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [  'View All Roles', 
                "Add A Role", 
                "Delete A Role", 
                'View All Departments', 
                "Add A Department", 
                "Delete A Department", 
                "Quit"
            ]
}];

// to start the application:
promptActions();
async function promptActions() {
    let answer = await prompt(actions);

    switch(answer.action) {
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
    }

    if (answer.action == "Quit") return;
    
    setTimeout(() => promptActions(), 15);
}