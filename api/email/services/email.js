"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async sendWinnerBidderMail(email, content) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: `Chúc mừng bạn đã đấu giá thành công sản phẩm ${content?.product?.name} với mức giá ${content?.product?.currentPrice} `,
      });
    } catch (error) {}
  },
  async sendRejectNotification(email, content) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },

  async sendAuctionFailNotification(email, content) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },
  async sendAuctionSuccessNotification(email, content) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },

  async sendSellerNotification(email, content) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },

  async sendBidderNotification(email, content) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },

  async sendPreBidderNotification(email, content) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },

  async sendMailVerify(email, otp) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "web2020hcmus@gmail.com",
        subject: "Jzay~",
        text: ` You are create new account your OTP code is :${otp}`,
      });
      console.log("sendMail: ", sendMail);
    } catch (error) {
      console.log("error: ", error);
    }
  },
};
