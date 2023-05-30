const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 판매자 신청리스트
 * PARAMETERS : UserId, isMusictem, isArtistem, status
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/26
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const { UserId, isMusictem, isArtistem, status } = req.body;

  const _UserId = UserId ? UserId : false;
  const _isMusictem = parseInt(isMusictem) || 3;
  const _isArtistem = parseInt(isArtistem) || 3;

  const _status = parseInt(status) || 4;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)     AS num,
            A.id,
            A.isMusictem,
            A.isArtistem,
            A.activity,
            A.genre,
            A.filename,
            A.filepath,
            A.status,
            CASE
                    WHEN    A.status = 1    THEN "승인 대기중"
                    WHEN    A.status = 2    THEN "승인"
                    WHEN    A.status = 3    THEN "반려"
            END                                            AS viewStatus,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")      AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")      AS viewUpdatedAt,
            A.completedAt,
            DATE_FORMAT(A.completedAt, "%Y년 %m월 %d일")     AS viewCompletedAt,
            A.UserId,
            B.userId,
            B.email,
            B.mobile,
            B.username
    FROM    seller      A
   INNER
    JOIN    users       B
      ON    A.UserId = B.id
   WHERE    1 = 1
            ${_UserId ? `AND A.UserId = ${_UserId}` : ``}
            ${
              _isMusictem === 1
                ? `AND A.isMusictem = 0`
                : _isMusictem === 2
                ? `AND A.isMusictem = 1`
                : _isMusictem === 3
                ? ``
                : ``
            }
            ${
              _isArtistem === 1
                ? `AND A.isArtistem = 0`
                : _isArtistem === 2
                ? `AND A.isArtistem = 1`
                : _isArtistem === 3
                ? ``
                : ``
            }
            ${
              _status === 1
                ? `AND A.status = 1`
                : _status === 2
                ? `AND A.status = 2`
                : _status === 3
                ? `AND A.status = 3`
                : _status === 4
                ? ``
                : ``
            }
   ORDER    BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
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
   WHERE    status = 2
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

/**
 * SUBJECT : 판매자 신청 승인 / 반려 라우터
 * PARAMETERS : id, status, UserId, userId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/26
 */
router.post("/admin/permit", isAdminCheck, async (req, res, next) => {
  const { id, status, UserId, userId } = req.body;

  if (parseInt(status) !== 2 && parseInt(status) !== 3) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const findQuery = `
  SELECT    isMusictem,
            isArtistem,
            status
    FROM    seller
   WHERE    id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("존재하지 않는 판매자 신청 이력입니다.");
    }

    if (parseInt(findResult[0][0].status) !== 1) {
      return res.status(401).send("이미 처리된 신청 이력입니다.");
    }

    if (parseInt(status) === 2) {
      const updateQuery = `
      UPDATE    seller
         SET    status = 2,
                completedAt = NOW()
       WHERE    id = ${id}
      `;

      const historyInsertQuery = `
        INSERT    INTO  sellerHistory
        (
          title,
          content,
          updator,
          createdAt,
          updatedAt
        ) 
        VALUES
        (
          "판매자 신청 승인",
          "${userId} 아이디 회원 판매자 신청 승인",
          updator,
          createdAt,
          updatedAt
        ) 
        `;

      if (findResult[0][0].isMusictem) {
        const insertQuery = `
        INSERT  INTO    musictem
        (
            artistName,
            profileImage,
            profileImageName,
            createdAt,
            updatedAt,
            UserId
        )
        VALUES
        (
            NULL,
            NULL,
            NULL,
            NOW(),
            NOW(),
            ${UserId}
        )
        `;

        await models.sequelize.query(insertQuery);
      }

      if (findResult[0][0].isArtistem) {
        const insertQuery = `
        INSERT  INTO    artistem
        (
            name,
            companyName,
            artistName,
            artistProfileImage,
            artistInfo,
            question1,
            question2,
            question3,
            question4,
            question5,
            question6,
            question7,
            question8,
            isVacation,
            isUpdate,
            createdAt,
            updatedAt,
            UserId
        )
        VALUES
        (
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NOW(),
            NOW(),
            ${UserId}
        )
        `;

        await models.sequelize.query(insertQuery);
      }

      await models.sequelize.query(updateQuery);
      await models.sequelize.query(historyInsertQuery);

      return res.status(200).json({ result: true });
    }

    if (parseInt(status) === 3) {
      const updateQuery = `
      UPDATE    seller
         SET    status = 3,
                completedAt = NOW()
       WHERE    id = ${id}
      `;

      const historyInsertQuery = `
      INSERT    INTO  sellerHistory
      (
        title,
        content,
        updator,
        createdAt,
        updatedAt
      ) 
      VALUES
      (
        "판매자 신청 반려",
        "${userId} 아이디 회원 판매자 신청 반려",
        updator,
        createdAt,
        updatedAt
      ) 
      `;

      await models.sequelize.query(updateQuery);
      await models.sequelize.query(historyInsertQuery);

      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("판매자 신청 정보를 승인 / 반려할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 정보 입력 라우터
 * PARAMETERS : name,
                profileImage,
                companyName,
                artistName,
                artistProfileImage,
                artistInfo,
                question1,
                question2,
                question3,
                question4,
                question5,
                question6,
                question7,
                question8,
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */

module.exports = router;
