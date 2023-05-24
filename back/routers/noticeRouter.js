const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { Notice, sequelize } = require("../models");
const { Op } = require("sequelize");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

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

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, "uploads");
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname); // 확장자 추출 (.png)
//       const basename = path.basename(file.originalname, ext);

//       done(null, basename + "_" + new Date().getTime() + ext);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 2024 }, // 20MB
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 공지사항 이미지
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/image", isAdminCheck, async (req, res, next) => {
  const uploadImage = upload.single("image");

  await uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(401).send("첨부 가능한 용량을 초과했습니다.");
    } else if (err) {
      return res.status(401).send("업로드 중 문제가 발생했습니다.");
    }

    return res.json({
      path: req.file.location,
    });
  });
});

/**
 * SUBJECT : 공지사항 리스트
 * PARAMETERS : title, page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/list", async (req, res, next) => {
  const { title, page } = req.body;

  const _title = title ? title : "";

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT ROW_NUMBER() OVER(ORDER BY A.createdAt)	AS num,
         A.id,
         A.title,
         A.imagePath,
         A.hit,
         A.createdAt,
         A.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y. %m. %d")	AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y. %m. %d")	AS viewUpdatedAt,
         B.username								              AS updator
    FROM notices	A
   INNER  
    JOIN  users	  B 
      ON  A.updator = B.id 
   WHERE  A.isDelete = 0
     AND  A.title LIKE "%${_title}%"
  `;

  const selectQuery = `
  SELECT ROW_NUMBER() OVER(ORDER BY A.createdAt)	AS num,
         A.id,
         A.title,
         A.imagePath,
         A.hit,
         A.createdAt,
         A.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y. %m. %d")	AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y. %m. %d")	AS viewUpdatedAt,
         B.username								              AS updator
    FROM notices	A
   INNER  
    JOIN  users	  B 
      ON  A.updator = B.id 
   WHERE  A.isDelete = 0
     AND  A.title LIKE "%${_title}%"
   ORDER  BY num DESC 
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const notice = await models.sequelize.query(selectQuery);

    const noticeLen = lengths[0].length;

    const lastPage =
      noticeLen % LIMIT > 0 ? noticeLen / LIMIT + 1 : noticeLen / LIMIT;

    return res.status(200).json({
      notices: notice[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("공지사항 데이터를 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 공지사항 리스트[관리자]
 * PARAMETERS : title
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/admin/list", isAdminCheck, async (req, res, nex) => {
  const { title } = req.body;

  const _title = title ? title : "";

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt)		  AS num, 
          A.id,
          A.title,
          A.content,
          A.hit,
          A.imagePath,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y. %m. %d") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y. %m. %d") 	  AS viewUpdatedAt,
          B.username									                AS updator 
    FROM	notices		  A
   INNER
    JOIN	users		    B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.title LIKE "%${_title}%"
   ORDER	BY num DESC

  `;
  try {
    const notice = await models.sequelize.query(selectQuery);

    return res.status(200).json(notice[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("공지사항을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 공지사항 상세
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장헤정
 * DEV DATE : 2023/05/23
 */
router.post("/detail", async (req, res, next) => {
  const { id } = req.body;

  const detailQuery = `
  SELECT	A.id,
          A.title,
          A.imagePath,
          A.content,
          A.author,
          A.hit,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d") 		AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y.%m.%d") 		AS viewUpdatedAt,
          B.username 										          AS updator 
    FROM	notices		A
   INNER
    JOIN	users		B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.id = ${id}
  `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 공지사항 데이터입니다.");
    }

    const updateQuery = `
    UPDATE  notices
       SET  hit = ${detailData[0][0].hit + 1}
     WHERE  id = ${id}
    `;

    await models.sequelize.query(updateQuery);

    return res.status(200).json(detailData[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("공지사항 데이터를 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 공지사항 등록하기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/22
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const createQuery1 = `
  INSERT INTO notices 
  (
    title, 
    content, 
    imagePath, 
    author, 
    updator, 
    createdAt, 
    updatedAt
  )
  VALUES
  (
    "임시 공지사항",
    "임시 공지사항 입니다. 데이터를 입력해주세요.",
    "http://via.placeholder.com/420x400",
    "관리자",
    ${req.user.id},
    now(),
    now()
  )
`;

  const createQuery2 = `
  INSERT INTO noticeHistory 
  (
     title,
     content, 
     updator, 
     createdAt, 
     updatedAt
  ) 
  VALUES 
  (
    "임시 공지사항",
    "데이터 생성",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(createQuery1);
    await models.sequelize.query(createQuery2);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공지사항을 등록할 수 없습니다.");
  }
});
/**
 * SUBJECT : 공지사항 수정하기
 * PARAMETERS : id, title, content, imagePath
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, title, content, imagePath } = req.body;

  const updateQuery = `
  UPDATE  notices 
     SET  title = "${title}",
          content = "${content}",
          imagePath = "${imagePath}",
          updatedAt = now(),
          updator =${req.user.id}
   WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO noticeHistory 
  (
    title, 
    content, 
    updator, 
    createdAt, 
    updatedAt
  )
  VALUES
  (
  	"${title}",
  	"데이터 수정",
  	${req.user.id},
  	now(),
  	now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("공지사항을 수정할 수 없습니다. [CODE 087]");
  }
});

/**
 * SUBJECT : 공지사항 삭제하기
 * PARAMETERS : id, title
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, title } = req.body;

  const deleteQuery = `
  UPDATE  notices
     SET  isDelete = 1,
          deletedAt = NOW(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO noticeHistory 
  (
    content, 
    title, 
    updator, 
    createdAt, 
    updatedAt
    ) 
  VALUES 
  (
    "데이터 삭제",
    "${title}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("게시글을 삭제할 수 없습니다. [CODE 097]");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.title,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	noticeHistory		A
     INNER
      JOIN	users 			B
        ON	A.updator = B.id
     WHERE  1=1
      ${
        _datePick
          ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
          : ""
      }
     ORDER  BY  A.createdAt  DESC
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

module.exports = router;
