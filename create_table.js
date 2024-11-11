const db = require('./db_config');

const sql = `CREATE TABLE buku (
    id INT NOT NULL AUTO_INCREMENT,
    judul VARCHAR(225),
    pengarang VARCHAR(225),
    NIM INT,
    alamat VARCHAR(225),
    PRIMARY KEY (id)
)`;

db.query(sql, function(error, result) {
    if (error) throw error;
    console.log("Tabel 'buku' berhasil dibuat atau sudah ada.");
});
