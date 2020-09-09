const ObjectId = require("mongoose").Types.ObjectId;
const repo = require("./../repos/vehicle.repo");
const redis = require("redis");
const env = require("./../common/env");

require("./../common/db");

let client = null;

if (env.get("ENABLE_REDIS") == "1") {
  console.log('Redis is available.')

  client = redis.createClient();

  client.on('error', function(err) {
    console.log(err);
  });

} else console.log("Redis is not available.")

/**
 *
 * @param {*} req
 * @param {*} req
 * get an vehicle by id
 */
const getVehicle = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      if (client) {

        client.get(buildKey(id), async (err, data) => {
          if (data) {
            res.status(200).send({...JSON.parse(data), isCached: true });
          } else {
            const item = await repo.readById(id);
            updateCache(item);        

            res.status(200).send({...item._doc, isCached: false });
          }
        });

      } else {
        const item = await repo.readById(id);     

        res.status(200).send({...item._doc, isCached: false });
      }    

      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(404);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * add new single vehicle
 */
const addVehicle = async (req, res) => {
  try {
    const item = await repo.insert(req.body);
    updateCache(item);

    res.status(200).send(item);
  } catch (err) {
    res.sendStatus(400);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * update an existing vehicle by id
 */
const updateVehicle = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const item = await repo.update({id, ...req.body});
      updateCache(item);       

      res.status(200).send(item);
      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(400);
  }
};

/**
 *
 * @param {*} req
 * @param {*} req
 * delete an existing vehicle by id
 */
const deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const item = await repo.deleteById(id);
      if (client) client.del(buildKey(item.id));

      res.status(200).send(item);
      return;
    }

    res.sendStatus(400);
  } catch (err) {
    res.sendStatus(400);
  }
};

function buildKey(id) {
  return `vehicle-${id}`;
};

function updateCache(item) {
  if (client) {
    const id = item.id;
    const data = {id, vehicleNumber: item.vehicleNumber, brandName: item.brandName, vehicleName: item.vehicleName, description: item.description};

    client.set(buildKey(id), JSON.stringify(data), 'EX', 300);
  }
}

module.exports = {
  getVehicle,
  addVehicle,
  updateVehicle,
  deleteVehicle
}
