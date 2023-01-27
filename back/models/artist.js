const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Artist extends Model {
  static init(sequelize) {
    return super.init(
      {
        plan: {
          // 계획
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        gen: {
          // 역할 및 장르
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        isPermm: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        permmAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        imagePath: {
          type: DataTypes.STRING(3000),
          allowNull: false,
          default: "",
        },
      },
      {
        modelName: "Artist",
        tableName: "artist",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Artist.belongsTo(db.User);
  }
};
