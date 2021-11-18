"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }

  "*/1 * * * *": async () => {
    // const products = await strapi.services.item.find();
    // console.log('products: ', products);
    // products.map((el) => {
    //   const expiredDate = new Date(el.createdAt.getDate() + 7);
    //   console.log("el.createdAt: ", el.createdAt);
    //   console.log("expiredDate: ", expiredDate);
    //   if (getDate() > expiredDate) {
    //     strapi.services.item.update({ id: el.id }, { status: "expired" });
    //   }
    // });
    // const io = require("socket.io")(strapi.server, {
    //   cors: {
    //     origin: "http://localhost:3000",
    //     methods: ["GET", "POST"],
    //     credentials: true,
    //   },
    // });

    const products = await strapi.services.item.find({
      status: "processing",
    });

    //   Promise.all(
    //     products.map(async (el) => {
    //       const expiredDate = new Date(
    //         el.createdAt.setDate(el.createdAt?.getDate() + 7)
    //       );
    //       console.log("expiredDate: ", expiredDate);
    //       console.log("new Date(): ", new Date());
    //       if (new Date() < expiredDate) {
    //         console.log("expired");
    //         await strapi.services.item.update(
    //           { id: el.id },
    //           { status: "expired" }
    //         );
    //       }
    //     })
    //   );

    // Promise.all(
    //   products.map(async (item) => {
    //     let entity = await strapi.query("auto-auction").find({
    //       productId: item?.id,
    //     });
    //     if (entity?.length > 0) {
    //       console.log("here");
    //       await Promise.all(
    //         entity.map(async (el) => {
    //           const product = await strapi.services.item.findOne({
    //             id: el?.productId,
    //           });

    //           if (product?.maxPrice === el?.currentPrice + el?.priceStep) {
    //             //sold product
    //             await strapi.services.item.update(
    //               { id: el?.productId },
    //               {
    //                 currentPrice: el?.currentPrice + el?.priceStep,
    //                 status: "sold",
    //               }
    //             );
    //             // create price history
    //             const buyer = await strapi
    //               .query("user", "users-permissions")
    //               .findOne({ id: el?.buyerId });
    //             console.log("buyer: ", buyer);

    //             await strapi.query("price-history").create({
    //               time: Date.now(),
    //               productId: el?.productId,
    //               buyer: el?.buyerId,
    //               buyerName: buyer?.username || buyer?.name,
    //               type: "sold",
    //               bidderId: product?.ownerId,
    //               price: el?.currentPrice + el?.priceStep,
    //             });
    //           } else {
    //             // update price
    //             await strapi.services.item.update(
    //               { id: el?.productId },
    //               { currentPrice: el?.currentPrice + el?.priceStep }
    //             );
    //             // create price history
    //             // create price history
    //             const buyer = await strapi
    //               .query("user", "users-permissions")
    //               .findOne({ id: el?.buyerId });
    //             console.log("buyer: ", buyer);

    //             await strapi.query("price-history").create({
    //               time: Date.now(),
    //               productId: el?.productId,
    //               buyer: el?.buyerId,
    //               buyerName: buyer?.username || buyer?.name,
    //               type: "auction",
    //               bidderId: product?.ownerId,
    //               price: el?.currentPrice + el?.priceStep,
    //             });
    //           }
    //           io.on("connection", function (socket) {
    //             socket.broadcast.emit("priceChange", {
    //               product: product?.id,
    //             });
    //           });
    //         })
    //       );
    //     }
    //   })
    // );
  },
};
