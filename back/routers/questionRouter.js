const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Question, QuestionType, User } = require("../models");
const models = require("../models");

const router = express.Router();

// QUESTION TYPE
router.get("/type/list/", async (req, res, next) => {
  try {
    const types = await QuestionType.findAll({
      where: { isDelete: false },
      order: [["value", "ASC"]],
    });

    return res.status(200).json(types);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 유형을 불러올 수 없습니다.");
  }
});

router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  try {
    await QuestionType.create({
      value,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("새로운 유형을 등록할 수 없습니다.");
  }
});

router.patch("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  try {
    const exQuestionType = await QuestionType.findOne({
      where: { id: parseInt(id) },
    });

    if (!exQuestionType) {
      return res.status(401).send("존재하지 않는 유형 입니다.");
    }

    const updateResult = await QuestionType.update(
      {
        value,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    if (updateResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        "유형 데이터를 수정할 수 없습니다. 개발사에 문의해주세요. [CODE 065]"
      );
  }
});

router.delete(
  "/type/delete/:questionTypeId",
  isAdminCheck,
  async (req, res, next) => {
    const { questionTypeId } = req.params;

    try {
      const exQuestionType = await QuestionType.findOne({
        where: { id: parseInt(questionTypeId) },
      });

      if (!exQuestionType) {
        return res.status(401).send("존재하지 않는 유형 입니다.");
      }

      const updateResult = await QuestionType.update(
        {
          isDelete: true,
        },
        {
          where: { id: parseInt(questionTypeId) },
        }
      );

      if (updateResult[0] > 0) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send(
          "유형 데이터를 삭제할 수 없습니다. 개발사에 문의해주세요. [CODE 066]"
        );
    }
  }
);

// QUESTION
router.post("/list", isAdminCheck, async (req, res, next) => {
  const selectQuery = `
    SELECT  ROW_NUMBER() OVER(ORDER	BY createdAt)		AS num,
        		id,
        		name,
        		email,
        		title,
        		content,
        		createdAt,
        		DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,  
        		updatedAt,
        		DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt
      FROM  questions q 
     WHERE  isDelete = 0
     ORDER  BY createdAt DESC
    `;

  try {
    const result = await models.sequelize.query(selectQuery);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 가져올 수 없습니다. [CODE 036]");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { title, content, name, email } = req.body;

  const insertQuery = `
  INSERT INTO questions (
    name,
    email,
    title,
    content,
    createdAt,
    updatedAt,
    UserId 
  )
  VALUES
  (
    "${name}",
    "${email}",
    "${title}",
    "${content}",
    NOW(),
    NOW(),
    ${req.user.id}
  )
  `;

  try {
    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 생성할 수 없습니다. [CODE 037]");
  }
});

router.post("/delete", isAdminCheck, async (req, res, next) => {
  const { questionId } = req.body;

  const selectQuery = `
  SELECT  id
    FROM  questions
   WHERE  isDelete = 0
     AND  id = ${questionId}
  `;

  const updateQuery = `
  UPDATE  questions
     SET  isDelete = 1,
          deletedAt = NOW()
   WHERE  id = ${questionId}
  `;

  try {
    const question = await models.sequelize.query(selectQuery);

    if (question[0].length !== 0) {
      return res.status(400).send("해당 문의 내용이 없습니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의내용을 삭제할 수 없습니다. [CODE 036]");
  }
});

module.exports = router;
