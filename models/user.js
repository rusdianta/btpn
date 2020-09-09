const mongoose = require("mongoose");
const { encrypt } = require("./../common/encrypt");

const schema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true
  },
  identityNumber: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

schema.index(
  { identityNumber: 1, accountNumber: 1 },
  { unique: true }
);

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = encrypt(this.password);
    next();
  } else next();
});

schema.set("toObject", { virtuals: true });
schema.set("toJSON", { virtuals: true });

schema.methods.toJSON = function () {
  const data = this.toObject();

  delete data.password;

  return data;
};

module.exports = mongoose.model("user", schema);