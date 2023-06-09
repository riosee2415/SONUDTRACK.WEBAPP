const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class AlbumHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "AlbumHistory",
        tableName: "albumHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
