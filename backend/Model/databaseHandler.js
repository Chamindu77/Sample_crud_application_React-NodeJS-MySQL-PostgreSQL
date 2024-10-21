const { mysqlSequelize, postgresSequelize } = require('../Config/database');

// Dynamic DB selector function
function selectDatabase(dbType) {
  if (dbType === 'mysql') {
    return mysqlSequelize;  // Return MySQL connection handler
  } else if (dbType === 'postgresql') {
    return postgresSequelize;  // Return PostgreSQL connection handler
  } else {
    throw new Error('Invalid database type');
  }
}

module.exports = { selectDatabase };
