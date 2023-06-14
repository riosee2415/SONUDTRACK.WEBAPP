const express = require("express");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 검색 라우터
 * PARAMETERS : artistemPage, musicTemPage, title, categoryId, tagId
 * ORDER BY : createdAt DESC
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/13
 */
router.post("/list", async (req, res, next) => {
  const { artistemPage, musicTemPage, title, categoryId, tagId } = req.body;

  const ARTISTEMLIMIT = 5;

  const _artistemPage = artistemPage ? artistemPage : 1;

  const __artistemPage = _artistemPage - 1;
  const ARTISTEMOFFSET = __artistemPage * 5;
  //////////////////////////////////////////////////////s

  const MUSICTEMLIMIT = 5;

  const _musicTemPage = musicTemPage ? musicTemPage : 1;

  const __musicTemPage = _musicTemPage - 1;
  const MUSICTEMOFFSET = __musicTemPage * 5;

  const _title = title ? title : ``;

  const _categoryId = parseInt(categoryId) || false;
  const _tagId = parseInt(tagId) || false;

  const lengthArtistemQuery = `
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
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt
   FROM  users        A
  INNER
   JOIN  artistem     B
     ON  B.Userid = A.id
  WHERE  B.isUpdate = 1
    AND  A.artistemId IS NOT NULL
    AND  B.artistName LIKE "%${_title}%"
         ${
           _categoryId
             ? `
    AND 0 < (
              SELECT  COUNT(id)
                FROM  artistCategory
               WHERE  CategoryId = ${_categoryId}
                 AND  ArtistemId = B.id
            )
          `
             : ``
         }
         ${
           _tagId
             ? `
    AND  0 < (
                SELECT  COUNT(id)
                  FROM  artistTag
                 WHERE  TagId = ${_tagId}
                   AND  ArtistemId = B.id
              )
          `
             : ``
         }
  `;

  const selectArtistemQuery = `
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
         DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")   AS viewUpdatedAt
   FROM  users        A
  INNER
   JOIN  artistem     B
     ON  B.Userid = A.id
  WHERE  B.isUpdate = 1
    AND  A.artistemId IS NOT NULL
    AND  B.artistName LIKE "%${_title}%"
         ${
           _categoryId
             ? `
    AND  0 < (
                SELECT  COUNT(id)
                  FROM  artistCategory
                 WHERE  CategoryId = ${_categoryId}
                   AND  ArtistemId = B.id
              )
          `
             : ``
         }
         ${
           _tagId
             ? `
    AND  0 < (
                SELECT  COUNT(id)
                  FROM  artistTag
                 WHERE  TagId = ${_tagId}
                   AND  ArtistemId = B.id
              )
          `
             : ``
         }
  ORDER  BY num DESC
  LIMIT  ${ARTISTEMLIMIT}
 OFFSET  ${ARTISTEMOFFSET}
  `;

  const lengthMusictemQuery = `
  SELECT  DISTINCT 
          ROW_NUMBER()	OVER(ORDER	BY A.createdAt)  AS num,
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
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          (
           SELECT	albumImage 
             FROM	album
            WHERE	A.AlbumId = id 
          ) 										  AS albumImage 
    FROM  track   A
   WHERE  TRUE = (
   				SELECT	isTrackPermit 
   				  FROM	album
   				 WHERE	A.AlbumId = id 
                 )
     AND  A.songName LIKE "%${_title}%"
          ${
            _tagId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
                       AND  TagId = ${_tagId}
                   )
          `
              : ``
          }
          ${
            _categoryId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  albumCategory
                     WHERE  A.AlbumId = AlbumId
                       AND  TagId = ${_categoryId}
                   )
          `
              : ``
          }
  `;
  const selectMusictemQuery = `
  SELECT  DISTINCT 
          ROW_NUMBER()	OVER(ORDER	BY A.createdAt)  AS num,
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
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          (
           SELECT	albumImage 
             FROM	album
            WHERE	A.AlbumId = id 
          ) 										  AS albumImage 
    FROM  track   A
   WHERE  TRUE = (
   				SELECT	isTrackPermit 
   				  FROM	album
   				 WHERE	A.AlbumId = id 
                 )
     AND  A.songName LIKE "%${_title}%"
          ${
            _tagId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
                       AND  TagId = ${_tagId}
                   )
          `
              : ``
          }
          ${
            _categoryId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  albumCategory
                     WHERE  A.AlbumId = AlbumId
                       AND  TagId = ${_categoryId}
                   )
          `
              : ``
          }
   ORDER  BY num DESC
   LIMIT  ${MUSICTEMLIMIT}
  OFFSET  ${MUSICTEMOFFSET}
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
    const artisttemLengths = await models.sequelize.query(lengthArtistemQuery);
    const artistem = await models.sequelize.query(selectArtistemQuery);

    const findCountryInfoData = await models.sequelize.query(
      findCountryInfoQuery
    );
    const findFilmInfoData = await models.sequelize.query(findFilmInfoQuery);
    const findCateInfoData = await models.sequelize.query(findCateInfoQuery);
    const findTagInfoData = await models.sequelize.query(findTagInfoQuery);

    artistem[0].map((ele) => {
      ele["countrys"] = [];

      findCountryInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.countrys.push(innerItem);
        }
      });
    });

    artistem[0].map((ele) => {
      ele["artistFilms"] = [];

      findFilmInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.artistFilms.push(innerItem);
        }
      });
    });

    artistem[0].map((ele) => {
      ele["categorys"] = [];

      findCateInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.categorys.push(innerItem);
        }
      });
    });

    artistem[0].map((ele) => {
      ele["tags"] = [];

      findTagInfoData[0].map((innerItem) => {
        if (parseInt(ele.artistemId) === parseInt(innerItem.ArtistemId)) {
          ele.tags.push(innerItem);
        }
      });
    });

    const musictemLengths = await models.sequelize.query(lengthMusictemQuery);
    const musictem = await models.sequelize.query(selectMusictemQuery);

    const artistemLen = artisttemLengths[0].length;

    const artistemLastPage =
      artistemLen % ARTISTEMLIMIT > 0
        ? artistemLen / ARTISTEMLIMIT + 1
        : artistemLen / ARTISTEMLIMIT;

    const musictemLen = musictemLengths[0].length;

    const musictemLastPage =
      musictemLen % MUSICTEMLIMIT > 0
        ? musictemLen / MUSICTEMLIMIT + 1
        : musictemLen / MUSICTEMLIMIT;

    return res.status(200).json({
      artistem: artistem[0],
      artistemLastPage: parseInt(artistemLastPage),
      artisttemLen: parseInt(artistemLen),
      /////////////////////////////////////////////
      musictem: musictem[0],
      musictemLastPage: parseInt(musictemLastPage),
      musictemLen: parseInt(musictemLen),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("검색할 수 없습니다.");
  }
});

module.exports = router;
