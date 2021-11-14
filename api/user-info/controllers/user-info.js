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
  async find(ctx) {
    let users;
    if (ctx.query._q) {
      users = await strapi.query("user", "users-permissions").search(ctx.query);
    } else {
      users = await strapi
        .query("user", "users-permissions")
        .find(ctx.query || {});
    }

    const entities = users.map((user) => {
      return {
        userId: user.id,
        username: user.username,
        email: user.email,
        score: user.score,
        dateOfBirth: user.dateOfBirth,
      };
    });

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.query("user-info").model })
    );
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: id });

    const entity = {
      userId: user.id,
      username: user.username,
      email: user.email,
      score: user.score,
      dateOfBirth: user.dateOfBirth,
    };

    return sanitizeEntity(entity, { model: strapi.query("user-info").model });
  },

  // async create(ctx) {
  //   const existingEntry = await strapi
  //     .query("user", "users-permissions")
  //     .findOne({ email: ctx.request.body.email });

  //   if (existingEntry) {
  //     return ctx.badRequest(
  //       null,
  //       formatError({
  //         id: "Auth.form.error.valid",
  //         message: "Email already exists",
  //         field: "email",
  //       })
  //     );
  //   }

  //   console.log(ctx.request.body);

  //   const validData = await strapi.entityValidator.validateEntityUpdate(
  //     strapi.query("user", "users-permissions").model,
  //     ctx.request.body
  //   );

  //   console.log(validData);

  //   if (!validData) {
  //     return ctx.badRequest(
  //       null,
  //       formatError({
  //         id: "Auth.form.error.invalid",
  //         message: "Info invalid.",
  //       })
  //     );
  //   }

  //   const entry = await strapi
  //     .query("user", "users-permissions")
  //     .create(validData);

  //   return entry;
  // },

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

    const entry = await strapi
      .query("user", "users-permissions")
      .update({ id: user.id }, { password });

    return entry;
  },
};
