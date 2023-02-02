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
 * SUBJECT : 구매요청 조회
 * PARAMETERS : -
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchStatus, searchSendUsername, searchReceptionUsername } =
    req.body;

  // searchStatus
  // 1번 : 승인
  // 2번 : 거절
  // 3번 : 전체
  const _searchStatus = searchStatus ? searchStatus : 3;
  const _searchSendUsername = searchSendUsername ? searchSendUsername : false;
  const _searchReceptionUsername = searchReceptionUsername
    ? searchReceptionUsername
    : false;

  const selectQ = `
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
          CONCAT(FORMAT(A.totalPrice, ','), "원")     AS viewTotalPrice,
          CASE
            WHEN  A.isOk = 1 AND A.isReject = 0  THEN  '승인'
            WHEN  A.isOk = 0 AND A.isReject = 1  THEN  '거절'
            WHEN  A.isOk = 0 AND A.isReject = 0  THEN  '미처리'
          END                                         AS viewType,
          CASE
            WHEN  A.isOk = 1 AND A.isReject = 0  THEN  1
            WHEN  A.isOk = 0 AND A.isReject = 1  THEN  2
            WHEN  A.isOk = 0 AND A.isReject = 0  THEN  3
          END                                         AS type,
          A.isPay,
          A.payWay,
          A.impUid,
          A.merchantUid,
          A.isCompleted,
          A.completedFilename,
          A.completedFilepath,
          B.id										                    AS sendUserId,
          B.username									                AS sendUsername,
          B.nickname									                AS sendNickname,
          B.mobile									                  AS sendMobile,
          B.email									                    AS sendEmail,
          C.subTitle,
          E.profileImage                              AS receptionProfileImage,
          E.id										                    AS receptionUserId,
          E.username									                AS receptionUsername,
          E.nickname									                AS receptionNickname,
          E.mobile									                  AS receptionMobile,
          E.email									                    AS receptionEmail,
          A.createdAt,
          DATE_FORMAT(A.createdAt, '%Y년 %m월 %d일')    AS viewCreatedAt, 
          A.updatedAt,
          DATE_FORMAT(A.updatedAt, '%Y년 %m월 %d일')    AS viewUpdatedAt
    FROM  buyRequest		A
   INNER
    JOIN  users			B
      ON  B.id = A.sendUserId
   INNER
    JOIN  artistem		C
      ON  C.id = A.artistemId
   INNER
    JOIN  artist 			D
      ON  D.id = C.ArtistId 
   INNER 
    JOIN  users			E
      ON  E.id = D.UserId 
   WHERE  1 = 1
            ${
              _searchStatus === 1
                ? `AND  A.isOk = 1
                   AND  A.isReject = 0`
                : _searchStatus === 2
                ? `AND  A.isOk = 0
                   AND  A.isReject = 1`
                : `AND  A.isOk = 0
                   AND  A.isReject = 0`
            }
            ${
              _searchSendUsername
                ? `AND  B.username LIKE "%${_searchSendUsername}%"`
                : ``
            }
            ${
              _searchReceptionUsername
                ? `AND  E.username LIKE "%${_searchReceptionUsername}%"`
                : ``
            }
   ORDER  BY  A.createdAt DESC

    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (e) {
    console.error(e);
    return res.status(401).send("구매요청을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 내가 작성한 컨택 내역 불러오기
 * PARAMETERS : page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/my/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  const lengthQuery = `
    SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt) AS num,
            A.id,
            A.sendMessage,
            A.isOk,
            A.isReject,
            A.rejectMessage,
            A.endDate,
            A.filename,
            A.filepath,
            A.totalPrice,
            CONCAT(FORMAT(A.totalPrice, ','), "원")     AS viewTotalPrice,
            CASE
              WHEN  A.isOk = 1 AND A.isReject = 0  THEN  '승인'
              WHEN  A.isOk = 0 AND A.isReject = 1  THEN  '거절'
              WHEN  A.isOk = 0 AND A.isReject = 0  THEN  '미처리'
            END                                         AS viewType,
            CASE
              WHEN  A.isOk = 1 AND A.isReject = 0  THEN  1
              WHEN  A.isOk = 0 AND A.isReject = 1  THEN  2
              WHEN  A.isOk = 0 AND A.isReject = 0  THEN  3
            END                                         AS type,
            A.isPay,
            A.payWay,
            A.impUid,
            A.merchantUid,
            A.isCompleted,
            A.completedFilename,
            A.completedFilepath,
            B.id										                    AS sendUserId,
            B.username									                AS sendUsername,
            B.nickname									                AS sendNickname,
            B.mobile									                  AS sendMobile,
            B.email									                    AS sendEmail,
            C.subTitle,
            E.profileImage                              AS receptionProfileImage,
            E.id										                    AS receptionUserId,
            E.username									                AS receptionUsername,
            E.nickname									                AS receptionNickname,
            E.mobile									                  AS receptionMobile,
            E.email									                    AS receptionEmail,
            A.createdAt,
            DATE_FORMAT(A.createdAt, '%Y년 %m월 %d일')    AS viewCreatedAt, 
            DATE_FORMAT(A.createdAt, '%Y.%m.%d')    AS viewFrontCreatedAt,
            A.updatedAt,
            DATE_FORMAT(A.updatedAt, '%Y년 %m월 %d일')    AS viewUpdatedAt
      FROM  buyRequest		A
     INNER
      JOIN  users			    B
        ON  B.id = A.sendUserId
     INNER
      JOIN  artistem		C
        ON  C.id = A.artistemId
     INNER
      JOIN  artist 			D
        ON  D.id = C.ArtistId 
     INNER 
      JOIN  users			E
        ON  E.id = D.UserId 
     WHERE  1 = 1
       AND  A.sendUserId = ${req.user.id}
     ORDER  BY num DESC
    `;

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

  const selectQuery = `
    SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt) AS num,
            A.id,
            A.sendMessage,
            A.isOk,
            A.isReject,
            A.rejectMessage,
            A.endDate,
            A.filename,
            A.filepath,
            A.totalPrice,
            CONCAT(FORMAT(A.totalPrice, ','), "원")     AS viewTotalPrice,
            CASE
              WHEN  A.isOk = 0 AND A.isReject = 0 AND isPay = 0 AND isCompleted = 0 THEN  '문의 완료'
              WHEN  A.isOk = 1 AND A.isReject = 0 AND isPay = 0 AND isCompleted = 0 THEN  '문의 수락'
              WHEN  A.isOk = 1 AND A.isReject = 0 AND isPay = 1 AND isCompleted = 0 THEN  '결제 완료'
              WHEN  A.isOk = 1 AND A.isReject = 0 AND isPay = 1 AND isCompleted = 1 THEN  '제작 완료'
              WHEN  A.isOk = 0 AND A.isReject = 1 AND isPay = 0 AND isCompleted = 0 THEN  '문의 거절'
            END                                         AS viewType,
            CASE
              WHEN  A.isOk = 0 AND A.isReject = 0 AND isPay = 0 AND isCompleted = 0 THEN  1
              WHEN  A.isOk = 1 AND A.isReject = 0 AND isPay = 0 AND isCompleted = 0 THEN  2
              WHEN  A.isOk = 1 AND A.isReject = 0 AND isPay = 1 AND isCompleted = 0 THEN  3
              WHEN  A.isOk = 1 AND A.isReject = 0 AND isPay = 1 AND isCompleted = 1 THEN  4
              WHEN  A.isOk = 0 AND A.isReject = 1 AND isPay = 0 AND isCompleted = 0 THEN  5
            END                                         AS type,
            A.isPay,
            A.payWay,
            A.impUid,
            A.merchantUid,
            A.isCompleted,
            A.completedFilename,
            A.completedFilepath,
            B.id										                    AS sendUserId,
            B.username									                AS sendUsername,
            B.nickname									                AS sendNickname,
            B.mobile									                  AS sendMobile,
            B.email									                    AS sendEmail,
            C.subTitle,
            E.profileImage                              AS receptionProfileImage,
            E.id										                    AS receptionUserId,
            E.username									                AS receptionUsername,
            E.nickname									                AS receptionNickname,
            E.mobile									                  AS receptionMobile,
            E.email									                    AS receptionEmail,
            A.createdAt,
            DATE_FORMAT(A.createdAt, '%Y년 %m월 %d일')    AS viewCreatedAt, 
            DATE_FORMAT(A.createdAt, '%Y.%m.%d')    AS viewFrontCreatedAt,
            A.updatedAt,
            DATE_FORMAT(A.updatedAt, '%Y년 %m월 %d일')    AS viewUpdatedAt
      FROM  buyRequest		A
     INNER
      JOIN  users			    B
        ON  B.id = A.sendUserId
     INNER
      JOIN  artistem		C
        ON  C.id = A.artistemId
     INNER
      JOIN  artist 			D
        ON  D.id = C.ArtistId 
     INNER 
      JOIN  users			E
        ON  E.id = D.UserId 
     WHERE  1 = 1
       AND  A.sendUserId = ${req.user.id}
     ORDER  BY num DESC
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
    `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const contact = await models.sequelize.query(selectQuery);

    const contactLen = lengths[0].length;

    const lastPage =
      contactLen % LIMIT > 0 ? contactLen / LIMIT + 1 : contactLen / LIMIT;

    return res.status(200).json({
      contacts: contact[0],
      lastPage: parseInt(lastPage),
    });
  } catch (e) {
    console.error(e);
    return res.status(401).send("컨택 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 구매요청 생성
 * PARAMETERS : { sendMessage, sendUserId, receptionUserId }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    sendMessage,
    totalPrice,
    endDate,
    filename,
    filepath,
    sendUserId,
    artistemId,
  } = req.body;

  const insertQ = `
  INSERT INTO buyRequest
      (
      	sendMessage,
        totalPrice,
        endDate,
        filename,
        filepath,
 	      rejectMessage,
 	      sendUserId,
 	      artistemId,
 	      createdAt,
 	      updatedAt
      )
      VALUES 
      (
      	"${sendMessage}",
        ${totalPrice},
        "${endDate}",
        ${filename ? `"${filename}"` : null},
        ${filepath ? `"${filepath}"` : null},
      	NULL,
      	${sendUserId},
      	${artistemId},
      	NOW(),
      	NOW()
      );
    `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(201).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("구매요청을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 구매요청 승인
 * PARAMETERS : { id, isOk }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/isOk", isLoggedIn, async (req, res, next) => {
  const { id, isOk } = req.body;

  const selectQ = `
  SELECT  A.id
    FROM  buyRequest    A
   INNER
    JOIN  artistem		  B
      ON  B.id = A.artistemId
   INNER
    JOIN  artist 			  C
      ON  C.id = B.ArtistId 
   WHERE  A.id = ${id}
     AND  C.UserId  = ${req.user.id}
  `;

  const updateQ = `
  UPDATE  buyRequest 
     SET  isOk = ${isOk}
   WHERE  id = ${id};
    `;

  try {
    const checkList = await models.sequelize.query(selectQ);

    if (checkList[0].length === 0) {
      return res.status(401).send("해당 구매요청의 판매자가 아닙니다.");
    }

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("구매요청을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 구매요청 거절
 * PARAMETERS : { id, isReject, rejectMessage }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/isReject", isLoggedIn, async (req, res, next) => {
  const { id, isReject, rejectMessage } = req.body;

  const selectQ = `
  SELECT  A.id
    FROM  buyRequest    A
   INNER
    JOIN  artistem		  B
      ON  B.id = A.artistemId
   INNER
    JOIN  artist 			  C
      ON  C.id = B.ArtistId 
   WHERE  A.id = ${id}
     AND  C.UserId  = ${req.user.id}
  `;

  const updateQ = `
  UPDATE  buyRequest 
     SET  isReject = ${isReject},
          rejectMessage = "${rejectMessage}"
   WHERE  id = ${id};
    `;

  try {
    const checkList = await models.sequelize.query(selectQ);

    if (checkList[0].length === 0) {
      return res.status(401).send("해당 구매요청의 판매자가 아닙니다.");
    }

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("구매요청을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 삭제 라우터
 * PARAMETERS : { idArr }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/delete", isLoggedIn, async (req, res, next) => {
  const { idArr } = req.body;

  if (!Array.isArray(idArr)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      idArr.map(async (data) => {
        const deleteQ = `
        UPDATE  buyRequest
           SET  isDelete = 1,
                deletedAt = NOW()
         WHERE  id = ${data}
        `;

        await models.sequelize.query(deleteQ);
      })
    );

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("구매요청을 조회할 수 없습니다.");
  }
});

module.exports = router;
