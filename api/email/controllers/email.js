"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const randomOTP = require("../../../helpers/genaratorOTP");

module.exports = {
  async sendMailWinnerEmail(ctx) {
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
    try {
      const sendMail = await strapi.services.email.sendWinnerBidderMail(data);
      return { status: 200 };
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },
  async sendRejectNotification(ctx) {
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
};
