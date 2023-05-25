const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// TYPE ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : 카테고리 목록[관리자]
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/type/list", async (req, res, next) => {
  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER BY createdAt) 	AS num,
          id,
          category,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")	AS viewCreatedAt,
          DATE_FORMAT(createdAt, "%Y.%m.%d")		AS viewFrontCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")	AS viewUpdatedAt
    FROM	cateType
   ORDER  BY num ASC
    `;
  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).send("카테고리 데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 카테고리 수정[관리자]
 * PARAMETERS : id, category
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, category } = req.body;

  const updateQuery = `
  UPDATE	cateType 
     SET	category = "${category}",
          updatedAt = NOW()
   WHERE	id = ${id}
  `;

  const historyInsertQuery = `
  INSERT  INTO cateTypeHistory
  (
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUE
  (
    "카테고리 유형 수정",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("카테고리 데이터를 수정할 수 없습니다.");
  }
});

module.exports = router;
