const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/trip/getAbl");
const ListAbl = require("../abl/trip/listAbl");
const CreateAbl = require("../abl/trip/createAbl");
const UpdateAbl = require("../abl/trip/updateAbl");
const DeleteAbl = require("../abl/trip/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;