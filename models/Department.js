const { db } = require("./connection");
const tablePrint = require("console.table");
let departments = [];

class Department {

    static {
        this.updateAll();
    }

    static updateAll() {
        db.query("SELECT * FROM department;", null, (error, result) => {
            if (error) console.log("Error: Select Table.");
            else departments = result;
        });
    }

    static getId(name) {
        return departments.find((aDep) => aDep.name == name).id;
    }
    
    static get() {
        return departments.map((aDep) => aDep.name);
    }

    static view() {
        console.table(departments);
    }
    
    static add(name) {
        db.query("INSERT INTO department(name) VALUES (?);", name, (error, result) => {
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