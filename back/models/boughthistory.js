const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoughtHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        usePoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        payWay: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        mileagePrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "BoughtHistory",
        tableName: "boughtHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtHistory.belongsTo(db.User);
  }
};
