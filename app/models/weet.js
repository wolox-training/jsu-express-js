module.exports = (sequelize, DataTypes) => {
  const weet = sequelize.define('Weet', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    }
  });
  return weet;
};
