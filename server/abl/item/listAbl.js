const itemDao = require("../../dao/item-dao.js");

async function ListAbl(req, res) {
  try {
    const itemList = itemDao.list();
    res.json({ itemList: itemList, count: itemList.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;