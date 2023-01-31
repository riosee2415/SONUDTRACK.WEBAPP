const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserLike extends Model {
  static init(sequelize) {
    return super.init(
      {
        ProductId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        ProductTrackId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        ArtistemId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "UserLike",
        tableName: "userLike",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserLike.belongsTo(db.User);
  }
};
