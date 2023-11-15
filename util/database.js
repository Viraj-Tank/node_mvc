const Sequelize = require('sequelize');

// const sequelize = new Sequalize(
//     'node_mvc',
//     'root',
//     '12345678', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

const sequelize = new Sequelize('node_mvc', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sequelize;

/**
 * const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_mvc',
    password: '12345678'
})

// we export promise here so we can then at the receiver side (check app.js file)
module.exports = pool.promise();
*/