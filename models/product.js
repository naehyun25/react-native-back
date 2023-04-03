module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(30), //문자로
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    subimageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    subbimageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    subbbimageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    option: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    soldout: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 0,
    },
  });
  return product;
};
