import dotenv from 'dotenv';

/**
 * Loads .env config to Cypress.env
 * Workaround for cypress-dotenv issue: https://github.com/cypress-io/cypress/issues/1358
 * Source: https://github.com/cypress-io/cypress/issues/1358#issuecomment-848527254
 *
 * @example
 * .env USER_NAME=test
 * Cypress.env('USER') // test
 * @param config
 */
export default function (
  config: Cypress.PluginConfigOptions,
  { path = '.env' } = {},
) {
  const configWithDotenv = dotenv.config({ path });
  if (configWithDotenv.error) {
    return config;
  }

  const env = { ...config.env, ...configWithDotenv.parsed };
  process.env = env;

  return { ...config, env };
}
