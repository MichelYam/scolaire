const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const tokenValidation = require("../middleware/tokenValidation");
const verifyRoles = require("../middleware/verifyRoles");
const { ROLES } = require("../models/User");

router.post(
  "/",
  tokenValidation.validateToken,
  verifyRoles(ROLES.Tutor, ROLES.Admin),
  taskController.createTask
);

router.post("/", tokenValidation.validateToken, taskController.getUserTasks);

router.get("/:id", tokenValidation.validateToken, taskController.getTaskById);

router.post(
  "/myTasksAssignee",
  tokenValidation.validateToken,
  taskController.getUserTasksAssignee
);

router.put(
  "/:id",
  tokenValidation.validateToken,
  verifyRoles(ROLES.Tutor, ROLES.Admin),
  taskController.updateTask
);

router.delete(
  "/:id",
  // tokenValidation.validateToken,
  verifyRoles(ROLES.Tutor, ROLES.Admin),
  taskController.deleteTask
);
module.exports = router;
