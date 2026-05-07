const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const itemFolderPath = path.join(__dirname, "storage", "itemList");

function get(itemId) {
  try {
    const filePath = path.join(itemFolderPath, `${itemId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadItem", message: error.message };
  }
}

function create(item) {
  try {
    const itemList = list();
    if (itemList.some((i) => i.name === item.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "Item with this name already exists",
      };
    }
    item.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(itemFolderPath, `${item.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(item), "utf8");
    return item;
  } catch (error) {
    if (error.code === "uniqueNameAlreadyExists") throw error;
    throw { code: "failedToCreateItem", message: error.message };
  }
}

function update(item) {
  try {
    const currentItem = get(item.id);
    if (!currentItem) return null;
    if (item.name && item.name !== currentItem.name) {
      const itemList = list();
      if (itemList.some((i) => i.name === item.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: "Item with this name already exists",
        };
      }
    }
    const newItem = { ...currentItem, ...item };
    const filePath = path.join(itemFolderPath, `${item.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newItem), "utf8");
    return newItem;
  } catch (error) {
    if (error.code === "uniqueNameAlreadyExists") throw error;
    throw { code: "failedToUpdateItem", message: error.message };
  }
}

function remove(itemId) {
  try {
    const filePath = path.join(itemFolderPath, `${itemId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveItem", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(itemFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(itemFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListItems", message: error.message };
  }
}

module.exports = { get, create, update, remove, list };