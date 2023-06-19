const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  tokenValidation.validateToken,
  messageController.createMessage
);
router.get(
  "/:roomID",
  tokenValidation.validateToken,
  messageController.getMessages
);

router.put("/:id", messageController.updateMessage);

router.delete(
  "/:id",
  tokenValidation.validateToken,
  messageController.deleteMessage
);

module.exports = router;
