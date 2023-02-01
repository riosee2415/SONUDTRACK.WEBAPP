const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 좋아요 목록 (세개 아이디중 무조건 하나만 보내주셔야 합니다.)
 * PARAMETERS : findType
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/31
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { findType } = req.body;

  const _findType = parseInt(findType) || 1;

  try {
    if (_findType === 1) {
      const selectArtistemQuery = `
      SELECT	A.id,
                A.ArtistemId,
                B.title,
                B.subTitle,
                B.content,
                B.coverImage,
                B.isIng,
                B.downloadCnt,
                FORMAT(B.downloadCnt, 0)                    AS  viewDownloadCnt,
                B.sPrice,
                B.dPrice,
                B.pPrice,
                FORMAT(B.sPrice , 0)   as viewsPrice,
                FORMAT(B.dPrice , 0)   as viewdPrice,
                FORMAT(B.pPrice , 0)   as viewpPrice,
                B.filename,
                B.filepath,
                B.createdAt,
                DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")	AS viewCreatedAt
        FROM	userLike		A
        LEFT
       OUTER
        JOIN	artistem 		B
          ON	A.ArtistemId = B.id
       WHERE	A.UserId = ${req.user.id}
         AND    A.ProductId IS NULL
         AND    A.ProductTrackId IS NULL
       ORDER    BY A.createdAt DESC
                `;

      const selectArtistemTag = `
        SELECT	value,
                ArtistemId
          FROM	artistTemTag
          `;

      const selectArtistemGen = `
        SELECT	value,
                ArtistemId
          FROM	artistTemGen
        `;

      const artistemList = await models.sequelize.query(selectArtistemQuery);
      const artistemTags = await models.sequelize.query(selectArtistemTag);
      const artistemGens = await models.sequelize.query(selectArtistemGen);

      const tems = artistemList[0];

      tems.map((data) => {
        data["artistemTags"] = [];
        data["artistemGens"] = [];

        artistemTags[0].map((tag) => {
          if (data.ArtistemId === tag.ArtistemId) {
            data["artistemTags"].push(tag.value);
          }
        });
        artistemGens[0].map((gen) => {
          if (data.ArtistemId === gen.ArtistemId) {
            data["artistemGens"].push(gen.value);
          }
        });
      });

      return res.status(200).json(tems);
    }

    if (_findType === 2) {
      const selectTrackQuery = `
SELECT	A.id,
        A.ProductTrackId,
        B.title,
        B.isTitle,
        B.author,
        B.filename,
        B.filepath,
        B.downloadCnt,
        FORMAT(B.downloadCnt, 0)                    AS  viewDownloadCnt,
        B.sPrice,
        B.dPrice,
        B.pPrice,
        FORMAT(B.sPrice , 0)   as viewsPrice,
        FORMAT(B.dPrice , 0)   as viewdPrice,
        FORMAT(B.pPrice , 0)   as viewpPrice,
        B.thumbnail,
        B.createdAt,
        DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")	AS viewCreatedAt
   FROM	userLike		A
   LEFT
  OUTER
   JOIN	productTrack 	B
     ON	A.ProductTrackId = B.id
  WHERE A.UserId = ${req.user.id}
    AND A.ProductId IS NULL
    AND A.ArtistemId IS NULL
  ORDER BY A.createdAt DESC
      `;

      const selectTrackGen = `
      SELECT	A.id,
                A.value,
                A.createdAt,
                A.updatedAt,
                A.ProductTrackId,
                DATE_FORMAT(A.createdAt , "%Y년 %m월 %d일") 	AS	viewCreatedAt,
                DATE_FORMAT(A.updatedAt , "%Y년 %m월 %d일") 	AS	viewUpdatedAt
        FROM	trackGen	A
      `;

      const trackList = await models.sequelize.query(selectTrackQuery);
      const trackGens = await models.sequelize.query(selectTrackGen);

      const tracks = trackList[0];
      const genList = trackGens[0];

      tracks.map((item) => {
        item["trackGens"] = [];

        genList.map((innerItem) => {
          if (
            parseInt(item.ProductTrackId) === parseInt(innerItem.ProductTrackId)
          ) {
            item.gens.push(innerItem.value);
          }
        });
      });

      return res.status(200).json(tracks);
    }

    if (_findType === 3) {
      const selectProductQuery = `
    SELECT	A.id,
            A.ProductId,
            B.title,
            B.subTitle,
            B.content,
            B.coverImage,
            B.isIng,
            B.downloadCnt,
            FORMAT(B.downloadCnt, 0)                    AS  viewDownloadCnt,
            B.createdAt,
            DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")	AS viewCreatedAt
    FROM	userLike		A
    LEFT
   OUTER
    JOIN	product 		B
      ON	A.ProductId = B.id
   WHERE	A.UserId = ${req.user.id}
     AND    A.ProductTrackId IS NULL
     AND    A.ArtistemId IS NULL
   ORDER    BY A.createdAt DESC
      `;

      const list = await models.sequelize.query(selectProductQuery);

      return res.status(200).json(list[0]);
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("좋아요를 남긴 목록을 불러올 수 없습니다.");
  }
});

