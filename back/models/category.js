const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
        },

        isDelete: {
          type: DataTypes.TINYINT,
          allowNull: false, // 필수
          defaultValue: false,
        },

        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true, // 필수
        },
      },
      {
        modelName: "Category",
        tableName: "category",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Category.belongsTo(db.CateType);
  }
};
