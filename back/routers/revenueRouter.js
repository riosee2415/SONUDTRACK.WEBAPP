const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 수익관리
 * PARAMETERS : page, startDate, endDate, type
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/28
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { page, startDate, endDate, type } = req.body;

  if (!type) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  const _startDate = startDate ? startDate : ``;
  const _endDate = endDate ? endDate : ``;

  const _type = parseInt(type) || 1;
  // type이 1 이라면 Artistem
  // type이 2 이라면 Musictem
  // type이 3 이라면 Artworks

  try {
    if (parseInt(_type) === 1) {
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
           AND  isOk = 1
           AND  isReject = 0
           AND  isPay = 1
           AND  isCompleted = 1
                ${
                  _startDate !== `` && _endDate !== ``
                    ? `
                AND DATE_FORMAT(A.createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(A.createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                    : ``
                }
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
           AND  isOk = 1
           AND  isReject = 0
           AND  isPay = 1
           AND  isCompleted = 1
                ${
                  _startDate !== `` && _endDate !== ``
                    ? `
                AND DATE_FORMAT(A.createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(A.createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                    : ``
                }
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
    }

    if (parseInt(type) === 2) {
      const lengthQuery = `
      SELECT	ROW_NUMBER()	OVER(ORDER	BY B.createdAt)		AS num,
                A.id,
                A.thumbnail,
                A.albumName,
                A.songName,
                A.price,
                A.trackId,
                B.name,
                B.email,
                B.mobile,
                B.createdAt,
                DATE_FORMAT(B.createdAt, "%Y.%m.%d")			AS viewCreatedAt,
                B.payWay,
                B.usePoint,
                CONCAT(FORMAT(B.usePoint, 0), "원")              AS viewUsePrice
        FROM	wishItem		A
       INNER
        JOIN	boughtHistory 	B
          ON	A.BoughtHistoryId = B.id
       INNER
        JOIN	track 			C
          ON	A.trackId = C.id
       INNER
        JOIN	album 			D
          ON	C.AlbumId = D.id
       INNER
        JOIN	musictem 		E
          ON	D.MusictemId = E.id
       WHERE	E.UserId = ${req.user.id}
                ${
                  _startDate !== `` && _endDate !== ``
                    ? `
                AND DATE_FORMAT(B.createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(B.createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                    : ``
                }
        `;

      const selectQuery = `
        SELECT	ROW_NUMBER()	OVER(ORDER	BY B.createdAt)		AS num,
                A.id,
                A.thumbnail,
                A.albumName,
                A.songName,
                A.price,
                A.trackId,
                B.name,
                B.email,
                B.mobile,
                B.createdAt,
                DATE_FORMAT(B.createdAt, "%Y.%m.%d")			AS viewCreatedAt,
                B.payWay,
                B.usePoint,
                CONCAT(FORMAT(B.usePoint, 0), "원")              AS viewUsePrice
        FROM	wishItem		A
       INNER
        JOIN	boughtHistory 	B
          ON	A.BoughtHistoryId = B.id
       INNER
        JOIN	track 			C
          ON	A.trackId = C.id
       INNER
        JOIN	album 			D
          ON	C.AlbumId = D.id
       INNER
        JOIN	musictem 		E
          ON	D.MusictemId = E.id
       WHERE	E.UserId = ${req.user.id}
                ${
                  _startDate !== `` && _endDate !== ``
                    ? `
                AND DATE_FORMAT(B.createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(B.createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                    : ``
                }
         ORDER  BY num DESC
         LIMIT  ${LIMIT}
        OFFSET  ${OFFSET}
        `;

      const lengths = await models.sequelize.query(lengthQuery);
      const item = await models.sequelize.query(selectQuery);

      const itemLen = lengths[0].length;

      const lastPage =
        itemLen % LIMIT > 0 ? itemLen / LIMIT + 1 : itemLen / LIMIT;

      return res.status(200).json({
        items: item[0],
        lastPage: parseInt(lastPage),
      });
    }

    // if (parseInt(type) === 3) {
    // }
  } catch (error) {
    console.error(error);
    return res.status(401).send("수익 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 수익관리
 * PARAMETERS :  startDate, endDate, type, UserId, artistName
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/28
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { startDate, endDate, type, UserId, artistName } = req.body;

  if (!type) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const _startDate = startDate ? startDate : ``;
  const _endDate = endDate ? endDate : ``;
  const _artistName = artistName ? artistName : ``;

  const _UserId = UserId ? UserId : false;

  const _type = parseInt(type) || 1;
  // type이 1 이라면 Artistem
  // type이 2 이라면 Musictem
  // type이 3 이라면 Artworks

  try {
    if (parseInt(_type) === 1) {
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
          FROM  artistContact		  A
         INNER
          JOIN  users             B
            ON  A.UserId = B.id
         INNER
          JOIN  artistem          C
            ON  A.ArtistemId = C.id
         WHERE  1 = 1
           AND  A.isDelete = 0
                ${_UserId ? `AND  C.UserId = ${_UserId}` : ``}
           AND  C.artistName LIKE "%${_artistName}%"
           AND  isOk = 1
           AND  isReject = 0
           AND  isPay = 1
           AND  isCompleted = 1
                ${
                  _startDate !== `` && _endDate !== ``
                    ? `
                AND DATE_FORMAT(A.createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(A.createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                    : ``
                }
         ORDER  BY num DESC
        `;

      const contact = await models.sequelize.query(selectQuery);

      return res.status(200).json(contact[0]);
    }

    if (parseInt(type) === 2) {
      const selectQuery = `
        SELECT	ROW_NUMBER()	OVER(ORDER	BY B.createdAt)		AS num,
                A.id,
                A.thumbnail,
                A.albumName,
                A.songName,
                A.price,
                A.trackId,
                B.name,
                B.email,
                B.mobile,
                B.createdAt,
                DATE_FORMAT(B.createdAt, "%Y.%m.%d")			AS viewCreatedAt,
                B.payWay,
                B.usePoint,
                CONCAT(FORMAT(B.usePoint, 0), "원")              AS viewUsePointPrice,
                CONCAT(FORMAT(A.price, 0), "원")              AS viewTotalPrice
        FROM	wishItem		A
       INNER
        JOIN	boughtHistory 	B
          ON	A.BoughtHistoryId = B.id
       INNER
        JOIN	track 			C
          ON	A.trackId = C.id
       INNER
        JOIN	album 			D
          ON	C.AlbumId = D.id
       INNER
        JOIN	musictem 		E
          ON	D.MusictemId = E.id
       WHERE	1 = 1
                ${_UserId ? `AND E.UserId = ${_UserId}` : ``}
          AND   E.artistName LIKE "%${_artistName}%"
                ${
                  _startDate !== `` && _endDate !== ``
                    ? `
                AND DATE_FORMAT(B.createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(B.createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                    : ``
                }
         ORDER  BY num DESC
        `;

      const item = await models.sequelize.query(selectQuery);

      return res.status(200).json(item[0]);
    }

    // if (parseInt(type) === 3) {
    // }
  } catch (error) {
    console.error(error);
    return res.status(401).send("수익 목록을 조회할 수 없습니다.");
  }
});

module.exports = router;
