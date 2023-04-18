module.exports = (sequelize, DataTypes) => {
    const banner = sequelize.define("banner", {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      imgUrl: {
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
    