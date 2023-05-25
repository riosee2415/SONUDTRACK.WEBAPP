const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        modelName: "Category",
        tableName: "category",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Category.belongsTo(db.CateType);
  }
};
