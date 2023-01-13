const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ArtistRequestFile extends Model {
  static init(sequelize) {
    return super.init(
      {
        filename: {
          // 장르명
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        filepath: {
          // 장르명
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
      },
      {
        modelName: "ArtistRequestFile",
        tableName: "artistRequestFile",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ArtistRequestFile.belongsTo(db.Artist);
  }
};
