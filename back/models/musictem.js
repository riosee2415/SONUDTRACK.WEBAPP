const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Musictem extends Model {
  static init(sequelize) {
    return super.init(
      {
        artistName: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        profileImage: {
          type: DataTypes.STRING(600),
          allowNull: true,
        },
        profileImageName: {
          type: DataTypes.STRING(2000),
          allowNull: true,
        },
      },
      {
        modelName: "Musictem",
        tableName: "musictem",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Musictem.belongsTo(db.User);
  }
};
