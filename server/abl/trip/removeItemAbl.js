const Ajv = require("ajv");
const ajv = new Ajv();
const tripDao = require("../../dao/trip-dao.js");

const schema = {
  type: "object",
  properties: {
    tripId: { type: "string" },
    itemId: { type: "string" },
  },
  required: ["tripId", "itemId"],
  additionalProperties: false,
};

async function RemoveItemAbl(req, res) {
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

    if (!trip.packingList) trip.packingList = [];

    const itemIndex = trip.packingList.findIndex(
      (i) => i.itemId === dtoIn.itemId
    );

    if (itemIndex === -1) {
      res.status(404).json({
        code: "itemNotInPackingList",
        message: "Item is not in the packing list",
      });
      return;
    }

    trip.packingList.splice(itemIndex, 1);
    const updatedTrip = tripDao.update(trip);

    res.json(updatedTrip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = RemoveItemAbl;