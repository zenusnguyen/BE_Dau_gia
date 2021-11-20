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
    const products = await strapi.services.item.find();
    Promise.all(
      products.map(async (el) => {
        const current = new Date();
        if (current < el.endTime) {
          // check price history
          // const priceHistory = await strapi.services.priceHistory.find({buyerId: el.currentBidderId})
          if (el?.currentBidderId !== undefined) {
            const bidder = await strapi
              .query("user", "users-permissions")
              .findOne({ id: el?.currentBidderId });
            //send bidder email
            await strapi.services.email.sendWinnerBidderMail({
              email: bidder?.email,
              product: el,
            });
            // send seller email
            const seller = await strapi
              .query("user", "users-permissions")
              .findOne({ id: el?.ownerId });
            await strapi.services.email.sendAuctionSuccessNotification({
              email: seller?.email,
              product: el,
            });

            strapi.services.item.update({ id: el.id }, { status: "sold" });
          } else {
            //send fail email
            const seller = await strapi
              .query("user", "users-permissions")
              .findOne({ id: el?.ownerId });
            await strapi.services.email.sendAuctionFailNotification({
              email: seller?.email,
              product: el,
            });
            // change status
            strapi.services.item.update({ id: el.id }, { status: "expired" });
          }
        }
      })
    );
  },
};
