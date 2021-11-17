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
      await strapi.services.email.sendMail(data.email);

      return otp;
    } catch (err) {
      ctx.badRequest("Cannot send email");
    }
  },
  async sendMailVerify(ctx) {
    console.log('ctx: ', ctx);
    const otp = randomOTP();
    const data = ctx.request.body;
    console.log('data: ', data);
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
};
