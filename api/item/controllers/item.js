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
      entities = await strapi.services.item.search(ctx.query);
    } else {
      entities = await strapi.services.item.find(ctx.query);
    }
    console.log("entities: ", entities);

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.item })
    );
  },

  async count(ctx) {
    if (ctx.query._q) {
      return strapi.services.item.countSearch(ctx.query);
    }
    return strapi.services.item.count(ctx.query);
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.item.findOne({
      id: id,
    });

    return sanitizeEntity(entity, { model: strapi.models.item });
  },

  async search(ctx) {
    const { searchWord } = ctx.params;
    const entity = {};
    return sanitizeEntity(entity, { model: strapi.models.item });
  },

  async getCountSearch(ctx) {
    const { searchWord } = ctx.params;
    return sanitizeEntity(length, { model: strapi.models.item });
  },
};
