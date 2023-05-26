const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Seller extends Model {
  static init(sequelize) {
    return super.init(
      {
        isMusictem: {
          type: DataTypes.BOOLEAN, // 뮤직탬 여부
          allowNull: false,
          defaultValue: false,
        },
        isArtistem: {
          type: DataTypes.BOOLEAN, // 아티스탬 여부
          allowNull: false,
          defaultValue: false,
        },
        activity: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        genre: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        filename: {
          type: DataTypes.STRING(2000),
          allowNull: false,
        },
        filepath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER, // [ 1. 승인 대기중 | 2. 승인 | 3. 반려 ]
          allowNull: false,
          defaultValue: 1,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Seller",
        tableName: "seller",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Seller.belongsTo(db.User);
  }
};
