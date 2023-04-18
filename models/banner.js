module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define("Review", {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      desc: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    });
    return review;
  };
    