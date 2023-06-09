const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Track extends Model {
  static init(sequelize) {
    return super.init(
      {
        fileName: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        filePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        fileLength: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        standardPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        deluxePrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        platinumPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isTitle: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Track",
        tableName: "track",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Track.belongsTo(db.Album);
  }
};