/**
 * SUBJECT : 좋아요 생성하기 (세개 아이디중 무조건 하나만 보내주셔야 합니다.)
 * PARAMETERS : ProductTrackId, ProductId, ArtistemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/31
 */
router.post("/create", isLoggedIn, async (req, res, next) => {
  const { ProductTrackId, ProductId, ArtistemId } = req.body;

  try {
    // ProductTrackId가 넘어왔을 때
    if (ProductTrackId) {
      const findTrackDataQuery = `
        SELECT    id
          FROM    userLike
         WHERE    ProductTrackId = ${ProductTrackId}
           AND    ArtistemId IS NULL
           AND    ProductId IS NULL
           AND    UserId = ${req.user.id}
        `;

      const findTrackData = await models.sequelize.query(findTrackDataQuery);

      // 한번도 좋아요를 남기지 않았을 때 <- 받아온 값 그대로 생성
      if (findTrackData[0].length === 0) {
        const insertQuery = `
      INSERT    INTO    userLike
      (
        UserId,
        ProductTrackId,
        ArtistemId,
        ProductId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        ${req.user.id},
        ${ProductTrackId},
        NULL,
        NULL,
        NOW(),
        NOW()
      )
      `;

        await models.sequelize.query(insertQuery);

        return res.status(201).json({ result: true });
      }
      // 좋아요를 남긴 내역이 존재할 때
      if (findTrackData[0].length !== 0) {
        const deleteQuery = `
          DELETE
            FROM  userLike
           WHERE  UserId = ${req.user.id}
             AND  ProductTrackId = ${ProductTrackId}
             AND  ArtistemId IS NULL
             AND  ProductId IS NULL
          `;

        await models.sequelize.query(deleteQuery);

        return res.status(200).json({ result: true });
      }
    }

    if (ArtistemId) {
      const findArtistemDataQuery = `
        SELECT    id
          FROM    userLike
         WHERE    ArtistemId = ${ArtistemId}
           AND    ProductTrackId IS NULL
           AND    ProductId IS NULL
           AND    UserId = ${req.user.id}
        `;

      const findArtistemData = await models.sequelize.query(
        findArtistemDataQuery
      );

      // 한번도 좋아요를 남기지 않았을 때 <- 받아온 값 그대로 생성
      if (findArtistemData[0].length === 0) {
        const insertQuery = `
        INSERT    INTO    userLike
        (
          UserId,
          ProductTrackId,
          ArtistemId,
          ProductId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${req.user.id},
          NULL,
          ${ArtistemId},
          NULL,
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertQuery);

        return res.status(201).json({ result: true });
      }
      // 좋아요를 남긴 내역이 존재할 때
      if (findArtistemData[0].length !== 0) {
        const deleteQuery = `
            DELETE
              FROM  userLike
             WHERE  UserId = ${req.user.id}
               AND  ArtistemId = ${ArtistemId}
               AND  ProductTrackId IS NULL
               AND  ProductId IS NULL
            `;

        await models.sequelize.query(deleteQuery);

        return res.status(200).json({ result: true });
      }
    }

    if (ProductId) {
      const findProdDataQuery = `
  SELECT    id
    FROM    userLike
   WHERE    ProductId = ${ProductId}
     AND    UserId = ${req.user.id}
     AND    ArtistemId IS NULL
     AND    ProductTrackId IS NULL
  `;
      const findProdData = await models.sequelize.query(findProdDataQuery);

      // 한번도 좋아요를 남기지 않았을 때 <- 받아온 값 그대로 생성
      if (findProdData[0].length === 0) {
        const insertQuery = `
        INSERT    INTO    userLike
        (
          UserId,
          ProductTrackId,
          ArtistemId,
          ProductId,
          createdAt,
          updatedAt
        )
        VALUES
        (
          ${req.user.id},
          NULL,
          NULL,
          ${ProductId},
          NOW(),
          NOW()
        )
        `;

        await models.sequelize.query(insertQuery);

        return res.status(201).json({ result: true });
      }
      // 좋아요를 남긴 내역이 존재할 때
      if (findProdData[0].length !== 0) {
        const deleteQuery = `
            DELETE
              FROM  userLike
             WHERE  UserId = ${req.user.id}
               AND  ProductId = ${ProductId}
               AND  ProductTrackId IS NULL
               AND  ArtistemId IS NULL
            `;

        await models.sequelize.query(deleteQuery);

        return res.status(200).json({ result: true });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("좋아요를 남길 수 없습니다.");
  }
});

module.exports = router;
