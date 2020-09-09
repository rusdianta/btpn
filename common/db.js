const mongoose = require("mongoose");
const env = require("./env");

mongoose
  .connect(
    env.get("DB_URI"),
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      retryWrites: false,
      useFindAndModify: false,
    }
  );

  mongoose.connection.on("open", (ref) => { console.log("Connected to DB"); });
  mongoose.connection.on("error", (err) => { console.log(err); });