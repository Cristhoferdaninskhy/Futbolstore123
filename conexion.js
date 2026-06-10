const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'acela.proxy.rlwy.net',
    user: 'root',
    password: 'KFQSkdmsiIKOsaqdjzKCMjqdOaHTFWSd',
    database: 'railway',
    port: 37243
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