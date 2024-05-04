'use strict';

/**
 * like service
 */

const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('api::like.like');

// Path: api/like/services/like.js


module.exports = createCoreService("api::like.like", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const artwork = ctx.state.artwork;

    const { body } = ctx.request;

    const newLike = await strapi.entityService.create("api::like.like", {
      data: {
        ...body.data,
        user: {
          set: [user.id],
        },
        artwork: {
          set: [artwork.id],
        },
      },
    });

    return { data: newLike };
  },
}));
