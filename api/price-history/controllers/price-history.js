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
      entities = await strapi.query("price-history").search(ctx.query);
    } else {
      entities = await strapi.query("price-history").find(ctx.query);
    }
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.item })
    );
  },

  async findByProduct(ctx) {
    const { productId } = ctx.params;
    const entity = await strapi.query("price-history").find({
      productId: productId,
      _sort: "time:desc",
    });
    return entity;
  },
};
