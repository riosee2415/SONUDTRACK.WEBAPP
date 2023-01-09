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
 * SUBJECT : 상품 카테고리 가져오기
 * PARAMETERS : -
 * ORDER BY : value ASC
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/list", async (req, res, next) => {
  const selectQ = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.value ASC) AS num,
            A.id,
            A.value,
            A.createdAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            A.updatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            CONCAT((
                SELECT	COUNT(id)
                    FROM	product
                WHERE	A.id = ProductCategoryId 
            ), "개") AS sndCnt
      FROM	productCategory	A
     WHERE  isDelete = 0
     ORDER  BY  value ASC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 카테고리 등록하기
 * PARAMETERS : { value }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/new", async (req, res, next) => {
  const { value } = req.body;

  const insertQ = `
  INSERT INTO productCategory (value, createdAt, updatedAt) VALUES (
	"${value}", NOW(), NOW()
    )
      `;

  try {
    const list = await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("새로운 카테고리를 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 카테고리 수정하기
 * PARAMETERS : { id, nextValue }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/modify", async (req, res, next) => {
  const { id, nextValue } = req.body;

  const updateQ = `
    UPDATE  productCategory
       SET  value = "${nextValue}",
            updatedAt = NOW()
     WHERE  id = ${id}
        `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("카테고리를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 카테고리 삭제하기
 * PARAMETERS : { id }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/delete", async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
      UPDATE  productCategory
         SET  isDelete = 1,
              updatedAt = NOW(),
              deletedAt = NOW()
       WHERE  id = ${id}
          `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("카테고리를 삭제할 수 없습니다.");
  }
});

module.exports = router;
