const mysql = require('mysql2')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'data_sp32'
})

db.connect(function(error) {
    if(error) {
        console.error(error);
    } else {
        console.info('Connected to database')
    }
})

module.exports = db;