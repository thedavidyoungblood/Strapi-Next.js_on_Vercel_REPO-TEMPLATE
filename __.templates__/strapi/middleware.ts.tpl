'use strict';

/**
 * `__NAME__` middleware
 */

export default (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In __NAME__ middleware.');

    await next();
  };
};
