const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class WishItem extends Model {
  static init(sequelize) {
    return super.init(
      {
        thumbnail: {
          type: DataTypes.STRING(600), // 썸네일
          allowNull: false,
        },
        albumName: {
          type: DataTypes.STRING(100), // 앨범제목
          allowNull: false,
        },
        songName: {
          type: DataTypes.STRING(300), // 곡 제목
          allowNull: false,
        },
        singerName: {
          type: DataTypes.STRING(100), // 가수명
          allowNull: false,
        },
        lisenceName: {
          type: DataTypes.STRING(100), // 라이센스 명
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER, // 가격
          allowNull: false,
        },
        songFile: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        songFileName: {
          type: DataTypes.STRING(2000),
          allowNull: false,
        },
        trackId: {
          type: DataTypes.INTEGER, // 트랙 아이디 값
          allowNull: true,
        },
        isArtWorks: {
          type: DataTypes.BOOLEAN, // 아트웍스 상품 여부
          allowNull: false,
          defaultValue: false,
        },
        isMonopoly: {
          type: DataTypes.BOOLEAN, // 독점 여부 (isArtWorks가 true일 때 사용됩니다.)
          allowNull: false,
          defaultValue: false,
        },
        ticketName: {
          type: DataTypes.STRING(50), // 이용권 명 (Pro, Semi-Pro isArtWorks가 true일 때 사용됩니다.)
          allowNull: true,
        },
        BoughtHistoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "WishItem",
        tableName: "wishItem",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.WishItem.belongsTo(db.WishList);
  }
};
