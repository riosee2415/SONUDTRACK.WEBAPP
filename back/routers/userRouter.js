const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");

const router = express.Router();

router.post("/list", isAdminCheck, async (req, res, next) => {
  const { searchData, searchLevel, searchExit, searchType } = req.body;

  const _searchData = searchData ? searchData : ``;

  const _searchLevel = parseInt(searchLevel) === 0 ? 0 : parseInt(searchLevel);

  const _searchExit = searchExit ? searchExit : false;

  // 아티스트 조회
  // 1번 : 전체 조회
  // 2번 : 아티스트 조회
  const _searchType = searchType ? searchType : 1;

  const selectQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY A.createdAt)		AS num,
          A.id,
          A.userId,
          A.email,
          A.username,
          A.nickname,
          A.mobile,
          A.level,
          A.isExit,
          CASE
            WHEN	A.level = 1	THEN "일반회원"
            WHEN	A.level = 2	THEN "비어있음"
            WHEN	A.level = 3	THEN "운영자"
            WHEN	A.level = 4	THEN "최고관리자"
            WHEN	A.level = 5	THEN "개발사"
          END											AS viewLevel,
          A.terms,
          A.terms2,
          A.terms3,
          A.terms4,
          A.terms5,
          A.terms6,
          A.createdAt,
          A.updatedAt,
          A.exitedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
		      DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
		      DATE_FORMAT(A.exitedAt, "%Y년 %m월 %d일")		AS viewExitedAt,
          CASE
            WHEN  (
                   SELECT  COUNT(B.id)
                     FROM  artist		B
                    WHERE  B.isPermm = 1	 
                      AND  B.UserId = A.id
                  ) > 0
            THEN  "아티스트"
            ELSE  "일반"
          END                    AS  isArtist
    FROM	users     A
   WHERE	CONCAT(A.username, A.email) LIKE '%${_searchData}%'
          ${
            _searchLevel === parseInt(0)
              ? ``
              : _searchLevel === 1
              ? `AND A.level = 1`
              : _searchLevel === 3
              ? `AND A.level = 3`
              : _searchLevel === 4
              ? `AND A.level = 4`
              : _searchLevel === 5
              ? `AND A.level = 5`
              : ``
          } 
          AND	A.isExit = ${_searchExit}
          ${
            _searchType === 1
              ? ``
              : `AND 0 < (
                          SELECT  COUNT(B.id)
                            FROM  artist		B
                           WHERE  B.isPermm = 1	 
                             AND  B.UserId = A.id
                         )`
          }
   ORDER	BY num DESC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

// 권한메뉴 관리자 리스트
router.post("/adminList", async (req, res, next) => {
  const { username, type } = req.body;

  // Validate
  const _username = username ? username : "";

  const selectQuery = `
  SELECT	id,
          username,
          email,
          level,
          mobile,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일") AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") AS updatedAt,
          DATE_FORMAT(exitedAt, "%Y년 %m월 %d일") AS viewExitedAt,
          menuRight1,
          menuRight2,
          menuRight3,
          menuRight4,
          menuRight5,
          menuRight6,
          menuRight7,
          menuRight8,
          menuRight9,
          menuRight10,
          menuRight11,
          menuRight12
    FROM	users  
   WHERE	1 = 1
     AND  username LIKE "${_username}%"
     AND  level LIKE 5
   ORDER  BY createdAt DESC
  `;

  try {
    const result = await models.sequelize.query(selectQuery);

    console.log(result[0]);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("관리자 정보를 불러올 수 없습니다.");
  }
});

// SNS로그인
router.post("/snsLogin", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    const { email, mobile, username, nickname, userId, password } = req.body;
    if (user) {
      if (err) {
        console.error(err);
        return next(err);
      }

      if (info) {
        console.log(`❌ LOGIN FAILED : ${info.reason}`);
        return res.status(401).send(info.reason);
      }

      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        const findUserQuery = `
      SELECT	ROW_NUMBER() OVER(ORDER	BY A.createdAt)		AS num,
              A.id,
              A.userId,
              A.email,
              A.username,
              A.nickname,
              A.mobile,
              A.level,
              A.isExit,
              CASE
                WHEN	A.level = 1	THEN "일반회원"
                WHEN	A.level = 2	THEN "비어있음"
                WHEN	A.level = 3	THEN "운영자"
                WHEN	A.level = 4	THEN "최고관리자"
                WHEN	A.level = 5	THEN "개발사"
              END											AS viewLevel,
              A.terms,
              A.terms2,
              A.terms3,
              A.terms4,
              A.terms5,
              A.terms6,
              A.createdAt,
              A.updatedAt,
              A.exitedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
              DATE_FORMAT(A.exitedAt, "%Y년 %m월 %d일")		AS viewExitedAt,
              CASE
                WHEN  (
                      SELECT  COUNT(B.id)
                        FROM  artist		B
                        WHERE  B.isPermm = 1	 
                          AND  B.UserId = A.id
                      ) > 0
                THEN  "아티스트"
                ELSE  "일반"
              END                    AS  isArtist
        FROM	users     A
       WHERE  A.id = ${user.id}
`;

        const fullUserWithoutPassword = await models.sequelize.query(
          findUserQuery
        );

        return res.status(200).json(fullUserWithoutPassword[0][0]);
      });
    } else {
      const findUserIdQuery = `
      SELECT  id
        FROM  users
       WHERE  userId = "${userId}"
      `;

      const findEmailQuery = `
      SELECT  id
        FROM  users
       WHERE  email = "${email}"
      `;

      // const findMobileQuery = `
      // SELECT  id
      //   FROM  users
      //  WHERE  mobile = "${mobile}"
      // `;

      const findResult = await models.sequelize.query(findUserIdQuery);

      const findEmailResult = await models.sequelize.query(findEmailQuery);

      if (findResult[0].length !== 0) {
        return res.status(401).send("이미 사용중인 아이디 입니다.");
      }

      if (findEmailResult[0].length !== 0) {
        return res.status(401).send("이미 사용중인 이메일 입니다.");
      }

      // if (findMobileQuery[0].length !== 0) {
      //   return res.status(401).send("이미 사용중인 핸드폰번호 입니다.");
      // }

      const hashedPassword = await bcrypt.hash(password, 12);

      const insertQuery = `
    INSERT  INTO  users
    (
      email,
      username,
      nickname,
      mobile,
      userId,
      password,
      level,
      terms,
      terms2,
      terms3,
      terms4,
      terms5,
      terms6,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "${email}",
      "${username}",
      "${nickname}",
      "1",
      "${userId}",
      "${hashedPassword},
      1,
      ${terms},
      ${terms2},
      ${terms3},
      ${terms4},
      ${terms5},
      ${terms6},
      NOW(),
      NOW()
    )
    `;

      const insertResult = await models.sequelize.query(insertQuery);

      const findUserQuery = `
      SELECT	ROW_NUMBER() OVER(ORDER	BY A.createdAt)		AS num,
              A.id,
              A.userId,
              A.email,
              A.username,
              A.nickname,
              A.mobile,
              A.level,
              A.isExit,
              CASE
                WHEN	A.level = 1	THEN "일반회원"
                WHEN	A.level = 2	THEN "비어있음"
                WHEN	A.level = 3	THEN "운영자"
                WHEN	A.level = 4	THEN "최고관리자"
                WHEN	A.level = 5	THEN "개발사"
              END											AS viewLevel,
              A.terms,
              A.terms2,
              A.terms3,
              A.terms4,
              A.terms5,
              A.terms6,
              A.createdAt,
              A.updatedAt,
              A.exitedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
              DATE_FORMAT(A.exitedAt, "%Y년 %m월 %d일")		AS viewExitedAt,
              CASE
                WHEN  (
                      SELECT  COUNT(B.id)
                        FROM  artist		B
                        WHERE  B.isPermm = 1	 
                          AND  B.UserId = A.id
                      ) > 0
                THEN  "아티스트"
                ELSE  "일반"
              END                    AS  isArtist
        FROM	users     A
       WHERE  A.id = ${insertResult[0].insertId}
`;

      const findUser = await models.sequelize.query(findUserQuery);

      return req.login(findUser[0][0], async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        return res.status(200).json(findUser[0][0]);
      });
    }
  })(req, res, next);
});

