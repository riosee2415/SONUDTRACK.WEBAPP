const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 아티스트 사용가능한 언어 / 국가
module.exports = class ArtistCountry extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          // 사용 가능한 언어 / 국가
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "ArtistCountry",
        tableName: "artistCountry",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ArtistCountry.belongsTo(db.Artist);
  }
};
