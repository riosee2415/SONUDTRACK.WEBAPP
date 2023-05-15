const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

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

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// ARTIST ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 아티스탬 페이지 아티스트 리스트 불러오기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/10
 */
router.post("/user/allList", async (req, res, next) => {
  const selectQuery = `
SELECT	ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
        id,
        plan,
        gen,
        isPermm,
        permmAt,
        DATE_FORMAT(permmAt, "%Y년 %m월  %d일")		    AS viewPermmAt,
        createdAt,
        updatedAt,
        DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	  AS	viewCreatedAt,
        DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	  AS	viewUpdatedAt,
        UserId,
        name,
        businessNum,
        artistname,
        info,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        isVacation 
  FROM	artist
 WHERE	isPermm = 1
   AND  isUpdate = 1
 ORDER  BY num DESC
  `;

  const selectCountryQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY createdAt)	AS num,
          id,
          value,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
          ArtistId 
    FROM	artistCountry
   ORDER	BY num ASC
  `;

  const selectFilmQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY sort)	AS num,
        id,
        roleName,
        comment,
        name,
        title,
        musicFile,
        coverImage,
        sort,
        createdAt,
        updatedAt,
        DATE_FORMAT(createdAt, "%Y년 %m월 %d일") 	AS	viewCreatedAt,
        DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
        ArtistId 
  FROM	artistFilm
 ORDER	BY num ASC
  `;

  const selectTagQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY B.type ASC)  AS num,
          B.value,
          B.type
    FROM  artistTags      A
   INNER
    JOIN  commonTag       B
      ON  A.CommonTagId = B.id
   ORDER  BY num ASC
  `;

  try {
    const findArtistResult = await models.sequelize.query(selectQuery);

    const artistCountries = await models.sequelize.query(selectCountryQuery);
    const artistFilms = await models.sequelize.query(selectFilmQuery);
    const tagDatum = await models.sequelize.query(selectTagQuery);

    findArtistResult[0].map((data) => {
      data["country"] = [];

      artistCountries[0].map((innerItem) => {
        data.country.push(innerItem);
      });
    });

    findArtistResult[0].map((item) => {
      item["film"] = [];

      artistFilms[0].map((innerItem) => {
        item.film.push(innerItem);
      });
    });

    findArtistResult[0].map((element) => {
      element["tag"] = [];

      tagDatum[0].map((innerItem) => {
        element.tag.push(innerItem);
      });
    });

    return res.status(200).json(findArtistResult[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("아티스트 정보를 조회할 수 없습니다.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// SELLER ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 신청자 내역 가져오기 (미승인)
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/11
 */
router.post("/permm/list", isAdminCheck, async (req, res, next) => {
  const selectQ1 = `
    SELECT	COUNT(id)	AS cnt
      FROM	artist
     WHERE	isPermm = 0
    `;

  const selectQ2 = `
    SELECT	A.id,
            A.plan,
            A.gen,
            A.permmAt,
            A.createdAt,
            A.updatedAt,
            A.UserId,
            DATE_FORMAT(A.permmAt , "%Y년 %m월 %d일") 	AS	viewPermmAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            B.username,
            B.email,
            B.nickname,
            B.mobile
      FROM	artist 	A
     INNER
      JOIN	users	B
        ON	A.UserId = B.id
     WHERE	A.isPermm = 1
    `;

  const selectQ3 = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC) AS num,
            A.id,
            A.plan,
            A.gen,
            A.permmAt,
            A.createdAt,
            A.updatedAt,
            A.UserId,
            DATE_FORMAT(A.permmAt , "%Y년 %m월 %d일") 	AS	viewPermmAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            B.username,
            B.email,
            B.nickname,
            B.mobile
      FROM	artist 	A
     INNER
      JOIN	users	B
        ON	A.UserId = B.id
     WHERE	A.isPermm = 0
    `;

  const selectQ4 = `
    SELECT	filename,
            filepath,
            ArtistId
      FROM	artistRequestFile
     WHERE	ArtistId IN (
                        SELECT	id
                          FROM 	artist
                         WHERE	isPermm = 0
                        )
     ORDER	BY	filename ASC
    `;

  try {
    const list1 = await models.sequelize.query(selectQ1);
    const list2 = await models.sequelize.query(selectQ2);
    const list3 = await models.sequelize.query(selectQ3);
    const list4 = await models.sequelize.query(selectQ4);

    const waitingList = list3[0];
    const fileList = list4[0];

    waitingList.map((data) => {
      data["filelist"] = [];

      fileList.map((fileItem) => {
        if (data.id === fileItem.ArtistId) {
          data.filelist.push({
            filename: fileItem.filename,
            filepath: fileItem.filepath,
          });
        }
      });
    });

    return res.status(200).json({
      count: list1[0],
      list: list2[0],
      waitingList: waitingList,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});
/**
 * SUBJECT : 판매자 파일처리
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
router.post("/image", upload.single("image"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

/**
 * SUBJECT : 판매자 신청하기
 * PARAMETERS : plan, gen, imagePaths
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/01
 */
// 써야함 (수정완료)
router.post("/permm/create", isLoggedIn, async (req, res, next) => {
  const { plan, gen, imagePaths, isArtist, isMusictem } = req.body;

  if (!Array.isArray(imagePaths)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  // 해당 형식 맞춰서 보내주세여
  // [
  //   {
  //     filename: "",
  //     filepath: "",
  //   },
  //   {
  //     filename: "",
  //     filepath: "",
  //   },
  //   {
  //     filename: "",
  //     filepath: "",
  //   },
  //   {
  //     filename: "",
  //     filepath: "",
  //   },
  // ];

  const findArtistQuery = `
  SELECT  id
    FROM  artist
   WHERE  UserId = ${req.user.id}
  `;

  const insertQuery = `
  INSERT  INTO  artist
  (
    plan,
    gen,
    isArtist,
    isMusictem,
    UserId,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "${plan}",
    "${gen}",
    ${isArtist},
    ${isMusictem},
    ${req.user.id},
    NOW(),
    NOW()
  )
  `;

  try {
    const findResult = await models.sequelize.query(findArtistQuery);

    if (findResult[0].length !== 0) {
      return res.status(401).send("이미 신청한 내역이 존재합니다.");
    }

    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      imagePaths.map(async (data) => {
        const imageInsertQuery = `
        INSERT  INTO  artistRequestFile
        (
          filename,
          filepath,
          ArtistId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          "${data.filename}",
          "${data.filepath}",
          ${insertResult[0].insertId},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(imageInsertQuery);
      })
    );

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("판매자 신청을 진행할 수 없습니다.");
  }
});

/**
 * SUBJECT : 마이 아티스탬 정보 가져오기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/03
 */
router.post("/info/data", async (req, res, next) => {
  const { id } = req.body;

  const selectQuery = `
SELECT	id,
        plan,
        gen,
        isPermm,
        permmAt,
        DATE_FORMAT(permmAt, "%Y년 %m월  %d일")		AS viewPermmAt,
        createdAt,
        updatedAt,
        DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
        DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
        UserId,
        name,
        businessNum,
        artistname,
        info,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        isVacation 
  FROM	artist
 WHERE	id = ${id}
   AND  isUpdate = 1
  `;

  const selectCountryQuery = `
  SELECT	ROW_NUMBER() OVER(ORDER	BY createdAt)	AS num,
          id,
          value,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
          ArtistId 
    FROM	artistCountry
   WHERE  ArtistId = ${id}
   ORDER	BY num ASC
  `;

  const selectFilmQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY sort)	AS num,
        id,
        roleName,
        comment,
        name,
        title,
        musicFile,
        coverImage,
        sort,
        createdAt,
        updatedAt,
        DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
        DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
        ArtistId 
  FROM	artistFilm
 WHERE  ArtistId = ${id}
 ORDER	BY num ASC
  `;

  const selectTagQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY B.type ASC)  AS num,
          B.value,
          B.type
    FROM  artistTags      A
   INNER
    JOIN  commonTag       B
      ON  A.CommonTagId = B.id
   WHERE  ArtistId = ${id}
   ORDER  BY num ASC
  `;

  try {
    const findArtistResult = await models.sequelize.query(selectQuery);

    if (findArtistResult[0].length === 0) {
      return res.status(401).send("아티스트 정보가 존재하지 않습니다.");
    }

    const artistCountries = await models.sequelize.query(selectCountryQuery);
    const artistFilms = await models.sequelize.query(selectFilmQuery);
    const tagDatum = await models.sequelize.query(selectTagQuery);

    findArtistResult[0].map((data) => {
      data["country"] = [];

      artistCountries[0].map((innerItem) => {
        data.country.push(innerItem);
      });
    });

    findArtistResult[0].map((item) => {
      item["film"] = [];

      artistFilms[0].map((innerItem) => {
        item.film.push(innerItem);
      });
    });

    findArtistResult[0].map((element) => {
      element["tag"] = [];

      tagDatum[0].map((innerItem) => {
        element.tag.push(innerItem);
      });
    });

    return res.status(200).json(findArtistResult[0][0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 마이 아티스탬 정보 수정
 * PARAMETERS : id,
 *              name,
                businessNum,
                artistname,
                info,
                question1,
                question2,
                question3,
                question4,
                question5,
                question6,
                question7,
                question8,
                artistFilms,
                artistCountries
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/02
 */
// 써야함 (이미 개발되어있음 수정할 필요 X)
router.post("/info/update", isLoggedIn, async (req, res, next) => {
  const {
    id,
    name,
    businessNum,
    artistname,
    info,
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    artistFilms,
    artistCountries,
    tags,
    repSongFilePath,
    repSongFileName,
  } = req.body;

  if (!Array.isArray(artistFilms)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(artistCountries)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(tags)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  // 세 배열은 해당 형식에 맞게 보내주세요.
  // "artistCountries": [
  //   "한국어 / 대한민국",
  //   "영어 / 미국"
  // ],
  // "artistFilms": [
  //     {
  //         "roleName": "역할",
  //         "comment": "comment",
  //         "name": "가수명",
  //         "title": "곡 제목",
  //         "musicFile": "http://via.placeholder.com/200x200",
  //         "coverImage": "http://via.placeholder.com/200x200",
  //         "sort": 1
  //     },
  //     {
  //         "roleName": "역할2",
  //         "comment": "comment2",
  //         "name": "가수명2",
  //         "title": "곡 제목2",
  //         "musicFile": "http://via.placeholder.com/200x200",
  //         "coverImage": "http://via.placeholder.com/200x200",
  //         "sort": 2
  //     }
  // ]
  // "tags": [
  //   1, 2, 3, 4
  // ]

  const findArtistQuery = `
  SELECT  UserId,
          isPermm
    FROM  artist  
   WHERE  id = ${id}
  `;

  const updateQuery = `
  UPDATE  artist
     SET  name = "${name}",
          businessNum = "${businessNum}",
          artistname = "${artistname}",
          info = "${info}",
          question1 = "${question1}",
          question2 = "${question2}",
          question3 = "${question3}",
          question4 = "${question4}",
          question5 = "${question5}",
          question6 = "${question6}",
          question7 = "${question7}",
          question8 = "${question8}",
          repSongFilePath = "${repSongFilePath}",
          repSongFileName = "${repSongFileName}",
          isUpdate = 1,
          updatedAt = NOW()
   WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findArtistQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("데이터가 존재하지 않습니다.");
    }

    if (!findResult[0][0].isPermm) {
      return res
        .status(401)
        .send("승인이 완료되지 않아 데이터를 수정할 수 없습니다.");
    }

    if (findResult[0][0].UserId !== req.user.id) {
      return res.status(401).send("자신의 정보만 수정할 수 있습니다.");
    }

    await models.sequelize.query(updateQuery);

    const deleteCountryQuery = `
    DELETE
      FROM  artistCountry
     WHERE  ArtistId = ${id}
    `;

    const deleteFilmQuery = `
    DELETE
      FROM  artistFilm
     WHERE  ArtistId = ${id}
    `;

    const deleteTagQuery = `
    DELETE
      FROM  artistTags
     WHERE  ArtistId = ${id}
    `;

    await models.sequelize.query(deleteCountryQuery);
    await models.sequelize.query(deleteFilmQuery);
    await models.sequelize.query(deleteTagQuery);

    await Promise.all(
      artistCountries.map(async (data) => {
        const insertCountryQuery = `
      INSERT  INTO  artistCountry
      (
        value,
        ArtistId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        "${data}",
        ${id},
        NOW(),
        NOW()
      )
      `;

        await models.sequelize.query(insertCountryQuery);
      })
    );

    await Promise.all(
      artistFilms.map(async (item) => {
        const insertFilmQuery = `
        INSERT  INTO  artistFilm
        (
          roleName,
          comment,
          name,
          title,
          musicFile,
          coverImage,
          sort,
          createdAt,
          updatedAt,
          ArtistId
        )
        VALUES
        (
          "${item.roleName}",
          "${item.comment}",
          "${item.name}",
          "${item.title}",
          "${item.musicFile}",
          "${item.coverImage}",
          ${item.sort},
          NOW(),
          NOW(),
          ${id}
        )
        `;

        await models.sequelize.query(insertFilmQuery);
      })
    );

    await Promise.all(
      tags.map(async (element) => {
        const insertTagQuery = `
        INSERT  INTO  artistTags
        (
          ArtistId,
          CommonTagId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${id},
          ${element},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertTagQuery);
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("마이 아티스탬 정보를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 휴가중 토글
 * PARAMETERS : id, isVacation
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/03
 */
// 써야함 (이미 개발되어있음 수정할 필요 X)
router.post("/info/vacation/update", isLoggedIn, async (req, res, next) => {
  const { id, isVacation } = req.body;

  const findArtistQuery = `
  SELECT  UserId,
          isPermm
    FROM  artist  
   WHERE  id = ${id}
  `;

  const updateQuery = `
UPDATE  artist
   SET  isVacation = ${isVacation},
        updatedAt = NOW()
 WHERE  id = ${id}
`;

  try {
    const findResult = await models.sequelize.query(findArtistQuery);

    if (findResult[0].length === 0) {
      return res.status(401).send("데이터가 존재하지 않습니다.");
    }

    if (!findResult[0][0].isPermm) {
      return res
        .status(401)
        .send("승인이 완료되지 않아 데이터를 수정할 수 없습니다.");
    }

    if (findResult[0][0].UserId !== req.user.id) {
      return res.status(401).send("자신의 정보만 수정할 수 있습니다.");
    }

    await models.sequelize.query(updateQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 신청자 승인하기
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/11
 */
router.post("/permm/ok", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
  UPDATE	artist
     SET	isPermm = 1,
          permmAt = NOW()
   WHERE	id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 신청자 및 판매자 삭제
 * PARAMETERS : {id}
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/16
 */
router.post("/permm/del", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQ = `
  DELETE  FROM	artist
   WHERE	id = ${id}
  `;

  try {
    await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// ARTISTEM //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : 아티스탬 전체 조회
 * PARAMETERS : orderType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/30
 */
router.post("/artistem/allList", async (req, res, next) => {
  const { orderType } = req.body;

  const _orderType = parseInt(orderType) || 1;

  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.title ASC) 	AS num,
            A.id,
            A.title,
            A.subTitle,
            A.content,
            A.coverImage,
            A.isIng,
            A.isTop,
            A.sampleRate,
            A.bitRate,
            A.downloadCnt,
            FORMAT(A.downloadCnt, 0)                    AS  viewDownloadCnt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            B.value AS caValue,
            A.sPrice,
            A.dPrice,
            A.pPrice,
            A.filename,
            A.filepath,
            FORMAT(A.sPrice , 0)   as viewsPrice,
            FORMAT(A.dPrice , 0)   as viewdPrice,
            FORMAT(A.pPrice , 0)   as viewpPrice,
            (
              SELECT  US.username
                FROM  artist      AR
               INNER
                JOIN  users       US
                  ON  AR.UserId = US.id
               WHERE  A.ArtistId = AR.id
                 AND  AR.isPermm = 1
            )                                            AS artistName,
            (
              SELECT  US.profileImage
                FROM  artist      AR
               INNER
                JOIN  users       US
                  ON  AR.UserId = US.id
               WHERE  A.ArtistId = AR.id
                 AND  AR.isPermm = 1
            )                                            AS artistImage,
            (
              SELECT  COUNT(id)
                FROM  userLike
               WHERE  ArtistemId = A.id
            )                                            AS likeCnt
            ${
              req.user
                ? `,
              CASE
                  WHEN  (
                          SELECT  COUNT(id)
                            FROM  userLike
                           WHERE  ArtistemId = A.id
                             AND  UserId = ${req.user.id}
                        ) > 0 THEN                       1
                  ELSE                                   0
              END                                        AS isLike
              `
                : `,
              0                                          AS isLike
              `
            }
      FROM	artistem	A
     INNER
      JOIN  productCategory B
        ON  A.ProductCategoryId = B.id
     WHERE  A.isIng = 0
     ${
       _orderType === 1
         ? `ORDER  BY (
                       SELECT  COUNT(id)
                         FROM  userLike	
                        WHERE  ArtistemId = A.id
                     ) DESC`
         : `ORDER  BY  A.createdAt DESC`
     }
    `;

  const selectQ2 = `
    SELECT	value,
            ArtistemId
      FROM	artistTemTag
      `;

  const selectQ3 = `
    SELECT	value,
            ArtistemId
      FROM	artistTemGen
    `;

  try {
    const list = await models.sequelize.query(selectQ);
    const tags = await models.sequelize.query(selectQ2);
    const gens = await models.sequelize.query(selectQ3);

    const tems = list[0];

    tems.map((data) => {
      data["tags"] = [];
      data["gens"] = [];

      tags[0].map((tag) => {
        if (data.id === tag.ArtistemId) {
          data["tags"].push(tag.value);
        }
      });
      gens[0].map((gen) => {
        if (data.id === gen.ArtistemId) {
          data["gens"].push(gen.value);
        }
      });
    });

    return res.status(200).json({
      artistemList: tems,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("아티스템을 조회할 수 없습니다. 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 아티스탬 최신순 정렬 10개 리스트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/02/03
 */
router.post("/artistem/slideList", async (req, res, next) => {
  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.title ASC) 	AS num,
            A.id,
            A.title,
            A.subTitle,
            A.content,
            A.coverImage,
            A.isIng,
            A.isTop,
            A.sampleRate,
            A.bitRate,
            A.downloadCnt,
            FORMAT(A.downloadCnt, 0)                    AS  viewDownloadCnt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            B.value AS caValue,
            A.sPrice,
            A.dPrice,
            A.pPrice,
            A.filename,
            A.filepath,
            A.ArtistId,
            FORMAT(A.sPrice , 0)   as viewsPrice,
            FORMAT(A.dPrice , 0)   as viewdPrice,
            FORMAT(A.pPrice , 0)   as viewpPrice,
            (
              SELECT  US.username
                FROM  artist      AR
               INNER
                JOIN  users       US
                  ON  AR.UserId = US.id
               WHERE  A.ArtistId = AR.id
                 AND  AR.isPermm = 1
            )                                            AS artistName,
            (
              SELECT  US.profileImage
                FROM  artist      AR
               INNER
                JOIN  users       US
                  ON  AR.UserId = US.id
               WHERE  A.ArtistId = AR.id
                 AND  AR.isPermm = 1
            )                                            AS artistImage,
            (
              SELECT  COUNT(id)
                FROM  userLike
               WHERE  ArtistemId = A.id
            )                                            AS likeCnt
            ${
              req.user
                ? `,
              CASE
                  WHEN  (
                          SELECT  COUNT(id)
                            FROM  userLike
                           WHERE  ArtistemId = A.id
                             AND  UserId = ${req.user.id}
                        ) > 0 THEN                       1
                  ELSE                                   0
              END                                        AS isLike
              `
                : `,
              0                                          AS isLike
              `
            }
      FROM	artistem	A
     INNER
      JOIN  productCategory B
        ON  A.ProductCategoryId = B.id
     WHERE  A.isIng = 0
     ORDER  BY  A.createdAt DESC
     LIMIT  10
    `;

  const selectQ2 = `
    SELECT	value,
            ArtistemId
      FROM	artistTemTag
      `;

  const selectQ3 = `
    SELECT	value,
            ArtistemId
      FROM	artistTemGen
    `;

  const selectQ4 = `
    SELECT	id,
            roleName,
            comment,
            name,
            title,
            musicFile,
            coverImage,
            sort,
            ArtistId
      FROM	artistFilm
    `;

  try {
    const list = await models.sequelize.query(selectQ);
    const tags = await models.sequelize.query(selectQ2);
    const gens = await models.sequelize.query(selectQ3);
    const film = await models.sequelize.query(selectQ4);

    const tems = list[0];

    tems.map((data) => {
      data["tags"] = [];
      data["gens"] = [];
      data["film"] = [];

      tags[0].map((tag) => {
        if (data.id === tag.ArtistemId) {
          data["tags"].push(tag.value);
        }
      });
      gens[0].map((gen) => {
        if (data.id === gen.ArtistemId) {
          data["gens"].push(gen.value);
        }
      });
      film[0].map((film) => {
        if (data.ArtistId === film.ArtistId) {
          data["film"].push({
            ...film,
          });
        }
      });
    });

    return res.status(200).json({
      artistemList: tems,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("아티스템을 조회할 수 없습니다. 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 최근 일주일 내 등록된 아티스탬 조회
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/30
 */
router.post("/artistem/newList", async (req, res, next) => {
  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.title ASC) 	AS num,
            A.id,
            A.title,
            A.subTitle,
            A.content,
            A.coverImage,
            A.isIng,
            A.isTop,
            A.sampleRate,
            A.bitRate,
            A.downloadCnt,
            FORMAT(A.downloadCnt, 0)                    AS  viewDownloadCnt,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            B.value AS caValue,
            A.sPrice,
            A.dPrice,
            A.pPrice,
            A.filename,
            A.filepath,
            FORMAT(A.sPrice , 0)   as viewsPrice,
            FORMAT(A.dPrice , 0)   as viewdPrice,
            FORMAT(A.pPrice , 0)   as viewpPrice,
            (
              SELECT  US.username
                FROM  artist      AR
               INNER
                JOIN  users       US
                  ON  AR.UserId = US.id
               WHERE  A.ArtistId = AR.id
                 AND  AR.isPermm = 1
            )                                            AS artistName,
            (
              SELECT  US.profileImage
                FROM  artist      AR
               INNER
                JOIN  users       US
                  ON  AR.UserId = US.id
               WHERE  A.ArtistId = AR.id
                 AND  AR.isPermm = 1
            )                                            AS artistImage,
            (
              SELECT  COUNT(id)
                FROM  userLike
               WHERE  ArtistemId = A.id
            )                                            AS likeCnt
            ${
              req.user
                ? `,
              CASE
                  WHEN  (
                          SELECT  COUNT(id)
                            FROM  userLike
                           WHERE  ArtistemId = A.id
                             AND  UserId = ${req.user.id}
                        ) > 0 THEN                       1
                  ELSE                                   0
              END                                        AS isLike
              `
                : `,
              0                                          AS isLike
              `
            }
      FROM	artistem	A
     INNER
      JOIN  productCategory B
        ON  A.ProductCategoryId = B.id
     WHERE  A.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
       AND  A.isIng = 0
    `;

  const selectQ2 = `
    SELECT	value,
            ArtistemId
      FROM	artistTemTag
      `;

  const selectQ3 = `
    SELECT	value,
            ArtistemId
      FROM	artistTemGen
    `;

  try {
    const list = await models.sequelize.query(selectQ);
    const tags = await models.sequelize.query(selectQ2);
    const gens = await models.sequelize.query(selectQ3);

    const tems = list[0];

    tems.map((data) => {
      data["tags"] = [];
      data["gens"] = [];

      tags[0].map((tag) => {
        if (data.id === tag.ArtistemId) {
          data["tags"].push(tag.value);
        }
      });
      gens[0].map((gen) => {
        if (data.id === gen.ArtistemId) {
          data["gens"].push(gen.value);
        }
      });
    });

    return res.status(200).json({
      artistemList: tems,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("아티스템을 조회할 수 없습니다. 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 가장 최근 등록된 아티스탬 4개 불러오기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/30
 */
// 써야함 (수정완료)
router.post("/artistem/nearList", async (req, res, next) => {
  const selectQuery = `
    SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)     AS num,
            A.id,
            A.username,
            A.profileImage,
            B.artistname,
            B.info,
            B.repSongFilePath,
            B.repSongFileName,
            B.id                                          AS artistRequestId
      FROM  users       A
      LEFT
     OUTER
      JOIN  artist      B
        ON  A.id = B.UserId
     WHERE  0 < (
                  SELECT  COUNT(at.id)
                    FROM  artist		at
                   WHERE  at.isPermm = 1	 
                     AND  at.isUpdate = 1
                     AND  at.UserId = A.id
                )
     ORDER  BY num DESC
     LIMIT  4
    `;

  const tagQuery = `
    SELECT  A.ArtistId,
            B.type,
            B.value
      FROM  artistTags        A
     INNER
      JOIN  commonTag         B
        ON  A.CommonTagId = B.id
    `;

  try {
    const list = await models.sequelize.query(selectQuery);

    const tags = await models.sequelize.query(tagQuery);

    list[0].map((item) => {
      item["tags"] = [];

      tags[0].map((innerItem) => {
        if (parseInt(item.artistRequestId) === parseInt(innerItem.ArtistId)) {
          item.tags.push(innerItem);
        }
      });
    });

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("아티스템을 조회할 수 없습니다. 다시 시도해주세요.");
  }
});

// 아티스트의 아이디로 아티스탬 조회 (아티스트의 아이디는 User의 아이디가 아닌 Artist모델의 아이디 인 듯 합니다.)
// 써야함 (수정완료)
router.post("/target/list", async (req, res, next) => {
  const { ArtistId } = req.body;

  const selectQuery = `
    SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)     AS num,
            A.id,
            A.username,
            A.profileImage,
            B.id                                          AS artistRequestId,
            B.plan,
            B.gen,
            B.isArtist,
            B.isMusictem,
            B.repSongFilePath,
            B.repSongFileName,
            B.name,
            B.businessNum,
            B.artistname,
            B.info,
            B.question1,
            B.question2,
            B.question3,
            B.question4,
            B.question5,
            B.question6,
            B.question7,
            B.question8,
            B.isVacation
      FROM  users       A
      LEFT
     OUTER
      JOIN  artist      B
        ON  A.id = B.UserId
     WHERE  0 < (
                  SELECT  COUNT(at.id)
                    FROM  artist		at
                   WHERE  at.isPermm = 1	 
                     AND  at.isUpdate = 1
                     AND  at.UserId = A.id
                )
       AND  B.id = ${ArtistId}
    `;

  const tagQuery = `
    SELECT  A.ArtistId,
            B.type,
            B.value
      FROM  artistTags        A
     INNER
      JOIN  commonTag         B
        ON  A.CommonTagId = B.id
     WHERE  A.ArtistId = ${ArtistId}
    `;

  const filmQuery = `
SELECT	ROW_NUMBER()	OVER(ORDER	BY sort)	AS num,
        id,
        roleName,
        comment,
        name,
        title,
        musicFile,
        coverImage,
        sort,
        createdAt,
        updatedAt,
        DATE_FORMAT(createdAt, "%Y년 %m월 %d일") 	AS	viewCreatedAt,
        DATE_FORMAT(updatedAt, "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
        ArtistId 
  FROM	artistFilm
 WHERE  ArtistId = ${ArtistId}
 ORDER	BY num ASC
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    const tags = await models.sequelize.query(tagQuery);
    const films = await models.sequelize.query(filmQuery);

    list[0].map((item) => {
      item["tags"] = [];

      tags[0].map((innerItem) => {
        if (parseInt(item.artistRequestId) === parseInt(innerItem.ArtistId)) {
          item.tags.push(innerItem);
        }
      });
    });

    list[0].map((item) => {
      item["films"] = [];

      films[0].map((innerItem) => {
        if (parseInt(item.artistRequestId) === parseInt(innerItem.ArtistId)) {
          item.films.push(innerItem);
        }
      });
    });

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("아티스템을 조회할 수 없습니다. 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 아티스탬 상세 조회
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/27
 */
router.post("/target/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT	A.id,
          A.title,
          A.subTitle,
          (
          SELECT  US.username
            FROM  artist      AR
           INNER
            JOIN  users       US
              ON  AR.UserId = US.id
           WHERE  A.ArtistId = AR.id
             AND  AR.isPermm = 1
          )                                            AS artistName,
          (
          SELECT  US.profileImage
            FROM  artist      AR
           INNER
            JOIN  users       US
              ON  AR.UserId = US.id
           WHERE  A.ArtistId = AR.id
             AND  AR.isPermm = 1
          )                                            AS artistImage,
          A.content,
          A.coverImage,
          A.isIng,
          A.isTop,
          A.sampleRate,
          A.bitRate,
          A.downloadCnt,
          FORMAT(A.downloadCnt, 0)                    AS  viewDownloadCnt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
          B.value AS caValue,
          A.sPrice,
          A.dPrice,
          A.pPrice,
          A.filename,
          A.filepath,
          FORMAT(A.sPrice , 0)   as viewsPrice,
          FORMAT(A.dPrice , 0)   as viewdPrice,
          FORMAT(A.pPrice , 0)   as viewpPrice,
          (
            SELECT  COUNT(id)
              FROM  userLike
             WHERE  ArtistemId = A.id
          )                                            AS likeCnt
          ${
            req.user
              ? `,
            CASE
                WHEN  (
                        SELECT  COUNT(id)
                          FROM  userLike
                         WHERE  ArtistemId = A.id
                           AND  UserId = ${req.user.id}
                      ) > 0 THEN                       1
                ELSE                                   0
            END                                        AS isLike
            `
              : `,
            0                                          AS isLike
            `
          }
    FROM	artistem	A
   INNER
    JOIN  productCategory B
      ON  A.ProductCategoryId = B.id
   WHERE  A.id = ${id}
  `;

  const selectQ2 = `
  SELECT	value,
          ArtistemId
    FROM	artistTemTag
   WHERE  ArtistemId = ${id}
    `;

  const selectQ3 = `
  SELECT	value,
          ArtistemId
    FROM	artistTemGen
   WHERE  ArtistemId = ${id}
  `;

  try {
    const list = await models.sequelize.query(selectQ);
    const tags = await models.sequelize.query(selectQ2);
    const gens = await models.sequelize.query(selectQ3);

    if (list[0].length === 0) {
      return res.status(401).send("존재하지 않는 아티스탬 정보입니다.");
    }

    const tems = list[0];

    tems.map((data) => {
      data["tags"] = [];
      data["gens"] = [];

      tags[0].map((tag) => {
        if (data.id === tag.ArtistemId) {
          data["tags"].push(tag.value);
        }
      });
      gens[0].map((gen) => {
        if (data.id === gen.ArtistemId) {
          data["gens"].push(gen.value);
        }
      });
    });

    return res.status(200).json(tems[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send("아티스템을 조회할 수 없습니다. 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 아티스탬 판매여부 제어
 * PARAMETERS : { id  , nextFlag }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/19
 */
router.post("/artistem/isIng", isAdminCheck, async (req, res, next) => {
  const { id, nextFlag } = req.body;

  console.log(id, nextFlag);

  const updateQ = `
  UPDATE	artistem
     SET	isIng = ${nextFlag},
          updatedAt = NOW()
   WHERE	id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

/**
 * SUBJECT : 아티스탬 상단고정여부 제어
 * PARAMETERS : { id  , nextFlag }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/19
 */
router.post("/artistem/top", isAdminCheck, async (req, res, next) => {
  const { id, nextFlag } = req.body;

  console.log(id, nextFlag);

  const updateQ = `
  UPDATE	artistem
     SET	isTop = ${nextFlag},
          updatedAt = NOW()
   WHERE	id = ${id}
  `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("잠시 후 다시 시도해주세요.");
  }
});

module.exports = router;
