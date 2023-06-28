const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserPoint extends Model {
  static init(sequelize) {
    return super.init(
      {
        pointType: {
          type: DataTypes.STRING(30), // 포인트 유형 [적립 / 사용]
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(50), // 포인트 유형 [Artisttem / Musictem]
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(1000), //  아티스트명/앨범명/곡명
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "UserPoint",
        tableName: "userPoint",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserPoint.belongsTo(db.User);
  }
};