// 관리자 메뉴 권한 제어
router.post("/update/menuRight", async (req, res, next) => {
  const { userId, type, status } = req.body;

  let inQuery = "";

  switch (parseInt(type)) {
    case 1:
      inQuery = `SET  menuRight1 =  ${status}`;
      break;

    case 2:
      inQuery = `SET  menuRight2 =  ${status}`;
      break;

    case 3:
      inQuery = `SET  menuRight3 =  ${status}`;
      break;

    case 4:
      inQuery = `SET  menuRight4 =  ${status}`;
      break;

    case 5:
      inQuery = `SET  menuRight5 =  ${status}`;
      break;

    case 6:
      inQuery = `SET  menuRight6 =  ${status}`;
      break;

    case 7:
      inQuery = `SET  menuRight7 =  ${status}`;
      break;

    case 8:
      inQuery = `SET  menuRight8 =  ${status}`;
      break;

    case 9:
      inQuery = `SET  menuRight9 =  ${status}`;
      break;

    case 10:
      inQuery = `SET  menuRight10 =  ${status}`;
      break;

    case 11:
      inQuery = `SET  menuRight11 =  ${status}`;
      break;

    case 12:
      inQuery = `SET  menuRight12 =  ${status}`;
      break;

    default:
      break;
  }

  const updateQuery = `
    UPDATE  users
       ${inQuery}
     WHERE  id = ${userId}
  `;

  const insertQuery2 = `
  INSERT INTO adminUserRightHistorys (returnId, memo, createdAt, updatedAt) VALUES 
  (
    "${userId}",
    "${
      type === 1
        ? `통계관리`
        : type === 2
        ? `기초정보관리`
        : type === 3
        ? `배너관리`
        : type === 4
        ? `게시판관리`
        : type === 5
        ? `회원관리`
        : type === 6
        ? `고객지원관리`
        : type === 7
        ? `기록관리`
        : type === 8
        ? `DIY관리`
        : type === 9
        ? `ERROR`
        : type === 10
        ? `ERROR`
        : type === 11
        ? `ERROR`
        : type === 12
        ? `ERROR`
        : `ERROR`
    } ${status === 1 ? `ON` : status === 0 ? `OFF` : `ERROR`}",
    now(),
    now()
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery2);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("관리자 권한을 제어할 수 없습니다. 개발사에 문의해주세요.");
  }
});

router.post("/history/list", isAdminCheck, async (req, res, next) => {
  const { datePick } = req.body;

  const _datePick = datePick ? datePick : null;

  const selectQuery = `
    SELECT 	A.id,
            A.content,
            A.value,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	userHistory		A
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

router.post(
  "/adminUserRight/history/list",
  isAdminCheck,
  async (req, res, next) => {
    const { datePick } = req.body;

    const _datePick = datePick ? datePick : null;

    const selectQuery = `
    SELECT 	A.id,
            A.returnId,
            A.memo,
            B.username,
            DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일 %H:%i:%s")	AS  createdAt
      FROM 	adminUserRightHistorys		A

     INNER
      JOIN	users 			B
        ON	A.returnId = B.id
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
  }
);

router.get("/signin", async (req, res, next) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const selectQuery = `
      SELECT	ROW_NUMBER() OVER(ORDER	BY A.createdAt)		AS num,
              A.id,
              A.userId,
              A.email,
              A.username,
              A.nickname,
              A.mobile,
              A.level,
              A.isExit,
              CASE
                WHEN	A.level = 1	THEN "일반회원"
                WHEN	A.level = 2	THEN "비어있음"
                WHEN	A.level = 3	THEN "운영자"
                WHEN	A.level = 4	THEN "최고관리자"
                WHEN	A.level = 5	THEN "개발사"
              END											AS viewLevel,
              A.terms,
              A.terms2,
              A.terms3,
              A.terms4,
              A.terms5,
              A.terms6,
              A.createdAt,
              A.updatedAt,
              A.exitedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
              DATE_FORMAT(A.exitedAt, "%Y년 %m월 %d일")		AS viewExitedAt,
              CASE
                WHEN  (
                      SELECT  COUNT(B.id)
                        FROM  artist		B
                        WHERE  B.isPermm = 1	 
                          AND  B.UserId = A.id
                      ) > 0
                THEN  "아티스트"
                ELSE  "일반"
              END                    AS  isArtist
        FROM	users     A
       WHERE  A.id = ${req.user.id}
      `;

      const fullUserWithoutPassword = await models.sequelize.query(selectQuery);

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log(fullUserWithoutPassword[0][0]);
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json(fullUserWithoutPassword[0][0]);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const selectQuery = `
      SELECT	ROW_NUMBER() OVER(ORDER	BY A.createdAt)		AS num,
              A.id,
              A.userId,
              A.email,
              A.username,
              A.nickname,
              A.mobile,
              A.level,
              A.isExit,
              CASE
                WHEN	A.level = 1	THEN "일반회원"
                WHEN	A.level = 2	THEN "비어있음"
                WHEN	A.level = 3	THEN "운영자"
                WHEN	A.level = 4	THEN "최고관리자"
                WHEN	A.level = 5	THEN "개발사"
              END											AS viewLevel,
              A.terms,
              A.terms2,
              A.terms3,
              A.terms4,
              A.terms5,
              A.terms6,
              A.createdAt,
              A.updatedAt,
              A.exitedAt,
              DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		AS viewCreatedAt,
              DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")		AS viewUpdatedAt,
              DATE_FORMAT(A.exitedAt, "%Y년 %m월 %d일")		AS viewExitedAt,
              CASE
                WHEN  (
                      SELECT  COUNT(B.id)
                        FROM  artist		B
                        WHERE  B.isPermm = 1	 
                          AND  B.UserId = A.id
                      ) > 0
                THEN  "아티스트"
                ELSE  "일반"
              END                    AS  isArtist
        FROM	users     A
       WHERE  A.id = ${user.id}
      `;

      const fullUserWithoutPassword = await models.sequelize.query(selectQuery);

      return res.status(200).json(fullUserWithoutPassword[0][0]);
    });
  })(req, res, next);
});

router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: [
          "id",
          "nickname",
          "userId",
          "email",
          "level",
          "username",
          "menuRight1",
          "menuRight2",
          "menuRight3",
          "menuRight4",
          "menuRight5",
          "menuRight6",
          "menuRight7",
          "menuRight8",
          "menuRight9",
          "menuRight10",
          "menuRight11",
          "menuRight12",
        ],
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signup", async (req, res, next) => {
  const {
    email,
    userId,
    username,
    nickname,
    mobile,
    password,
    terms,
    terms2,
    terms3,
    terms4,
    terms5,
    terms6,
  } = req.body;

  if (!terms2 && !terms3 && !terms4 && (!terms5 || !terms6)) {
    return res.status(401).send("이용약관에 동의해주세요.");
  }

  try {
    const exUser = await User.findOne({
      where: { userId: userId },
    });
    const exUser2 = await User.findOne({
      where: { nickname: nickname },
    });
    const exUser3 = await User.findOne({
      where: { email: email },
    });

    if (exUser) {
      return res.status(401).send("중복되거나 가입된 아이디 입니다.");
    }
    if (exUser2) {
      return res.status(401).send("중복되거나 가입된 닉네임 입니다.");
    }
    if (exUser3) {
      return res.status(401).send("중복되거나 가입된 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      userId,
      email,
      username,
      nickname,
      mobile,
      terms,
      terms2,
      terms3,
      terms4,
      terms5,
      terms6,
      password: hashedPassword,
    });

    res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * SUBJECT : 개인정보 수정
 * PARAMETERS : nickname,
                email,
                mobile,
                terms,
                terms2,
                terms3,
                terms4,
                terms5,
                terms6
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/31
 */
router.post("/me/update", isLoggedIn, async (req, res, next) => {
  const {
    nickname,
    email,
    mobile,
    terms,
    terms2,
    terms3,
    terms4,
    terms5,
    terms6,
  } = req.body;

  const findNicknameQuery = `
                                  SELECT  nickname
                                    FROM  users
                                   WHERE  nickname  = "${nickname}"
                                     AND  id != ${req.user.id}
                                  `;

  const findEmailQuery = `
                                  SELECT  email
                                    FROM  users
                                   WHERE  email  = "${email}"
                                     AND  id != ${req.user.id}
                                  `;

  const updateQuery = `
                                  UPDATE  users
                                     SET  nickname = "${nickname}",
                                          email = "${email}",
                                          mobile = "${mobile}",
                                          terms = ${terms ? `${terms}` : null},
                                          terms2 = ${terms2},
                                          terms3 = ${terms3},
                                          terms4 = ${terms4},
                                          terms5 = ${
                                            terms5 ? `${terms5}` : null
                                          },
                                          terms6 = ${
                                            terms6 ? `${terms6}` : null
                                          },
                                          updatedAt = NOW()
                                   WHERE  id = ${req.user.id}
                                  `;

  try {
    const findNicknameData = await models.sequelize.query(findNicknameQuery);

    const findEmailData = await models.sequelize.query(findEmailQuery);

    if (findNicknameData[0].length !== 0) {
      return res.status(401).send("이미 사용중인 닉네임입니다.");
    }

    if (findEmailData[0].length !== 0) {
      return res.status(401).send("이미 사용중인 이메일입니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 개인정보 수정 (비밀번호 변경)
 * PARAMETERS : beforePassword, afterPassword
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/31
 */

router.post("/me/password/update", isLoggedIn, async (req, res, next) => {
  const { beforePassword, afterPassword } = req.body;

  const findUserQuery = `
                                  SELECT  password
                                    FROM  users
                                   WHERE  id = ${req.user.id}
                                  `;

  try {
    const findUserData = await models.sequelize.query(findUserQuery);

    if (findUserData[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const beforeValidate = await bcrypt.compare(
      beforePassword,
      findUserData[0][0].password
    );

    if (!beforeValidate) {
      return res.status(401).send("현재 비밀번호가 일치하지 않습니다.");
    } else {
      const hashedPassword = await bcrypt.hash(afterPassword, 12);

      const updateQuery = `
                                      UPDATE  users
                                         SET  password = "${hashedPassword}",
                                              updatedAt = NOW()
                                       WHERE  id = ${req.user.id}
                                      `;

      await models.sequelize.query(updateQuery);

      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("비밀번호를 변경할 수 없습니다.");
  }
});

router.post("/findemail", async (req, res, next) => {
  const { nickname, mobile } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        nickname,
        mobile,
      },
    });

    if (exUser) {
      return res.status(200).json({ userId: exUser.userId });
    } else {
      return res.status(200).json({ userId: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("아이디를 찾을 수 없습니다.");
  }
});

//아이디찾기

router.post("/findeUserId", async (req, res, next) => {
  const { username, mobile } = req.body;

  const findQuery = `
  SELECT  userId
    FROM  users
   WHERE  username = "${username}"
     AND  mobile = "${mobile}"
  `;

  try {
    const findUser = await models.sequelize.query(findQuery);

    if (findUser[0].length !== 0) {
      return res.status(200).json({ userId: findUser[0][0].userId });
    } else {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("이메일을 찾을 수 없습니다.");
  }
});

//비밀번호 재설정
router.post("/modifypass", async (req, res, next) => {
  const { userId, email } = req.body;

  const findUserQuery = `
  SELECT  id,
          email
    FROM  users
   WHERE  userId = "${userId}"
     AND  email = "${email}"
  `;

  try {
    const findUserData = await models.sequelize.query(findUserQuery);

    if (findUserData[0].length === 0) {
      return res.status(401).send("일치하는 정보가 없습니다.");
    }

    const UUID = generateUUID();

    const userUpdateQuery = `
    UPDATE  users
       SET  secret = "${UUID}"
     WHERE  userId = "${userId}"
    `;

    await models.sequelize.query(userUpdateQuery);

    await sendSecretMail(
      email,
      `🔐 [보안 인증코드 입니다.] 음원에서 비밀번호 변경을 위한 보안인증 코드를 발송했습니다.`,
      `
          <div>
            <h3>음원</h3>
            <hr />
            <p>보안 인증코드를 발송해드립니다. 음원홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
            <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

            <br /><hr />
            <article>
              발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
            </article>
          </div>
          `
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. [CODE097]");
  }
});

router.post("/checkSecret", async (req, res, next) => {
  const { secret } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  secret = "${secret}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("인증코드를 잘못 입력하셨습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.post("/modifypass/update", async (req, res, next) => {
  const { userId, password } = req.body;

  const findUser = `
  SELECT  id
    FROM  users
   WHERE  userId = "${userId}"
  `;

  try {
    const userData = await models.sequelize.query(findUser);

    if (userData[0].length === 0) {
      return res.status(401).send("잠시 후 다시 시도하여 주십시오.");
    }

    const hashPassord = await bcrypt.hash(password, 12);

    const userUpdateQuery = `
    UPDATE  users
       SET  password = "${hashPassord}",
            updatedAt = now(),
            secret = NULL
     WHERE  userId = "${userId}"
    `;

    const updateResult = await models.sequelize.query(userUpdateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  const findUserQuery = `
  SELECT  level
    FROM  users
   WHERE  id = ${selectUserId}
  `;

  try {
    const userData = await models.sequelize.query(findUserQuery);

    if (userData[0].length === 0) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const currentLevel = parseInt(userData[0][0].level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateQuery = `
    UPDATE  users
       SET  level = ${changeLevel},
            updatedAt = NOW()
     WHERE  id = ${selectUserId}
    `;

    const insertQuery = `
    INSERT  INTO  userHistory
    (
      value,
      content,
      updator,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "권한 수정",
      "${
        changeLevel === 1
          ? `일반회원`
          : changeLevel === 2
          ? `비어있음`
          : changeLevel === 3
          ? `운영자`
          : changeLevel === 4
          ? `최고관리자`
          : `일반회원`
      }",
      ${req.user.id},
      NOW(),
      NOW()
    )
    `;

    await models.sequelize.query(updateQuery);
    await models.sequelize.query(insertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.get(
  "/kakaoLogin",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    res.redirect("/");
  }
);

router.get(
  "/kakao/oauth",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (res, req) => {
    return res.redirect("/");
  }
);

router.post("/exit/update/true", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
      UPDATE users
         SET isExit = TRUE
           exitedAt = NOW()
       WHERE id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

router.post("/exit/update/false", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQuery = `
    UPDATE  users
       SET  isExit = FALSE
     WHERE  id = ${id}
  `;

  try {
    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("요청을 처리할 수 없습니다.");
  }
});

module.exports = router;
