const DataTypes = require("sequelize");
const { Model } = DataTypes;

// 아티스트 필모그래피
module.exports = class ArtistFilm extends Model {
  static init(sequelize) {
    return super.init(
      {
        roleName: {
          type: DataTypes.STRING(50), // 역할
          allowNull: false,
        },
        comment: {
          type: DataTypes.STRING(300), // comment
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50), // 가수명
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(50), // 곡 제목
          allowNull: false,
        },
        musicFile: {
          type: DataTypes.STRING(600), // 음원
          allowNull: false,
        },
        coverImage: {
          type: DataTypes.STRING(600), // 앨범 커버 이미지
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER, // 순서
          allowNull: false,
        },
      },
      {
        modelName: "ArtistFilm",
        tableName: "artistFilm",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ArtistFilm.belongsTo(db.Artist);
  }
};
