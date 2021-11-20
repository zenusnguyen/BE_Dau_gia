"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    console.log("ctx.request.body: ", ctx.request.body);
    const { productId, buyerId } = ctx.request.body;

    let entity = await strapi.query("auto-auction").findOne({
      productId: productId,
      buyerId: buyerId,
    });
    if (entity?.id == undefined) {
      entity = await strapi.query("auto-auction").create(ctx.request.body);
      return sanitizeEntity(entity, { model: strapi.models["auto-auction"] });
    } else {
      await strapi
        .query("auto-auction")
        .update({ id: entity?.id }, ctx.request.body);
      return sanitizeEntity(entity, { model: strapi.models["auto-auction"] });
    }
  },
};
