const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

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

router.post("/file", upload.single("file"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// CATEGORY ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 상품 카테고리 가져오기
 * PARAMETERS : -
 * ORDER BY : value ASC
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/list", async (req, res, next) => {
  const selectQ = `
  SELECT	ROW_NUMBER() OVER(ORDER BY A.value ASC) AS num,
            A.id,
            A.value,
            A.createdAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            A.updatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            CONCAT((
                SELECT	COUNT(id)
                    FROM	product
                WHERE	A.id = ProductCategoryId 
            ), "개") AS sndCnt
      FROM	productCategory	A
     WHERE  isDelete = 0
     ORDER  BY  value ASC
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 카테고리 등록하기
 * PARAMETERS : { value }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/new", async (req, res, next) => {
  const { value } = req.body;

  const insertQ = `
  INSERT INTO productCategory (value, createdAt, updatedAt) VALUES (
	"${value}", NOW(), NOW()
    )
      `;

  try {
    const list = await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("새로운 카테고리를 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 카테고리 수정하기
 * PARAMETERS : { id, nextValue }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/modify", async (req, res, next) => {
  const { id, nextValue } = req.body;

  const updateQ = `
    UPDATE  productCategory
       SET  value = "${nextValue}",
            updatedAt = NOW()
     WHERE  id = ${id}
        `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("카테고리를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품 카테고리 삭제하기
 * PARAMETERS : { id }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/ca/delete", async (req, res, next) => {
  const { id } = req.body;

  const updateQ = `
      UPDATE  productCategory
         SET  isDelete = 1,
              updatedAt = NOW(),
              deletedAt = NOW()
       WHERE  id = ${id}
          `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("카테고리를 삭제할 수 없습니다.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// PRODUCT ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/**
 * SUBJECT : 상품 상세 정보 조회하기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/02/13
 */

router.post("/pro/myDetail", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT  A.id,
          A.title,
          A.subTitle,
          A.content,
          A.coverImage,
          A.downloadCnt,
          A.bitRate,
          A.sampleRate,
          A.isTop,
          B.value,
          C.nickname
    FROM  product           A
   INNER
    JOIN  productCategory   B
      ON  A.ProductCategoryId = B.id
   INNER 
    JOIN  users             C
      ON  A.UserId = C.id
   WHERE  A.id = ${id}
  `;

  const select2Q = `
  SELECT  A.id,
          A.title,
          A.author,
          A.thumbnail,
          A.filename,
          A.filepath,
          A.downloadCnt,
          FORMAT(A.downloadCnt, ",")					AS  viewDownLoadCnt,
          FORMAT(A.sPrice , 0)   as viewsPrice,
          FORMAT(A.dPrice , 0)   as viewdPrice,
          FORMAT(A.pPrice , 0)   as viewpPrice,
          A.ProductId,
          A.createdAt,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          A.isOk,
          A.isReject,
          A.rejectContent
    FROM  productTrack		A
   WHERE  A.ProductId = ${id}
  `;

  try {
    const productDetail = await models.sequelize.query(selectQ);
    const productTrackDetail = await models.sequelize.query(select2Q);

    const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId = ${id}
    `;

    const genList = await models.sequelize.query(selectGenQ);

    return res.status(200).json({
      ...productDetail[0][0],
      genList: genList[0],
      trackList: productTrackDetail[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 회원의 상품(앨범) 조회하기
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/02/09
 */
router.post("/pro/myList", isLoggedIn, async (req, res, next) => {
  const selectQ = `
  SELECT  A.id,
          A.title,
          A.subTitle,
          A.content,
          A.coverImage,
          A.downloadCnt,
          A.bitRate,
          A.sampleRate,
          A.isTop,
          B.value
    FROM  product           A
   INNER
    JOIN  productCategory   B
      ON  A.ProductCategoryId = B.id
   WHERE  A.UserId = ${req.user.id}
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 뮤직탬 엘범 등록
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/02/10
 */
router.post("/pro/create", isLoggedIn, async (req, res, next) => {
  const {
    title,
    subTitle,
    content,
    coverImage,
    bitRate,
    sampleRate,
    agreementPath,
    agreementName,
    productCategoryId,
    productGenArr,
  } = req.body;

  if (!Array.isArray(productGenArr)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const insertQ = `
  INSERT INTO product (
		title,
		subTitle,
		content,
		coverImage,
		bitRate,
		sampleRate,
		createdAt,
		updatedAt,
		UserId,
		ProductCategoryId,
    agreementPath,
    agreementName
	) VALUES (
		'${title}',
		'${subTitle}',
		'${content}',
		'${coverImage}',
		'${bitRate}',
		'${sampleRate}',
		NOW(),
		NOW(),
		${req.user.id},
		${productCategoryId},
    '${agreementPath}',
    '${agreementName}'
	)
  `;

  try {
    const result = await models.sequelize.query(insertQ);

    const insertConnectQ = `
    INSERT INTO productGenConnect (
      createdAt,
      updatedAt,
      ProductGenId,
      ProductId 
    ) VALUES 
    ${productGenArr.map((data, idx) => {
      return `
      (
        NOW(),
        NOW(),
        ${data},
        ${result[0]}
      )`;
    })}
    `;

    await models.sequelize.query(insertConnectQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("엘범을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품(앨범) 조회하기
 * PARAMETERS : { CategoryId, isTop, title, username }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/pro/list", async (req, res, next) => {
  const { CategoryId, isTop, title, username } = req.body;

  const _CategoryId = CategoryId ? CategoryId : false;
  const _isTop = isTop ? isTop : false;
  const _title = title ? title : false;
  const _username = username ? username : false;

  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC) AS num,
            A.id,
            A.title,
            A.subTitle,
            A.content,
            A.coverImage,
            A.downloadCnt,
            A.isTop,
            A.createdAt,
            A.updatedAt,
            DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            A.ProductCategoryId,
            B.value,
            A.UserId,
            C.username,
            C.email,
            C.nickname,
            A.bitRate,
            A.sampleRate
     FROM	product			A
    INNER
     JOIN	productCategory B
       ON	A.ProductCategoryId = B.id
    INNER
     JOIN	users			C
       ON	A.UserId = C.id
    WHERE   1 = 1
    ${_CategoryId ? `AND  A.ProductCategoryId = ${_CategoryId}` : ``}
    ${_isTop ? `AND  A.isTop = ${_isTop === -1 ? 0 : _isTop}` : ``}
    ${_title ? `AND  A.title LIKE "%${_title}%"` : ``}
    ${_username ? `AND  C.username LIKE "%${_username}%"` : ``}
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품(앨범) 판매여부 변경
 * PARAMETERS : { id, nextIng }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/pro/ing", async (req, res, next) => {
  const { id, nextIng } = req.body;

  const updateQ = `
        UPDATE  product
           SET  updatedAt = NOW()
         WHERE  id = ${id}
         `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("판매여부를 수정할 수 없습니다.");
  }
});

/**
 * SUBJECT : 상품(앨범) 판매여부 변경
 * PARAMETERS : { id, nextIng }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/pro/top", async (req, res, next) => {
  const { id, nextTop } = req.body;

  const updateQ = `
          UPDATE  product
             SET  isTop = ${nextTop},
                  updatedAt = NOW()
           WHERE  id = ${id}
           `;

  try {
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("상단고정여부를 수정할 수 없습니다.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// TAG /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
router.post("/tag/list", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT	id,
          value
    FROM	productTag
   WHERE	ProductId = ${id}
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// GEN /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
router.post("/gen/list", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT	id,
          value
    FROM	productGen
   WHERE	ProductId = ${id}
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 장르 전체 조회
 * PARAMETERS : -
 * ORDER BY : value ASC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/02/10
 */

router.post("/gen/allList", async (req, res, next) => {
  const selectQ = `
  SELECT  id,
          value
    FROM  productGen
   ORDER  BY value ASC
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TRACK ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 뮤직탬 미처리 리스트 조회
 * PARAMETERS : listType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/02/13
 */

router.post("/track/typeList", async (req, res, next) => {
  const { listType } = req.body;

  const _listType = listType ? listType : 3;

  const selectQ = `
  SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt DESC) AS num,
          A.id,
	  	    A.title,
          A.author,
          A.thumbnail,
          A.filename,
          A.filepath,
          A.downloadCnt,
          FORMAT(A.downloadCnt, ",")					AS  viewDownLoadCnt,
          FORMAT(A.sPrice , 0)   as viewsPrice,
          FORMAT(A.dPrice , 0)   as viewdPrice,
          FORMAT(A.pPrice , 0)   as viewpPrice,
          A.ProductId,
          A.createdAt,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          A.isOk,
          A.isReject,
          A.rejectContent
    FROM  productTrack		A
   WHERE  1 = 1
          ${
            _listType === 1
              ? `AND A.isOk = 1`
              : _listType === 2
              ? `AND A.isReject = 1`
              : `AND A.isOk = 0
                 AND A.isReject = 0`
          }
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    if (list[0].length > 0) {
      const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId 
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId IN (${
       list[0].map((data) => data.ProductId).length === 0
         ? 0
         : list[0].map((data) => data.ProductId)
     })
    `;

      const genList = await models.sequelize.query(selectGenQ);
      return res.status(200).json({
        list: list[0].map((data) => ({
          ...data,
          genList: genList[0].filter(
            (value) => value.ProductId === data.ProductId
          ),
        })),
      });
    } else {
      return res.status(200).json({
        list: list[0].map((data) => ({
          ...data,
          genList: [],
        })),
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).send("음원을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 뮤직탬 승인하기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/02/13
 */

router.post("/track/isOk", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const findQ = `
  SELECT  id
    FROM  productTrack
   WHERE  1 = 1
     AND  isOk = TRUE OR isReject = TRUE
     AND  id = ${id}
  `;

  const updateQ = `
  UPDATE  productTrack
     SET  isOK = TRUE
   WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findQ);

    if (findResult[0][0]) {
      return res.status(401).send("이미 처리된 음원 입니다.");
    }

    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    return res.status(401).send("해당음원을 승인할 수 없습니다.");
  }
});

/**
 * SUBJECT : 뮤직탬 거절하기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/02/13
 */

router.post("/track/isReject", isAdminCheck, async (req, res, next) => {
  const { id, rejectContent } = req.body;

  const findQ = `
  SELECT  id
    FROM  productTrack
   WHERE  1 = 1
     AND  isOk = TRUE OR isReject = TRUE
     AND  id = ${id}
  `;

  const updateQ = `
  UPDATE  productTrack
     SET  isReject = TRUE,
          rejectContent = '${rejectContent ? rejectContent : ""}'
   WHERE  id = ${id}
  `;

  try {
    const findResult = await models.sequelize.query(findQ);

    if (findResult[0][0]) {
      return res.status(401).send("이미 처리된 음원 입니다.");
    }
    await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    return res.status(401).send("해당음원을 승인할 수 없습니다.");
  }
});

/**
 * SUBJECT : 뮤직탬 전체 조회
 * PARAMETERS : orderType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/01/30
 */

router.post("/track/allList", async (req, res, next) => {
  const { orderType, tagId, searchTitle } = req.body;

  const _orderType = orderType ? parseInt(orderType) : 1;
  // 1 추천순
  // 2 최신순

  const _tagId = tagId ? parseInt(tagId) : null;
  const _searchTitle = searchTitle ? searchTitle : "";

  const selectQ = `
  SELECT  A.id,
	  	    A.title,
          A.author,
          A.thumbnail,
          A.filename,
          A.filepath,
          A.downloadCnt,
          FORMAT(A.downloadCnt, ",")					AS  viewDownLoadCnt,
          A.ProductId,
          A.createdAt,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          (
          	SELECT  COUNT(B.id)
          	  FROM  userLike	B
          	 WHERE  A.id = B.ProductTrackId
          )		                                        AS likeCnt,
          CASE 
          	WHEN  (
          			   SELECT  COUNT(B.id)
          	  	  	 FROM  userLike	B
          	 		    WHERE  B.UserId = ${req.user ? req.user.id : 0}
          		    ) > 0
          	THEN  1
         		ELSE  0
         	END                                         AS isLike
    FROM  productTrack		A
   WHERE  1 = 1
     AND  A.title LIKE "%${_searchTitle}%"
          ${
            _tagId
              ? `AND  ${_tagId} IN (
                                      SELECT  D.id
                                        FROM  productTag D
                                      WHERE  D.ProductId = A.ProductId
                                  )`
              : ``
          }
          ${
            _orderType === 1
              ? `ORDER  BY  (
                              SELECT  COUNT(B.id)
                                FROM  userLike	B
                               WHERE  A.id = B.ProductTrackId
                            ) DESC`
              : `ORDER  BY  A.createdAt DESC`
          }
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId 
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId IN (${
       list[0].map((data) => data.ProductId).length === 0
         ? 0
         : list[0].map((data) => data.ProductId)
     })
    `;

    const genList = await models.sequelize.query(selectGenQ);

    return res.status(200).json({
      list: list[0].map((data) => ({
        ...data,
        genList: genList[0].filter(
          (value) => value.ProductId === data.ProductId
        ),
      })),
    });
  } catch (e) {
    console.error(e);
    return res.status(400).send("음원을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 뮤직탬 전체 조회 (페이지네이션 X)
 * PARAMETERS : orderType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/05/12
 */
router.post("/track/noPage/allList", async (req, res, next) => {
  const { orderType } = req.body;

  const _orderType = orderType ? parseInt(orderType) : 1;
  // 1 추천순
  // 2 최신순

  const selectQ = `
  SELECT  A.id,
	  	    A.title,
          A.author,
          A.thumbnail,
          A.filename,
          A.filepath,
          A.downloadCnt,
          FORMAT(A.downloadCnt, ",")					AS  viewDownLoadCnt,
          A.ProductId,
          A.createdAt,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          (
          	SELECT  COUNT(B.id)
          	  FROM  userLike	B
          	 WHERE  A.id = B.ProductTrackId
          )		                                        AS likeCnt,
          CASE 
          	WHEN  (
          			   SELECT  COUNT(B.id)
          	  	  	 FROM  userLike	B
          	 		    WHERE  B.UserId = ${req.user ? req.user.id : 0}
          		    ) > 0
          	THEN  1
         		ELSE  0
         	END                                         AS isLike
    FROM  productTrack		A
          ${
            _orderType === 1
              ? `ORDER  BY  (
                              SELECT  COUNT(B.id)
                                FROM  userLike	B
                               WHERE  A.id = B.ProductTrackId
                            ) DESC`
              : `ORDER  BY  A.createdAt DESC`
          }
   LIMIT  5
    `;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId 
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId IN (${
       list[0].map((data) => data.ProductId).length === 0
         ? 0
         : list[0].map((data) => data.ProductId)
     })
    `;

    const genList = await models.sequelize.query(selectGenQ);

    return res.status(200).json({
      list: list[0].map((data) => ({
        ...data,
        genList: genList[0].filter(
          (value) => value.ProductId === data.ProductId
        ),
      })),
    });
  } catch (e) {
    console.error(e);
    return res.status(400).send("음원을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 새로운 음원 불러오기
 * PARAMETERS : -
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/01/30
 */
router.post("/track/newList", async (req, res, next) => {
  const selectQ = `
  SELECT  A.id,
          A.title,
          A.author,
          A.thumbnail,
          A.filename,
          A.filepath,
          A.downloadCnt,
          FORMAT(A.downloadCnt, ",")					AS  viewDownLoadCnt,
          A.createdAt,
          A.ProductId
    FROM  productTrack	A 
   WHERE  A.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
   ORDER  BY A.createdAt DESC
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId 
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId IN (${
       list[0].map((data) => data.ProductId).length === 0
         ? 0
         : list[0].map((data) => data.ProductId)
     })
    `;

    const genList = await models.sequelize.query(selectGenQ);

    return res.status(200).json(
      list[0].map((data) => ({
        ...data,
        genList: genList[0].filter(
          (value) => value.ProductId === data.ProductId
        ),
      }))
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 최신음원트랙 5개불러오기
 * PARAMETERS : tagId, searchTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 팀장 송재홍
 * DEV DATE : 2023/01/30
 */
router.post("/track/recentList", async (req, res, next) => {
  const { tagId, searchTitle } = req.body;

  const _tagId = tagId ? parseInt(tagId) : null;
  const _searchTitle = searchTitle ? searchTitle : "";

  const selectQ = `
 SELECT  A.id,
         A.title,
         A.author,
         A.thumbnail,
         A.filename,
         A.filepath,
         A.downloadCnt,
         FORMAT(A.downloadCnt, ",")					AS  viewDownLoadCnt,
         A.createdAt,
         A.ProductId,
         (
           SELECT  COUNT(B.id)
             FROM  userLike	B
            WHERE  A.id = B.ProductTrackId
         )		                                        AS likeCnt,
         CASE 
           WHEN  (
                  SELECT  COUNT(B.id)
                    FROM  userLike	B
                   WHERE  B.UserId = ${req.user ? req.user.id : 0}
                 ) > 0
           THEN  1
           ELSE  0
          END                                         AS isLike
   FROM  productTrack	A 
  WHERE  1 = 1
    AND  A.title LIKE "%${_searchTitle}%"
         ${
           _tagId
             ? `AND  ${_tagId} IN (
                                     SELECT  D.id
                                       FROM  productTag D
                                     WHERE  D.ProductId = A.ProductId
                                 )`
             : ``
         }
  ORDER  BY A.createdAt DESC 
  LIMIT  5
  
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId 
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId IN (${
       list[0].map((data) => data.ProductId).length === 0
         ? 0
         : list[0].map((data) => data.ProductId)
     })
    `;

    const genList = await models.sequelize.query(selectGenQ);

    return res.status(200).json(
      list[0].map((data) => ({
        ...data,
        genList: genList[0].filter(
          (value) => value.ProductId === data.ProductId
        ),
      }))
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 뮤직탬 판매량 많은 순 (다운로드 횟수 많은 순)
 * PARAMETERS : tagId, searchTitle
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 개발자 신태섭
 * DEV DATE : 2023/02/07
 */
router.post("/track/sellDesc", async (req, res, next) => {
  const { tagId, searchTitle } = req.body;

  const _tagId = tagId ? parseInt(tagId) : null;
  const _searchTitle = searchTitle ? searchTitle : "";

  const selectQ = `
 SELECT  A.id,
         A.title,
         A.author,
         A.thumbnail,
         A.filename,
         A.filepath,
         A.downloadCnt,
         FORMAT(A.downloadCnt, 0)					          AS  viewDownLoadCnt,
         A.createdAt,
         A.ProductId,
         (
           SELECT  COUNT(B.id)
             FROM  userLike	B
            WHERE  A.id = B.ProductTrackId
         )		                                        AS likeCnt,
         ${
           req.user
             ? `
          CASE
              WHEN  (
                      SELECT  COUNT(id)
                        FROM  userLike
                       WHERE  ProductTrackId = A.id
                         AND  UserId = ${req.user.id}
                    ) > 0 THEN                       1
              ELSE                                   0
          END                                        AS isLike
          `
             : `
          0                                          AS isLike
          `
         }
   FROM  productTrack	A 
  WHERE  1 = 1
         AND  A.title LIKE "%${_searchTitle}%"
         ${
           _tagId
             ? `AND  ${_tagId} IN (
                                     SELECT  D.id
                                       FROM  productTag D
                                     WHERE  D.ProductId = A.ProductId
                                 )`
             : ``
         }
  ORDER  BY A.downloadCnt DESC 
  LIMIT  5
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId 
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId IN (${
       list[0].map((data) => data.ProductId).length === 0
         ? 0
         : list[0].map((data) => data.ProductId)
     })
    `;

    const genList = await models.sequelize.query(selectGenQ);

    return res.status(200).json(
      list[0].map((data) => ({
        ...data,
        genList: genList[0].filter(
          (value) => value.ProductId === data.ProductId
        ),
      }))
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/track/list", async (req, res, next) => {
  const { ProductId } = req.body;

  const selectQ = `
  SELECT	A.id,
          A.title,
          A.isTitle,
          A.filename,
          A.filepath,
          A.author,
          A.downloadCnt,
          A.createdAt,
          A.updatedAt,
          A.ProductId,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
          A.sPrice,
          A.dPrice,
          A.pPrice,
          FORMAT(A.sPrice , 0)   as viewsPrice,
          FORMAT(A.dPrice , 0)   as viewdPrice,
          FORMAT(A.pPrice , 0)   as viewpPrice
    FROM	productTrack	A
   WHERE  A.ProductId = ${ProductId}
  `;

  const selectQ2 = `
  SELECT	A.id,
          A.value,
          A.createdAt,
          A.updatedAt,
          A.ProductTrackId,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt
    FROM	trackGen	A
  `;

  try {
    const list = await models.sequelize.query(selectQ);
    const gens = await models.sequelize.query(selectQ2);

    const trackList = list[0];
    const genList = gens[0];

    trackList.map((item) => {
      item["gens"] = [];

      genList.map((innerItem) => {
        if (parseInt(item.id) === parseInt(innerItem.ProductTrackId)) {
          item.gens.push(innerItem.value);
        }
      });
    });

    console.log(trackList);

    return res.status(200).json(trackList);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 트랙 상세보기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/27
 */
router.post("/track/detail", async (req, res, next) => {
  const { id } = req.body;

  const selectQ = `
  SELECT	A.id,
          A.title,
          A.thumbnail,
          A.isTitle,
          A.filename,
          A.filepath,
          A.author,
          A.downloadCnt,
          FORMAT(A.downloadCnt, 0)                    AS  viewDownloadCnt,
          A.createdAt,
          A.updatedAt,
          A.ProductId,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
          A.sPrice,
          A.dPrice,
          A.pPrice,
          FORMAT(A.sPrice , 0)   as viewsPrice,
          FORMAT(A.dPrice , 0)   as viewdPrice,
          FORMAT(A.pPrice , 0)   as viewpPrice,
          (
            SELECT  COUNT(id)
              FROM  userLike
             WHERE  ProductTrackId = A.id
          )                                            AS likeCnt
          ${
            req.user
              ? `,
            CASE
                WHEN  (
                        SELECT  COUNT(id)
                          FROM  userLike
                         WHERE  ProductTrackId = A.id
                           AND  UserId = ${req.user.id}
                      ) > 0 THEN                       1
                ELSE                                   0
            END                                        AS isLike
            `
              : `,
            0                                          AS isLike
            `
          }
    FROM	productTrack	A
   WHERE  A.id = ${id}
  `;

  const selectQ2 = `
  SELECT	A.id,
          A.value,
          A.createdAt,
          A.updatedAt,
          A.ProductTrackId,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt
    FROM	trackGen	A
   WHERE  A.ProductTrackId = ${id}
  `;

  try {
    const list = await models.sequelize.query(selectQ);
    const gens = await models.sequelize.query(selectQ2);

    if (list[0].length === 0) {
      return res.status(401).send("존재하지 않는 데이터 입니다.");
    }

    const trackList = list[0];
    const genList = gens[0];

    trackList.map((item) => {
      item["gens"] = [];

      genList.map((innerItem) => {
        if (parseInt(item.id) === parseInt(innerItem.ProductTrackId)) {
          item.gens.push(innerItem.value);
        }
      });
    });

    return res.status(200).json(trackList[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스트 엘범 상세보기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 홍민기
 * DEV DATE : 2023/02/27
 */
router.post("/artist/album/detail", async (req, res, next) => {
  const { id, orderType } = req.body;

  const _orderType = orderType ? parseInt(orderType) : 3;

  const findProductTrackQ = `
  SELECT  A.id,
          A.thumbnail,
          A.title,
          A.isTitle,
          A.filename,
          A.filepath,
          A.author,
          A.downloadCnt,
          A.createdAt,
          A.updatedAt,
          A.ProductId,
          DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
          DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
          A.sPrice,
          A.dPrice,
          A.pPrice,
          FORMAT(A.sPrice , 0)   as viewsPrice,
          FORMAT(A.dPrice , 0)   as viewdPrice,
          FORMAT(A.pPrice , 0)   as viewpPrice,
          FORMAT(A.downloadCnt, ",")					AS  viewDownLoadCnt,
          (
          	SELECT  COUNT(B.id)
          	  FROM  userLike	B
          	 WHERE  A.id = B.ProductTrackId
          )		                                        AS likeCnt,
          B.UserId
    FROM	productTrack	A
   INNER
    JOIN  product       B
      ON  A.ProductId = B.id
   WHERE  B.id = ${id}
   ORDER  BY downloadCnt DESC 
  `;

  try {
    const findProductTrack = await models.sequelize.query(findProductTrackQ);

    if (findProductTrack[0].length !== 0) {
      const userDataQ = `
      SELECT  A.id,
              A.profileImage,
              A.email,
              A.username,
              A.nickname
        FROM  users           A
       WHERE  A.id = ${findProductTrack[0][0].UserId}
      `;

      const userData = await models.sequelize.query(userDataQ);

      const findAlbumListQ = `
      SELECT  A.id,
              B.username,
              B.profileImage,
              B.email,
              (
                SELECT  C.title
                  FROM  productTrack  C
                 WHERE  C.ProductId = A.id
                   AND  C.isTop = 1
                 LIMIT  1
              )                                           AS title,
              (
                SELECT  C.thumbnail
                  FROM  productTrack  C
                 WHERE  C.ProductId = A.id
                   AND  C.isTop = 1
                 LIMIT  1
              )                                           AS thumbnail,
              (
                SELECT  COUNT(D.id)
                  FROM  userLike	D
                 WHERE  D.ProductTrackId =  (
                                              SELECT  C.id
                                                FROM  productTrack  C
                                               WHERE  C.ProductId = A.id
                                                 AND  C.isTop = 1
                                               LIMIT  1
                                            )
              )		                                        AS likeCnt,
              CASE 
                WHEN  (
                       SELECT  COUNT(D.id)
                         FROM  userLike	D
                        WHERE  D.UserId = ${req.user ? req.user.id : 0}
                          AND  D.ProductTrackId =  (
                                                     SELECT  C.id
                                                       FROM  productTrack  C
                                                      WHERE  C.ProductId = A.id
                                                        AND  C.isTop = 1
                                                      LIMIT  1
                                                   )
                      ) > 0
                THEN  1
                ELSE  0
              END                                         AS isLike
        FROM  product       A
       INNER
        JOIN  users         B
          ON  A.UserId = B.id
       WHERE  A.Userid = ${findProductTrack[0][0].UserId}
         AND  (
                SELECT  C.id
                  FROM  productTrack  C
                 WHERE  C.ProductId = A.id
                   AND  C.isTop = 1
              ) > 0
              ${
                _orderType === 1
                  ? `ORDER  BY A.createdAt DESC`
                  : _orderType === 2
                  ? `ORDER  BY A.createdAt ASC`
                  : ``
              }
      `;

      const findAlbumList = await models.sequelize.query(findAlbumListQ);

      const selectGenQ = `
      SELECT  A.id,
              B.value,
              A.createdAt,
              A.ProductId 
        FROM  productGenConnect   A
       INNER
        JOIN  productGen          B
          ON  B.id = A.ProductGenId
       WHERE  A.ProductId IN (${
         findProductTrack[0].map((data) => data.ProductId).length === 0
           ? 0
           : findProductTrack[0].map((data) => data.ProductId)
       })
      `;

      const genList = await models.sequelize.query(selectGenQ);

      return res.status(200).json({
        ...userData[0][0],
        albumList: findAlbumList[0],
        findProductTrack: findProductTrack[0].map((data) => ({
          ...data,
          genList: genList[0].filter(
            (value) => value.ProductId === data.ProductId
          ),
        })),
      });
    } else {
      return res.status(400).send("아티스트가 없습니다.");
    }
  } catch (e) {
    console.error(e);
    return res.status(400).send("엘범을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 엘범 상세보기
 * PARAMETERS : id
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 홍민기
 * DEV DATE : 2023/02/27
 */

router.post("/album/detail", async (req, res, next) => {
  const { id } = req.body;

  try {
    const selectProductQ = `
    SELECT  id,
		        title,
		        subTitle,
		        content,
		        coverImage,
		        downloadCnt,
		        bitRate,
		        sampleRate,
		        isTop,
		        ProductCategoryId,
		        UserId,
		        agreementPath,
		        agreementName
      FROM  product
     WHERE  id = ${id}
    `;
    const selectGenQ = `
    SELECT  A.id,
        		B.value,
        		A.createdAt,
        		A.ProductId
      FROM  productGenConnect   A
     INNER
      JOIN  productGen          B
        ON  B.id = A.ProductGenId
     WHERE  A.ProductId = ${id}
    `;
    const selectTrackQ = `
    SELECT	id,
            title,
            isTitle,
            filename,
            filepath,
            author,
            downloadCnt,
            createdAt,
            updatedAt,
            ProductId,
            DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt,
            sPrice,
            dPrice,
            pPrice,
            FORMAT(sPrice , 0)   as viewsPrice,
            FORMAT(dPrice , 0)   as viewdPrice,
            FORMAT(pPrice , 0)   as viewpPrice
      FROM	productTrack
     WHERE  id = ${id}
       AND  isOk = 1`;

    const selectProduct = await models.sequelize.query(selectProductQ);
    const selectGen = await models.sequelize.query(selectGenQ);
    const selectTrack = await models.sequelize.query(selectTrackQ);

    return res.status(200).json({
      ...selectProduct[0][0],
      genList: selectGen[0],
      trackList: selectTrack[0],
    });
  } catch (e) {
    console.error(e);
    return res.status(400).send("엘범의 상세정보를 불러올 수 없습니다.");
  }
});

router.post("/track/create", async (req, res, next) => {
  const {
    title,
    thumbnail,
    filename,
    filepath,
    author,
    sPrice,
    dPrice,
    pPrice,
    productId,
  } = req.body;

  const insertQ = `
  INSERT INTO productTrack (
    title,
    thumbnail,
    filename,
    filepath,
    author,
    sPrice,
    dPrice,
    pPrice,
    ProductId,
    createdAt,
    updatedAt
  ) VALUES (
    '${title}',
    '${thumbnail}',
    '${filename}',
    '${filepath}',
    '${author}',
    ${sPrice},
    ${dPrice},
    ${pPrice},
    ${productId},
    NOW(),
    NOW()
  )
`;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 생성 할 수 없습니다.");
  }
});

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////COMMON TAG ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
router.post("/commontag/new", isAdminCheck, async (req, res, next) => {
  const { value, type } = req.body;

  const insertQ = `
    INSERT INTO commonTag (value, type, createdAt, updatedAt) VALUES (
      "${value}", "${type}", NOW(), NOW()
    )
  `;

  try {
    await models.sequelize.query(insertQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 생성할 수 없습니다.");
  }
});

router.post("/commontag/list", async (req, res, next) => {
  const { value, type } = req.body;
  const _value = value ? value : "";

  const _type = type ? type : false;

  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER BY createdAt DESC)  AS num,
            id,
            type,
            value,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt
      FROM  commonTag
     WHERE  1 = 1
       ${_value ? `AND  value LIKE "%${_value}%"` : ""}
       ${_type ? `AND type = "${_type}"` : ``}
     ORDER  BY  type ASC

  `;

  try {
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 조회할 수 없습니다.");
  }
});

router.post("/commontag/modify", isAdminCheck, async (req, res, next) => {
  const { id, value, type } = req.body;

  const updateQ = `
    UPDATE  commonTag
       SET  value = "${value}",
            type = "${type}"
            updatedAt = NOW()
     WHERE  id = ${id}
  `;

  try {
    const list = await models.sequelize.query(updateQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 수정할 수 없습니다.");
  }
});

router.post("/commontag/delete", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  const deleteQ = `
  DELETE  FROM  commonTag
         WHERE  id = ${id}
  `;

  try {
    const list = await models.sequelize.query(deleteQ);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send("데이터를 삭제할 수 없습니다.");
  }
});

module.exports = router;
