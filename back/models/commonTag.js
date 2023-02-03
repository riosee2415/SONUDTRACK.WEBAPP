const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class CommonTag extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          // 테그명
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        type: {
          // 태그 종류 Ex) Mood, Genre, 카테고리 등등
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        modelName: "CommonTag",
        tableName: "commonTag",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
