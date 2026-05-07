const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/trip/getAbl");
const ListAbl = require("../abl/trip/listAbl");
const CreateAbl = require("../abl/trip/createAbl");
const UpdateAbl = require("../abl/trip/updateAbl");
const DeleteAbl = require("../abl/trip/deleteAbl");
const AddItemAbl = require("../abl/trip/addItemAbl");
const RemoveItemAbl = require("../abl/trip/removeItemAbl");
const UpdateItemStatusAbl = require("../abl/trip/updateItemStatusAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);
router.post("/addItem", AddItemAbl);
router.post("/removeItem", RemoveItemAbl);
router.post("/updateItemStatus", UpdateItemStatusAbl);

module.exports = router;