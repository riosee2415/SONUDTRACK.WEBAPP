const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
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
//   limits: { fileSize: 20 * 1024 * 2024 }, // 20MB
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/file", upload.single("file"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

/**
 * SUBJECT : 제작요청 조회
 * PARAMETERS : -
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchStatus } = req.body;

  // searchStatus
  // 1번 : 승인
  // 2번 : 거절
  // 3번 : 전체
  const _searchStatus = searchStatus ? searchStatus : 3;

  const selectQuery = `
  SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt ASC) AS num,
          A.id,
          A.sendMessage,
          A.isOk,
          A.isReject,
          A.rejectMessage,
          A.endDate,
          A.filename,
          A.filepath,
          A.totalPrice,
          CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
          CASE
            WHEN  A.isOk = 1 AND A.isReject = 0  THEN  "승인"
            WHEN  A.isOk = 0 AND A.isReject = 1  THEN  "거절"
            WHEN  A.isOk = 0 AND A.isReject = 0  THEN  "미처리"
          END                                         AS viewType,
          CASE
            WHEN  A.isOk = 1 AND A.isReject = 0  THEN  1
            WHEN  A.isOk = 0 AND A.isReject = 1  THEN  2
            WHEN  A.isOk = 0 AND A.isReject = 0  THEN  3
          END                                         AS type,
          A.isPay,
          A.payWay,
          A.payPrice,
          A.usePointPrice,
          CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
          CONCAT(FORMAT(A.usePointPrice, ","), "원")     AS viewUsePointPrice,
          A.payDate,
          A.payCardInfo,
          A.impUid,
          A.merchantUid,
          A.isCompleted,
          A.completedFilename,
          A.completedFilepath,
          A.createdAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt, 
          A.updatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.username                                   AS requestUsername,
          B.userId                                     AS requestUserLoginId,
          B.profileImage                               AS requestUserProfileImage,
          C.artistName,
          C.artistProfileImage,
          C.artistInfo
    FROM  artistContact		A
   INNER
    JOIN  users             B
      ON  A.UserId = B.id
   INNER
    JOIN  artistem          C
      ON  A.ArtistemId = C.id
   WHERE  1 = 1
     AND  A.isDelete = 0
            ${
              _searchStatus === 1
                ? `AND  A.isOk = 1
                   AND  A.isReject = 0`
                : _searchStatus === 2
                ? `AND  A.isOk = 0
                   AND  A.isReject = 1`
                : _searchStatus === 3
                ? ``
                : ``
            }
   ORDER    BY  num  DESC

    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("제작요청을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 내가 작성한 컨택 내역 불러오기
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/my/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  try {
    /**
     *
     * ---------------------- 조건 ------------------------- 내용 -- 타입
     * isOk = 0, isReject = 0, isPay = 0, isCompleted = 0, 문의 완료  1
     * isOk = 1, isReject = 0, isPay = 0, isCompleted = 0, 문의 수락  2
     * isOk = 1, isReject = 0, isPay = 1, isCompleted = 0, 결제 완료  3
     * isOk = 1, isReject = 0, isPay = 1, isCompleted = 1, 제작 완료  4
     * isOk = 0, isReject = 1, isPay = 0, isCompleted = 0, 문의 거절  5
     *
     */

    const lengthQuery = `
      SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt) AS num,
              A.id,
              A.sendMessage,
              A.isOk,
              A.okMessage,
              A.isReject,
              A.rejectMessage,
              A.endDate,
              A.filename,
              A.filepath,
              A.totalPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 완료"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 수락"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  "결제 완료"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  "제작 완료"
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 거절"
              END                                         AS viewType,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  1
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  2
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  3
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  4
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  5
              END                                         AS type,
              A.isPay,
              A.payWay,
              A.payPrice,
              A.usePointPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CONCAT(FORMAT(A.usePointPrice, ","), "원")     AS viewUsePointPrice,
              A.payDate,
              A.payCardInfo,
              A.impUid,
              A.merchantUid,
              A.isCompleted,
              A.completedFilename,
              A.completedFilepath,
              A.createdAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt, 
              DATE_FORMAT(A.createdAt, "%Y.%m.%d")    AS viewFrontCreatedAt,
              A.updatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              B.username                                   AS requestUsername,
              B.userId                                     AS requestUserLoginId,
              B.profileImage                               AS requestUserProfileImage,
              C.artistName,
              C.artistProfileImage,
              C.artistInfo
        FROM  artistContact		A
       INNER
        JOIN  users             B
          ON  A.UserId = B.id
       INNER
        JOIN  artistem          C
          ON  A.ArtistemId = C.id
       WHERE  1 = 1
         AND  A.isDelete = 0
         AND  A.UserId = ${req.user.id}
      `;

    const selectQuery = `
      SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt) AS num,
              A.id,
              A.sendMessage,
              A.isOk,
              A.okMessage,
              A.isReject,
              A.rejectMessage,
              A.endDate,
              A.filename,
              A.filepath,
              A.totalPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 완료"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 수락"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  "결제 완료"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  "제작 완료"
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 거절"
              END                                         AS viewType,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  1
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  2
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  3
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  4
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  5
              END                                         AS type,
              A.isPay,
              A.payWay,
              A.payPrice,
              A.usePointPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CONCAT(FORMAT(A.usePointPrice, ","), "원")     AS viewUsePointPrice,
              A.payDate,
              A.payCardInfo,
              A.impUid,
              A.merchantUid,
              A.isCompleted,
              A.completedFilename,
              A.completedFilepath,
              A.createdAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt, 
              DATE_FORMAT(A.createdAt, "%Y.%m.%d")    AS viewFrontCreatedAt,
              A.updatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              B.username                                   AS requestUsername,
              B.userId                                     AS requestUserLoginId,
              B.profileImage                               AS requestUserProfileImage,
              C.artistName,
              C.artistProfileImage,
              C.artistInfo
        FROM  artistContact		A
       INNER
        JOIN  users             B
          ON  A.UserId = B.id
       INNER
        JOIN  artistem          C
          ON  A.ArtistemId = C.id
       WHERE  1 = 1
         AND  A.isDelete = 0
         AND  A.UserId = ${req.user.id}
       ORDER  BY num DESC
       LIMIT  ${LIMIT}
      OFFSET  ${OFFSET}
      `;

    const lengths = await models.sequelize.query(lengthQuery);
    const contact = await models.sequelize.query(selectQuery);

    const contactLen = lengths[0].length;

    const lastPage =
      contactLen % LIMIT > 0 ? contactLen / LIMIT + 1 : contactLen / LIMIT;

    return res.status(200).json({
      contacts: contact[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("컨택 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 나에게 작성된 컨택 내역 불러오기
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/artist/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  try {
    /**
     *
     * ---------------------- 조건 ------------------------- 내용 -- 타입
     * isOk = 0, isReject = 0, isPay = 0, isCompleted = 0, 문의 완료  1
     * isOk = 1, isReject = 0, isPay = 0, isCompleted = 0, 문의 수락  2
     * isOk = 1, isReject = 0, isPay = 1, isCompleted = 0, 결제 완료  3
     * isOk = 1, isReject = 0, isPay = 1, isCompleted = 1, 제작 완료  4
     * isOk = 0, isReject = 1, isPay = 0, isCompleted = 0, 문의 거절  5
     *
     */

    const lengthQuery = `
      SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt) AS num,
              A.id,
              A.sendMessage,
              A.isOk,
              A.okMessage,
              A.isReject,
              A.rejectMessage,
              A.endDate,
              A.filename,
              A.filepath,
              A.totalPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 완료"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 수락"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  "결제 완료"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  "제작 완료"
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 거절"
              END                                         AS viewType,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  1
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  2
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  3
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  4
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  5
              END                                         AS type,
              A.isPay,
              A.payWay,
              A.payPrice,
              A.usePointPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CONCAT(FORMAT(A.usePointPrice, ","), "원")     AS viewUsePointPrice,
              A.payDate,
              A.payCardInfo,
              A.impUid,
              A.merchantUid,
              A.isCompleted,
              A.completedFilename,
              A.completedFilepath,
              A.createdAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt, 
              DATE_FORMAT(A.createdAt, "%Y.%m.%d")    AS viewFrontCreatedAt,
              A.updatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              B.username                                   AS requestUsername,
              B.userId                                     AS requestUserLoginId,
              B.profileImage                               AS requestUserProfileImage,
              C.artistName,
              C.artistProfileImage,
              C.artistInfo
        FROM  artistContact		  A
       INNER
        JOIN  users             B
          ON  A.UserId = B.id
       INNER
        JOIN  artistem          C
          ON  A.ArtistemId = C.id
       WHERE  1 = 1
         AND  A.isDelete = 0
         AND  C.UserId = ${req.user.id}
      `;

    const selectQuery = `
      SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt) AS num,
              A.id,
              A.sendMessage,
              A.isOk,
              A.okMessage,
              A.isReject,
              A.rejectMessage,
              A.endDate,
              A.filename,
              A.filepath,
              A.totalPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "답변 대기"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 수락"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  "결제 완료"
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  "제작 완료"
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  "문의 거절"
              END                                         AS viewType,
              CASE
                WHEN  A.isOk = 0 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  1
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 0 AND A.isCompleted = 0 THEN  2
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 0 THEN  3
                WHEN  A.isOk = 1 AND A.isReject = 0 AND A.isPay = 1 AND A.isCompleted = 1 THEN  4
                WHEN  A.isOk = 0 AND A.isReject = 1 AND A.isPay = 0 AND A.isCompleted = 0 THEN  5
              END                                         AS type,
              DATEDIFF(A.endDate, NOW())      				    AS dateCnt,
              A.isPay,
              A.payWay,
              A.payPrice,
              A.usePointPrice,
              CONCAT(FORMAT(A.totalPrice, ","), "원")     AS viewTotalPrice,
              CONCAT(FORMAT(A.usePointPrice, ","), "원")     AS viewUsePointPrice,
              A.payDate,
              A.payCardInfo,
              A.impUid,
              A.merchantUid,
              A.isCompleted,
              A.completedFilename,
              A.completedFilepath,
              A.createdAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt, 
              DATE_FORMAT(A.createdAt, "%Y.%m.%d")    AS viewFrontCreatedAt,
              A.updatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              B.username                                   AS requestUsername,
              B.userId                                     AS requestUserLoginId,
              B.profileImage                               AS requestUserProfileImage,
              C.artistName,
              C.artistProfileImage,
              C.artistInfo
        FROM  artistContact		A
       INNER
        JOIN  users             B
          ON  A.UserId = B.id
       INNER
        JOIN  artistem          C
          ON  A.ArtistemId = C.id
       WHERE  1 = 1
         AND  A.isDelete = 0
         AND  C.UserId = ${req.user.id}
       ORDER  BY num DESC
       LIMIT  ${LIMIT}
      OFFSET  ${OFFSET}
      `;

    const lengths = await models.sequelize.query(lengthQuery);
    const contact = await models.sequelize.query(selectQuery);

    const contactLen = lengths[0].length;

    const lastPage =
      contactLen % LIMIT > 0 ? contactLen / LIMIT + 1 : contactLen / LIMIT;

    return res.status(200).json({
      contacts: contact[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("컨택 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 제작요청 생성
 * PARAMETERS : sendMessage, totalPrice, endDate, filename, filepath, ArtistemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { sendMessage, totalPrice, endDate, filename, filepath, ArtistemId } =
    req.body;

  const insertQ = `
  INSERT INTO artistContact
      (
      	sendMessage,
        totalPrice,
        endDate,
        filename,
        filepath,
        UserId,
        ArtistemId,
        createdAt,
        updatedAt
      )
      VALUES 
      (
      	"${sendMessage}",
        ${totalPrice},
        "${endDate}",
        "${filename}",
        "${filepath}",
      	${req.user.id},
      	${ArtistemId},
      	NOW(),
      	NOW()
      );
    `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("제작요청을 작성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 제작요청 승인
 * PARAMETERS : id, isOk, okMessage
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/isOk", isLoggedIn, async (req, res, next) => {
  const { id, isOk, okMessage } = req.body;

  const selectQ = `
  SELECT  A.id,
          B.UserId,
          A.isDelete
    FROM  artistContact    A
   INNER
    JOIN  artistem		   B
      ON  B.id = A.artistemId
   WHERE  A.id = ${id}
  `;

  const updateQ = `
  UPDATE  artistContact 
     SET  isOk = ${isOk},
          okMessage = "${okMessage}"
   WHERE  id = ${id}
    `;

  try {
    const checkList = await models.sequelize.query(selectQ);

    if (checkList[0][0].isDelete) {
      return res.status(401).send("이미 삭제된 데이터 입니다.");
    }

    if (checkList[0][0].UserId !== req.user.id) {
      return res.status(401).send("해당 제작요청의 판매자가 아닙니다.");
    }

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("제작요청을 수락할 수 없습니다.");
  }
});

/**
 * SUBJECT : 제작요청 거절
 * PARAMETERS : id, isReject, rejectMessage
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/isReject", isLoggedIn, async (req, res, next) => {
  const { id, isReject, rejectMessage } = req.body;

  const selectQ = `
  SELECT  A.id,
          B.UserId,
          A.isDelete
    FROM  artistContact    A
   INNER
    JOIN  artistem		   B
      ON  B.id = A.ArtistemId
   WHERE  A.id = ${id}
  `;

  const updateQ = `
  UPDATE  artistContact 
     SET  isReject = ${isReject},
          rejectMessage = "${rejectMessage}"
   WHERE  id = ${id}
    `;

  try {
    const checkList = await models.sequelize.query(selectQ);

    if (checkList[0][0].isDelete) {
      return res.status(401).send("이미 삭제된 데이터 입니다.");
    }

    if (checkList[0][0].UserId !== req.user.id) {
      return res.status(401).send("해당 제작요청의 판매자가 아닙니다.");
    }

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("제작요청을 거절할 수 없습니다.");
  }
});

/**
 * SUBJECT : 구매 라우터
 * PARAMETERS : id, payPrice, payWay, impUid, merchantUid, payCardInfo
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/payment", isLoggedIn, async (req, res, next) => {
  const {
    id,
    payPrice,
    payWay,
    impUid,
    merchantUid,
    payCardInfo,
    usePointPrice,
  } = req.body;

  const selectQ = `
  SELECT  A.id,
          A.isReject,
          A.isOk,
          A.UserId,
          B.artistName
    FROM  artistContact     A
   INNER
    JOIN  artistem          B
      ON  A.ArtistemId = B.id
   WHERE  A.id = ${id}
  `;

  const updateQuery = `
  UPDATE    artistContact
     SET    isPay = 1,
            payPrice = ${payPrice},
            payWay = "${payWay}",
            impUid = ${impUid ? `"${impUid}"` : null},
            merchantUid = ${merchantUid ? `"${merchantUid}"` : null},
            payCardInfo = ${payCardInfo ? `"${payCardInfo}"` : null},
            usePointPrice = ${usePointPrice},
            payDate = NOW()
   WHERE    id = ${id}
  `;

  let userMileagePoint = parseInt(payPrice) * (parseFloat(1.0) / 100);
  let usersPoint = parseInt(req.user.point);

  try {
    const checkList = await models.sequelize.query(selectQ);

    if (checkList[0][0].isReject) {
      return res.status(401).send("거절된 내역은 결제할 수 없습니다.");
    }

    if (!checkList[0][0].isOk) {
      return res.status(401).send("승인되지 않은 내역은 결제할 수 없습니다.");
    }

    if (checkList[0][0].UserId !== req.user.id) {
      return res.status(401).send("자신이 문의했던 내역만 결제할 수 있습니다.");
    }

    await models.sequelize.query(updateQuery);

    if (parseInt(usePointPrice) > 0) {
      if (parseInt(req.user.point) < parseInt(usePointPrice)) {
        return res
          .status(401)
          .send("보유중인 포인트보다 더 많은 금액을 입력했습니다.");
      }

      const userPointUpdateQuery = `
        UPDATE  users
           SET  point = ${parseInt(usersPoint) - parseInt(usePointPrice)}
         WHERE  id = ${req.user.id}
        `;

      usersPoint = parseInt(usersPoint) - parseInt(usePointPrice);

      await models.sequelize.query(userPointUpdateQuery);

      const insertPointQuery = `
      INSERT  INTO  userPoint
      (
        pointType,
        type,
        content,
        price,
        UserId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        "사용",
        "Artisttem",
        "${checkList[0][0].artistName}",
        ${usePointPrice},
        ${req.user.id},
        NOW(),
        NOW()
      )
      `;

      await models.sequelize.query(insertPointQuery);
    }

    const userUpdateQuery = `
      UPDATE    users
         SET    point = ${parseInt(usersPoint) + parseInt(userMileagePoint)}
       WHERE    id = ${req.user.id}
      `;

    const insertPointHistoryQuery = `
      INSERT  INTO  userPoint
      (
        pointType,
        type,
        content,
        price,
        UserId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        "적립",
        "Artisttem",
        "${checkList[0][0].artistName}",
        ${userMileagePoint},
        ${req.user.id},
        NOW(),
        NOW()
      )
      `;

    await models.sequelize.query(insertPointHistoryQuery);

    await models.sequelize.query(userUpdateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제를 진행할 수 없습니다.");
  }
});

/**
 * SUBJECT : 제작물 전송 라우터
 * PARAMETERS : id, completedFilename, completedFilepath
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
router.post("/sendCompleteFile", isLoggedIn, async (req, res, next) => {
  const { id, completedFilename, completedFilepath } = req.body;

  const selectQ = `
    SELECT  id,
            isReject,
            isOk,
            isPay
      FROM  artistContact    
     WHERE  id = ${id}
    `;

  const updateQuery = `
    UPDATE    artistContact
       SET    isCompleted = 1,
              completedFilename = "${completedFilename}",
              completedFilepath = "${completedFilepath}"
     WHERE    id = ${id}
    `;

  try {
    const checkList = await models.sequelize.query(selectQ);

    if (checkList[0][0].isReject) {
      return res.status(401).send("거절된 내역은 제작물을 전송할 수 없습니다.");
    }

    if (!checkList[0][0].isOk) {
      return res
        .status(401)
        .send("승인되지 않은 내역은 제작물을 전송할 수 없습니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("제작물을 전송할 수 없습니다.");
  }
});

/**
 * SUBJECT : 삭제 라우터
 * PARAMETERS : { idArr }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/14
 */
// type이 2 혹은 3인 데이터가 선택되지 않도록 해주세요 !
router.post("/delete", isLoggedIn, async (req, res, next) => {
  const { idArr } = req.body;

  if (!Array.isArray(idArr)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const selectQ = `
    SELECT  id,
            CASE
              WHEN  isOk = 0 AND isReject = 0 AND isPay = 0 AND isCompleted = 0 THEN  1
              WHEN  isOk = 1 AND isReject = 0 AND isPay = 0 AND isCompleted = 0 THEN  2
              WHEN  isOk = 1 AND isReject = 0 AND isPay = 1 AND isCompleted = 0 THEN  3
              WHEN  isOk = 1 AND isReject = 0 AND isPay = 1 AND isCompleted = 1 THEN  4
              WHEN  isOk = 0 AND isReject = 1 AND isPay = 0 AND isCompleted = 0 THEN  5
            END                                         AS type
      FROM  artistContact
     WHERE  id IN (${idArr})
       AND  isDelete = 0
    `;

    const checkList = await models.sequelize.query(selectQ);

    await Promise.all(
      checkList[0].map(async (data) => {
        if (parseInt(data.type) === 2 || parseInt(data.type) === 3) {
          return res
            .status(401)
            .send(
              "승인되었지만 처리되지 않은 내역이 존재합니다. 다시 시도하여 주십시오."
            );
        }

        const deleteQ = `
    UPDATE  artistContact
       SET  isDelete = 1,
            deletedAt = NOW()
     WHERE  id = ${data.id}
    `;

        await models.sequelize.query(deleteQ);
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("제작요청 내역을 삭제할 수 없습니다.");
  }
});

module.exports = router;
