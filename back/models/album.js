const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Album extends Model {
  static init(sequelize) {
    return super.init(
      {
        albumImage: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        albumImageName: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        bitRate: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        sampleRate: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        fileName: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        filePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        isPremium: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isTrackPermit: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        permitAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "Album",
        tableName: "album",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Album.belongsTo(db.Musictem);
  }
};
