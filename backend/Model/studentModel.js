const { DataTypes } = require('sequelize');
const { selectDatabase } = require('./databaseHandler');
const User = require('./userModel'); 

// Select the appropriate database
const sequelize = selectDatabase(process.env.DB_TYPE);

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'students',
});

Student.belongsTo(User, { foreignKey: 'userId' });

module.exports = Student;
