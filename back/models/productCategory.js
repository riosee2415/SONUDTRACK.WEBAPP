const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductCategory extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          // 상품명
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        isDelete: {
          // 판매여부
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          // 판매여부
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "ProductCategory",
        tableName: "productCategory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
