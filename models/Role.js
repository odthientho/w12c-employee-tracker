const { db } = require("./connection");
const tablePrint = require("console.table");
let roles = [];

class Department {

    static {
        this.updateAll();
    }

    static updateAll() {
        db.query("SELECT * FROM role;", null, (error, result) => {
            if (error) console.log("Error: Select Role.");
            else roles = result;
        });
    }
    
    static get() {
        return roles.map((aRole) => aRole.name);
    }

    static view() {
        console.table(roles);
    }
    
    static add(name) {
        db.query("INSERT INTO role(name) VALUES (?);", name, (error, result) => {
            if (error) console.log("Error: Insert Into Table.");
            else {
                console.log("Department Added: " + name);
                this.updateAll();
            }

        });
    }

    static delete(name) {
        db.query("DELETE FROM department WHERE name = ?;", name, (error, result) => {
            if (error) console.log("Error: Delete Table.");
            else {
                console.log("Department Deleted: " + name);
                this.updateAll();
            }
        });
    }
}

module.exports = Department;