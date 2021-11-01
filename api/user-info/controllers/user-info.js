"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: id });
    const entity = {
      userId: user.id,
      fullName: user.fullName,
      score: user.score,
    };
    return sanitizeEntity(entity, { model: strapi.query("user-info").model });
  },
};
