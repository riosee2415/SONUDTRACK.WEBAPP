const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Faq extends Model {
  static init(sequelize) {
    return super.init(
      {
        question: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
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
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "Faq",
        tableName: "faq",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Faq.belongsTo(db.FaqType);
  }
};
