// const queryController = require("../../controller/querycontroller/querycontroller");
// const router = require("express").Router();

// router.post("/create", queryController.createQueryModuleMessage);
// router.get("/", queryController.getQueryModuleMessages);
// router.delete("/:id", queryController.deleteQueryModuleMessage);

// module.exports = router;
const express = require("express");
const {
  createQuery,
  getAllQueries,
  deleteQuery,
} = require("../../controller/querycontroller/querycontroller");

const router = express.Router();

router.post("/create", createQuery);
router.get("/", getAllQueries);
router.delete("/:id", deleteQuery);

module.exports = router;