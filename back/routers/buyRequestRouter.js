const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 구매요청 조회
 * PARAMETERS : -
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 주니어 개발자 홍민기
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
            A.totalPrice,
            CONCAT(FORMAT(A.totalPrice, ','), "원")     AS viewTotalPrice,
            B.id										                    AS sendUserId,
            B.username									                AS sendUsername,
            B.nickname									                AS sendNickname,
            B.mobile									                  AS sendMobile,
            B.email									                    AS sendEmail,
            C.id										                    AS receptionUserId,
            C.username									                AS receptionUsername,
            C.nickname									                AS receptionNickname,
            C.mobile									                  AS receptionMobile,
            C.email									                    AS receptionEmail,
            A.createdAt,
            DATE_FORMAT(A.createdAt, '%Y년 %m월 %d일')     AS viewCreatedAt, 
           A.updatedAt,
            DATE_FORMAT(A.updatedAt, '%Y년 %m월 %d일')     AS viewUpdatedAt
      FROM  buyRequest		A
     INNER
      JOIN  users			B
        ON  B.id = A.sendUserId
     INNER
      JOIN  users			C
        ON  C.id = A.receptionUserId
     WHERE  1 = 1
            ${
              _searchStatus === 1
                ? `AND  A.isOk = 1
                   AND  A.isReject = 0`
                : _searchStatus === 2
                ? `AND  A.isOk = 0
                   AND  A.isReject = 1`
                : ``
            }
            ${
              _searchSendUsername
                ? `AND  B.username LIKE "%${_searchSendUsername}%"`
                : ``
            }
            ${
              _searchReceptionUsername
                ? `AND  C.username LIKE "%${_searchReceptionUsername}%"`
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
 * SUBJECT : 구매요청 생성
 * PARAMETERS : { sendMessage, sendUserId, receptionUserId }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 주니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { sendMessage, totalPrice, sendUserId, receptionUserId } = req.body;

  const insertQ = `
  INSERT INTO buyRequest
      (
      	sendMessage,
        totalPrice,
 	      rejectMessage,
 	      sendUserId,
 	      receptionUserId,
 	      createdAt,
 	      updatedAt
      )
      VALUES 
      (
      	"${sendMessage}",
        ${totalPrice},
      	NULL,
      	${sendUserId},
      	${receptionUserId},
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
 * DEVELOPMENT : 주니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/isOk", isAdminCheck, async (req, res, next) => {
  const { id, isOk } = req.body;

  const updateQ = `
  UPDATE  buyRequest 
     SET  isOk = ${isOk}
   WHERE  id = ${id};
    `;

  const historyQ = `
  INSERT  INTO  buyRequestHistory
     (
      content,
      buyRequestId,
      updator,
      createdAt,
      updatedAt
     )
     VALUES
     (
      "구매요청 승인",
      ${id},
      ${req.user.id},
      NOW(),
      NOW()
     )
  `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(historyQ);

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
 * DEVELOPMENT : 주니어 개발자 홍민기
 * DEV DATE : 2023/01/25
 */
router.post("/isReject", isAdminCheck, async (req, res, next) => {
  const { id, isReject, rejectMessage } = req.body;

  const updateQ = `
  UPDATE  buyRequest 
     SET  isReject = ${isReject},
          rejectMessage = "${rejectMessage}"
   WHERE  id = ${id};
    `;

  const historyQ = `
    INSERT  INTO  buyRequestHistory
       (
        content,
        buyRequestId,
        updator,
        createdAt,
        updatedAt
       )
       VALUES
       (
        "구매요청 거절",
        ${id},
        ${req.user.id},
        NOW(),
        NOW()
       )
    `;

  try {
    await models.sequelize.query(updateQ);
    await models.sequelize.query(historyQ);

    return res.status(200).json({ result: true });
  } catch (e) {
    console.error(e);
    return res.status(401).send("구매요청을 조회할 수 없습니다.");
  }
});

module.exports = router;
