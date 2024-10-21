const { Sequelize } = require('sequelize');
require('dotenv').config();

// MySQL connection setup
const mysqlSequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,   
  process.env.MYSQL_DB_USER,   
  process.env.MYSQL_DB_PASSWORD,   
  {
    host: process.env.MYSQL_DB_HOST,   
    dialect: 'mysql',   // MySQL dialect
    port: process.env.MYSQL_DB_PORT || 3306,   // MySQL port (default 3306)
    logging: false,   // Optional: disable logging for cleaner output
  }
);

// PostgreSQL connection setup
const postgresSequelize = new Sequelize(
  process.env.POSTGRES_DB_NAME,   
  process.env.POSTGRES_DB_USER,   
  process.env.POSTGRES_DB_PASSWORD,   
  {
    host: process.env.POSTGRES_DB_HOST,   
    dialect: 'postgres',   // PostgreSQL dialect
    port: process.env.POSTGRES_DB_PORT || 5432,   // PostgreSQL port (default 5432)
    logging: false,   // Optional: disable logging for cleaner output
  }
);

// Test MySQL connection
mysqlSequelize.authenticate()
  .then(() => {
    console.log('MySQL connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL:', err);
  });

  

// Test PostgreSQL connection
postgresSequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to PostgreSQL:', err);
  });

module.exports = { mysqlSequelize, postgresSequelize };
