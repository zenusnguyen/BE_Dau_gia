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

  "*/10 * * * *": async () => {
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

    const products = await strapi.services.item.find();

    Promise.all(
      products.map(async (el) => {
        const expiredDate = new Date(
          el.createdAt.setDate(el.createdAt?.getDate() + 7)
        );
        console.log("expiredDate: ", expiredDate);
        console.log("new Date(): ", new Date());
        if (new Date() < expiredDate) {
          console.log("expired");
          await strapi.services.item.update(
            { id: el.id },
            { status: "expired" }
          );
        }
      })
    );
  },
};
