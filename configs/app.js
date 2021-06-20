const express = require("express");
const mongoose = require("mongoose");
const { limiter } = require("./security/rateLimit");
const helmet = require("helmet");

module.exports = () => {
  let server = express(),
    create,
    start;

  create = (config, db) => {
    let routes = require("../routes");
    // set all the server things
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);

    //Helmet to secure Header
    server.use(helmet());

    //limit repeted request
    server.use(limiter);

    // add middleware to parse the json
    server.use(express.json());
    server.use(
      express.urlencoded({
        extended: false,
      })
    );

    //connect the database
    mongoose.connect(db.database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    // Set up routes
    routes.init(server);
  };

  start = () => {
    let hostname = server.get("hostname"),
      port = server.get("port");
    server.listen(port, function() {
      console.log(
        "Express server listening on - http://" + hostname + ":" + port
      );
    });
  };
  return {
    create: create,
    start: start,
  };
};
