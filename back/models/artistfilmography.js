const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ArtistFilmography extends Model {
  static init(sequelize) {
    return super.init(
      {
        part: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        singerName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        songName: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        filename: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        filePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        imagePathName: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "ArtistFilmography",
        tableName: "artistFilmography",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ArtistFilmography.belongsTo(db.Artistem);
  }
};
