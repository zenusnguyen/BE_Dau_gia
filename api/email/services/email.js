"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async sendWinnerBidderMail(data) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: `Chúc mừng bạn đã đấu giá thành công sản phẩm ${content?.product?.name} với mức giá ${content?.product?.currentPrice} `,
      });
    } catch (error) {}
  },
  async sendRejectNotification(data) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },

  async sendAuctionFailNotification(data) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: ` `,
      });
    } catch (error) {}
  },
  async sendAuctionSuccessNotification(data) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: data?.email,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: `Sản phẩm ${data?.product?.title} đã kết thúc ở mức ${data?.product?.currentPrice}`,
      });
    } catch (error) {}
  },

  async sendSellerNotification(data) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: data?.seller,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: `Sản phẩm ${data?.product?.title} đã được đấu giá ở mức ${data?.product?.currentPrice}`,
      });
    } catch (error) {}
  },

  async sendBidderNotification(data) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: data?.bidder,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: `Sản phẩm ${data?.product?.title} đã được đấu giá ở mức ${data?.product?.currentPrice}`,
      });
    } catch (error) {}
  },

  async sendPreBidderNotification(data) {
    console.log("data: ", data);
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: data?.preBidder,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: `Sản phẩm ${data?.product?.title} đã được người khác đấu giá ở mức ${data?.product?.currentPrice}`,
      });
    } catch (error) {}
  },

  async sendChangeDescriptionNotification(data) {
    console.log("data: ", data);
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: data?.email,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: `Sản phẩm ${data?.product?.title} đã được cập nhật thông tin`,
      });
    } catch (error) {}
  },

  async sendMailVerify(email, otp) {
    try {
      const sendMail = await strapi.plugins["email"].services.email.send({
        to: email,
        from: "jzay.noreply@gmail.com",
        subject: "Jzay~",
        text: ` You are create new account your OTP code is :${otp}`,
      });
      console.log("sendMail: ", sendMail);
    } catch (error) {
      console.log("error: ", error);
    }
  },
};
