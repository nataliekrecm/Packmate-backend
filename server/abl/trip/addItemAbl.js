const Ajv = require("ajv");
const ajv = new Ajv();
const tripDao = require("../../dao/trip-dao.js");
const itemDao = require("../../dao/item-dao.js");

const schema = {
  type: "object",
  properties: {
    tripId: { type: "string" },
    itemId: { type: "string" },
  },
  required: ["tripId", "itemId"],
  additionalProperties: false,
};

async function AddItemAbl(req, res) {
  try {
    const dtoIn = req.body;

    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const trip = tripDao.get(dtoIn.tripId);
    if (!trip) {
      res.status(404).json({
        code: "tripNotFound",
        message: `Trip with id ${dtoIn.tripId} not found`,
      });
      return;
    }

    const item = itemDao.get(dtoIn.itemId);
    if (!item) {
      res.status(404).json({
        code: "itemNotFound",
        message: `Item with id ${dtoIn.itemId} not found`,
      });
      return;
    }

    if (!trip.packingList) trip.packingList = [];

    if (trip.packingList.some((i) => i.itemId === dtoIn.itemId)) {
      res.status(400).json({
        code: "itemAlreadyInPackingList",
        message: "Item is already in the packing list",
      });
      return;
    }

    trip.packingList.push({ itemId: dtoIn.itemId, isPacked: false });
    const updatedTrip = tripDao.update(trip);

    res.json(updatedTrip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = AddItemAbl;