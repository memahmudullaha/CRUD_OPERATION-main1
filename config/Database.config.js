const mongoose = require("mongoose");

const Connection = () => {
  return mongoose.connect(process.env.DatabasesURL);
};

module.exports = Connection;
