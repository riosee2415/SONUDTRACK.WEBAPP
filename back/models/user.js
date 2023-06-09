const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.STRING(20),
          allowNull: false, // 필수
        },
        profileImage: {
          type: DataTypes.STRING(600),
          allowNull: false,
          defaultValue:
            "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/soundtrack/assets/images/icon/profile.png",
        },
        // id가 기본적으로 들어있다.
        email: {
          type: DataTypes.STRING(60), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
          unique: true, // 고유한 값
        },
        username: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
          unique: true, // 고유한 값
        },
        mobile: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        level: {
          // 사용자 권한 [1 : 일반회원, 2 : 비어있음, 3: 운영자, 4: 최고관리자, 5: 개발사]
          type: DataTypes.INTEGER,
          allowNull: false, //
          defaultValue: 1,
        },
        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null,
        },
        terms: {
          //  이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        terms2: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        terms3: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        terms4: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        terms5: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        terms6: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },

        // 관리자 메뉴 권환 제어
        menuRight1: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight2: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight3: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight4: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight5: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight6: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight7: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight8: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight9: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight10: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight11: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight12: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isExit: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        exitedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        type: {
          type: DataTypes.INTEGER, // [1. 일반 사용자 | 2. 판매자 사용자]
          allowNull: false,
          defaultValue: 1,
        },
        bankName: {
          type: DataTypes.STRING(60),
          allowNull: true,
        },
        acconuntNum: {
          type: DataTypes.STRING(60),
          allowNull: true,
        },
        artistemId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        musictemId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Question);
  }
};
