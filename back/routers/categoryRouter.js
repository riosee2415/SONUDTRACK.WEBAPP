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

//////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 카테고리 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : 카테고리 리스트
 * PARAMETERS : CateTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */

router.post("/list", async (req, res, next) => {
  const { CateTypeId } = req.body;

  const selectQuery = `
    SELECT  ROW_NUMBER()  OVER(ORDER BY A.createdAt)    AS num,
            A.id,
            A.value,
            A.CateTypeId,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, "%Y. %m. %d") 		AS viewFrontCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt   
      FROM  category    A
     INNER
      JOIN  cateType  B
        ON  A.CateTypeId = B.id
     WHERE  A.CateTypeId = ${CateTypeId}
       AND  A.isDelete = 0
     ORDER  BY  num DESC
  `;

  try {
    const category = await models.sequelize.query(selectQuery);

    return res.status(200).json(category[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("카테고리 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 카테고리 리스트[관리자]
 * PARAMETERS : CateTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { CateTypeId } = req.body;

  const selectQuery = `
    SELECT  ROW_NUMBER()  OVER(ORDER BY A.createdAt)    AS num,
            A.id,
            A.value,
            A.CateTypeId,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
            DATE_FORMAT(A.createdAt, "%Y. %m. %d") 		AS viewFrontCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt   
      FROM  category    A
     INNER
      JOIN  cateType  B
        ON  A.CateTypeId = B.id
     WHERE  A.CateTypeId = ${CateTypeId}
       AND  A.isDelete = 0
     ORDER  BY  num DESC
  `;

  try {
    const category = await models.sequelize.query(selectQuery);

    return res.status(200).json(category[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("카테고리 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 카테고리 생성
 * PARAMETERS : CateTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const { CateTypeId } = req.body;

  const insertQuery = `
  INSERT  INTO  category
  (
    value,
    CateTypeId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "임시 카테고리",
    ${CateTypeId},
    NOW(),
    NOW()
  )
  `;

  const historyInsertQuery = `
  INSERT  INTO  cateTypeHistory
  (
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "임시 카테고리",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("카테고리를 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : 카테고리 수정
 * PARAMETERS : CateTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, value, CateTypeId } = req.body;

  const updateQuery = `
  UPDATE  category
     SET  value = "${value}",
          CateTypeId = ${CateTypeId},
          updatedAt  = NOW()
   WHERE  id = ${id}
  `;

  const historyUpdateQuery = `
  INSERT  INTO  cateTypeHistory
  (
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${value}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyUpdateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("카테고리를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 카테고리 삭제
 * PARAMETERS : CateTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/24
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const deleteQuery = `
  UPDATE  category
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${id}
  `;

  const historyDeleteQuery = `
  INSERT  INTO  cateTypeHistory
  (
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${value}",
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyDeleteQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("카테고리를 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 카테고리 전체 리스트
 * PARAMETERS :  -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 김동현
 * DEV DATE : 2023/06/15
 */
router.post("/all/List", async (req, res, next) => {
  const typeSQ = `
        SELECT	id,
                category                                AS label,
                createdAt,
                updatedAt
          FROM	cateType
         ORDER  BY createdAt DESC
    `;

  const categorySQ = `
      SELECT  ROW_NUMBER()  OVER(ORDER BY createdAt)    AS num,
              id,
              value,
              CateTypeId,
              createdAt,
              updatedAt
        FROM  category    
       WHERE  isDelete = 0
       ORDER  BY  num DESC
    `;

  try {
    const typeResult = await models.sequelize.query(typeSQ);
    const categoryResult = await models.sequelize.query(categorySQ);

    typeResult[0].map((item) => {
      item["options"] = [];

      categoryResult[0].map((innerItem) => {
        if (parseInt(item.id) === parseInt(innerItem.CateTypeId)) {
          item.options.push({ label: innerItem.value, value: innerItem.id });
        }
      });
    });

    return res.status(200).json(typeResult[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("전체 카테고리목록을 불러올 수 없습니다.");
  }
});

module.exports = router;
