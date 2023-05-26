const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 판매자 신청리스트
 * PARAMETERS : UserId, isMusictem, isArtistem
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/26
 */
router.post("/list", isAdminCheck, (req, res, next) => {
  const { UserId, isMusictem, isArtistem } = req.body;

  const _UserId = UserId ? UserId : false;
  const _isMusictem = isMusictem ? isMusictem : false;
  const _isArtistem = isArtistem ? isArtistem : false;

  try {
  } catch (error) {
    console.error(error);
    return res.status(401).send("판매자 신청 리스트를 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 판매자 신청하기
 * PARAMETERS :
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/26
 */
router.post("/seller/create", isLoggedIn, async (req, res, next) => {
  const { isMusictem, isArtistem, activity, genre, filename, filepath } =
    req.body;

  const findQuery = `
  SELECT    id
    FROM    seller
   WHERE    isComplete = 1
     AND    UserId = ${req.user.id}
  `;

  const insertQuery = `
  INSERT    INTO    seller
  (
    isMusictem,
    isArtistem,
    activity,
    genre,
    filename,
    filepath,
    createdAt,
    updatedAt,
    UserId
  )
  VALUES
  (
    ${isMusictem},
    ${isArtistem},
    "${activity}",
    "${genre}",
    "${filename}",
    "${filepath}",
    NOW(),
    NOW(),
    ${req.user.id}
  )
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length !== 0) {
      return res.status(401).send("이미 승인된 판매자 신청 이력이 존재합니다.");
    }

    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("판매자 신청을 진행할 수 없습니다.");
  }
});

module.exports = router;
