const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TrackGen extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          // 장르명
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "TrackGen",
        tableName: "trackGen",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.TrackGen.belongsTo(db.ProductTrack);
  }
};
