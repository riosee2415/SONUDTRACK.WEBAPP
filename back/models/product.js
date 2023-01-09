const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          // 상품명
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        subTitle: {
          // 부제
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        content: {
          // 상품한줄설명
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        coverImage: {
          // 상품 커버 이미지
          type: DataTypes.STRING(3000),
          allowNull: false,
        },
        isIng: {
          // 판매여부
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        downloadCnt: {
          // 다운로드 수
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isTop: {
          // 다운로드 수
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Product",
        tableName: "product",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.ProductCategory);
  }
};
