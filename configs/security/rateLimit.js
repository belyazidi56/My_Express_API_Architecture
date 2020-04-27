const rateLimit = require("express-rate-limit");
const MongoStore = require("rate-limit-mongo");
const db = require("../db");

const limiter = rateLimit({
  store: new MongoStore({
    uri: db.database,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many request from this IP, please try again after an hour",
});

module.exports = {
  limiter: limiter,
};
