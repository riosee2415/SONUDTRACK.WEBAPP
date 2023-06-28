const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TrackLike extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "TrackLike",
        tableName: "trackLike",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.TrackLike.belongsTo(db.Track);
    db.TrackLike.belongsTo(db.User);
  }
};
