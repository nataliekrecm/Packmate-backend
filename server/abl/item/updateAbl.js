const Ajv = require("ajv");
const ajv = new Ajv();
const itemDao = require("../../dao/item-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string", maxLength: 100 },
    category: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedItem = itemDao.update(item);
    if (!updatedItem) {
      res.status(404).json({
        code: "itemNotFound",
        message: `Item with id ${item.id} not found`,
      });
      return;
    }

    res.json(updatedItem);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;