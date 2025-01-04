import globals from "globals";
import javascript from "@eslint/js";
import typescript from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactNative from "eslint-plugin-react-native";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const files = ["**/*.{js,jsx,ts,tsx}"];

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    ignores: [
      ".husky",
      ".git",
      ".idea",
      ".vscode",
      "android",
      "ios",
      "node_modules",
      "babel.config.js",
      "metro.config.js",
      "react-native.config.js",
    ],
  },
  javascript.configs.recommended,
  ...typescript.configs.recommended,
  eslintPluginPrettier,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  {
    files,
    rules: {
      ...javascript.configs.recommended.rules,
      "no-template-curly-in-string": "error",
      "default-case-last": "error",
      "default-param-last": "error",
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "max-params": ["warn", 4],
      "no-console": "error",
      "no-empty": "error",
    },
  },
  {
    files,
    rules: {
      "no-extra-boolean-cast": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
    },
  },
  {
    files,
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintPluginReact.configs.flat.recommended.rules,
      ...eslintPluginReact.configs.flat["jsx-runtime"].rules,
      "react/hook-use-state": "error",
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "ignore" },
      ],
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/no-array-index-key": "error",
      "react/self-closing-comp": ["error", { component: true }],
      "react/no-danger": "error",
      "react/no-unstable-nested-components": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  {
    plugins: {
      "react-native": eslintPluginReactNative,
    },
    rules: {
      ...eslintPluginReactNative.configs.all.rules,
      "react-native/no-raw-text": "off",
      "react-native/sort-styles": "off",
      "react-native/no-unused-styles": "error",
      "react-native/no-inline-styles": "error",
      "react-native/no-color-literals": "warn",
      "react-native/no-single-element-style-arrays": "error",
    },
  },
];
