"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    console.log("ctx: ", ctx);
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.item.search(ctx.query);
    } else {
      entities = await strapi.services.item.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.item })
    );
  },

  async findSortDescView(ctx) {
    const entity = await strapi.services.item.search({
      _limit: 5,
      _sort: "view:desc",
    });
    return sanitizeEntity(entity, { model: strapi.models.item });
  },

  async findSortDescPrice(ctx) {
    const entity = await strapi.services.item.search({
      _limit: 5,
      _sort: "currentPrice:desc",
    });
    return sanitizeEntity(entity, { model: strapi.models.item });
  },

  async findSortAscPostDate(ctx) {
    const entity = await strapi.services.item.search({
      _limit: 5,
      _sort: "postingDate:asc",
    });
    return sanitizeEntity(entity, { model: strapi.models.item });
  },

  async findBySubCategory(ctx) {
    const { subId, pageNumber } = ctx.params;
    const entity = await strapi.services.item.find({
      subCategoryId: subId,
      _limit: 2,
      _start: 2 * (pageNumber - 1),
    });

    return sanitizeEntity(entity, { model: strapi.models.item });
  },
  async getCountBySub(ctx) {
    const { subId } = ctx.params;
    const entity = await strapi.services.item.count({
      subCategoryId: subId,
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
