const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 포인트 이력
 * PARAMETERS : page, startDate, endDate, pointType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/06/28
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { page, startDate, endDate, pointType } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const _startDate = startDate ? startDate : ``;
  const _endDate = endDate ? endDate : ``;

  const _pointType = parseInt(pointType) || 1;

  const lengthQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY createdAt)       AS num,
            id,
            pointType,
            type,
            content,
            price,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")          AS viewCreatedAt,
            DATE_FORMAT(createdAt, "%Y.%m.%d %H:%i")        AS viewFrontCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")          AS viewUpdatedAt,
            UserId
    FROM    userPoint
   WHERE    UserId = ${req.user.id}
            ${
              _startDate !== `` && _endDate !== ``
                ? `
                AND DATE_FORMAT(createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                : ``
            }
            ${
              _pointType === 1
                ? `AND pointType = "적립"`
                : _pointType === 2
                ? `AND pointType = "사용"`
                : `AND pointType = "적립"`
            }
  `;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY createdAt)       AS num,
            id,
            pointType,
            type,
            content,
            price,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")          AS viewCreatedAt,
            DATE_FORMAT(createdAt, "%Y.%m.%d %H:%i")        AS viewFrontCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")          AS viewUpdatedAt,
            UserId
    FROM    userPoint
   WHERE    UserId = ${req.user.id}
            ${
              _startDate !== `` && _endDate !== ``
                ? `
                AND DATE_FORMAT(createdAt, "%Y-%m-%d") >= DATE_FORMAT("${_startDate}", "%Y-%m-%d")
                AND DATE_FORMAT(createdAt, "%Y-%m-%d") <= DATE_FORMAT("${_endDate}", "%Y-%m-%d")
                `
                : ``
            }
            ${
              _pointType === 1
                ? `AND pointType = "적립"`
                : _pointType === 2
                ? `AND pointType = "사용"`
                : `AND pointType = "적립"`
            }
   ORDER    BY num DESC
   LIMIT    ${LIMIT}
  OFFSET    ${OFFSET}
  `;
  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const point = await models.sequelize.query(selectQuery);

    const pointLen = lengths[0].length;

    const lastPage =
      pointLen % LIMIT > 0 ? pointLen / LIMIT + 1 : pointLen / LIMIT;

    return res.status(200).json({
      points: point[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("포인트 이력을 조회할 수 없습니다.");
  }
});

module.exports = router;
