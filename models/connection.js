const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Abc@1234',
        database: 'employee_db'
    },
    console.log(`Connected to the courses_db database.`)
);

module.exports = { db };