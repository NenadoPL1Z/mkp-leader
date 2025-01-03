import globals from "globals";
import javascript from "@eslint/js";
import typescript from "typescript-eslint";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";

const reactHookConfig = {
  plugins: {
    "react-hooks": reactHooks,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
  },
};

const reactNativeConfig = {
  plugins: {
    "react-native": reactNative,
  },
  rules: {
    ...reactNative.configs.all.rules,
    "react-native/sort-styles": "off",
    "react-native/no-inline-styles": "warn",
  },
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,ts,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      ".husky",
      ".git",
      ".idea",
      ".vscode",
      "android",
      "ios",
      "node_modules",
    ],
  },
  javascript.configs.recommended,
  ...typescript.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHookConfig,
  reactNativeConfig,
  prettierConfig,
  prettierPlugin,
];
