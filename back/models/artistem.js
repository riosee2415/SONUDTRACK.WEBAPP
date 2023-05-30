const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Artistem extends Model {
  static init(sequelize) {
    return super.init(
      {
        isVacation: {
          type: DataTypes.BOOLEAN, // 휴가중 여부
          allowNull: false,
          defaultValue: false,
        },
        name: {
          type: DataTypes.STRING(100), // 담당자명
          allowNull: true,
        },
        companyNo: {
          type: DataTypes.STRING(100), // 사업자번호
          allowNull: true,
        },
        artistName: {
          type: DataTypes.STRING(100), // 아티스트명
          allowNull: true,
        },
        artistProfileImage: {
          type: DataTypes.STRING(600), // 아티스트 프로필 이미지
          allowNull: true,
        },
        artistInfo: {
          type: DataTypes.STRING(500), // 아티스트 소개 한마디
          allowNull: true,
        },
        question1: {
          type: DataTypes.TEXT, // 주로하는 역할 장르
          allowNull: true,
        },
        question2: {
          type: DataTypes.TEXT, // 보통 작업시간
          allowNull: true,
        },
        question3: {
          type: DataTypes.TEXT, // 녹음 환경과 장비
          allowNull: true,
        },
        question4: {
          type: DataTypes.TEXT, // 평균 비용
          allowNull: true,
        },
        question5: {
          type: DataTypes.TEXT, // 작업한 프로젝트 정식음원
          allowNull: true,
        },
        question6: {
          type: DataTypes.TEXT, // 좋아하는 뮤지션
          allowNull: true,
        },
        question7: {
          type: DataTypes.TEXT, // 경력
          allowNull: true,
        },
        question8: {
          type: DataTypes.TEXT, // 그외 하고 싶은말
          allowNull: true,
        },
        repMusicFile: {
          type: DataTypes.STRING(600), // 대표 음악 파일주소
          allowNull: true,
        },
        repMusicFilename: {
          type: DataTypes.TEXT, // 대표 음악 파일명
          allowNull: true,
        },
        isUpdate: {
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
    db.Artistem.belongsTo(db.User);
  }
};
