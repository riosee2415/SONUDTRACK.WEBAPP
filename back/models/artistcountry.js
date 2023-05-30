const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ArtistCountry extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER,
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
    db.ArtistCountry.belongsTo(db.Artistem);
  }
};
