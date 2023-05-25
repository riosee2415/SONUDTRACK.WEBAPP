const Sequelize = require("sequelize");
const user = require("./user");
const userHistory = require("./userHistory");
const mainbanner = require("./mainbanner");
const mainBannerHistory = require("./mainBannerHistory");
const companyinfo = require("./companyinfo");
const popup = require("./popup");
const acceptrecord = require("./acceptrecord");
const notice = require("./notice");
const gallary = require("./gallary");
const question = require("./question");
const questiontype = require("./questiontype");
const logo = require("./logo");
const logohistory = require("./logohistory");
const companyInfoHistory = require("./companyInfoHistory");
const snsInfo = require("./snsInfo");
const snsInfoHistory = require("./snsInfoHistory");
const kakaoch = require("./kakaoch");
const kakaochHistory = require("./kakaochHistory");
const popupHistory = require("./popupHistory");
const faq = require("./faq");
const faqhistory = require("./faqhistory");
const questionhistory = require("./questionhistory");
const noticeHistory = require("./noticeHistory");
const galleryImage = require("./galleryImage");
const adminUserRightHistory = require("./adminUserRightHistory");
const cateType = require("./cateType");
const cateTypeHistory = require("./cateTypeHistory");
const category = require("./category");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = user;
db.UserHistory = userHistory;
db.MainBanner = mainbanner;
db.CompanyInfo = companyinfo;
db.Popup = popup;
db.AcceptRecord = acceptrecord;
db.Notice = notice;
db.Gallery = gallary;
db.Question = question;
db.QuestionType = questiontype;
db.Logo = logo;
db.Logohistory = logohistory;
db.CompanyInfoHistory = companyInfoHistory;
db.SnsInfo = snsInfo;
db.SnsInfoHistory = snsInfoHistory;
db.Kakaoch = kakaoch;
db.KakaochHistory = kakaochHistory;
db.MainBannerHistory = mainBannerHistory;
db.PopupHistory = popupHistory;
db.Faq = faq;
db.FaqHistory = faqhistory;
db.QuestionHistory = questionhistory;
db.NoticeHistory = noticeHistory;
db.GalleryImage = galleryImage;
db.AdminUserRightHistory = adminUserRightHistory;
db.CateType = cateType;
db.CateTypeHistory = cateTypeHistory;
db.Category = category;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
