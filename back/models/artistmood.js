const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ArtistMood extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          // 장르명
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "ArtistMood",
        tableName: "artistMood",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ArtistMood.belongsTo(db.Artist);
  }
};
