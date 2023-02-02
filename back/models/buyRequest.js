const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BuyRequest extends Model {
  static init(sequelize) {
    return super.init(
      {
        // 발신자 메세지 내용
        sendMessage: {
          type: DataTypes.STRING(3000),
          allowNull: false, // 필수
        },

        // 상품 총 금액
        totalPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        // 승인
        isOk: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        // 결제완료
        isPay: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        // 결제 방법
        payWay: {
          type: DataTypes.STRING(40),
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
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        // 레퍼런스 음악
        filename: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        filepath: {
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        // 완성본 음악
        completedFilename: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        completedFilepath: {
          type: DataTypes.STRING(3000),
          allowNull: true,
        },
      },
      {
        modelName: "BuyRequest",
        tableName: "buyRequest",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    // 발신자
    db.BuyRequest.belongsTo(db.User, { as: "sendUser" });
    // 수신자 아티스트 탬
    db.BuyRequest.belongsTo(db.Artistem, { as: "artistem" });
  }
};
