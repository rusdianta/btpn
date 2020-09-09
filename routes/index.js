const express = require("express");
const crypto = require("crypto");
const userService = require("../services/user.service");
const vehicleService = require("../services/vehicle.service");
const auth = require("../common/auth");

const routes = new express.Router();

routes.get("/user/:id", userService.getUser);
routes.get("/user/account/:key", auth.checkAuth, userService.getUserByAccountNumber);
routes.get("/user/identity/:key", auth.checkAuth, userService.getUserByIdentityNumber);
routes.get("/user/delete/:id", userService.deleteUser);
routes.post("/user", userService.addUser);
routes.post("/user/:id", userService.updateUser);

routes.get("/vehicle/:id", vehicleService.getVehicle);
routes.get("/vehicle/delete/:id", vehicleService.deleteVehicle);
routes.post("/vehicle", vehicleService.addVehicle);
routes.post("/vehicle/:id", vehicleService.updateVehicle);

routes.post("/login", userService.login);

/*routes.get("/token", (req, res, next) => {
    // convert random data into string
    const token = crypto.randomBytes(100).toString('base64');

    res.status(200).send(token)
});*/

 module.exports = { routes };