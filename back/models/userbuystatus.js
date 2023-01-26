const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserBuyStatus extends Model {
  static init(sequelize) {
    return super.init(
      {
        ArtistemId: {
          type: DataTypes.INTEGER, // 아티스탬 아이디
          allowNull: true,
        },
        ProductTrackId: {
          type: DataTypes.INTEGER, // 뮤직탬 아이디
          allowNull: true,
        },
      },
      {
        modelName: "UserBuyStatus",
        tableName: "userBuyStatus",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserBuyStatus.belongsTo(db.User);
  }
};
