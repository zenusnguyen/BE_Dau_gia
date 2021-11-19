"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const randomOTP = require("../../../helpers/genaratorOTP");

module.exports = {
  async sendMailWinnerEmail(ctx) {
    const data = ctx.request.body;
    try {
      await strapi.services.email.sendMail(data);
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },
  async sendMailVerify(ctx) {
    const otp = randomOTP();
    const data = ctx.request.body;
    try {
      const sendMail = await strapi.services.email.sendMailVerify(
        data.email,
        otp
      );

      return otp;
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },
  async sendWinnerBidderMail(ctx) {
    const data = ctx.request.body;
    try {
      const sendMail = await strapi.services.email.sendWinnerBidderMail(data);
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },
  async sendRejectNotification(ctx) {
    const data = ctx.request.body;
    try {
      const sendMail = await strapi.services.email.sendRejectNotification(data);
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },
  async sendAuctionFailNotification(ctx) {
    const data = ctx.request.body;
    try {
      const sendMail = await strapi.services.email.sendAuctionFailNotification(
        data
      );
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },

  async sendAuctionSuccessNotification(ctx) {
    const data = ctx.request.body;
    try {
      const sendMail =
        await strapi.services.email.sendAuctionSuccessNotification(data);
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },

  async sendSellerNotification(ctx) {
    const data = ctx.request.body;
    try {
      const sendMail = await strapi.services.email.sendSellerNotification(data);
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },

  async sendBidderNotification(ctx) {
    const data = ctx.request.body;
    try {
      const sendMail = await strapi.services.email.sendBidderNotification(data);
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },

  async sendPreBidderNotification(ctx) {
    const data = ctx.request.body;
    try {
      const sendMail = await strapi.services.email.sendPreBidderNotification(
        data
      );
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },

  async sendChangeDescriptionNotification(ctx) {
    const data = ctx.request.body;
    const listBidder = await strapi.query("price-history").find({
      productId: data?.product?.id,
      type: "auction",
    });
    console.log("listBidder: ", listBidder);

    try {
      Promise.all(
        listBidder.map(async (el) => {
          const bidder = await strapi
            .query("user", "users-permissions")
            .findOne({ id: el?.buyerId });
          console.log("bidder?.email,: ", bidder?.email);
          await strapi.services.email.sendChangeDescriptionNotification({
            email: bidder?.email,
            product: data?.product,
          });
        })
      );

      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },
};
