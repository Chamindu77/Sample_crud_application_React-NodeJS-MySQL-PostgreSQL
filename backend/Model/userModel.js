const { DataTypes } = require('sequelize');
const { selectDatabase } = require('./databaseHandler');

// Select the appropriate database
const sequelize = selectDatabase(process.env.DB_TYPE);

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8],
    },
  },
  token: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
});

module.exports = User;



// const { DataTypes } = require('sequelize');
// const { selectDatabase } = require('./databaseHandler');

// // Select the appropriate database
// const sequelize = selectDatabase(process.env.DB_TYPE); 

// const User = sequelize.define('User', {
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   lastName: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       len: [8],
//     },
//   },
//   token: {
//     type: DataTypes.STRING,
//   },
// }, {
//   tableName: 'users',
// });

// module.exports = User;
