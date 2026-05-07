const Ajv = require("ajv");
const ajv = new Ajv();
const tripDao = require("../../dao/trip-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string", maxLength: 100 },
    destination: { type: "string", maxLength: 100 },
    startDate: { type: "string" },
    endDate: { type: "string" },
    description: { type: "string", maxLength: 500 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let trip = req.body;

    const valid = ajv.validate(schema, trip);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedTrip = tripDao.update(trip);
    if (!updatedTrip) {
      res.status(404).json({
        code: "tripNotFound",
        message: `Trip with id ${trip.id} not found`,
      });
      return;
    }

    res.json(updatedTrip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;