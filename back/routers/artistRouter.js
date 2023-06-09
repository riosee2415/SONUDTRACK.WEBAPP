const express = require("express");
const models = require("../models");

const router = express.Router();

// 아티스트템 최신 리스트
router.post("/new", async (req, res, next) => {
  const selectQuery = `
        SELECT 	A.id,
                A.name,
                A.artistProfileImage,
                A.artistInfo,
                A.repMusicFile,
                A.repMusicFilename,
                A.createdAt
         FROM	artistem        A
        WHERE   A.isUpdate  = 1
        ORDER	BY A.createdAt DESC
        LIMIT   4
      `;

  const tagQuery = `
        SELECT  A.ArtistemId,
                B.tagValue,
                B.id			AS tagId	
          FROM  artistTag       A
         INNER
          JOIN  tag             B
            ON  A.TagId = B.id
      `;
  try {
    const list = await models.sequelize.query(selectQuery);
    const tags = await models.sequelize.query(tagQuery);

    list[0].map((item) => {
      item["tags"] = [];
      tags[0].map((innerItem) => {
        if (parseInt(item.id) === parseInt(innerItem.ArtistemId)) {
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

module.exports = router;
