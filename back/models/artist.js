const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Artist extends Model {
  static init(sequelize) {
    return super.init(
      {
        plan: {
          // 계획
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        gen: {
          // 역할 및 장르
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        isPermm: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        permmAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(50), // 담당자명
          allowNull: true,
        },
        businessNum: {
          type: DataTypes.STRING(50), // 사업자번호
          allowNull: true,
        },
        artistname: {
          type: DataTypes.STRING(50), // 아티스트명
          allowNull: true,
        },
        info: {
          type: DataTypes.STRING(200), // 아티스트를 소개하는 한마디
          allowNull: true,
        },
        question1: {
          type: DataTypes.TEXT, // 주로 하는 역할(기술)과 장르는 무엇인가요?
          allowNull: true,
        },
        question2: {
          type: DataTypes.TEXT, // 보통의 작업 시간은 몇일인가요?
          allowNull: true,
        },
        question3: {
          type: DataTypes.TEXT, // 녹음 환경과 장비는 무엇을 사용하나요?
          allowNull: true,
        },
        question4: {
          type: DataTypes.TEXT, // 평균 비용은 어떻게 되나요?
          allowNull: true,
        },
        question5: {
          type: DataTypes.TEXT, // 만약 작업한 프로젝트가 정식 음원이 출판되거나, 광고나 라이브러리등의 상업적인 용도로 사용된다면 크레딧이 필요한가요?
          allowNull: true,
        },
        question6: {
          type: DataTypes.TEXT, // 어떤 뮤지션을 좋아하고, 어떤 음악을 추구하나요?
          allowNull: true,
        },
        question7: {
          type: DataTypes.TEXT, // 이 일을 한지는 얼마나 되었고, 보통 어떤 작업을 하나요?
          allowNull: true,
        },
        question8: {
          type: DataTypes.TEXT, // 그 외 하고싶은 말이 있나요?
          allowNull: true,
        },
        isVacation: {
          type: DataTypes.BOOLEAN, // 휴가중 여부
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Artist",
        tableName: "artist",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Artist.belongsTo(db.User);
  }
};
