let db = require('./db_config')

const sql = 'CREATE DATABASE data_sp32'
db.query(sql, function(error, result) {
    if (error) throw error;
    console.log('Database Berhasil dibuat')
})