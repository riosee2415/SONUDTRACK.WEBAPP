const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Artistem extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          // 상품명
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        subTitle: {
          // 부제
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        content: {
          // 상품한줄설명
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        coverImage: {
          // 상품 커버 이미지
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        isIng: {
          // 판매여부
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        downloadCnt: {
          // 다운로드 수
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        bitRate: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        sampleRate: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        isTop: {
          // 상단고정
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Artistem",
        tableName: "artistem",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Artistem.belongsTo(db.Artist);
  }
};
