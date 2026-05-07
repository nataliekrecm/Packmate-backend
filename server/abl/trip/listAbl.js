const tripDao = require("../../dao/trip-dao.js");

async function ListAbl(req, res) {
  try {
    const tripList = tripDao.list();
    res.json({ itemList: tripList, count: tripList.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;