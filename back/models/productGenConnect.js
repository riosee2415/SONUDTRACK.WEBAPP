const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductGenConnect extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "ProductGenConnect",
        tableName: "productGenConnect",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductGenConnect.belongsTo(db.ProductGen);
    db.ProductGenConnect.belongsTo(db.Product);
  }
};
