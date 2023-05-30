const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ArtistTag extends Model {
  static init(sequelize) {
    return super.init(
      {
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "ArtistTag",
        tableName: "artistTag",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ArtistTag.belongsTo(db.Artistem);
    db.ArtistTag.belongsTo(db.TagType);
    db.ArtistTag.belongsTo(db.Tag);
  }
};
