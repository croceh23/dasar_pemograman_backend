const http = require('http');
const db = require('./db_config');

async function getBuku() {
    const sql = 'SELECT * FROM buku';
    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function tambahBuku(buku) {
    const sql = 'INSERT INTO buku (judul, pengarang, NIM, alamat) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [buku.judul, buku.pengarang, buku.NIM, buku.alamat], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function perbaruiBuku(id, buku) {
    const sql = 'UPDATE buku SET judul = ?, pengarang = ?, NIM = ?, alamat = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [buku.judul, buku.pengarang, buku.NIM, buku.alamat, id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function hapusBuku(id) {
    const sql = 'DELETE FROM buku WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/buku' && req.method === 'GET') {
        try {
            const buku = await getBuku();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(buku));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Kesalahan saat mengambil data' }));
        }
    } else if (req.url === '/api/buku' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const buku = JSON.parse(body);
                const result = await tambahBuku(buku);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Buku ditambahkan', id: result.insertId }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Kesalahan saat menambahkan buku' }));
            }
        });
    } else if (req.url.startsWith('/api/buku/') && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const buku = JSON.parse(body);
                const result = await perbaruiBuku(id, buku);
                if (result.affectedRows === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Buku tidak ditemukan' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Buku diperbarui' }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Kesalahan saat memperbarui buku' }));
            }
        });
    } else if (req.url.startsWith('/api/buku/') && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        try {
            const result = await hapusBuku(id);
            if (result.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Buku tidak ditemukan' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Buku dihapus' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Kesalahan saat menghapus buku' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Endpoint tidak ditemukan' }));
    }
});

server.listen(3000, () => {
    console.log('Server berjalan pada http://127.0.0.1:3000/');
});
