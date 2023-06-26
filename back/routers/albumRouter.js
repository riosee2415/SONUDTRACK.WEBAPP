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
 * SUBJECT : 앨범 이미지
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/image", upload.single("image"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

/**
 * SUBJECT : 앨범 파일
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/file", upload.single("file"), async (req, res, next) => {
  return res.json({ path: req.file.location });
});

/**
 * SUBJECT : 뮤직탬 리스트
 * PARAMETERS : page, songName, TagTypeId, TagId, CategoryId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/musictem/list", async (req, res, next) => {
  const { page, songName, TagTypeId, TagId, CategoryId } = req.body;

  const LIMIT = 5;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 5;

  const _songName = songName ? songName : ``;
  const _TagTypeId = TagTypeId ? TagTypeId : false;
  const _TagId = TagId ? TagId : false;
  const _CategoryId = CategoryId ? CategoryId : false;

  const lengthQuery = `
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
          ) 										  AS albumImage,
          (
           SELECT	albumName 
             FROM	album
            WHERE	A.AlbumId = id 
          ) 										  AS albumName
    FROM  track   A
   WHERE  TRUE = (
   				SELECT	isTrackPermit 
   				  FROM	album
   				 WHERE	A.AlbumId = id 
                 )
     AND  A.songName LIKE "%${_songName}%"
          ${
            _TagTypeId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
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
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
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
                      FROM  albumCategory
                     WHERE  A.AlbumId = AlbumId
                       AND  TagId = ${_CategoryId}
                   )
          `
              : ``
          }
  `;

  const selectQuery = `
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
          ) 										  AS albumImage,
          (
            SELECT	albumName 
              FROM	album
             WHERE	A.AlbumId = id 
           ) 										  AS albumName
    FROM  track   A
   WHERE  TRUE = (
   				SELECT	isTrackPermit 
   				  FROM	album
   				 WHERE	A.AlbumId = id 
                 )
     AND  A.songName LIKE "%${_songName}%"
          ${
            _TagTypeId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
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
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
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
                      FROM  albumCategory
                     WHERE  A.AlbumId = AlbumId
                       AND  TagId = ${_CategoryId}
                   )
          `
              : ``
          }
   ORDER  BY num DESC
   LIMIT  ${LIMIT}
  OFFSET  ${OFFSET}
  `;

  try {
    const lengths = await models.sequelize.query(lengthQuery);
    const musictem = await models.sequelize.query(selectQuery);

    const musictemLen = lengths[0].length;

    const lastPage =
      musictemLen % LIMIT > 0 ? musictemLen / LIMIT + 1 : musictemLen / LIMIT;

    return res.status(200).json({
      musictems: musictem[0],
      lastPage: parseInt(lastPage),
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("뮤직탬 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 최신 5개 뮤직탬 리스트
 * PARAMETERS : songName, TagTypeId, TagId, CategoryId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/musictem/new/list", async (req, res, next) => {
  const { songName, TagTypeId, TagId, CategoryId } = req.body;

  const _songName = songName ? songName : ``;
  const _TagTypeId = TagTypeId ? TagTypeId : false;
  const _TagId = TagId ? TagId : false;
  const _CategoryId = CategoryId ? CategoryId : false;

  const selectQuery = `
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
          ) 										  AS albumImage,
          (
            SELECT	albumName 
              FROM	album
             WHERE	A.AlbumId = id 
          ) 										  AS albumName
    FROM  track   A
   WHERE  TRUE = (
   				SELECT	isTrackPermit 
   				  FROM	album
   				 WHERE	A.AlbumId = id 
                 )
     AND  A.songName LIKE "%${_songName}%"
          ${
            _TagTypeId
              ? `
          AND 0 < (
                    SELECT  COUNT(id)
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
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
                      FROM  albumTag
                     WHERE  A.AlbumId = AlbumId
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
                      FROM  albumCategory
                     WHERE  A.AlbumId = AlbumId
                       AND  TagId = ${_CategoryId}
                   )
          `
              : ``
          }
   ORDER  BY num DESC
   LIMIT  5
  `;

  try {
    const list = await models.sequelize.query(selectQuery);

    return res.status(200).json(list[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("뮤직탬 목록을 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 트랙 신청 리스트
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/track/apply/list", async (req, res, next) => {
  const albumQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id, 
          albumName,
          albumImage,
          albumImageName,
          bitRate,
          sampleRate,
          fileName,
          filePath,
          isPremium,
          isTrackPermit,
          permitAt,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          MusictemId
    FROM  album
   WHERE  isTrackPermit = 0
   ORDER  BY num DESC
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
   ORDER  BY num DESC
  `;
  try {
    const albums = await models.sequelize.query(albumQuery);

    const track = await models.sequelize.query(trackQuery);
    const categorys = await models.sequelize.query(findCateInfoQuery);
    const tags = await models.sequelize.query(findTagInfoQuery);

    albums[0].map((ele) => {
      ele["tracks"] = [];

      track[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.AlbumId)) {
          ele.tracks.push(innerItem);
        }
      });
    });

    albums[0].map((ele) => {
      ele["categorys"] = [];

      categorys[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.AlbumId)) {
          ele.categorys.push(innerItem);
        }
      });
    });

    albums[0].map((ele) => {
      ele["tags"] = [];

      tags[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.AlbumId)) {
          ele.tags.push(innerItem);
        }
      });
    });

    return res.status(200).json(albums[0]);
  } catch (error) {
    console.error(error);
    return res.status(401).send("뮤직탬 정보를 조회할 수 없습니다.");
  }
});
/**
 * SUBJECT : 뮤직탬 상세정보 조회
 * PARAMETERS : MusictemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/musictem/detail", async (req, res, next) => {
  const { MusictemId } = req.body;

  const detailQuery = `
  SELECT  id,
          artistName,
          profileImage,
          profileImageName,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt
    FROM  musictem
   WHERE  id = ${MusictemId}
  `;

  const albumQuery = `
  SELECT  ROW_NUMBER()  OVER(ORDER  BY createdAt)   AS num,
          id, 
          albumName,
          albumImage,
          albumImageName,
          bitRate,
          sampleRate,
          fileName,
          filePath,
          isPremium,
          isTrackPermit,
          permitAt,
          createdAt,
          updatedAt,
          DATE_FORMAT(createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          MusictemId
    FROM  album
   WHERE  MusictemId = ${MusictemId}
   ORDER  BY num DESC
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

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 뮤직템 데이터입니다.");
    }

    const albums = await models.sequelize.query(albumQuery);

    const track = await models.sequelize.query(trackQuery);
    const categorys = await models.sequelize.query(findCateInfoQuery);
    const tags = await models.sequelize.query(findTagInfoQuery);

    albums[0].map((ele) => {
      ele["tracks"] = [];

      track[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.AlbumId)) {
          ele.tracks.push(innerItem);
        }
      });
    });

    albums[0].map((ele) => {
      ele["categorys"] = [];

      categorys[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.AlbumId)) {
          ele.categorys.push(innerItem);
        }
      });
    });

    albums[0].map((ele) => {
      ele["tags"] = [];

      tags[0].map((innerItem) => {
        if (parseInt(ele.id) === parseInt(innerItem.AlbumId)) {
          ele.tags.push(innerItem);
        }
      });
    });

    return res.status(200).json({
      detailData: detailData[0][0],
      albums: albums[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("뮤직탬 정보를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 앨범 상세
 * PARAMETERS : AlbumId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/detail", async (req, res, next) => {
  const { AlbumId } = req.body;

  const detailQuery = `
  SELECT  A.id, 
          A.albumName,
          A.albumImage,
          A.albumImageName,
          A.bitRate,
          A.sampleRate,
          A.fileName,
          A.filePath,
          A.isPremium,
          A.isTrackPermit,
          A.permitAt,
          A.createdAt,
          A.updatedAt,
          DATE_FORMAT(A.createdAt, "%Y년 %m월 %d일")    AS viewCreatedAt,
          DATE_FORMAT(A.createdAt, "%Y.%m.%d")        AS viewFrontCreatedAt,
          DATE_FORMAT(A.updatedAt, "%Y년 %m월 %d일")    AS viewUpdatedAt,
          A.MusictemId,
          B.artistName
    FROM  album         A
   INNER
    JOIN  musictem          B
      ON  A.MusictemId = B.id
   WHERE  A.id = ${AlbumId}
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
   WHERE  A.AlbumId = ${AlbumId}
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
   WHERE  A.AlbumId = ${AlbumId}
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
     AND  A.AlbumId = ${AlbumId}
   ORDER  BY num DESC
  `;

  try {
    const detailData = await models.sequelize.query(detailQuery);

    if (detailData[0].length === 0) {
      return res.status(401).send("존재하지 않는 뮤직탬 정보입니다.");
    }

    const tracks = await models.sequelize.query(trackQuery);
    const cates = await models.sequelize.query(findCateInfoQuery);
    const tags = await models.sequelize.query(findTagInfoQuery);

    return res.status(200).json({
      detailData: detailData[0][0],
      tracks: tracks[0],
      cates: cates[0],
      tags: tags[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send("앨범 정보를 조회할 수 없습니다.");
  }
});

/**
 * SUBJECT : 앨범 등록
 * PARAMETERS : albumName,
                albumImage,
                albumImageName,
                bitRate,
                sampleRate,
                fileName,
                filePath,
                categorys,
                tags,
                MusictemId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
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
router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    albumName,
    albumImage,
    albumImageName,
    bitRate,
    sampleRate,
    fileName,
    filePath,
    categorys,
    tags,
    MusictemId,
  } = req.body;

  if (!Array.isArray(tags)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(categorys)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const insertQuery = `
    INSERT  INTO    album
    (
        albumName,
        albumImage,
        albumImageName,
        bitRate,
        sampleRate,
        fileName,
        filePath,
        MusictemId,
        createdAt,
        updatedAt 
    )
    VALUES
    (
        "${albumName}",
        "${albumImage}",
        "${albumImageName}",
        "${bitRate}",
        "${sampleRate}",
        "${fileName}",
        "${filePath}",
        ${MusictemId},
        NOW(),
        NOW() 
    )
    `;

    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      categorys.map(async (data) => {
        const insertQuery = `
        INSERT  INTO    albumCategory
        (
            AlbumId,
            CateTypeId,
            CategoryId,
            sort,
            createdAt,
            updatedAt
        )
        VALUES
        (
            ${insertResult[0].insertId},
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
        INSERT  INTO    albumTag
        (
            AlbumId,
            TagTypeId,
            TagId,
            sort,
            createdAt,
            updatedAt
        )
        VALUES
        (
            ${insertResult[0].insertId},
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

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("앨범을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 프리미엄 앨범 등록
 * PARAMETERS : albumName,
                albumImage,
                albumImageName,
                bitRate,
                sampleRate,
                fileName,
                filePath,
                categorys,
                tags,
                MusictemId,
                trackInfos
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
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
//   }
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
//   }
// ]
// trackInfos: [
//   {
//     songName: "",
//     singerName: "",
//     fileName: "",
//     filePath: "",
//     fileLength: "",
//     isTitle: 1
//   },
//   {
//     songName: "",
//     singerName: "",
//     fileName: "",
//     filePath: "",
//     fileLength: "",
//     isTitle: 0
//   },
//   {
//     songName: "",
//     singerName: "",
//     fileName: "",
//     filePath: "",
//     fileLength: "",
//     isTitle: 0
//   }
// ]
router.post("/premium/create", isAdminCheck, async (req, res, next) => {
  const {
    albumName,
    albumImage,
    albumImageName,
    bitRate,
    sampleRate,
    fileName,
    filePath,
    categorys,
    tags,
    MusictemId,
    trackInfos,
    artistName,
  } = req.body;

  if (!Array.isArray(tags)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(categorys)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (!Array.isArray(trackInfos)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const insertQuery = `
    INSERT  INTO    album
    (
        albumName,
        albumImage,
        albumImageName,
        bitRate,
        sampleRate,
        fileName,
        filePath,
        MusictemId,
        createdAt,
        updatedAt,
        isPremium,
        isTrackPermit,
        permitAt
    )
    VALUES
    (
        "${albumName}",
        "${albumImage}",
        "${albumImageName}",
        "${bitRate}",
        "${sampleRate}",
        "${fileName}",
        "${filePath}",
        ${MusictemId},
        NOW(),
        NOW(),
        1,
        1,
        NOW()
    )
    `;

    const insertResult = await models.sequelize.query(insertQuery);

    await Promise.all(
      categorys.map(async (data) => {
        const insertQuery = `
        INSERT  INTO    albumCategory
        (
            AlbumId,
            CateTypeId,
            CategoryId,
            sort,
            createdAt,
            updatedAt
        )
        VALUES
        (
            ${insertResult[0].insertId},
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
        INSERT  INTO    albumTag
        (
            AlbumId,
            TagTypeId,
            TagId,
            sort,
            createdAt,
            updatedAt
        )
        VALUES
        (
            ${insertResult[0].insertId},
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

    await Promise.all(
      trackInfos.map(async (data) => {
        const insertQuery = `
            INSERT  INTO    track
            (
                songName,
                singerName,
                fileName,
                filePath,
                fileLength,
                isTitle,
                createdAt,
                updatedAt,
                AlbumId
            )
            VALUES
            (
                "${data.songName}",
                "${data.singerName}",
                "${data.fileName}",
                "${data.filePath}",
                "${data.fileLength}",
                ${data.isTitle},
                NOW(),
                NOW(),
                ${insertResult[0].insertId}
            )
            `;

        await models.sequelize.query(insertQuery);
      })
    );

    const historyInsertQuery = `
    INSERT    INTO    albumHistory
    (
      title,
      content,
      updator,
      createdAt,
      updatedAt
    )
    VALUES
    (
      "프리미엄 앨범 등록",
      "[${artistName}] 프리미엄 앨범 등록",
      updator,
      createdAt,
      updatedAt
    )
    `;

    await models.sequelize.query(historyInsertQuery);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("앨범을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 트랙 등록
 * PARAMETERS : trackInfos, AlbumId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
// trackInfos: [
//   {
//     songName: "",
//     singerName: "",
//     fileName: "",
//     filePath: "",
//     fileLength: "",
//     isTitle: 1
//   },
//   {
//     songName: "",
//     singerName: "",
//     fileName: "",
//     filePath: "",
//     fileLength: "",
//     isTitle: 0
//   },
//   {
//     songName: "",
//     singerName: "",
//     fileName: "",
//     filePath: "",
//     fileLength: "",
//     isTitle: 0
//   }
// ]
router.post("/track/create", isLoggedIn, async (req, res, next) => {
  const { trackInfos, AlbumId } = req.body;

  if (!Array.isArray(trackInfos)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    await Promise.all(
      trackInfos.map(async (data) => {
        const insertQuery = `
        INSERT  INTO    track
        (
            songName,
            singerName,
            fileName,
            filePath,
            fileLength,
            isTitle,
            createdAt,
            updatedAt,
            AlbumId
        )
        VALUES
        (
            "${data.songName}",
            "${data.singerName}",
            "${data.fileName}",
            "${data.filePath}",
            "${data.fileLength}",
            ${data.isTitle},
            NOW(),
            NOW(),
            ${AlbumId}
        )
        `;

        await models.sequelize.query(insertQuery);
      })
    );

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("트랙을 등록할 수 없습니다.");
  }
});

/**
 * SUBJECT : 관리자 트랙신청 승인
 * PARAMETERS : AlbumId
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : 신태섭
 * DEV DATE : 2023/06/09
 */
router.post("/track/permit", isAdminCheck, async (req, res, next) => {
  const { AlbumId, trackTitleName } = req.body;

  const updateQuery = `
  UPDATE    album
     SET    isTrackPermit = 1,
            permitAt = NOW()
   WHERE    id = ${AlbumId}
  `;

  const historyInsertQuery = `
  INSERT    INTO    albumHistory
  (
    title,
    content,
    updator,
    createdAt,
    updatedAt
  )
  VALUES
  (
    "트랙 신청 승인",
    "[${trackTitleName}] 트랙 신청 승인",
    updator,
    createdAt,
    updatedAt
  )
  `;

  try {
    await models.sequelize.query(updateQuery);
    await models.sequelize.query(historyInsertQuery);

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("트랙 신청을 승인할 수 없습니다.");
  }
});

module.exports = router;
