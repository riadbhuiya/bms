// Get the client
import mysql from 'mysql2/promise';
// import dotenv from "dotenv";

// dotenv.config();

// console.log('MySQL Host:', process.env.MYSQL_HOST);

// Create the connection to database
// export const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'shop',
// });

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    // password: 'process.env.MYSQL_PASSWORD',
    database: 'bms',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });