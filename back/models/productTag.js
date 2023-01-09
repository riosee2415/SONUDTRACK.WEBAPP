const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductTag extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          // 테그명
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "ProductTag",
        tableName: "productTag",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductTag.belongsTo(db.Product);
  }
};
