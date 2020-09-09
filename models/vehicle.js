const mongoose = require("mongoose");

const schema = mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  brandName: {
    type: String,
    required: true,
    trim: true
  },
  vehicleName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
});

schema.index(
  { vehicleNumber: 1, brandName: 1 },
  { unique: true }
);

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

schema.methods.toJSON = function () {
  return (this).toObject();
};

module.exports = mongoose.model("vehicle", schema);