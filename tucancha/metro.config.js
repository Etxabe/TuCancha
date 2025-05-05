const { getDefaultConfig } = require('metro-config');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig();
  defaultConfig.resolver.extraNodeModules = {
    stream: require.resolve('stream-browserify'),
  };
  return defaultConfig;
};
