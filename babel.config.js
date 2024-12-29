module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        safe: true,
        path: ".env",
        allowUndefined: false,
      },
    ],
    [
      "module-resolver",
      {
        alias: {
          "@app": "./src",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
