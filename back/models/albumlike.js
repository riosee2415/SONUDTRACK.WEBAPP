const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class AlbumLike extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "AlbumLike",
        tableName: "albumLike",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.AlbumLike.belongsTo(db.Album);
    db.AlbumLike.belongsTo(db.User);
  }
};
