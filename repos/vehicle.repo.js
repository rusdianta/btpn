const Vehicle = require("../models/vehicle");

/**
 *
 * @param {*} id
 * get vehicle by id
 */
async function readById(id) {
  const item = Vehicle.findById(id);

  return item;
}

/**
 *
 * @param {*} data
 * create new vehicle
 */
async function insert(data) {
  const newItem = new Vehicle({vehicleNumber: data.vehicleNumber, brandName: data.brandName, vehicleName: data.vehicleName, description: data.description})

  return await newItem.save();
}

/**
 *
 * @param {*} data
 * update an existing vehicle
 */
async function update(data) {
  const item = await Vehicle.findById(data.id);
  item.vehicleNumber = data.vehicleNumber;
  item.brandName = data.brandName;
  item.vehicleName = data.vehicleName;
  item.description = data.description;

  return await item.save();
}

/**
 *
 * @param {*} id
 * delete existing vehicle by id
 */
async function deleteById(id) {
  return Vehicle.findByIdAndDelete(id);
}

module.exports = {
  readById,
  insert,
  update,
  deleteById
};