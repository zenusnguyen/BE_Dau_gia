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

  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.item.findOne({
      id: id,
    });
    const seller = await strapi.query("user", "users-permissions").findOne({
      id: entity.seller.id,
    });
    const bidder = await strapi.query("user", "users-permissions").findOne({
      id: entity.currentBidder.id,
    });
    const products = await strapi.services.item.find({
      id_nin: [id],
      subCategoryId: entity.subCategoryId,
      _limit: 5,
    });
    entity.seller.score = seller.score;
    entity.currentBidder.score = bidder.score;
    entity.products = products;
    return entity;
  },

  async findAllLike(ctx) {
    const { bidderId } = ctx.params;
    const allWatch = await strapi.services.watch.find({
      bidderId: bidderId,
    });
    const productsId = allWatch.map((watch) => watch.productId);
    const products = await strapi.services.item.find({
      id_in: productsId,
    });
    const entity = products.map((product) => {
      return { ...product, isLike: true };
    });

    return entity;
  },

  async findAllSellProcessing(ctx) {
    const { sellerId } = ctx.params;

    const entity = await strapi.query("item").model.find({
      "seller.id": sellerId,
      status: "processing",
    });

    return entity;
  },

  async findAllSellSold(ctx) {
    const { sellerId } = ctx.params;

    const entity = await strapi.query("item").model.find({
      "seller.id": sellerId,
      status: "sold",
    });

    return entity;
  },

  async findAllAuctionProcessing(ctx) {
    const { bidderId } = ctx.params;

    const allHistory = await strapi.query("price-history").model.find({
      "buyer.id": bidderId,
    });

    const productsId = [];

    allHistory.map((history) => {
      if (!productsId.includes(history.productId)) {
        productsId.push(history.productId);
      }
    });

    const entity = await strapi.services.item.find({
      id_in: productsId,
      status: "processing",
    });

    return entity;
  },

  async findAllAuctionSold(ctx) {
    const { bidderId } = ctx.params;

    const entity = await strapi.query("item").model.find({
      "currentBidder.id": bidderId,
      status: "sold",
    });

    return entity;
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
