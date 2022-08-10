/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // TODO: Delete commented code below if the CJS error doesn't return
  // resolver: {
  //   sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
  // },
};
