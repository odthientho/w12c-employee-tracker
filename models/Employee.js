const { db } = require("./connection");
const tablePrint = require("console.table");
const role = require("./Role");
let employees = [];

class Employee {

    static {
        this.updateAll();
    }

    static updateAll() {
        db.query("select emp.id, emp.first_name, emp.last_name, rol.title, rol.department, rol.salary, emp.manager from (select e.id, e.first_name, e.last_name, e.role_id, concat(m.first_name,' ', m.last_name) as manager from employee e left join employee m on e.manager_id = m.id) emp join 	(select role.id, role.title, role.salary, department.name as department from role join department on role.department_id = department.id) rol on emp.role_id = rol.id ORDER by id ASC;",
            null, (error, result) => {
            if (error) console.log("Error: Select Role.");
            else employees = result;
        });
    }

    static get() {
        return employees.map((anEmployee) => anEmployee.first_name+" "+anEmployee.last_name);
    }

    static getId(name) {
        return employees.find((anEmp) => (anEmp.first_name+" "+anEmp.last_name) == name).id;
    }

    static view() {
        console.table(employees);
    }
    
    static add(firstName, lastName, roleTitle, managerName) {
        var managerId = null;
        if (managerName != "None") managerId = this.getId(managerName);
        db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", 
        [firstName, lastName, role.getId(roleTitle), managerId], (error, result) => {
            if (error) console.log("Error: Insert Into Table.");
            else {
                console.log("Employee Added: " + firstName + " " + lastName);
                this.updateAll();
            }
        });
    }

    static updateRole(name, roleTitle) {
        db.query("UPDATE employee SET role_id = ? WHERE id = ?;", [role.getId(roleTitle), this.getId(name)], (error, results) => {
            if (error) console.log("Error: Update Table.");
            else {
                console.log(name + "'s role updated: " + roleTitle);
                this.updateAll();
            }
        });
    }

    static delete(name) {
        db.query("DELETE FROM employee WHERE id = ?;", this.getId(name), (error, result) => {
            if (error) console.log("Error: Delete Table.");
            else {
                console.log("Employee Deleted: " + name);
                this.updateAll();
            }
        });
    }

    static updateManager(name, manager) {
        db.query("UPDATE employee SET manager_id = ? WHERE id = ?;", [this.getId(manager), this.getId(name)], (error, results) => {
            if (error) console.log("Error: Update Table.");
            else {
                console.log(name + "'s manager updated: " + manager);
                this.updateAll();
            }
        });
    }

    static getManager() {
        return employees.filter((anEmployee) => anEmployee.manager !== null).map((col) => col.manager);
    }

    static viewByManager(manager) {
        console.table(employees.filter((anEmployee) => anEmployee.manager == manager));
    }

    static viewByDepartment(department) {
        console.table(employees.filter((anEmployee) => anEmployee.department == department));
    }

    static viewBudget(department) {
        let totalBudget = 0;
        employees.filter((anEmployee) => anEmployee.department == department).forEach((anEmployee) => totalBudget += parseInt(anEmployee.salary));
        console.log(totalBudget);
    }
}

module.exports = Employee;