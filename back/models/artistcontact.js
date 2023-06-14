const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ArtistContact extends Model {
  static init(sequelize) {
    return super.init(
      {
        // 마감일
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        // 상품 총 금액
        totalPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        // 발신자 메세지 내용
        sendMessage: {
          type: DataTypes.TEXT,
          allowNull: false, // 필수
        },

        // 레퍼런스 음악
        filename: {
          type: DataTypes.STRING(2000),
          allowNull: false,
        },
        filepath: {
          type: DataTypes.STRING(2000),
          allowNull: false,
        },

        // 승인
        isOk: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        // 승인 시 제작자의 의견
        okMessage: {
          type: DataTypes.STRING(3000),
          allowNull: true,
        },

        // 결제완료
        isPay: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        // 결제 금액
        payPrice: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },

        // 사용 포인트 금액
        usePointPrice: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
          defaultValue: 0,
        },

        // 결제 방법
        payWay: {
          type: DataTypes.STRING(40),
          allowNull: true, // 필수
        },

        // 결제일자
        payDate: {
          type: DataTypes.DATE,
          allowNull: true, // 필수
        },

        // 결제 카드 정보
        payCardInfo: {
          type: DataTypes.STRING(100),
          allowNull: true, // 필수
        },

        // 아임포트 정보
        impUid: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },

        merchantUid: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },

        // 제작완료
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        // 거절
        isReject: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        // 거절 사유
        rejectMessage: {
          type: DataTypes.STRING(3000),
          allowNull: true,
        },

        // 완성본 음악
        completedFilename: {
          type: DataTypes.STRING(2000),
          allowNull: true,
        },

        completedFilepath: {
          type: DataTypes.STRING(2000),
          allowNull: true,
        },

        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "ArtistContact",
        tableName: "artistContact",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    // 발신자
    db.ArtistContact.belongsTo(db.User);
    // 수신자 아티스트 정보
    db.ArtistContact.belongsTo(db.Artistem);
  }
};
