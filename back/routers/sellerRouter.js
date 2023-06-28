const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 25 * 1024 * 1024 }, // 5MB
});

/**
 * SUBJECT : 이미지 업로드
 * PARAMETERS : formData
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 박은비
 * DEV DATE : 2023/06/05
 */
router.post("/image", upload.single("image"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

/**
 * SUBJECT : 파일 업로드
 * PARAMETERS : formData
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/file", upload.single("file"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

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
    return res.status(400).send("판매자 신청 리스트를 불러올 수 없습니다.");
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
router.post("/create", isLoggedIn, async (req, res, next) => {
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
      return res.status(400).send("이미 승인된 판매자 신청 이력이 존재합니다.");
    }

    await models.sequelize.query(insertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("판매자 신청을 진행할 수 없습니다.");
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

// status는 무조건 2, 3 둘중 하나로 보내주세요.
// status === 2 승인
// status === 3 반려
router.post("/admin/permit", isAdminCheck, async (req, res, next) => {
  const { id, status, UserId, userId } = req.body;

  if (parseInt(status) !== 2 && parseInt(status) !== 3) {
    return res.status(400).send("잘못된 요청입니다.");
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
      return res.status(400).send("존재하지 않는 판매자 신청 이력입니다.");
    }

    if (parseInt(findResult[0][0].status) !== 1) {
      return res.status(400).send("이미 처리된 신청 이력입니다.");
    }

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

    const insertMusicTemQuery = `
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

    const insertMusictemResult = await models.sequelize.query(
      insertMusicTemQuery
    );

    const musictemUpdateQuery = `
        UPDATE  users
           SET  musictemId = ${insertMusictemResult[0].insertId},
                type = 2
         WHERE  id = ${UserId}
        `;

    await models.sequelize.query(musictemUpdateQuery);

    const insertArtistemQuery = `
        INSERT  INTO    artistem
        (
            isVacation,
            name,
            companyNo,
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
            repMusicFile,
            repMusicFilename,
            isUpdate,
            UserId,
            createdAt,
            updatedAt
        )
        VALUES
        (
            0,
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
            0,
            ${UserId},
            NOW(),
            NOW()
        )
        `;

    const insertArtistemResult = await models.sequelize.query(
      insertArtistemQuery
    );

    const artistemUpdateQuery = `
        UPDATE  users
           SET  artistemId = ${insertArtistemResult[0].insertId}
         WHERE  id = ${UserId}
        `;

    await models.sequelize.query(artistemUpdateQuery);

    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

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

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("판매자 신청 정보를 승인 / 반려할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 정보 조회 라우터
 * PARAMETERS : ArtistemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/artistem/myData", isLoggedIn, async (req, res, next) => {
  const { ArtistemId } = req.body;

  const artistemQuery = `
  SELECT  A.id,
          A.isVacation,
          A.name,
          A.companyNo,
          A.artistName,
          A.artistProfileImage,
          A.artistInfo,
          A.question1,
          A.question2,
          A.question3,
          A.question4,
          A.question5,
          A.question6,
          A.question7,
          A.question8,
          A.repMusicFile,
          A.repMusicFilename,
          A.isUpdate,
          A.createdAt,
          A.updatedAt,
          (
            SELECT  COUNT(id)
              FROM  artistLike
             WHERE  ArtistemId = A.id
          )                                          AS likeCnt,
          ${
            req.user
              ? `
           (
             SELECT	AL.id
               FROM	artistLike	AL
              WHERE	AL.UserId = ${req.user.id}
                AND	AL.ArtistemId = A.id
           )	AS isLike`
              : `(
             SELECT	null
               FROM	DUAL
           )	AS isLike`
          }
    FROM  artistem    A
   WHERE  A.id = ${ArtistemId}
  `;

  const findCountryInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
          id,
          value,
          sort,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM  artistCountry
   WHERE  ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  const findFilmInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
          id,
          part,
          comment,
          singerName,
          songName,
          filename,
          filePath,
          imagePathName,
          imagePath,
          sort,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM  artistFilmography
   WHERE  ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  const findCateInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
          A.id,
          A.sort,
          A.ArtistemId,
          A.CateTypeId,
          A.CategoryId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
          B.category                                AS categoryTypeValue,
          C.value                                   AS catagoryValue
    FROM  artistCategory    A
   INNER
    JOIN  cateType          B
      ON  A.CateTypeId = B.id
   INNER
    JOIN  category          C
      ON  A.CategoryId = C.id
   WHERE  A.ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  const findTagInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
          A.id,
          A.sort,
          A.ArtistemId,
          A.TagTypeId,
          A.TagId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
          B.value                                   AS tagTypeValue,
          C.tagValue
    FROM  artistTag        A
   INNER
    JOIN  tagType          B
      ON  A.TagTypeId = B.id
   INNER
    JOIN  tag              C
      ON  A.TagId = C.id
   WHERE  A.ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  try {
    const artistemData = await models.sequelize.query(artistemQuery);

    if (artistemData[0].length === 0) {
      return res.status(400).send("아티스탬 정보가 존재하지 않습니다.");
    }

    const findCountryInfoData = await models.sequelize.query(
      findCountryInfoQuery
    );
    const findFilmInfoData = await models.sequelize.query(findFilmInfoQuery);
    const findCateInfoData = await models.sequelize.query(findCateInfoQuery);
    const findTagInfoData = await models.sequelize.query(findTagInfoQuery);

    return res.status(200).json({
      artistemData: artistemData[0].length !== 0 ? artistemData[0][0] : null,
      findCountryInfoData: findCountryInfoData[0],
      findFilmInfoData: findFilmInfoData[0],
      findCateInfoData: findCateInfoData[0],
      findTagInfoData: findTagInfoData[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("아티스탬 정보를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 리스트
 * PARAMETERS : searchName, TagTypeId, TagId, CategoryId, orderType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/artistem/list", async (req, res, next) => {
  const { searchName, TagTypeId, TagId, CategoryId, orderType } = req.body;

  const _searchName = searchName ? searchName : ``;
  const _TagTypeId = TagTypeId ? TagTypeId : false;
  const _TagId = TagId ? TagId : false;
  const _CategoryId = CategoryId ? CategoryId : false;

  const _orderType = parseInt(orderType) || 1;

  const artistemQuery = `
 SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)    AS num,
         A.id,
         A.username,
         A.type,
         A.artistemId,
         B.isVacation,
         B.name,
         B.companyNo,
         B.artistName,
         B.artistProfileImage,
         B.artistInfo,
         B.question1,
         B.question2,
         B.question3,
         B.question4,
         B.question5,
         B.question6,
         B.question7,
         B.question8,
         B.repMusicFile,
         B.repMusicFilename,
         B.isUpdate,
         B.createdAt,
         B.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
         (
          SELECT  COUNT(id)
            FROM  artistLike
           WHERE  ArtistemId = B.id
         )                                          AS likeCnt,
         ${
           req.user
             ? `
         (
           SELECT	AL.id
             FROM	artistLike	AL
            WHERE	AL.UserId = ${req.user.id}
              AND	AL.ArtistemId = B.id
         )	AS isLike`
             : `(
           SELECT	null
             FROM	DUAL
         )	AS isLike`
         }
   FROM  users        A
  INNER
   JOIN  artistem     B
     ON  B.UserId = A.id
  WHERE  B.isUpdate = 1
    AND  A.artistemId IS NOT NULL
    AND  B.artistName LIKE "%${_searchName}%"
          ${
            _TagTypeId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  artistTag
                     WHERE  A.artistemId = ArtistemId
                       AND  TagTypeId = ${_TagTypeId}
                   )
          `
              : ``
          }
          ${
            _TagId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  artistTag
                     WHERE  A.artistemId = ArtistemId
                       AND  TagId = ${_TagId}
                   )
          `
              : ``
          }
          ${
            _CategoryId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  artistCategory
                     WHERE  A.artistemId = ArtistemId
                       AND  CategoryId = ${_CategoryId}
                   )
          `
              : ``
          }
          ${
            _orderType === 1
              ? `ORDER  BY num DESC`
              : _orderType === 2
              ? `ORDER  BY (
                                      IFNULL(
                                        (
                                          SELECT  COUNT(id)
                                            FROM  artistLike
                                           WHERE  ArtistemId = B.id
                                         ), 0)
                                    ) DESC`
              : `ORDER  BY num DESC`
          }
 `;

  const findCountryInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
         id,
         value,
         sort,
         createdAt,
         updatedAt,
         ArtistemId,
         DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
   FROM  artistCountry
  ORDER  BY num ASC
 `;

  const findFilmInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
         id,
         part,
         comment,
         singerName,
         songName,
         filename,
         filePath,
         imagePathName,
         imagePath,
         sort,
         createdAt,
         updatedAt,
         ArtistemId,
         DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
   FROM  artistFilmography
  ORDER  BY num ASC
 `;

  const findCateInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
         A.id,
         A.sort,
         A.ArtistemId,
         A.CateTypeId,
         A.CategoryId,
         A.createdAt,
         A.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
         B.category                                AS categoryTypeValue,
         C.value                                   AS catagoryValue
   FROM  artistCategory    A
  INNER
   JOIN  cateType          B
     ON  A.CateTypeId = B.id
  INNER
   JOIN  category          C
     ON  A.CategoryId = C.id
  ORDER  BY num ASC
 `;

  const findTagInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
         A.id,
         A.sort,
         A.ArtistemId,
         A.TagTypeId,
         A.TagId,
         A.createdAt,
         A.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
         B.value                                   AS tagTypeValue,
         C.tagValue
   FROM  artistTag        A
  INNER
   JOIN  tagType          B
     ON  A.TagTypeId = B.id
  INNER
   JOIN  tag              C
     ON  A.TagId = C.id
  ORDER  BY num ASC
 `;

  try {
    const artistemData = await models.sequelize.query(artistemQuery);

    const findCountryInfoData = await models.sequelize.query(
      findCountryInfoQuery
    );
    const findFilmInfoData = await models.sequelize.query(findFilmInfoQuery);
    const findCateInfoData = await models.sequelize.query(findCateInfoQuery);
    const findTagInfoData = await models.sequelize.query(findTagInfoQuery);

    artistemData[0].map((ele) => {
      ele["countrys"] = [];

      findCountryInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.countrys.push(innerItem);
        }
      });
    });

    artistemData[0].map((ele) => {
      ele["artistFilms"] = [];

      findFilmInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.artistFilms.push(innerItem);
        }
      });
    });

    artistemData[0].map((ele) => {
      ele["categorys"] = [];

      findCateInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.categorys.push(innerItem);
        }
      });
    });

    artistemData[0].map((ele) => {
      ele["tags"] = [];

      findTagInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.tags.push(innerItem);
        }
      });
    });

    return res.status(200).json(artistemData[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("아티스탬 정보를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 판매량 많은 순 리스트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
router.post("/artistem/topSell/list", async (req, res, next) => {
  const artistemQuery = `
 SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)    AS num,
         A.id,
         A.username,
         A.type,
         A.artistemId,
         B.isVacation,
         B.name,
         B.companyNo,
         B.artistName,
         B.artistProfileImage,
         B.artistInfo,
         B.question1,
         B.question2,
         B.question3,
         B.question4,
         B.question5,
         B.question6,
         B.question7,
         B.question8,
         B.repMusicFile,
         B.repMusicFilename,
         B.isUpdate,
         B.createdAt,
         B.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
         (
          SELECT  COUNT(id)
            FROM  artistLike
           WHERE  ArtistemId = B.id
         )                                          AS likeCnt,
         ${
           req.user
             ? `
         (
           SELECT	AL.id
             FROM	artistLike	AL
            WHERE	AL.UserId = ${req.user.id}
              AND	AL.ArtistemId = B.id
         )	AS isLike`
             : `(
           SELECT	null
             FROM	DUAL
         )	AS isLike`
         }
   FROM  users        A
  INNER
   JOIN  artistem     B
     ON  B.UserId = A.id
  WHERE  B.isUpdate = 1
    AND  A.artistemId IS NOT NULL
  ORDER  BY (
            IFNULL((
              SELECT  COUNT(id)
              FROM  artistContact
             WHERE  ArtistemId = B.id
               AND  isOk = 1
               AND  isReject = 0
               AND  isPay = 1
               AND  isCompleted = 1
               AND  isDelete = 0
            ), 0)
        ) DESC
 `;

  const findCountryInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
         id,
         value,
         sort,
         createdAt,
         updatedAt,
         ArtistemId,
         DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
   FROM  artistCountry
  ORDER  BY num ASC
 `;

  const findFilmInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
         id,
         part,
         comment,
         singerName,
         songName,
         filename,
         filePath,
         imagePathName,
         imagePath,
         sort,
         createdAt,
         updatedAt,
         ArtistemId,
         DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
   FROM  artistFilmography
  ORDER  BY num ASC
 `;

  const findCateInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
         A.id,
         A.sort,
         A.ArtistemId,
         A.CateTypeId,
         A.CategoryId,
         A.createdAt,
         A.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
         B.category                                AS categoryTypeValue,
         C.value                                   AS catagoryValue
   FROM  artistCategory    A
  INNER
   JOIN  cateType          B
     ON  A.CateTypeId = B.id
  INNER
   JOIN  category          C
     ON  A.CategoryId = C.id
  ORDER  BY num ASC
 `;

  const findTagInfoQuery = `
 SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
         A.id,
         A.sort,
         A.ArtistemId,
         A.TagTypeId,
         A.TagId,
         A.createdAt,
         A.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
         B.value                                   AS tagTypeValue,
         C.tagValue
   FROM  artistTag        A
  INNER
   JOIN  tagType          B
     ON  A.TagTypeId = B.id
  INNER
   JOIN  tag              C
     ON  A.TagId = C.id
  ORDER  BY num ASC
 `;

  try {
    const artistemData = await models.sequelize.query(artistemQuery);

    const findCountryInfoData = await models.sequelize.query(
      findCountryInfoQuery
    );
    const findFilmInfoData = await models.sequelize.query(findFilmInfoQuery);
    const findCateInfoData = await models.sequelize.query(findCateInfoQuery);
    const findTagInfoData = await models.sequelize.query(findTagInfoQuery);

    artistemData[0].map((ele) => {
      ele["countrys"] = [];

      findCountryInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.countrys.push(innerItem);
        }
      });
    });

    artistemData[0].map((ele) => {
      ele["artistFilms"] = [];

      findFilmInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.artistFilms.push(innerItem);
        }
      });
    });

    artistemData[0].map((ele) => {
      ele["categorys"] = [];

      findCateInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.categorys.push(innerItem);
        }
      });
    });

    artistemData[0].map((ele) => {
      ele["tags"] = [];

      findTagInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.tags.push(innerItem);
        }
      });
    });

    return res.status(200).json(artistemData[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("아티스탬 정보를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 디테일
 * PARAMETERS : ArtistemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
router.post("/artistem/detail", async (req, res, next) => {
  const { ArtistemId } = req.body;

  const artistemQuery = `
  SELECT  A.id,
          A.UserId,
          A.isVacation,
          A.name,
          A.companyNo,
          A.artistName,
          A.artistProfileImage,
          A.artistInfo,
          A.question1,
          A.question2,
          A.question3,
          A.question4,
          A.question5,
          A.question6,
          A.question7,
          A.question8,
          A.repMusicFile,
          A.repMusicFilename,
          A.isUpdate,
          A.createdAt,
          A.updatedAt,
          (
            SELECT  COUNT(id)
              FROM  artistLike
             WHERE  ArtistemId = A.id
          )                                          AS likeCnt,
          ${
            req.user
              ? `
           (
             SELECT	AL.id
               FROM	artistLike	AL
              WHERE	AL.UserId = ${req.user.id}
                AND	AL.ArtistemId = A.id
           )	AS isLike`
              : `(
             SELECT	null
               FROM	DUAL
           )	AS isLike`
          }
    FROM  artistem    A
   WHERE  A.id = ${ArtistemId}
     AND  A.isUpdate = 1
  `;

  const findCountryInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
          id,
          value,
          sort,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM  artistCountry
   WHERE  ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  const findFilmInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY sort)      AS num,
          id,
          part,
          comment,
          singerName,
          songName,
          filename,
          filePath,
          imagePathName,
          imagePath,
          sort,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt
    FROM  artistFilmography
   WHERE  ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  const findCateInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
          A.id,
          A.sort,
          A.ArtistemId,
          A.CateTypeId,
          A.CategoryId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
          B.category                                AS categoryTypeValue,
          C.value                                   AS catagoryValue
    FROM  artistCategory    A
   INNER
    JOIN  cateType          B
      ON  A.CateTypeId = B.id
   INNER
    JOIN  category          C
      ON  A.CategoryId = C.id
   WHERE  A.ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  const findTagInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
          A.id,
          A.sort,
          A.ArtistemId,
          A.TagTypeId,
          A.TagId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
          B.value                                   AS tagTypeValue,
          C.tagValue
    FROM  artistTag        A
   INNER
    JOIN  tagType          B
      ON  A.TagTypeId = B.id
   INNER
    JOIN  tag              C
      ON  A.TagId = C.id
   WHERE  A.ArtistemId = ${ArtistemId}
   ORDER  BY num ASC
  `;

  try {
    const artistemData = await models.sequelize.query(artistemQuery);

    if (artistemData[0].length === 0) {
      return res.status(400).send("아티스탬 정보가 존재하지 않습니다.");
    }

    const findCountryInfoData = await models.sequelize.query(
      findCountryInfoQuery
    );
    const findFilmInfoData = await models.sequelize.query(findFilmInfoQuery);
    const findCateInfoData = await models.sequelize.query(findCateInfoQuery);
    const findTagInfoData = await models.sequelize.query(findTagInfoQuery);

    return res.status(200).json({
      artistemData: artistemData[0].length !== 0 ? artistemData[0][0] : null,
      findCountryInfoData: findCountryInfoData[0],
      findFilmInfoData: findFilmInfoData[0],
      findCateInfoData: findCateInfoData[0],
      findTagInfoData: findTagInfoData[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("아티스탬 정보를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 뮤직탬 정보입력 라우터
 * PARAMETERS : artistName,
                profileImage,
                profileImageName
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/musictem/info/update", isLoggedIn, async (req, res, next) => {
  const { artistName, profileImage, profileImageName } = req.body;

  const findQuery = `
  SELECT  id
    FROM  musictem
   WHERE  UserId = ${req.user.id}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res
        .status(400)
        .send("정보를 수정할 뮤직탬 정보가 존재하지 않습니다.");
    }

    const updateQuery = `
    UPDATE  musictem
       SET  artistName = "${artistName}",
            profileImage = "${profileImage}",
            profileImageName = "${profileImageName}",
            updatedAt = NOW()
     WHERE  id = ${findResult[0][0].id}
    `;

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("뮤직탬 정보를 입력할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 정보 입력 라우터
 * PARAMETERS : name,
                companyNo,
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
                repMusicFile,
                repMusicFilename,
                countrys,
                filmography,
                categorys,
                tags
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/05/30
 */
// 배열 정보는 해당 폼에 맞도록 보내주세요 !
// countrys: [
//   {
//     value: "",
//     sort: 1,
//   },
//   {
//     value: "",
//     sort: 2,
//   },
// ];
// filmography: [
//   {
//     part: "",
//     comment: "",
//     singerName: "",
//     songName: "",
//     filename: "",
//     filePath: "",
//     imagePathName: "",
//     imagePath: "",
//     sort: 1,
//   },
//   {
//     part: "",
//     comment: "",
//     singerName: "",
//     songName: "",
//     filename: "",
//     filePath: "",
//     imagePathName: "",
//     imagePath: "",
//     sort: 2,
//   },
// ];
// categorys: [
//   {
//     CateTypeId: 1,
//     CategoryId: 1,
//     sort: 1,
//   },
//   {
//     CateTypeId: 2,
//     CategoryId: 2,
//     sort: 2,
//   },
// ];
// tags: [
//   {
//     TagTypeId: 1,
//     TagId: 1,
//     sort: 1,
//   },
//   {
//     TagTypeId: 2,
//     TagId: 2,
//     sort: 2,
//   },
// ];

router.post("/artistem/info/update", isLoggedIn, async (req, res, next) => {
  const {
    name,
    companyNo,
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
    repMusicFile,
    repMusicFilename,
    countrys,
    filmography,
    categorys,
    tags,
  } = req.body;

  if (!Array.isArray(countrys)) {
    return res.status(400).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(filmography)) {
    return res.status(400).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(categorys)) {
    return res.status(400).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(tags)) {
    return res.status(400).send("잘못된 요청입니다.");
  }

  const findQuery = `
  SELECT  id
    FROM  artistem
   WHERE  UserId = ${req.user.id}
  `;

  try {
    const findResult = await models.sequelize.query(findQuery);

    if (findResult[0].length === 0) {
      return res
        .status(400)
        .send("정보를 수정할 아티스탬 정보가 존재하지 않습니다.");
    }

    const deleteQuery1 = `
    DELETE
      FROM  artistCountry
     WHERE  ArtistemId = ${parseInt(findResult[0][0].id)}
    `;

    const deleteQuery2 = `
    DELETE
      FROM  artistFilmography
     WHERE  ArtistemId = ${parseInt(findResult[0][0].id)}
    `;

    const deleteQuery3 = `
    DELETE
      FROM  artistCategory
     WHERE  ArtistemId = ${parseInt(findResult[0][0].id)}
    `;

    const deleteQuery4 = `
    DELETE
      FROM  artistTag
     WHERE  ArtistemId = ${parseInt(findResult[0][0].id)}
    `;

    await models.sequelize.query(deleteQuery1);
    await models.sequelize.query(deleteQuery2);
    await models.sequelize.query(deleteQuery3);
    await models.sequelize.query(deleteQuery4);

    const updateQuery = `
    UPDATE  artistem
       SET  name = "${name}",
            companyNo = "${companyNo}",
            artistName = "${artistName}",
            artistProfileImage = "${artistProfileImage}",
            artistInfo = "${artistInfo}",
            question1 = "${question1}",
            question2 = "${question2}",
            question3 = "${question3}",
            question4 = "${question4}",
            question5 = "${question5}",
            question6 = "${question6}",
            question7 = "${question7}",
            question8 = "${question8}",
            repMusicFile = "${repMusicFile}",
            repMusicFilename = "${repMusicFilename}",
            isUpdate = 1,
            updatedAt = NOW()
     WHERE  id = ${parseInt(findResult[0][0].id)}
    `;

    await models.sequelize.query(updateQuery);

    await Promise.all(
      countrys.map(async (data) => {
        const insertQuery = `
      INSERT  INTO  artistCountry
      (
        value,
        sort,
        ArtistemId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        "${data.value}",
        ${data.sort},
        ${parseInt(findResult[0][0].id)},
        NOW(),
        NOW()
      )
      `;

        await models.sequelize.query(insertQuery);
      })
    );

    await Promise.all(
      filmography.map(async (data) => {
        const insertQuery = `
        INSERT  INTO  artistFilmography
        (
          part,
          comment,
          singerName,
          songName,
          filename,
          filePath,
          imagePathName,
          imagePath,
          sort,
          ArtistemId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          "${data.part}",
          "${data.comment}",
          "${data.singerName}",
          "${data.songName}",
          "${data.filename}",
          "${data.filePath}",
          "${data.imagePathName}",
          "${data.imagePath}",
          ${data.sort},
          ${parseInt(findResult[0][0].id)},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    await Promise.all(
      categorys.map(async (data) => {
        const insertQuery = `
        INSERT  INTO  artistCategory
        (
          ArtistemId,
          CateTypeId,
          CategoryId,
          sort,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${parseInt(findResult[0][0].id)},
          ${data.CateTypeId},
          ${data.CategoryId},
          ${data.sort},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    await Promise.all(
      tags.map(async (data) => {
        const insertQuery = `
        INSERT  INTO  artistTag
        (
          ArtistemId,
          TagTypeId,
          TagId,
          sort,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${parseInt(findResult[0][0].id)},
          ${data.TagTypeId},
          ${data.TagId},
          ${data.sort},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("아티스트 정보를 입력할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 휴가중 토글
 * PARAMETERS : ArtistemId, isVacation
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/28
 */
router.post("/vacation/update", isLoggedIn, async (req, res, next) => {
  const { ArtistemId, isVacation } = req.body;

  const upateQuery = `
  UPDATE  artistem
     SET  isVacation = ${isVacation},
          updatedAt = NOW()
   WHERE  id = ${ArtistemId} 
     
  `;

  try {
    await models.sequelize.query(upateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("휴가중 여부를 변경할 수 없습니다.");
  }
});
module.exports = router;
