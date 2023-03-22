const { alias, configPaths } = require("react-app-rewire-alias");

const aliasMap = configPaths("./tsconfig.paths.json");
/**
 * @see https://www.npmjs.com/package/react-app-rewired
 */
module.exports = function override(config) {
  // https://www.npmjs.com/package/react-app-rewire-alias
  alias(aliasMap)(config);

  return config;
};
