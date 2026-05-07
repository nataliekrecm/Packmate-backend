const Ajv = require("ajv");
const ajv = new Ajv();
const itemDao = require("../../dao/item-dao.js");

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

    const item = itemDao.get(dtoIn.id);
    if (!item) {
      res.status(404).json({
        code: "itemNotFound",
        message: `Item with id ${dtoIn.id} not found`,
      });
      return;
    }

    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;