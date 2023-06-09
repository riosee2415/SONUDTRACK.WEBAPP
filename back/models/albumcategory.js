const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class AlbumCategory extends Model {
  static init(sequelize) {
    return super.init(
      {
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "AlbumCategory",
        tableName: "albumCategory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.AlbumCategory.belongsTo(db.Album);
    db.AlbumCategory.belongsTo(db.CateType);
    db.AlbumCategory.belongsTo(db.Category);
  }
};
