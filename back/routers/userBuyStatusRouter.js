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

  const temQuery = `
      SELECT	ROW_NUMBER()    OVER(ORDER BY A.createdAt)      AS num,
                A.ArtistemId,
      			A.ProductTrackId,
      			A.UserId,
      			A.createdAt,
      			DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")		  AS viewStatusCreatedAt,
      			CASE
      					WHEN	B.id  IS NULL THEN	"musicTem"
      					WHEN 	C.id  IS NULL THEN	"artistem"
      			END												AS buyType,
      			B.title											AS artistemTitle,
      			B.subTitle										AS artistemSubTitle,
      			B.content										AS artistemContent,
      			B.coverImage									AS artistemCoverImage,
      			B.isIng											AS artistemIsIng,
      			B.downloadCnt									AS artistemDownloadCnt,
      			B.bitRate										AS artistemBitRate,
      			B.sampleRate									AS artistemSampleRate,
      			B.isTop											AS artistemIsTop,
      			B.sPrice										AS artistemSPrice,
      			B.dPrice										AS artistemDPrice,
      			B.pPrice										AS artistemPPrice,
      			B.ProductCategoryId								AS artistemCategoryId,
      			B.ArtistId										AS artistemArtistId,
      			B.filename										AS artistemFilename,
      			B.filepath										AS artistemFilepath,
      			C.title 										AS musicTemTitle,
      			C.isTitle 										AS musicTemIsTitle,
      			C.filename 										AS musicTemFilename,
      			C.filepath 										AS musicTemFilepath,
      			C.author 										AS musicTemAuthor,
      			C.downloadCnt 									AS musicTemDownloadCnt,
      			C.ProductId 									AS musicTemProductId,
      			C.sPrice										AS musicTemSPrice,
      			C.dPrice 										AS musicTemDPrice,
      			C.pPrice 										AS musicTemPPrice
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
