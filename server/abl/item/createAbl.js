const Ajv = require("ajv");
const ajv = new Ajv();
const itemDao = require("../../dao/item-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 100 },
    category: { type: "string" },
  },
  required: ["name", "category"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let item = req.body;

    const valid = ajv.validate(schema, item);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    try {
      item = itemDao.create(item);
    } catch (e) {
      res.status(400).json({ ...e });
      return;
    }

    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;