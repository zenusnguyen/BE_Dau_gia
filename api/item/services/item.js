"use strict";
const socket_io = require("socket.io");
const io = socket_io();

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  onStream: () => {
    const { item } = strapi.models;
    console.log("streamChange");

    const changeStream = item.watch();

    changeStream.on("change", (change) => {
      console.log(change); // You could parse out the needed info and send only that data.
      io.emit("changeData", change);
    });

    io.on("connection", function () {
      console.log("connected");
    });
  },
};
