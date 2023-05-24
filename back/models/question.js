const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Question extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(200), // 성함
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(200), // 이메일
          allowNull: false,
        },
        // id가 기본적으로 들어있다.
        title: {
          type: DataTypes.STRING(200), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        content: {
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
        isConfirmed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        confirmedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Question",
        tableName: "questions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Question.belongsTo(db.User);
  }
};
