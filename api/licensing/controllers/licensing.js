"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
module.exports = {
  async find(ctx) {
    console.log("ctx: ", ctx);
    let entities;
    console.log("ctx.query: ", ctx.query);
    if (ctx.query._q) {
      console.log("??");
      entities = await strapi.services.licensing.search(ctx.query);
    } else {
      entities = await strapi.services.licensing.find(ctx.query);
    }
    console.log("entities: ", entities);
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.licensing })
    );
  },
};
