import globals from "globals";
import javascript from "@eslint/js";
import typescript from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactNative from "eslint-plugin-react-native";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginImport from "eslint-plugin-import";

const recommended = [
  javascript.configs.recommended,
  ...typescript.configs.recommended,
  eslintPluginPrettier,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  eslintPluginPromise.configs["flat/recommended"],
];

const settings = {
  react: {
    version: "detect",
  },
};

const languageOptions = {
  globals: {
    NodeJS: true,
    __DEV__: true,
    JSX: true,
    ...globals.browser,
    ...globals.node,
  },
};

const files = ["**/*.{js,jsx,ts,tsx}"];
const ignores = [
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
];

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...recommended,
  { ignores },
  { settings },
  { languageOptions },
  // core
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
  // typescript
  {
    files,
    rules: {
      "no-extra-boolean-cast": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
    },
  },
  // promise
  {
    files,
    rules: {
      ...eslintPluginPromise.configs["flat/recommended"].rules,
      "promise/always-return": "off",
      "promise/valid-params": "off",
      "promise/catch-or-return": "off",
      "promise/no-callback-in-promise": "off",
      "promise/no-return-wrap": "error",
      "promise/param-names": "error",
      "promise/no-nesting": "error",
      "promise/no-return-in-finally": "warn",
    },
  },
  // import
  {
    plugins: {
      import: eslintPluginImport,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    files,
    rules: {
      "import/no-unresolved": "off",
      "import/no-deprecated": "off",
      "import/namespace": "off",
      "import/no-dynamic-require": "warn",
      "import/no-mutable-exports": "error",
      "import/no-empty-named-blocks": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
      "import/no-useless-path-segments": "error",
      "import/first": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "index",
            "sibling",
            "parent",
            "object",
            "type",
          ],
        },
      ],
    },
  },
  // react
  {
    files,
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
  // react-hooks
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    files,
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  // react-native
  {
    plugins: {
      "react-native": eslintPluginReactNative,
    },
    files,
    rules: {
      ...eslintPluginReactNative.configs.all.rules,
      "react-native/no-raw-text": "off",
      "react-native/sort-styles": "off",
      "react-native/no-inline-styles": "off",
      "react-native/no-unused-styles": "error",
      "react-native/no-single-element-style-arrays": "error",
    },
  },
];
