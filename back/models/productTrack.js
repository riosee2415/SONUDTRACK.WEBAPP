const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ProductTrack extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          // 트렉명
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        isTitle: {
          // 트렉명
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        thumbnail: {
          // 썸네일
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        filename: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        filepath: {
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        downloadCnt: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        sPrice: {
          // 다운로드 수
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        dPrice: {
          // 다운로드 수
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        pPrice: {
          // 다운로드 수
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isTop: {
          // 메인 리스트 여부
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "ProductTrack",
        tableName: "productTrack",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ProductTrack.belongsTo(db.Product);
  }
};
