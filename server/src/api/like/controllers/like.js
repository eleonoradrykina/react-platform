'use strict';

/**
 * like controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::like.like", ({ strapi }) => ({
  /**
   * As the controller action is named
   * exactly like the original `create` action provided by the core controller,
   * it overwrites it.
   */
  async create(ctx) {
    // Creates the new cheese using a service
    const newLike = await strapi.service("api::like.like").create(ctx);

    const sanitizedLike = await this.sanitizeOutput(newLike, ctx);

    ctx.body = sanitizedLike;
  },
}));
