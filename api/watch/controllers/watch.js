"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { bidderId, productId } = ctx.request.body;

    const entity = await strapi.services.watch.create({
      bidderId: bidderId,
      productId: productId,
    });

    return entity;
  },

  async delete(ctx) {
    const { bidderId, productId } = ctx.params;

    const entity = await strapi.services.watch.delete({
      bidderId: bidderId,
      productId: productId,
    });

    return entity;
  },
};
