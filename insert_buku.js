const db = require('./db_config');

const sql = `INSERT INTO buku (judul, pengarang, NIM, alamat) VALUES ?`;

const values = [
    ['dasar backend', 'nafis', '1123102133', 'sempu'],
    ['pemograman lanjut', 'yeni', '1123102122', 'bangorejo'],
    ['data sraping', 'giska', '1123102144', 'banyuwangi'],
];

db.query(sql, [values], function(error, result) {
    if (error) throw error;
    console.log(`${result.affectedRows} data berhasil di tambahkan`);

});