"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { isDraft } = require("strapi-utils").contentTypes;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];
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
      birthDay: user.dateOfBirth,
    };

    return sanitizeEntity(entity, { model: strapi.query("user-info").model });
  },

  async update(ctx) {
    const existingEntry = await strapi
      .query("user", "users-permissions")
      .findOne(ctx.params);

    const validData = await strapi.entityValidator.validateEntityUpdate(
      strapi.query("user", "users-permissions").model,
      ctx.request.body,
      {
        isDraft: isDraft(
          existingEntry,
          strapi.query("user", "users-permissions").model
        ),
      }
    );

    const entry = await strapi
      .query("user", "users-permissions")
      .update(ctx.params, validData);

    return entry;
  },

  async updatePassword(ctx) {
    const { oldPassword, newPassword } = ctx.request.body;

    const user = await strapi
      .query("user", "users-permissions")
      .findOne(ctx.query);

    if (!user) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.invalid",
          message: "Password invalid.",
        })
      );
    }

    const validPassword = await strapi.plugins[
      "users-permissions"
    ].services.user.validatePassword(oldPassword, user.password);

    if (!validPassword) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.invalid",
          message: "Password invalid.",
          field: "password",
        })
      );
    }

    const password = await strapi.plugins[
      "users-permissions"
    ].services.user.hashPassword({
      password: newPassword,
    });

    console.log(user.id);
    console.log(newPassword);

    const entry = await strapi
      .query("user", "users-permissions")
      .update({ id: user.id }, { password });

    return entry;
  },
};
