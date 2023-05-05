const express = require("express");
const {
  getAllQuestion,
  CreateQuestion,
  DeleteQuestion,
  ViewQuestion,
} = require("../controller/questionController");
const router = express.Router();

router.route("/").get(getAllQuestion);
router.route("/create").post(CreateQuestion);
router.route("/delete").post(DeleteQuestion);
router.route("/view").post(ViewQuestion);

module.exports = router;
