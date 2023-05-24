const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class CateType extends Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: DataTypes.STRING(30),
          allowNull: false, //필수
          validate: {
            isIn: [["아티스템, 뮤직템"]],
          },
        },
      },
      {
        modelName: "CateType",
        tableName: "cateType",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
