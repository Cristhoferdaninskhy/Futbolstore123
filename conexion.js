const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '050821',
    database: 'FutbolStore',
    port: 3306
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado a MySQL');
        connection.release();
    } catch (error) {
        console.error('Error al conectar:', error);
    }
})();

module.exports = pool;