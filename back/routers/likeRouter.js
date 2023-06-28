const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 찜 리스트
 * PARAMETERS : page, type
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
router.post("/list", isLoggedIn, async (req, res, next) => {
  const { page, type } = req.body;

  if (!type) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const _type = parseInt(type) || 1;
  // type 1은 아티스트
  // type 2는 앨범
  // type 3은 트랙 (곡)

  try {
    if (parseInt(_type) === 1) {
      const lengthQuery = `
 SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)    AS num,
         A.id,
         C.id                                       AS artistemId,
         C.isVacation,
         C.name,
         C.companyNo,
         C.artistName,
         C.artistProfileImage,
         C.artistInfo,
         C.question1,
         C.question2,
         C.question3,
         C.question4,
         C.question5,
         C.question6,
         C.question7,
         C.question8,
         C.repMusicFile,
         C.repMusicFilename,
         C.isUpdate,
         C.createdAt,
         C.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
         (
            SELECT  COUNT(id)
              FROM  artistLike
             WHERE  ArtistemId = C.id
         )                                          AS likeCnt,
         ${
           req.user
             ? `
            (
              SELECT	AL.id
                FROM	artistLike	AL
               WHERE	AL.UserId = ${req.user.id}
                 AND	AL.ArtistemId = C.id 
            )	AS isLike`
             : `(
              SELECT	null
                FROM	DUAL
            )	AS isLike`
         }
   FROM  artistLike   A
  INNER
   JOIN  artistem     C
     ON  A.ArtistemId = C.id
  WHERE  C.isUpdate = 1
    AND  A.UserId = ${req.user.id}
        `;

      const selectQuery = `
 SELECT  ROW_NUMBER() OVER(ORDER BY A.createdAt)    AS num,
         A.id,
         C.id                                       AS artistemId,
         C.isVacation,
         C.name,
         C.companyNo,
         C.artistName,
         C.artistProfileImage,
         C.artistInfo,
         C.question1,
         C.question2,
         C.question3,
         C.question4,
         C.question5,
         C.question6,
         C.question7,
         C.question8,
         C.repMusicFile,
         C.repMusicFilename,
         C.isUpdate,
         C.createdAt,
         C.updatedAt,
         DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")   AS viewCreatedAt,
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt,
         (
            SELECT  COUNT(id)
              FROM  artistLike
             WHERE  ArtistemId = C.id
         )                                          AS likeCnt,
         ${
           req.user
             ? `
            (
              SELECT	AL.id
                FROM	artistLike	AL
               WHERE	AL.UserId = ${req.user.id}
                 AND	AL.ArtistemId = C.id 
            )	AS isLike`
             : `(
              SELECT	null
                FROM	DUAL
            )	AS isLike`
         }
   FROM  artistLike   A
  INNER
   JOIN  artistem     C
     ON  A.ArtistemId = C.id
  WHERE  C.isUpdate = 1
    AND  A.UserId = ${req.user.id}
  ORDER  BY num DESC
  LIMIT  ${LIMIT}
 OFFSET  ${OFFSET}
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

      const lengths = await models.sequelize.query(lengthQuery);
      const artistemData = await models.sequelize.query(selectQuery);

      const likeLen = lengths[0].length;

      const lastPage =
        likeLen % LIMIT > 0 ? likeLen / LIMIT + 1 : likeLen / LIMIT;

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

      return res.status(200).json({
        artistemData: artistemData[0],
        lastPage: parseInt(lastPage),
      });
    }

    if (parseInt(_type) === 2) {
      const lengthQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          B.id                                        AS AlbumId, 
          B.albumName,
          B.albumImage,
          B.albumImageName,
          B.bitRate,
          B.sampleRate,
          B.fileName,
          B.filePath,
          B.isPremium,
          B.isTrackPermit,
          B.permitAt,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.MusictemId,
          (
            SELECT  COUNT(id)
              FROM  albumLike
             WHERE  AlbumId = B.id
          )                                          AS likeCnt,
          ${
            req.user
              ? `
            (
              SELECT	AL.id
                FROM	albumLike	AL
               WHERE	AL.UserId = ${req.user.id}
                 AND	AL.AlbumId = B.id 
            )	AS isLike`
              : `(
              SELECT	null
                FROM	DUAL
            )	AS isLike`
          }
    FROM  albumLike     A
   INNER
    JOIN  album         B
      ON  A.AlbumId = B.id
   WHERE  A.UserId = ${req.user.id}
     AND  B.isTrackPermit = 1
  `;
      const selectQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          B.id                                        AS AlbumId, 
          B.albumName,
          B.albumImage,
          B.albumImageName,
          B.bitRate,
          B.sampleRate,
          B.fileName,
          B.filePath,
          B.isPremium,
          B.isTrackPermit,
          B.permitAt,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          B.MusictemId,
          (
            SELECT  COUNT(id)
              FROM  albumLike
             WHERE  AlbumId = B.id
          )                                          AS likeCnt,
         ${
           req.user
             ? `
            (
              SELECT	AL.id
                FROM	albumLike	AL
               WHERE	AL.UserId = ${req.user.id}
                 AND	AL.AlbumId = B.id 
            )	AS isLike`
             : `(
              SELECT	null
                FROM	DUAL
            )	AS isLike`
         }
    FROM  albumLike     A
   INNER
    JOIN  album         B
      ON  A.AlbumId = B.id
   WHERE  A.UserId = ${req.user.id}
     AND  B.isTrackPermit = 1
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

      const findCateInfoQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.sort)      AS num,
          A.id,
          A.sort,
          A.AlbumId,
          A.CateTypeId,
          A.CategoryId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
          B.category                                AS categoryTypeValue,
          C.value                                   AS catagoryValue
    FROM  albumCategory     A
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
          A.AlbumId,
          A.TagTypeId,
          A.TagId,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")  AS viewCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")  AS viewUpdatedAt,
          B.value                                   AS tagTypeValue,
          C.tagValue
    FROM  albumTag        A
   INNER
    JOIN  tagType          B
      ON  A.TagTypeId = B.id
   INNER
    JOIN  tag              C
      ON  A.TagId = C.id
   ORDER  BY num ASC
  `;

      const trackQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY A.createdAt)   AS num,
          A.id,
          A.songName,
          A.singerName,
          A.fileName,
          A.filePath,
          A.fileLength,
          A.standardPrice,
          A.deluxePrice,
          A.platinumPrice,
          A.isTitle,
          A.AlbumId,
          B.albumName,
          B.albumImage,
          B.albumImageName,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  track   A 
   INNER
    JOIN  album   B
      ON  A.AlbumId = B.id
   WHERE  B.isTrackPermit = 1
   ORDER  BY num DESC
  `;

      const lengths = await models.sequelize.query(lengthQuery);

      const likeLen = lengths[0].length;

      const lastPage =
        likeLen % LIMIT > 0 ? likeLen / LIMIT + 1 : likeLen / LIMIT;

      const albums = await models.sequelize.query(selectQuery);

      const track = await models.sequelize.query(trackQuery);
      const categorys = await models.sequelize.query(findCateInfoQuery);
      const tags = await models.sequelize.query(findTagInfoQuery);

      albums[0].map((ele) => {
        ele["tracks"] = [];

        track[0].map((innerItem) => {
          if (parseInt(ele.AlbumId) === parseInt(innerItem.AlbumId)) {
            ele.tracks.push(innerItem);
          }
        });
      });

      albums[0].map((ele) => {
        ele["categorys"] = [];

        categorys[0].map((innerItem) => {
          if (parseInt(ele.AlbumId) === parseInt(innerItem.AlbumId)) {
            ele.categorys.push(innerItem);
          }
        });
      });

      albums[0].map((ele) => {
        ele["tags"] = [];

        tags[0].map((innerItem) => {
          if (parseInt(ele.AlbumId) === parseInt(innerItem.AlbumId)) {
            ele.tags.push(innerItem);
          }
        });
      });

      return res.status(200).json({
        albums: albums[0],
        lastPage: parseInt(lastPage),
      });
    }

    if (parseInt(_type) === 3) {
      const lengthQuery = `
  SELECT  ROW_NUMBER()	OVER(ORDER	BY A.createdAt)  AS num,
   	 	  A.id,
          B.id                                        AS TrackId,
          B.songName,
          B.singerName,
          B.fileName,
          B.filePath,
          B.fileLength,
          B.standardPrice,
          B.deluxePrice,
          B.platinumPrice,
          B.isTitle,
          B.AlbumId,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(B.createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          (
           SELECT	albumImage 
             FROM	album
            WHERE	B.AlbumId = id 
          ) 										  AS albumImage,
          (
           SELECT	albumName 
             FROM	album
            WHERE	B.AlbumId = id 
          ) 										  AS albumName,
          (
            SELECT  COUNT(id)
              FROM  trackLike
             WHERE  TrackId = B.id
          )                                          AS likeCnt,
          ${
            req.user
              ? `
            (
              SELECT	TL.id
                FROM	trackLike	TL
               WHERE	TL.UserId = ${req.user.id}
                 AND	TL.TrackId = B.id 
            )	AS isLike`
              : `(
              SELECT	null
                FROM	DUAL
            )	AS isLike`
          }
    FROM  trackLike     A
   INNER
    JOIN  track         B
      ON  A.TrackId = B.id
   WHERE  TRUE = (
   				SELECT	isTrackPermit 
   				  FROM	album
   				 WHERE	B.AlbumId = id 
                 )
     AND  A.UserId = ${req.user.id}
  `;

      const selectQuery = `
  SELECT  ROW_NUMBER()	OVER(ORDER	BY A.createdAt)  AS num,
   	 	  A.id,
          B.id                                        AS TrackId,
          B.songName,
          B.singerName,
          B.fileName,
          B.filePath,
          B.fileLength,
          B.standardPrice,
          B.deluxePrice,
          B.platinumPrice,
          B.isTitle,
          B.AlbumId,
          B.createdAt,
          B.updatedAt,
          DATE_FORMAT(B.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(B.createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(B.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          (
           SELECT	albumImage 
             FROM	album
            WHERE	B.AlbumId = id 
          ) 										  AS albumImage,
          (
           SELECT	albumName 
             FROM	album
            WHERE	B.AlbumId = id 
          ) 										  AS albumName,
          (
            SELECT  COUNT(id)
              FROM  trackLike
             WHERE  TrackId = B.id
          )                                          AS likeCnt,
          ${
            req.user
              ? `
            (
              SELECT	TL.id
                FROM	trackLike	TL
               WHERE	TL.UserId = ${req.user.id}
                 AND	TL.TrackId = B.id 
            )	AS isLike`
              : `(
              SELECT	null
                FROM	DUAL
            )	AS isLike`
          }
    FROM  trackLike     A
   INNER
    JOIN  track         B
      ON  A.TrackId = B.id
   WHERE  TRUE = (
   				SELECT	isTrackPermit 
   				  FROM	album
   				 WHERE	B.AlbumId = id 
                 )
     AND  A.UserId = ${req.user.id}
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

      const lengths = await models.sequelize.query(lengthQuery);
      const track = await models.sequelize.query(selectQuery);

      const trackLen = lengths[0].length;

      const lastPage =
        trackLen % LIMIT > 0 ? trackLen / LIMIT + 1 : trackLen / LIMIT;

      return res.status(200).json({
        tracks: track[0],
        lastPage: parseInt(lastPage),
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("찜 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스탬 찜 남기기
 * PARAMETERS : ArtistemId, LikeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
// LikeId는 찜 취소일 때만 보내주세요.
router.post("/artist/create", isLoggedIn, async (req, res, next) => {
  const { ArtistemId, LikeId } = req.body;

  const findLikeQuery = `
      SELECT    id
        FROM    artistLike
       WHERE    UserId = ${req.user.id}
         AND    ArtistemId = ${ArtistemId}
      `;

  const insertQuery = `
      INSERT    INTO    artistLike
      ( 
        UserId,
        ArtistemId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        ${req.user.id},
        ${ArtistemId},
        NOW(),
        NOW()
      )
      `;

  try {
    const findResult = await models.sequelize.query(findLikeQuery);

    if (findResult[0].length === 0) {
      await models.sequelize.query(insertQuery);

      return res.status(201).json({ result: true });
    } else {
      const deleteQuery = `
            DELETE
              FROM  artistLike
             WHERE  id = ${LikeId}
               AND  UserId = ${req.user.id}
            `;
      await models.sequelize.query(deleteQuery);

      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("아티스트를 찜할 수 없습니다.");
  }
});

/**
 * SUBJECT : 아티스트 찜 삭제하기
 * PARAMETERS : likeIds
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
router.post("/artist/delete", isLoggedIn, async (req, res, next) => {
  // likeIds는 배열입니다.
  const { likeIds } = req.body;

  if (!Array.isArray(likeIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      likeIds.map(async (data) => {
        const deleteQuery = `
            DELETE
              FROM  artistLike
             WHERE  id = ${data}
               AND  UserId = ${req.user.id}  
            `;

        await models.sequelize.query(deleteQuery);
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("아티스트 찜을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 앨범 찜 남기기
 * PARAMETERS : AlbumId, LikeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
// LikeId는 찜 취소일 때만 보내주세요.
router.post("/album/create", isLoggedIn, async (req, res, next) => {
  const { AlbumId, LikeId } = req.body;

  const findLikeQuery = `
      SELECT    id
        FROM    albumLike
       WHERE    UserId = ${req.user.id}
         AND    AlbumId = ${AlbumId}
      `;

  const insertQuery = `
      INSERT    INTO    albumLike
      ( 
        UserId,
        AlbumId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        ${req.user.id},
        ${AlbumId},
        NOW(),
        NOW()
      )
      `;

  try {
    const findResult = await models.sequelize.query(findLikeQuery);

    if (findResult[0].length === 0) {
      await models.sequelize.query(insertQuery);

      return res.status(201).json({ result: true });
    } else {
      const deleteQuery = `
            DELETE
              FROM  albumLike
             WHERE  UserId = ${req.user.id}
               AND  id = ${LikeId}
            `;
      await models.sequelize.query(deleteQuery);

      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("앨범을 찜할 수 없습니다.");
  }
});

/**
 * SUBJECT : 앨범 찜 삭제하기
 * PARAMETERS : likeIds
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
router.post("/album/delete", isLoggedIn, async (req, res, next) => {
  // likeIds는 배열입니다.
  const { likeIds } = req.body;

  if (!Array.isArray(likeIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      likeIds.map(async (data) => {
        const deleteQuery = `
            DELETE
              FROM  albumLike
             WHERE  UserId = ${req.user.id}
               AND  id = ${data} 
              `;

        await models.sequelize.query(deleteQuery);
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("앨범 찜을 삭제할 수 없습니다.");
  }
});

/**
 * SUBJECT : 트랙 찜 남기기
 * PARAMETERS : TrackId, LikeId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
// LikeId는 찜 취소일 때만 보내주세요.
router.post("/track/create", isLoggedIn, async (req, res, next) => {
  const { TrackId, LikeId } = req.body;

  const findLikeQuery = `
      SELECT    id
        FROM    trackLike
       WHERE    UserId = ${req.user.id}
         AND    TrackId = ${TrackId}
      `;

  const insertQuery = `
      INSERT    INTO    trackLike
      ( 
        UserId,
        TrackId,
        createdAt,
        updatedAt
      )
      VALUES
      (
        ${req.user.id},
        ${TrackId},
        NOW(),
        NOW()
      )
      `;

  try {
    const findResult = await models.sequelize.query(findLikeQuery);

    if (findResult[0].length === 0) {
      await models.sequelize.query(insertQuery);

      return res.status(201).json({ result: true });
    } else {
      const deleteQuery = `
            DELETE
              FROM  trackLike
             WHERE  UserId = ${req.user.id}
               AND  id = ${LikeId}
            `;
      await models.sequelize.query(deleteQuery);

      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("트랙을 찜할 수 없습니다.");
  }
});

/**
 * SUBJECT : 트랙 찜 삭제하기
 * PARAMETERS : likeIds
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/27
 */
router.post("/track/delete", isLoggedIn, async (req, res, next) => {
  // likeIds는 배열입니다.
  const { likeIds } = req.body;

  if (!Array.isArray(likeIds)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      likeIds.map(async (data) => {
        const deleteQuery = `
              DELETE
                FROM  trackLike
               WHERE  UserId = ${req.user.id}
                 AND  id = ${data} 
                `;

        await models.sequelize.query(deleteQuery);
      })
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("트랙 찜을 삭제할 수 없습니다.");
  }
});

module.exports = router;
