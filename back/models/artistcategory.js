const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ArtistCategory extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        modelName: "ArtistCategory",
        tableName: "artistCategory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ArtistCategory.belongsTo(db.Artistem);
  }
};
