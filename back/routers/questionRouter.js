const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Question, QuestionType, User } = require("../models");
const models = require("../models");

const router = express.Router();
/**
 * SUBJECT : 1:1문의 내역
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { name, isConfirmed } = req.body;

  const _name = name ? name : ``;
  const _isConfirmed = isConfirmed ? isConfirmed : ``;
  // const _createdAt = createdAt ? createdAt : ``;

  const selectQuery = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY A.createdAt)		AS num,
        		A.id,
        		A.name,
        		A.email,
        		A.title,
        		A.content,
            A.isConfirmed,
        		A.createdAt,
        		A.updatedAt,
        		DATE_FORMAT(createdAt, "%Y. %m. %d")		AS viewCreatedAt,  
        		DATE_FORMAT(updatedAt, "%Y. %m. %d")		AS viewUpdatedAt
      FROM  questions   A
     WHERE  1 = 1
       AND  A.name LIKE "%${_name}%"
       AND  A.isConfirmed LIKE ${_isConfirmed}
     ORDER  BY num DESC
    `;
  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 가져올 수 없습니다. [CODE 036]");
  }
});
/**
 * SUBJECT : 1:1문의 내역 확인
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
  UPDATE  questions
     SET  isConfirmed = 1
   WHERE  id = ${id}

  `;

  const historyInsertQuery = `
  INSERT  INTO  questionHistory
  (
    content,
    questionId,
    updator,
    createdAt,
    updatedAt
  ) 
  VALUES
  (
    "문의 내역 확인"
    ${id},
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
    console.error(error);
    return res.status(401).send("문의 확인정보를 수정 할 수 없습니다.");
  }
});

/**
 * SUBJECT : 1:1문의 작성
 * PARAMETERS : title, content, name, email
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 장혜정
 * DEV DATE : 2023/05/23
 */

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { title, content, name, email } = req.body;

  const insertQuery = `
  INSERT INTO questions (
    title,
    content,
    email,
    name,
    isConfirmed,
    confirmedAt,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${title}",
    "${content}",
    "${email}",
    "${name}",
    0,
    NOW(),
    NOW(),
    NOW()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의를 작성할 수 없습니다. [CODE 037]");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	questionHistory		A
     INNER
      JOIN	users 			      B
        ON	A.updator = B.id  
     WHERE  1=1
      ${
        _datePick
          ? `AND  DATE_FORMAT(A.createdAt, "%Y%m%d") = DATE_FORMAT("${datePick}", "%Y%m%d")`
          : ""
      }
     ORDER  BY  A.createdAt  DESC
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 불러올 수 없습니다.");
  }
});

module.exports = router;
