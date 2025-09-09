'use strict';

/**
 * `__NAME__` policy
 */

export default (policyContext, config, { strapi }) => {
  // Add your own logic here.
  strapi.log.info('In __NAME__ policy.');

  const canDoSomething = true;

  if (canDoSomething) {
    return true;
  }

  return false;
};
