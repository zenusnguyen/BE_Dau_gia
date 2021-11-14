"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  var io = require("socket.io")(strapi.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", function (socket) {
    socket.on("priceChange", async (data) => {
      let entity = await strapi.query("auto-auction").find({
        productId: data?.productId,
      });
      var product = await strapi.services.item.findOne({
        id: data?.productId,
        status: "processing",
      });
      if (entity?.length > 0) {
        while (product?.status == "processing") {
          // await Promise.all(
          // entity.map(async (el) => {
          for (let i = 0; i < entity?.length; i++) {
            product = await strapi.services.item.findOne({
              id: entity[i]?.productId,
              status: "processing",
            });
            if (
              product?.maxPrice ==
              product?.currentPrice + product?.priceStep
            ) {
              //sold product
              await strapi.services.item.update(
                { id: entity[i]?.productId },
                {
                  currentPrice: product?.currentPrice + product?.priceStep,
                  status: "sold",
                }
              );
              // create price history
              const buyer = await strapi
                .query("user", "users-permissions")
                .findOne({ id: entity[i]?.buyerId });
              await strapi.query("price-history").create({
                time: Date.now(),
                productId: entity[i]?.productId,
                buyer: entity[i]?.buyerId,
                buyerName: buyer?.username || buyer?.name,
                type: "sold",
                bidderId: product?.ownerId,
                price: product?.currentPrice + product?.priceStep,
              });
            } else {
              // update price
              await strapi.services.item.update(
                { id: entity[i]?.productId },
                { currentPrice: product?.currentPrice + product?.priceStep }
              );
              // create price history
              const buyer = await strapi
                .query("user", "users-permissions")
                .findOne({ id: entity[i]?.buyerId });
              await strapi.query("price-history").create({
                time: Date.now(),
                productId: entity[i]?.productId,
                buyer: entity[i]?.buyerId,
                buyerName: buyer?.username || buyer?.name,
                type: "auction",
                bidderId: product?.ownerId,
                price: product?.currentPrice + product?.priceStep,
              });
            }
          }
          socket.broadcast.emit("priceChange", { data });
          socket.emit("priceChange", { data });
        }
        // setTimeout(() => {
        //   socket.broadcast.emit("priceChange", { data });
        // }, 3000);
      } else {
        socket.emit("priceChange", { data });
        socket.broadcast.emit("priceChange", { data });
      }
    });
  });
};
