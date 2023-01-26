const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const models = require("../models");

const router = express.Router();

/**
 * SUBJECT : 신청자 내역 가져오기 (미승인)
 * PARAMETERS : -
 * ORDER BY : -
 * STATEMENT : -
 * DEVELOPMENT : CTO 윤상호
 * DEV DATE : 2023/01/11
 */
router.post("/list", isAdminCheck, async (req, res, next) => {
  const {} = req.body;
  try {
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("사용자별 음원 구매 현황 목록을 조회할 수 없습니다.");
  }
});

module.exports = router;
