const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const tripFolderPath = path.join(__dirname, "storage", "tripList");

function get(tripId) {
  try {
    const filePath = path.join(tripFolderPath, `${tripId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTrip", message: error.message };
  }
}

function create(trip) {
  try {
    trip.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(tripFolderPath, `${trip.id}.json`);
    const fileData = JSON.stringify(trip);
    fs.writeFileSync(filePath, fileData, "utf8");
    return trip;
  } catch (error) {
    throw { code: "failedToCreateTrip", message: error.message };
  }
}

function update(trip) {
  try {
    const currentTrip = get(trip.id);
    if (!currentTrip) return null;
    const newTrip = { ...currentTrip, ...trip };
    const filePath = path.join(tripFolderPath, `${trip.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newTrip), "utf8");
    return newTrip;
  } catch (error) {
    throw { code: "failedToUpdateTrip", message: error.message };
  }
}

function remove(tripId) {
  try {
    const filePath = path.join(tripFolderPath, `${tripId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveTrip", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(tripFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(tripFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListTrips", message: error.message };
  }
}

module.exports = { get, create, update, remove, list };