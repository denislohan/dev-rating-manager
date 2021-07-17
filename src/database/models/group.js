/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
    manager: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    engineers: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  }, {});
  group.associate = (models) => {
    group.belongsTo(models.user, {
      foreignKey: 'manager',
      onDelete: 'CASCADE',
    });
  };
  return group;
};
