const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const auth = require("../middlewares/authMiddleware");

router.post("/generate-user-stories", auth, aiController.generateUserStories);

module.exports = router;
