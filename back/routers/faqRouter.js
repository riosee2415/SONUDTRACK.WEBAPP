const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const router = express.Router();

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// TYPE ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : FAQ 유형 리스트
 * PARAMETERS : UserId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/type/list", async (req, res, next) => {
  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.value)					AS num,
            A.id,
            A.value,
            B.username, 
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일") 		AS viewCreatedAt,
            DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일") 		AS viewUpdatedAt,
            A.createdAt,
            A.updatedAt 
      FROM  faqType		A 
     INNER
      JOIN	users		  B
        ON	A.updator = B.id
     WHERE  A.isDelete = 0
     ORDER  BY  num ASC
    `;

  try {
    const result = await models.sequelize.query(selectQ);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send("자주묻는질문 유형 데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 유형 삭제
 * PARAMETERS : value, id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/type/delete", isAdminCheck, async (req, res, next) => {
  const { value, id } = req.body;

  const deleteQuery = `
    UPDATE  faqType
       SET  isDelete = 1,
            updatedAt = now(),
            deletedAt = now(),
            updator = ${req.user.id}
     WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO faqHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 삭제",
    "${value}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 유형을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 유형 생성
 * PARAMETERS : value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  const insertQuery = `
    INSERT INTO faqType
    (
      value,
      updator,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "${value}",
      ${req.user.id},
      now(),
      now()
    )
  `;

  const historyInsertQuery = `
  INSERT INTO faqHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 생성",
    "${value}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 유형을 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 유형 수정
 * PARAMETERS : id, value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQuery = `
    UPDATE  faqType
       SET  value = "${value}",
            updatedAt = NOW(),
            updator = ${req.user.id}
     WHERE  id = ${id}
      
  `;

  const historyInsertQuery = `
  INSERT INTO faqHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 수정",
    "${value}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 유형을 수정할 수 없습니다.");
  }
});

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// FAQ ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : FAQ 리스트
 * PARAMETERS : title, FaqTypeId, page
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/list", async (req, res, next) => {
  const { title, FaqTypeId, page } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const _title = title ? title : ``;
  const _FaqTypeId = parseInt(FaqTypeId) || false;

  const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.question,
          A.answer,
          A.FaqTypeId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.value                                     AS faqTypeValue,
          C.username                                  AS updator
    FROM  faq         A
   INNER
    JOIN  faqType     B
      ON  A.FaqTypeId = B.id
    LEFT
   OUTER
    JOIN  users       C
      ON  A.updator = C.id
   WHERE  A.isDelete = 0
     AND  A.question LIKE "%${_title}%"
          ${_FaqTypeId ? `AND A.FaqTypeId = ${_FaqTypeId}` : ``}
  `;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.question,
          A.answer,
          A.FaqTypeId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.value                                     AS faqTypeValue,
          C.username                                  AS updator
    FROM  faq         A
   INNER
    JOIN  faqType     B
      ON  A.FaqTypeId = B.id
    LEFT
   OUTER
    JOIN  users       C
      ON  A.updator = C.id
   WHERE  A.isDelete = 0
     AND  A.question LIKE "%${_title}%"
          ${_FaqTypeId ? `AND A.FaqTypeId = ${_FaqTypeId}` : ``}
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const faq = await models.sequelize.query(selectQuery);

    const faqLen = lengths[0].length;

    const lastPage = faqLen % LIMIT > 0 ? faqLen / LIMIT + 1 : faqLen / LIMIT;

    return res.status(200).json({
      faqs: faq[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 리스트 (관리자)
 * PARAMETERS : title, FaqTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/admin/list", isAdminCheck, async (req, res, next) => {
  const { title, FaqTypeId } = req.body;

  const _title = title ? title : ``;
  const _FaqTypeId = parseInt(FaqTypeId) || false;

  const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.question,
          A.answer,
          A.FaqTypeId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.value                                     AS faqTypeValue,
          C.username                                  AS updator
    FROM  faq         A
   INNER
    JOIN  faqType     B
      ON  A.FaqTypeId = B.id
    LEFT
   OUTER
    JOIN  users       C
      ON  A.updator = C.id
   WHERE  A.isDelete = 0
     AND  A.question LIKE "%${_title}%"
          ${_FaqTypeId ? `AND A.FaqTypeId = ${_FaqTypeId}` : ``}
   ORDER  BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 생성하기
 * PARAMETERS : FaqTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/create", isAdminCheck, async (req, res, next) => {
  const { FaqTypeId } = req.body;

  const insertQuery = `
  INSERT  INTO  faq
  (
    question,
    answer,
    updator,
    FaqTypeId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "임시 FAQ 질문",
    "임시 FAQ 답변",
    ${req.user.id},
    ${FaqTypeId},
    NOW(),
    NOW()
  )
  `;

  const historyInsertQuery = `
  INSERT INTO faqHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 생성",
    "임시 FAQ 질문",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 데이터를 생성할 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 수정하기
 * PARAMETERS : question, answer, FaqTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/update", isAdminCheck, async (req, res, next) => {
  const { id, question, answer, FaqTypeId } = req.body;

  const updateQuery = `
  UPDATE  faq
     SET  question = "${question}",
          answer = "${answer}",
          FaqTypeId = ${FaqTypeId},
          updatedAt = NOW(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO faqHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 수정",
    "${question}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 데이터를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 삭제하기
 * PARAMETERS : id, question
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { id, question } = req.body;

  const deleteQuery = `
  UPDATE  faq
     SET  isDelete = 1,
          deletedAt = NOW(),
          updator = ${req.user.id}
   WHERE  id = ${id}
  `;

  const historyInsertQuery = `
  INSERT INTO faqHistory
  (
    value,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES 
  (
    "데이터 삭제",
    "${question}",
    ${req.user.id},
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("자주묻는질문 데이터를 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : FAQ 내역 리스트
 * PARAMETERS : datePick
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.value,
            A.content,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	faqHistory		A
     INNER
      JOIN	users 			  B
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
