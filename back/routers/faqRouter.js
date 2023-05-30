const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { Faq, sequelize } = require("../models");
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
 * SUBJECT : FAQ 목록
 * PARAMETERS : question, page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/list", async (req, res, next) => {
  const { question, page } = req.body;

  const _question = question ? question : "";

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT    ROW_NUMBER() OVER(ORDER BY A.createdAt)	    AS num,
            A.id,
            A.question,
            A.answer,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d")    AS viewUpdatedAt,
            B.username								              AS updator
    FROM    faq	        A
   INNER  
    JOIN    users	      B
      ON    A.updator = B.id 
   WHERE    A.isDelete = 0
     AND    A.question LIKE "%${_question}%"
  `;

  const selectQuery = `
  SELECT    ROW_NUMBER() OVER(ORDER BY A.createdAt)	    AS num,
            A.id,
            A.question,
            A.answer,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d")        AS viewUpdatedAt,
            B.username								    AS updator
    FROM    faq	        A
   INNER  
    JOIN    users	    B 
      ON    A.updator = B.id 
   WHERE    A.isDelete = 0
     AND    A.question LIKE "%${_question}%"
   ORDER    BY num DESC 
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const faq = await models.sequelize.query(selectQuery);

    const faqLen = lengths[0].length;

    const lastPage = faqLen % LIMIT > 0 ? faqLen / LIMIT + 1 : faqLen / LIMIT;

    return res.status(200).json({
      faqs: faq[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("FAQ 데이터를 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : faq 리스트[관리자]
 * PARAMETERS : question
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/admin/list", isAdminCheck, async (req, res, nex) => {
  const { question } = req.body;

  const _question = question ? question : "";

  const selectQuery = `
  SELECT    ROW_NUMBER() OVER(ORDER BY A.createdAt)		AS num, 
            A.id,
            A.question,
            A.answer,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y.%m.%d")		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y.%m.%d")        AS viewUpdatedAt,
            B.username								    AS updator				
    FROM	faq		    A
   INNER
    JOIN	users		B
      ON	A.updator = B.id
   WHERE	A.isDelete = 0
     AND	A.question LIKE "%${_question}%"
   ORDER	BY num DESC

  `;
  try {
    const faq = await models.sequelize.query(selectQuery);

    return res.status(200).json(faq[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("FAQ를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : faq 등록하기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const createQuery1 = `
  INSERT INTO faq 
  (
    question,
    answer,
    createdAt, 
    updatedAt,
    updator 
  )
  VALUES
  (
    "임시 FAQ",
    "임시 FAQ 답변입니다. 내용을 입력해주세요.",
    now(),
    now(),
    ${req.user.id}
  )
`;

  const historyInsertQuery = `
  INSERT INTO faqhistory 
  (
    value,
    content,
    createdAt, 
    updatedAt,
    updator
  ) 
  VALUES 
  (
    "FAQ 데이터 생성",
    "임시 FAQ",
    now(),
    now(),
    ${req.user.id}
  )
  `;

  try {
    await models.sequelize.query(createQuery1);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ를 등록할 수 없습니다.");
  }
});
/**
 * SUBJECT : faq 수정하기
 * PARAMETERS : id, question, answer
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, question, answer } = req.body;

  const updateQuery = `
  UPDATE  faq 
     SET  question = "${question}",
          answer = "${answer}",
          updatedAt = now(),
          updator =${req.user.id}
   WHERE  id = ${id}
  `;

  const insertQuery2 = `
  INSERT INTO faqhistory 
  (
    value, 
    content, 
    updator, 
    createdAt, 
    updatedAt
  )
  VALUES
  (
  	"${question}",
  	"FAQ 데이터 수정",
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
    return res.status(401).send("FAQ를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 삭제하기
 * PARAMETERS : id, quetion
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, question } = req.body;

  const deleteQuery = `
  UPDATE  faq
     SET  isDelete = 1,
          deletedAt = NOW(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO faqhistory 
  (
    value, 
    content, 
    updator,
    createdAt, 
    updatedAt
    ) 
  VALUES 
  (
    "${question}",
    "데이터 삭제",
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
    return res.status(401).send("FAQ를 삭제할 수 없습니다.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.value,
            A.content,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	faqHistory		A
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
