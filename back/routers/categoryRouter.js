const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

//////////////////////////////////////////////////////////////////////////////
////////////////////////////////// TYPE //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : 카테고리 목록[관리자]
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/type/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
  SELECT  
    FROM  cateType
  

    
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
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/type/update", isAdminCheck, async (req, res, next) => {
  const updateQuery = `

      
      `;
  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).send("카테고리 데이터를 수정할 수 없습니다.");
  }
});

module.exports = router;
