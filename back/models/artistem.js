const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Artistem extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        companyName: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        artistName: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        artistProfileImage: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        artistInfo: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question1: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question2: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question3: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question4: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question5: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question6: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question7: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question8: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isVacation: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isUpdate: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Artistem",
        tableName: "artistem",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Artistem.belongsTo(db.User);
  }
};
