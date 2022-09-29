const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'YOUR_USER_NAME',
        password: 'YOUR_PASS_WORD',
        database: 'employee_db'
    },
    console.log(`Connected to the courses_db database.`)
);

module.exports = { db };