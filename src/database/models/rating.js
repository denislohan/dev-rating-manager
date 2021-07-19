/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    trainee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    quality: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    initiative: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    communication: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    professionalism: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    integration: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {});
  rating.associate = (models) => {
    rating.belongsTo(models.user, {
      foreignKey: 'trainee',
      onDelete: 'CASCADE',
    });
  };
  return rating;
};
