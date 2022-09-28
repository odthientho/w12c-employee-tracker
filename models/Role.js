const { db } = require("./connection");
const tablePrint = require("console.table");
const department = require("./Department");

let roles = [];
class Role {

    static {
        this.updateAll();
    }

    static updateAll() {
        db.query("SELECT role.id, role.title, role.salary, department.name FROM role JOIN department where role.department_id = department.id ORDER BY id ASC;",
            null, (error, result) => {
            if (error) console.log("Error: Select Role.");
            else roles = result;
        });
    }
    
    static get() {
        return roles.map((aRole) => aRole.title);
    }

    static getId(title) {
        return roles.find((aRole) => aRole.title == title).id;
    }

    static view() {
        console.table(roles);
    }
    
    static add(title, salary, depName) {
        db.query("INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);", 
            [title, salary, department.getId(depName)], (error, result) => {
                if (error) console.log("Error: Insert Into Table.");
                else {
                    console.log("Role Added: " + title);
                    this.updateAll();
                }
        });
    }

    static delete(title) {
        db.query("DELETE FROM role WHERE title = ?;", title, (error, result) => {
            if (error) console.log("Error: Delete Table.");
            else {
                console.log("Role Deleted: " + title);
                this.updateAll();
            }
        });
    }
}

module.exports = Role;