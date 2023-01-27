const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 회원별 음원 구매 현황 리스트
 * PARAMETERS : UserId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/26
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const { UserId } = req.body;

  // (
  //     SELECT  CASE
  //                 WHEN  (
  //                     SELECT  COUNT(B.id)
  //                         FROM  artist		B
  //                         WHERE  B.isPermm = 1
  //                         AND  B.UserId = A.id
  //                     ) > 0
  //                 THEN  "아티스트"
  //                 ELSE  "일반"
  //             END                    AS  isArtist
  //       FROM  artist
  //      WHERE
  // )

  const temQuery = `
      SELECT	ROW_NUMBER()    OVER(ORDER BY A.createdAt)      AS num,
                A.ArtistemId,
      			A.ProductTrackId,
      			A.UserId,
      			A.createdAt,
      			DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		  AS viewStatusCreatedAt,
      			CASE
      					WHEN	B.id  IS NULL THEN	"musicTem"
      					WHEN 	C.id  IS NULL THEN	"artisTem"
      			END												AS buyType,
      			B.title											AS artisTemTitle,
      			B.subTitle										AS artisTemSubTitle,
      			B.content										AS artisTemContent,
      			B.coverImage									AS artisTemCoverImage,
      			B.isIng											AS artisTemIsIng,
      			B.downloadCnt									AS artisTemDownloadCnt,
      			B.bitRate										AS artisTemBitRate,
      			B.sampleRate									AS artisTemSampleRate,
      			B.isTop											AS artisTemIsTop,
      			B.sPrice										AS artisTemSPrice,
      			B.dPrice										AS artisTemDPrice,
      			B.pPrice										AS artisTemPPrice,
                FORMAT(B.sPrice, 0)                             AS artisTemViewsPrice,
                FORMAT(B.dPrice, 0)                             AS artisTemViewdPrice,
                FORMAT(B.pPrice, 0)                             AS artisTemViewpPrice,
      			B.ProductCategoryId								AS artisTemCategoryId,
      			B.ArtistId										AS artisTemArtistId,
      			B.filename										AS artisTemFilename,
      			B.filepath										AS artisTemFilepath,
      			C.title 										AS musicTemTitle,
      			C.isTitle 										AS musicTemIsTitle,
      			C.filename 										AS musicTemFilename,
      			C.filepath 										AS musicTemFilepath,
      			C.author 										AS musicTemAuthor,
      			C.downloadCnt 									AS musicTemDownloadCnt,
      			C.ProductId 									AS musicTemProductId,
      			C.sPrice										AS musicTemSPrice,
      			C.dPrice 										AS musicTemDPrice,
      			C.pPrice 										AS musicTemPPrice,
                FORMAT(C.sPrice, 0)                             AS musicTemViewsPrice,
                FORMAT(C.dPrice, 0)                             AS musicTemViewdPrice,
                FORMAT(C.pPrice, 0)                             AS musicTemViewpPrice
        FROM	userBuyStatus		A
        LEFT
       OUTER
        JOIN	artistem 			B
          ON	A.ArtistemId = B.id 
        LEFT
       OUTER
        JOIN	productTrack 		C
          ON	A.ProductTrackId = C.id
       WHERE	A.UserId = ${UserId}
       ORDER    BY num DESC
    `;

  try {
    const tems = await models.sequelize.query(temQuery);

    return res.status(200).json(tems[0]);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("사용자별 음원 구매 현황 목록을 조회할 수 없습니다.");
  }
});

module.exports = router;
