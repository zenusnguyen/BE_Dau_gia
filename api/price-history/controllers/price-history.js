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

  async create(ctx) {
    let entity;
    const { productId, price, type } = ctx.request.body;

    if (type === "auction") {
      await strapi.services.item.update(
        { id: productId },
        { currentPrice: price }
      );
      if (ctx.is("multipart")) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.query("price-history").create(data, { files });
      } else {
        entity = await strapi.query("price-history").create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models["price-history"] });
    } else {
      await strapi.services.item.update(
        { id: productId },
        { currentPrice: price, status: "sold" }
      );
      if (ctx.is("multipart")) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.query("price-history").create(data, { files });
      } else {
        entity = await strapi.query("price-history").create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models["price-history"] });
    }
  },
};
