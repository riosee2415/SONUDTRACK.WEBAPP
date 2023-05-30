const express = require("express");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

/**
 * SUBJECT : 태그 유형 리스트
 * PARAMETERS : -
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/type/list", async (req, res, next) => {
  const typeSelectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY createdAt)       AS num,
            id,
            value,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt, "%Y년 %m월 %d일")         AS viewCreatedAt,
            DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")         AS viewUpdatedAt
    FROM    tagType
   WHERE    isDelete = 0
   ORDER    BY num DESC
  `;

  const underSelectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY createdAt)       AS num,
            id,
            tagValue,
            createdAt,
            updatedAt,
            TagTypeId
    FROM    tag             
   WHERE    isDelete = 0
   ORDER    BY num DESC
  `;

  try {
    const typeSelectResult = await models.sequelize.query(typeSelectQuery);
    const underSelectResult = await models.sequelize.query(underSelectQuery);

    typeSelectResult[0].map((ele) => {
      ele["underValues"] = [];

      underSelectResult[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.TagTypeId)) {
          ele.underValues.push(innerItem);
        }
      });
    });

    return res.status(200).json(typeSelectResult[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그 유형 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 태그 유형 등록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const insertQuery = `
    INSERT  INTO    tagType
    (
        value,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "임시 태그 유형",
        NOW(),
        NOW()
    )
    `;

  const insertHistoryQuery = `
    INSERT  INTO    tagHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "태그 유형 데이터 생성",
        "임시 태그 유형",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그 유형을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 태그 유형 수정
 * PARAMETERS : id, value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQuery = `
  UPDATE    tagType
     SET    value = "${value}",
            updatedAt = NOW()
   WHERE    id = ${id}

  `;

  const insertHistoryQuery = `
    INSERT  INTO    tagHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "태그 유형 데이터 수정",
        "${value}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그 유형을 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 태그 유형 삭제
 * PARAMETERS : id, value
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/type/delete", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const deleteQuery = `
  UPDATE    tagType
     SET    isDelete = 1,
            deletedAt = NOW()
   WHERE    id = ${id}

  `;

  const insertHistoryQuery = `
    INSERT  INTO    tagHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "태그 유형 데이터 삭제",
        "${value}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그 유형을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 태그 리스트
 * PARAMETERS : TagTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/under/list", async (req, res, next) => {
  const { TagTypeId } = req.body;

  const _TagTypeId = TagTypeId ? TagTypeId : false;

  const selectQuery = `
  SELECT    ROW_NUMBER()    OVER(ORDER  BY A.createdAt)       AS num,
            A.id,
            A.tagValue,
            A.createdAt,
            A.updatedAt,
            A.TagTypeId,
            B.value                                           AS topValue
    FROM    tag             A
   INNER
    JOIN    tagType         B
      ON    A.TagTypeId = B.id
   WHERE    A.isDelete = 0
     AND    B.isDelete = 0
            ${_TagTypeId ? `AND A.TagTypeId = ${_TagTypeId}` : ``}
   ORDER    BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 태그 등록
 * PARAMETERS : TagTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/under/create", isAdminCheck, async (req, res, next) => {
  const { TagTypeId } = req.body;

  const insertQuery = `
  INSERT    INTO    tag
  (
    tagValue,
    TagTypeId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "임시 태그",
    ${TagTypeId},
    NOW(),
    NOW()
  )
  `;

  const insertHistoryQuery = `
    INSERT  INTO    tagHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "태그 데이터 생성",
        "임시 태그",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(insertQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그를 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 태그 수정
 * PARAMETERS : id, tagValue, TagTypeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/under/update", isAdminCheck, async (req, res, next) => {
  const { id, tagValue, TagTypeId } = req.body;

  const updateQuery = `
  UPDATE    tag
     SET    tagValue = "${tagValue}",
            TagTypeId = ${TagTypeId},
            updatedAt = NOW()
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
    INSERT  INTO    tagHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "태그 데이터 수정",
        "${tagValue}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 태그 삭제
 * PARAMETERS : id, tagValue
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/under/delete", isAdminCheck, async (req, res, next) => {
  const { id, tagValue } = req.body;

  const deleteQuery = `
  UPDATE    tag
     SET    isDelete = 1,
            deletedAt = NOW()
   WHERE    id = ${id}
  `;

  const insertHistoryQuery = `
    INSERT  INTO    tagHistory
    (
        title,
        content,
        updator,
        createdAt,
        updatedAt
    )
    VALUES
    (
        "태그 데이터 삭제",
        "${tagValue}",
        ${req.user.id},
        NOW(),
        NOW()
    )
    `;

  try {
    await models.sequelize.query(deleteQuery);
    await models.sequelize.query(insertHistoryQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("태그를 삭제할 수 없습니다.");
  }
});

module.exports = router;
