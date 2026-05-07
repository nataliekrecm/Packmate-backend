const Ajv = require("ajv");
const ajv = new Ajv();
const tripDao = require("../../dao/trip-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const dtoIn = req.query;

    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const trip = tripDao.get(dtoIn.id);
    if (!trip) {
      res.status(404).json({
        code: "tripNotFound",
        message: `Trip with id ${dtoIn.id} not found`,
      });
      return;
    }

    res.json(trip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;