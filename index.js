const inquirer = require('inquirer');
const department = require("./models/Department");
const role = require("./models/Role");

const prompt = inquirer.createPromptModule();

const actions = [{
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [  'View All Departments', 
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
            var roleName = await prompt([{
                type: "input",
                name: "name",
                message: "Please enter the name of role."
            }]);
            role.add(roleName.name);
            break;
        case "Delete A Role":
            var roleName = await prompt([{
                type: "list",
                name: "name",
                message: "Please pick the role you want to delete.",
                choices: role.get()
            }]);
            role.delete(roleName.name);
            break;
        case "View All Departments":
            department.view();
            break;
        case "Add A Department":
            var depName = await prompt([{
                type: "input",
                name: "name",
                message: "Please enter the name of department."
            }]);
            department.add(depName.name);
            break;
        case "Delete A Department":
            var depName = await prompt([{
                type: "list",
                name: "name",
                message: "Please pick the department you want to delete.",
                choices: department.get()
            }]);
            department.delete(depName.name);
            break;
    }

    if (answer.action == "Quit") return;
    
    setTimeout(() => promptActions(), 15);
}