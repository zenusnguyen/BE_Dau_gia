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
      var entity = await strapi.query("auto-auction").find({
        productId: data?.productId,
        status: "processing",
      });
      var product = await strapi.services.item.findOne({
        id: data?.productId,
        status: "processing",
      });
      if (entity?.length > 1) {
        while (entity?.length > 1) {
          for (let i = 0; i < entity?.length; i++) {
            product = await strapi.services.item.findOne({
              id: entity[i]?.productId,
              status: "processing",
            });
            if (
              entity[i]?.maxPrice <
              product.currentPrice + product?.priceStep
            ) {
              // change status
              await strapi.services["auto-auction"].update(
                { id: entity[i]?.id },
                { status: "end" }
              );
              return;
            }

            if (
              product?.maxPrice ==
              product?.currentPrice + product?.priceStep
            ) {
              //sold product
              await strapi.services.item.update(
                { id: entity[i]?.productId },
                {
                  currentBidderId: entity[i]?.buyerId,
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
                {
                  currentPrice: product?.currentPrice + product?.priceStep,
                  currentBidderId: entity[i]?.buyerId,
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
                type: "auction",
                bidderId: product?.ownerId,
                price: product?.currentPrice + product?.priceStep,
              });
            }
            entity = await strapi.query("auto-auction").find({
              productId: data?.productId,
              status: "processing",
            });
          }
        }

        // send email notification
        var product = await strapi.services.item.findOne({
          id: data?.productId,
        });

        // send seller notification
        const seller = await strapi
          .query("user", "users-permissions")
          .findOne({ id: product?.ownerId });

        await strapi.services.email.sendSellerNotification({
          seller: seller?.email,
          product: product,
        });

        //send current bidder
        const currentBidder = await strapi
          .query("user", "users-permissions")
          .findOne({ id: product?.currentBidderId });
        await strapi.services.email.sendBidderNotification({
          bidder: bidder?.email,
          product: product,
        });

        //send preBidder
        const history = await strapi.query("price-history").find({
          productId: data?.productId,
        });

        if (history?.length > 1) {
          const preBidder = await strapi
            .query("user", "users-permissions")
            .findOne({ id: history[1]?.bidderId });

          await strapi.services.email.sendPreBidderNotification({
            preBidder: preBidder?.email,
            product: product,
          });
        }

        socket.broadcast.emit("priceChange", {
          ...data,
          price: data?.maxPrice,
        });
      } else {
        socket.broadcast.emit("priceChange", { data });
      }
    });
  });
};

// change acc
