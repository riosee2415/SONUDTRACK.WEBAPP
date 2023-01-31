const express = require("express");
const models = require("../models");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

/**
 * SUBJECT : 좋아요 목록 (세개 아이디중 무조건 하나만 보내주셔야 합니다.)
 * PARAMETERS : ProductTrackId, ProductId, ArtistemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/01/31
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { ProductTrackId, ProductId, ArtistemId } = req.body;

  try {
    if (ArtistemId) {
      const selectArtistemQuery = `
      SELECT	A.id,
                A.ArtistemId,
                B.title,
                B.subTitle,
                B.content,
                B.coverImage,
                B.isIng,
                B.downloadCnt,
                B.sPrice,
                B.dPrice,
                B.pPrice,
                B.createdAt,
                DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")	AS viewCreatedAt
        FROM	userLike		A
        LEFT
       OUTER
        JOIN	artistem 		B
          ON	A.ArtistemId = B.id
       WHERE	A.ArtistemId = ${ArtistemId}
         AND	A.UserId = ${req.user.id}
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
          if (data.id === tag.ArtistemId) {
            data["artistemTags"].push(tag.value);
          }
        });
        artistemGens[0].map((gen) => {
          if (data.id === gen.ArtistemId) {
            data["artistemGens"].push(gen.value);
          }
        });
      });

      return res.status(200).json(tems);
    }

    if (ProductTrackId) {
      const selectTrackQuery = ``;
      const selectTrackGen = ``;

      const trackList = await models.sequelize.query(selectTrackQuery);
      const trackGens = await models.sequelize.query(selectTrackGen);

      if (trackList[0].length === 0) {
        return res.status(401).send("존재하지 않는 데이터 입니다.");
      }

      const tracks = trackList[0];
      const genList = trackGens[0];

      tracks.map((item) => {
        item["trackGens"] = [];

        genList.map((innerItem) => {
          if (parseInt(item.id) === parseInt(innerItem.ProductTrackId)) {
            item.gens.push(innerItem.value);
          }
        });
      });
    }

    if (ProductId) {
      const selectProductQuery = ``;

      const list = await models.sequelize.query(selectQ);

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

  const findTrackDataQuery = `
      SELECT    id
        FROM    userLike
       WHERE    ProductTrackId = ${ProductTrackId}
         AND    ProductTrackId IS NULL
         AND    ProductId IS NULL
         AND    UserId = ${req.user.id}
      `;

  const findArtistemDataQuery = `
      SELECT    id
        FROM    userLike
       WHERE    ArtistemId = ${ArtistemId}
         AND    ProductTrackId IS NULL
         AND    ProductId IS NULL
         AND    UserId = ${req.user.id}
      `;

  const findProdDataQuery = `
      SELECT    id
        FROM    userLike
       WHERE    ProductId = ${ProductId}
         AND    UserId = ${req.user.id}
         AND    ArtistemId IS NULL
         AND    ProductTrackId IS NULL
      `;

  try {
    const findTrackData = await models.sequelize.query(findTrackDataQuery);
    const findArtistemData = await models.sequelize.query(
      findArtistemDataQuery
    );
    const findProdData = await models.sequelize.query(findProdDataQuery);

    // ProductTrackId가 넘어왔을 때
    if (ProductTrackId) {
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
        createdAt,
        updatedAt
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
             AND  ProductTrackId IS NULL
             AND  ProductId IS NULL
          `;

        await models.sequelize.query(deleteQuery);

        return res.status(200).json({ result: true });
      }
    }

    if (ArtistemId) {
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
          createdAt,
          updatedAt
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
          createdAt,
          updatedAt
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
