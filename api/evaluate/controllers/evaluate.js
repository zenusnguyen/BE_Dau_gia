"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.evaluate.search(ctx.query);
    } else {
      entities = await strapi.services.evaluate.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.evaluate })
    );
  },

  async create(ctx) {
    const {
      senderId,
      senderName,
      receiverId,
      content,
      score,
      time,
      productId,
    } = ctx.request.body;
    const entity = await strapi.services.evaluate.create({
      senderId,
      senderName,
      receiverId,
      content,
      score,
      time,
      productId,
    });

    return sanitizeEntity(entity, { model: strapi.models.evaluate });
  },
};
