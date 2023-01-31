const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const models = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
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
 * SUBJECT : 상품(앨범) 조회하기
 * PARAMETERS : { CategoryId, isTop, isIng, title, username }
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/09
 */
router.post("/pro/list", async (req, res, next) => {
  const { CategoryId, isTop, isIng, title, username } = req.body;

  const _CategoryId = CategoryId ? CategoryId : false;
  const _isTop = isTop ? isTop : false;
  const _isIng = isIng ? isIng : false;
  const _title = title ? title : false;
  const _username = username ? username : false;

  const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER BY A.createdAt DESC) AS num,
            A.id,
            A.title,
            A.subTitle,
            A.content,
            A.coverImage,
            A.isIng,
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
    ${_isIng ? `AND  A.isIng = ${_isIng === -1 ? 0 : _isIng}` : ``}
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
           SET  isIng = ${nextIng},
                updatedAt = NOW()
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

////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TRACK ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/**
 * SUBJECT : 뮤직탬 전체 조회
 * PARAMETERS : orderType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 시니어 홍민기
 * DEV DATE : 2023/01/30
 */

router.post("/track/allList", async (req, res, next) => {
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
              ? `ORDER  BY (
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
    SELECT  id,
        		value,
        		createdAt,
        		ProductId 
      FROM  productGen
     WHERE  ProductId IN (${
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
          A.createdAt,
          A.ProductId
    FROM  productTrack	A 
   WHERE  A.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
   ORDER  BY A.createdAt DESC
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectGenQ = `
    SELECT  id,
        		value,
        		createdAt,
        		ProductId 
      FROM  productGen
     WHERE  ProductId IN (${
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
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 팀장 송재홍
 * DEV DATE : 2023/01/30
 */
router.post("/track/recentList", async (req, res, next) => {
  const selectQ = `
 SELECT  A.id,
         A.title,
         A.author,
         A.thumbnail,
         A.filename,
         A.filepath,
         A.downloadCnt,
         A.createdAt,
         A.ProductId
   FROM  productTrack	A 
  ORDER  BY A.createdAt DESC 
  LIMIT  5
  `;

  try {
    const list = await models.sequelize.query(selectQ);

    const selectGenQ = `
    SELECT  id,
        		value,
        		createdAt,
        		ProductId 
      FROM  productGen
     WHERE  ProductId IN (${
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

router.post("/track/allList", async (req, res, next) => {
  try {
    const selectQ = `
    SELECT	ROW_NUMBER() OVER(ORDER	BY A.createdAt)		AS num,
            A.id,
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
     LIMIT  ${LIMIT}
    OFFSET  ${OFFSET}
  `;
    const list = await models.sequelize.query(selectQ);

    return res.status(200).json(list[0]);
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

////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////COMMON TAG ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
router.post("/commontag/new", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;

  const insertQ = `
    INSERT INTO commonTag (value, createdAt, updatedAt) VALUES (
      "${value}", NOW(), NOW()
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

router.post("/commontag/list", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;
  const _value = value ? value : "";

  const selectQ = `
    SELECT  ROW_NUMBER() OVER(ORDER BY createdAt DESC)  AS num,
            id,
            value,
            createdAt,
            updatedAt,
            DATE_FORMAT(createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
            DATE_FORMAT(updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt
      FROM  commonTag
     WHERE  1 = 1
       ${_value ? `AND  value LIKE "%${_value}%"` : ""} 
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

router.post("/commontag/modify", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;

  const updateQ = `
    UPDATE  commonTag
       SET  value = "${value}",
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
