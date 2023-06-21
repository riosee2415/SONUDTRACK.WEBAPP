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
 * DEV DATE : 2023/06/14
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
 * DEV DATE : 2023/06/14
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
 * DEV DATE : 2023/06/14
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
 * DEV DATE : 2023/06/14
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

module.exports = router;
