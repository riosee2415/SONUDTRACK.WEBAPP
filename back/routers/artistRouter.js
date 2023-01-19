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
///////////////////////////////////// SELLER ///////////////////////////////////////
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

  const selectQ4 = `
    SELECT	filename,
            filepath,
            ArtistId
      FROM	artistRequestFile
     WHERE	ArtistId IN (
                        SELECT	id
                          FROM 	artist
                         WHERE	isPermm = 0
                        )
     ORDER	BY	filename ASC
    `;

  try {
    const list1 = await models.sequelize.query(selectQ1);
    const list2 = await models.sequelize.query(selectQ2);
    const list3 = await models.sequelize.query(selectQ3);
    const list4 = await models.sequelize.query(selectQ4);

    const waitingList = list3[0];
    const fileList = list4[0];

    waitingList.map((data) => {
      data["filelist"] = [];

      fileList.map((fileItem) => {
        if (data.id === fileItem.ArtistId) {
          data.filelist.push({
            filename: fileItem.filename,
            filepath: fileItem.filepath,
          });
        }
      });
    });

    return res.status(200).json({
      count: list1[0],
      list: list2[0],
      waitingList: waitingList,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 신청자 승인하기
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/11
 */
router.post("/permm/ok", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
  UPDATE	artist
     SET	isPermm = 1,
          permmAt = NOW()
   WHERE	id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 신청자 및 판매자 삭제
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/16
 */
router.post("/permm/del", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQ = `
  DELETE  FROM	artist
   WHERE	id = ${id}
  `;

  try {
    await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// ARTISTEM //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
router.post("/target/list", async (req, res, next) => {
  const { ArtistId } = req.body;

  const selectQ = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.title ASC) 	AS num,
          A.id,
          A.title,
          A.subTitle,
          A.content,
          A.coverImage,
          A.isIng,
          A.isTop,
          A.sampleRate,
          A.bitRate,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt
    FROM	artistem	A
   WHERE  A.ArtistId = ${ArtistId};
  `;

  const selectQ2 = `
  SELECT	value,
          ArtistemId
    FROM	artistTemTag
    `;

  const selectQ3 = `
  SELECT	value,
          ArtistemId
    FROM	artistTemGen
  `;

  try {
    const list = await models.sequelize.query(selectQ);
    const tags = await models.sequelize.query(selectQ2);
    const gens = await models.sequelize.query(selectQ3);

    const tems = list[0];

    tems.map((data) => {
      data["tags"] = [];
      data["gens"] = [];

      tags[0].map((tag) => {
        if (data.id === tag.ArtistemId) {
          data["tags"].push(tag.value);
        }
      });
      gens[0].map((gen) => {
        if (data.id === gen.ArtistemId) {
          data["gens"].push(gen.value);
        }
      });
    });

    return res.status(200).json({
      artistemList: tems,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("아티스템을 조회할 수 없습니다. 다시 시도해주세요.");
  }
});

module.exports = router;
