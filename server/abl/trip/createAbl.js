const Ajv = require("ajv");
const ajv = new Ajv();
const tripDao = require("../../dao/trip-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 100 },
    destination: { type: "string", maxLength: 100 },
    startDate: { type: "string" },
    endDate: { type: "string" },
    description: { type: "string", maxLength: 500 },
  },
  required: ["name", "destination", "startDate", "endDate"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    try {
      trip = tripDao.create(trip);
    } catch (e) {
      res.status(400).json({ ...e });
      return;
    }

    res.json(trip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;