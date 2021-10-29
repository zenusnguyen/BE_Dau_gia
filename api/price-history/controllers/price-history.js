"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findByProduct(ctx) {
    const { productId } = ctx.params;
    const entity = await strapi.query("price-history").find({
      productId: productId,
      _sort: "time:desc",
    });
    return entity;
  },
};
