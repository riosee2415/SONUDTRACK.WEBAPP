const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class AlbumTag extends Model {
  static init(sequelize) {
    return super.init(
      {
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "AlbumTag",
        tableName: "albumTag",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.AlbumTag.belongsTo(db.Album);
    db.AlbumTag.belongsTo(db.TagType);
    db.AlbumTag.belongsTo(db.Tag);
  }
};
