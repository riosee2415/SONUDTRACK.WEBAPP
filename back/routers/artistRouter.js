const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// CATEGORY ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 신청자 내역 가져오기 (미승인)
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/11
 */
router.post("/permm/list", isAdminCheck, async (req, res, next) => {
  const selectQ1 = `
    SELECT	COUNT(id)	AS cnt
      FROM	artist
     WHERE	isPermm = 0
    `;

  const selectQ2 = `
    SELECT	A.id,
            A.plan,
            A.gen,
            A.permmAt,
            A.createdAt,
            A.updatedAt,
            A.UserId,
            DATE_FORMAT(A.permmAt , "%Y년 %m월 %d일") 	AS	viewPermmAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            B.username,
            B.email,
            B.nickname,
            B.mobile
      FROM	artist 	A
     INNER
      JOIN	users	B
        ON	A.UserId = B.id
     WHERE	A.isPermm = 1
    `;

  const selectQ3 = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC) AS num,
            A.id,
            A.plan,
            A.gen,
            A.permmAt,
            A.createdAt,
            A.updatedAt,
            A.UserId,
            DATE_FORMAT(A.permmAt , "%Y년 %m월 %d일") 	AS	viewPermmAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            B.username,
            B.email,
            B.nickname,
            B.mobile
      FROM	artist 	A
     INNER
      JOIN	users	B
        ON	A.UserId = B.id
     WHERE	A.isPermm = 0
    `;

  try {
    const list1 = await models.sequelize.query(selectQ1);
    const list2 = await models.sequelize.query(selectQ2);
    const list3 = await models.sequelize.query(selectQ3);

    return res.status(200).json({
      count: list1[0],
      list: list2[0],
      waitingList: list3[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

module.exports = router;
