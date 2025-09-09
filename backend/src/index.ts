import { Core } from '@strapi/types';

const grantPublicRole = async (strapi: Core.Strapi) => {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
    populate: ['permissions'],
  });

  if (!publicRole) {
    return;
  }

  const articlePermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
    where: {
      action: {
        $in: ['api::article.article.find', 'api::article.article.findOne'],
      },
    },
  });

  if (!articlePermissions.length) {
    return;
  }

  await strapi.db.query('plugin::users-permissions.role').update({
    where: { id: publicRole.id },
    data: {
      permissions: [...publicRole.permissions, ...articlePermissions].map(p => p.id),
    },
  });
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicRole(strapi);
  },
};
