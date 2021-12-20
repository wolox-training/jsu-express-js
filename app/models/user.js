const roles = require('../constants/roles');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        // eslint-disable-next-line
        type: DataTypes.ENUM(roles.REGULAR_USER, roles.ADMIN_USER),
        defaultValue: roles.REGULAR_USER
      }
    },
    {
      timestamps: true,
      tableName: 'users',
      underscored: true
    }
  );

  return User;
};
