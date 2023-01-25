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

        // 승인
        isOk: {
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
    // 수신저
    db.BuyRequest.belongsTo(db.User, { as: "receptionUser" });
  }
};
