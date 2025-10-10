
const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'buktiin',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
.then(connection => {
    console.log('DB connected successfully');
    connection.release();
})
.catch(err => {
    console.error('DB Error', err.message)
})

module.exports = pool;
