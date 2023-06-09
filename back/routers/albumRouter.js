const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

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
  limits: { fileSize: 25 * 1024 * 1024 }, // 5MB
});

/**
 * SUBJECT : 앨범 이미지
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/image", upload.single("image"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

/**
 * SUBJECT : 앨범 등록
 * PARAMETERS : albumImage,
                albumImageName,
                bitRate,
                sampleRate,
                fileName,
                filePath,
                categorys,
                tags,
                MusictemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
// categorys: [
//   {
//     CateTypeId: 1,
//     CategoryId: 1,
//     sort: 1,
//   },
//   {
//     CateTypeId: 2,
//     CategoryId: 2,
//     sort: 2,
//   },
// ];
// tags: [
//   {
//     TagTypeId: 1,
//     TagId: 1,
//     sort: 1,
//   },
//   {
//     TagTypeId: 2,
//     TagId: 2,
//     sort: 2,
//   },
// ];
router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    albumImage,
    albumImageName,
    bitRate,
    sampleRate,
    fileName,
    filePath,
    categorys,
    tags,
    MusictemId,
  } = req.body;

  if (!Array.isArray(tags)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(categorys)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const insertQuery = `
    INSERT  INTO    album
    (
        albumImage,
        albumImageName,
        bitRate,
        sampleRate,
        fileName,
        filePath,
        MusictemId,
        createdAt,
        updatedAt 
    )
    VALUES
    (
        "${albumImage}",
        "${albumImageName}",
        "${bitRate}",
        "${sampleRate}",
        "${fileName}",
        "${filePath}",
        ${MusictemId},
        NOW(),
        NOW() 
    )
    `;

    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      categorys.map(async (data) => {
        const insertQuery = `
        INSERT  INTO    albumCategory
        (
            AlbumId,
            CateTypeId,
            CategoryId,
            sort,
            createdAt,
            updatedAt
        )
        VALUES
        (
            ${insertResult[0].insertId},
            ${data.CateTypeId},
            ${data.CategoryId},
            ${data.sort},
            NOW(),
            NOW()
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    await Promise.all(
      tags.map(async (data) => {
        const insertQuery = `
        INSERT  INTO    albumTag
        (
            AlbumId,
            TagTypeId,
            TagId,
            sort,
            createdAt,
            updatedAt
        )
        VALUES
        (
            ${insertResult[0].insertId},
            ${data.TagTypeId},
            ${data.TagId},
            ${data.sort},
            NOW(),
            NOW()
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("앨범을 등록할 수 없습니다.");
  }
});

module.exports = router;
