const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// WISH ITEM 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

/**
 * SUBJECT : 장바구니 상품 추가
 * PARAMETERS : wishItems
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/20
 */
router.post("/item/create", isLoggedIn, async (req, res, next) => {
  const { wishItems } = req.body;

  if (!Array.isArray(wishItems)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const findWishList = `
  SELECT  id
    FROM  wishList
   WHERE  UserId = ${req.user.id}
  `;

  try {
    const findResult = await models.sequelize.query(findWishList);

    let createResult = [];
    let findDatum = [];

    if (findResult[0].length === 0) {
      const createWishListQuery = `
        INSERT  INTO    wishList
        (
            createdAt,
            updatedAt,
            UserId
        )
        VALUES
        (   
            NOW(),
            NOW(),
            ${req.user.id}
        )
        `;

      createResult = await models.sequelize.query(createWishListQuery);
    }

    if (findResult[0].length !== 0) {
      await Promise.all(
        wishItems.map(async (data) => {
          const findQuery = `
                  SELECT  id
                    FROM  wishItem
                   WHERE  WishListId = ${findResult[0][0].id}
                     AND  BoughtHistoryId IS NULL
                     AND  trackId = ${data.trackId}
                  `;

          const findData = await models.sequelize.query(findQuery);

          if (findData[0].length !== 0) {
            findDatum.push(findData[0]);
          }
        })
      );
    }

    if (findDatum.length > 0) {
      return res.status(401).send("이미 장바구니에 등록된 상품이 존재합니다.");
    }

    await Promise.all(
      wishItems.map(async (data) => {
        const insertQuery = `
            INSERT    INTO    wishItem
            (
                thumbnail,
                albumName,
                songName,
                singerName,
                lisenceName,
                price,
                songFile,
                songFileName,
                trackId,
                isArtWorks,
                isMonopoly,
                ticketName,
                WishListId,
                createdAt,
                updatedAt
            )
            VALUES
            (
                "${data.thumbnail}",
                "${data.albumName}",
                "${data.songName}",
                "${data.singerName}",
                "${data.lisenceName}",
                ${data.price},
                "${data.songFile}",
                "${data.songFileName}",
                ${data.trackId},
                ${data.isArtWorks},
                ${data.isMonopoly},
                ${data.ticketName ? `"${data.ticketName}"` : null},
                ${
                  findResult[0].length !== 0
                    ? findResult[0][0].id
                    : createResult[0].insertId
                },
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
    return res.status(401).send("장바구니에 상품을 추가할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 상품 라이센스 변경
 * PARAMETERS : id, lisenceName, price
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/20
 */
router.post("/item/update", isLoggedIn, async (req, res, next) => {
  const { id, lisenceName, price } = req.body;

  const updateQuery = `
  UPDATE    wishItem
     SET    price = ${price},
            lisenceName = "${lisenceName}",
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("라이센스 정보를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장바구니 상품 삭제
 * PARAMETERS : itemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/20
 */
router.post("/item/delete", isLoggedIn, async (req, res, next) => {
  const { itemId } = req.body;
  // 배열로 받아주세요.

  if (!Array.isArray(itemId)) {
    return res.status(400).send("잘못된 요청입니다. 다시 시도해주세요.");
  }

  const deleteQuery = `
  DELETE
    FROM    wishItem
   WHERE    id IN (${itemId})
  `;

  try {
    await models.sequelize.query(deleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니 상품을 삭제할 수 없습니다.");
  }
});

/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// WISH LIST 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
/////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

/**
 * SUBJECT : 장바구니 상품 목록
 * PARAMETERS : itemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/20
 */
router.post("/list/view", isLoggedIn, async (req, res, next) => {
  const findWishList = `
  SELECT  id
    FROM  wishList
   WHERE  UserId = ${req.user.id}
  `;

  try {
    const findResult = await models.sequelize.query(findWishList);

    if (findResult[0].length === 0) {
      return res.status(200).json([]);
    }

    const selectQuery = `
      SELECT  A.id,
              A.thumbnail,
              A.albumName,
              A.songName,
              A.singerName,
              A.lisenceName,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")								                                                            AS viewPrice,
              A.songFile,
              A.songFileName,
              A.trackId,
              A.isArtWorks,
              A.isMonopoly,
              A.ticketName,
              CASE
                  WHEN	A.isArtWorks = 1 AND A.isMonopoly = 1 THEN "독점"
                  WHEN  A.isArtWorks = 1 AND A.isMonopoly = 0 THEN "비독점"
                  ELSE  NULL
              END														                                          	                                  AS monopolyName
        FROM  wishItem			   A
       INNER
        JOIN  wishList         B
          ON  A.WishListId = B.id
       WHERE  A.BoughtHistoryId IS NULL
         AND  A.WishListId = ${findResult[0][0].id}
          `;

    const myLists = await models.sequelize.query(selectQuery);

    return res.status(200).json(myLists[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("장바구니 목록을 불러올 수 없습니다.");
  }
});

//////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
// BOUGHT HISTORY 🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
//////////////////🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀

/**
 * SUBJECT : 결제 내역
 * PARAMETERS : page, startDate, endDate
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/27
 */
// type === 1 ? 아티스탬
// type === 2 ? 뮤직탬
// type === 3 ? 아트웍스
router.post("/all", isLoggedIn, async (req, res, next) => {
  const { type, page, startDate, endDate } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  const _startDate = startDate ? startDate : ``;
  const _endDate = endDate ? endDate : ``;

  const _type = parseInt(type) || 1;

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
         AND  A.isOk = 1
         AND  A.isReject = 0
         AND  A.isPay = 1
         AND  A.isCompleted = 1
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
         AND  A.isOk = 1
         AND  A.isReject = 0
         AND  A.isPay = 1
         AND  A.isCompleted = 1
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

    if (parseInt(_type) === 2) {
      const lengthQuery = `
      SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)    AS num,
              A.id,
              A.name,
              A.mobile,
              A.email,
              A.price,
              A.usePoint,
              A.payWay,
              A.mileagePrice,
              A.createdAt,
              A.updatedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              A.UserId
        FROM  boughtHistory   A
       WHERE  UserId = ${req.user.id}
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
      SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)    AS num,
              A.id,
              A.name,
              A.mobile,
              A.email,
              A.price,
              A.usePoint,
              A.payWay,
              A.mileagePrice,
              A.createdAt,
              A.updatedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              A.UserId
        FROM  boughtHistory   A
       WHERE  UserId = ${req.user.id}
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

      const boughtItemQuery = `
      SELECT  A.id,
              A.thumbnail,
              A.albumName,
              A.songName,
              A.singerName,
              A.lisenceName,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")								                   AS viewPrice,
              A.songFile,
              A.songFileName,
              A.trackId,
              A.isArtWorks,
              A.isMonopoly,
              A.ticketName,
              CASE
                  WHEN	A.isArtWorks = 1 AND A.isMonopoly = 1 THEN "독점"
                  WHEN  A.isArtWorks = 1 AND A.isMonopoly = 0 THEN "비독점"
                  ELSE  NULL
              END									                                              AS monopolyName,
              A.BoughtHistoryId
        FROM  wishItem			   A
       INNER
        JOIN  wishList         B
          ON  A.WishListId = B.id
       WHERE  A.BoughtHistoryId IS NOT NULL
           `;

      const lengths = await models.sequelize.query(lengthQuery);
      const boughtHistory = await models.sequelize.query(selectQuery);

      const boughtItems = await models.sequelize.query(boughtItemQuery);

      boughtHistory[0].map((ele) => {
        ele["boughtItems"] = [];

        boughtItems[0].map((innerItem) => {
          if (parseInt(ele.id) === parseInt(innerItem.BoughtHistoryId)) {
            ele.boughtItems.push(innerItem);
          }
        });
      });

      const boughtHistoryLen = lengths[0].length;

      const lastPage =
        boughtHistoryLen % LIMIT > 0
          ? boughtHistoryLen / LIMIT + 1
          : boughtHistoryLen / LIMIT;

      return res.status(200).json({
        boughtHistorys: boughtHistory[0],
        lastPage: parseInt(lastPage),
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("구매 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 결제 내역 (관리자)
 * PARAMETERS : type, name, UserId, startDate, endDate
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/27
 */
// type === 1 ? 아티스탬
// type === 2 ? 뮤직탬
// type === 3 ? 아트웍스
router.post("/all/admin", isLoggedIn, async (req, res, next) => {
  const { type, name, UserId, startDate, endDate } = req.body;

  const _type = parseInt(type) || 1;

  const _startDate = startDate ? startDate : ``;
  const _endDate = endDate ? endDate : ``;
  const _name = name ? name : ``;
  const _UserId = parseInt(UserId) || false;

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
        FROM  artistContact		A
       INNER
        JOIN  users             B
          ON  A.UserId = B.id
       INNER
        JOIN  artistem          C
          ON  A.ArtistemId = C.id
       WHERE  1 = 1
         AND  A.isDelete = 0
         AND  A.isOk = 1
         AND  A.isReject = 0
         AND  A.isPay = 1
         AND  A.isCompleted = 1
         AND  B.username LIKE "%${_name}%"
              ${_UserId ? `AND A.UserId = ${_UserId}` : ``}
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

    if (parseInt(_type) === 2) {
      const selectQuery = `
      SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)    AS num,
              A.id,
              A.name,
              A.mobile,
              A.email,
              A.price,
              A.usePoint,
              A.payWay,
              A.mileagePrice,
              A.createdAt,
              A.updatedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
              A.UserId
        FROM  boughtHistory   A
       WHERE  1 = 1
         AND  A.name LIKE "${_name}"
              ${_UserId ? `AND A.UserId = ${_UserId}` : ``}
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

      const boughtItemQuery = `
      SELECT  A.id,
              A.thumbnail,
              A.albumName,
              A.songName,
              A.singerName,
              A.lisenceName,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")								                   AS viewPrice,
              A.songFile,
              A.songFileName,
              A.trackId,
              A.isArtWorks,
              A.isMonopoly,
              A.ticketName,
              CASE
                  WHEN	A.isArtWorks = 1 AND A.isMonopoly = 1 THEN "독점"
                  WHEN  A.isArtWorks = 1 AND A.isMonopoly = 0 THEN "비독점"
                  ELSE  NULL
              END									                                              AS monopolyName,
              A.BoughtHistoryId
        FROM  wishItem			   A
       INNER
        JOIN  wishList         B
          ON  A.WishListId = B.id
       WHERE  A.BoughtHistoryId IS NOT NULL
           `;

      const boughtHistory = await models.sequelize.query(selectQuery);

      const boughtItems = await models.sequelize.query(boughtItemQuery);

      boughtHistory[0].map((ele) => {
        ele["boughtItems"] = [];

        boughtItems[0].map((innerItem) => {
          if (parseInt(ele.id) === parseInt(innerItem.BoughtHistoryId)) {
            ele.boughtItems.push(innerItem);
          }
        });
      });

      return res.status(200).json(boughtHistory[0]);
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("구매 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 음원 구매 내역
 * PARAMETERS : page, startDate, endDate
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/21
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { page } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)    AS num,
          A.id,
          A.name,
          A.mobile,
          A.email,
          A.price,
          A.usePoint,
          A.payWay,
          A.mileagePrice,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory   A
   WHERE  UserId = ${req.user.id}
  `;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)    AS num,
          A.id,
          A.name,
          A.mobile,
          A.email,
          A.price,
          A.usePoint,
          A.payWay,
          A.mileagePrice,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory   A
   WHERE  UserId = ${req.user.id}
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  const boughtItemQuery = `
      SELECT  A.id,
              A.thumbnail,
              A.albumName,
              A.songName,
              A.singerName,
              A.lisenceName,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")								                                                            AS viewPrice,
              A.songFile,
              A.songFileName,
              A.trackId,
              A.isArtWorks,
              A.isMonopoly,
              A.ticketName,
              CASE
                  WHEN	A.isArtWorks = 1 AND A.isMonopoly = 1 THEN "독점"
                  WHEN  A.isArtWorks = 1 AND A.isMonopoly = 0 THEN "비독점"
                  ELSE  NULL
              END														                                          	                                  AS monopolyName,
              A.BoughtHistoryId
        FROM  wishItem			   A
       INNER
        JOIN  wishList         B
          ON  A.WishListId = B.id
       WHERE  A.BoughtHistoryId IS NOT NULL
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const boughtHistory = await models.sequelize.query(selectQuery);

    const boughtItems = await models.sequelize.query(boughtItemQuery);

    boughtHistory[0].map((ele) => {
      ele["boughtItems"] = [];

      boughtItems[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.BoughtHistoryId)) {
          ele.boughtItems.push(innerItem);
        }
      });
    });

    const boughtHistoryLen = lengths[0].length;

    const lastPage =
      boughtHistoryLen % LIMIT > 0
        ? boughtHistoryLen / LIMIT + 1
        : boughtHistoryLen / LIMIT;

    return res.status(200).json({
      boughtHistorys: boughtHistory[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("구매 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 음원 구매 내역 상세
 * PARAMETERS : BoughtHistoryId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/21
 */
router.post("/detail", isLoggedIn, async (req, res, next) => {
  const { BoughtHistoryId } = req.body;

  const detailQuery = `
  SELECT  A.id,
          A.name,
          A.mobile,
          A.email,
          A.price,
          A.usePoint,
          A.payWay,
          A.mileagePrice,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory   A
   WHERE  A.id = ${BoughtHistoryId}
  `;

  const boughtItemQuery = `
      SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)       AS num,
              A.id,
              A.thumbnail,
              A.albumName,
              A.songName,
              A.singerName,
              A.lisenceName,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")								                                                            AS viewPrice,
              A.songFile,
              A.songFileName,
              A.trackId,
              A.isArtWorks,
              A.isMonopoly,
              A.ticketName,
              CASE
                  WHEN	A.isArtWorks = 1 AND A.isMonopoly = 1 THEN "독점"
                  WHEN  A.isArtWorks = 1 AND A.isMonopoly = 0 THEN "비독점"
                  ELSE  NULL
              END														                                          	                                  AS monopolyName,
              A.BoughtHistoryId
        FROM  wishItem			   A
       INNER
        JOIN  wishList         B
          ON  A.WishListId = B.id
       WHERE  A.BoughtHistoryId = ${BoughtHistoryId}
       ORDER  BY num DESC
  `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 구매내역 정보입니다.");
    }

    const boughtItem = await models.sequelize.query(boughtItemQuery);

    return res.status(200).json({
      detailData: detailData[0][0],
      boughtItem: boughtItem[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("구매 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 음원 구매내역
 * PARAMETERS : name, startDate, endDate
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/21
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { name, startDate, endDate } = req.body;

  const _name = name ? name : ``;
  const _startDate = startDate ? startDate : ``;
  const _endDate = endDate ? endDate : ``;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)    AS num,
          A.id,
          A.name,
          A.mobile,
          A.email,
          A.price,
          A.usePoint,
          A.payWay,
          A.mileagePrice,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          A.UserId
    FROM  boughtHistory   A
   WHERE  A.name LIKE "%${_name}%"
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

  const boughtItemQuery = `
      SELECT  A.id,
              A.thumbnail,
              A.albumName,
              A.songName,
              A.singerName,
              A.lisenceName,
              A.price,
              CONCAT(FORMAT(A.price, 0), "원")								                                                            AS viewPrice,
              A.songFile,
              A.songFileName,
              A.trackId,
              A.isArtWorks,
              A.isMonopoly,
              A.ticketName,
              CASE
                  WHEN	A.isArtWorks = 1 AND A.isMonopoly = 1 THEN "독점"
                  WHEN  A.isArtWorks = 1 AND A.isMonopoly = 0 THEN "비독점"
                  ELSE  NULL
              END														                                          	                                  AS monopolyName,
              A.BoughtHistoryId
        FROM  wishItem			   A
       INNER
        JOIN  wishList         B
          ON  A.WishListId = B.id
       WHERE  A.BoughtHistoryId IS NOT NULL
  `;

  try {
    const boughtHistory = await models.sequelize.query(selectQuery);

    const boughtItems = await models.sequelize.query(boughtItemQuery);

    boughtHistory[0].map((ele) => {
      ele["boughtItems"] = [];

      boughtItems[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.BoughtHistoryId)) {
          ele.boughtItems.push(innerItem);
        }
      });
    });

    return res.status(200).json(boughtHistory[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("구매 내역을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 음원 구매
 * PARAMETERS : name,
                mobile,
                email,
                price,
                usePoint,
                payWay,
                mileagePrice,
                wishItemIds
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/21
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    name,
    mobile,
    email,
    price,
    usePoint,
    payWay,
    mileagePrice,
    wishItemIds,
  } = req.body;

  if (!Array.isArray(wishItemIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const insertQuery = `
    INSERT  INTO  boughtHistory
    (
      name,
      mobile,
      email,
      price,
      usePoint,
      payWay,
      mileagePrice,
      createdAt,
      updatedAt,
      UserId
    )
    VALUES
    (
      "${name}",
      "${mobile}",
      "${email}",
      ${price},
      ${usePoint},
      "${payWay}",
      ${mileagePrice},
      NOW(),
      NOW(),
      ${req.user.id}
    )
    `;

  let userMileagePoint = parseInt(price) * (parseFloat(1.0) / 100);
  let usersPoint = parseInt(req.user.point);

  try {
    if (parseInt(usePoint) > 0) {
      if (parseInt(req.user.point) < parseInt(usePoint)) {
        return res
          .status(401)
          .send("보유중인 포인트보다 더 많은 금액을 입력했습니다.");
      }

      const userPointUpdateQuery = `
        UPDATE  users
           SET  point = ${parseInt(usersPoint) - parseInt(usePoint)}
         WHERE  id = ${req.user.id}
        `;

      usersPoint = parseInt(usersPoint) - parseInt(usePoint);

      await models.sequelize.query(userPointUpdateQuery);
    }

    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      wishItemIds.map(async (data) => {
        const updateItemQuery = `
        UPDATE  wishItem  
           SET  BoughtHistoryId = ${insertResult[0].insertId}
         WHERE  id = ${data}
        `;

        await models.sequelize.query(updateItemQuery);
      })
    );

    const userUpdateQuery = `
      UPDATE    users
         SET    point = ${parseInt(usersPoint) + parseInt(userMileagePoint)}
       WHERE    id = ${req.user.id}
      `;

    await models.sequelize.query(userUpdateQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("구매를 진행할 수 없습니다.");
  }
});

module.exports = router;
