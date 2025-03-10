const javascript = require("@eslint/js");
const typescript = require("typescript-eslint");
const eslintPluginReact = require("eslint-plugin-react");
const eslintPluginReactHooks = require("eslint-plugin-react-hooks");
const eslintPluginReactNative = require("eslint-plugin-react-native");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const eslintPluginPromise = require("eslint-plugin-promise");
const eslintPluginImport = require("eslint-plugin-import");

const recommended = [
  javascript.configs.recommended,
  typescript.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  eslintPluginPromise.configs["flat/recommended"],
];

const files = ["**/*.{js,jsx,ts,tsx}"];
const ignores = [
  "eslint.config.cjs",
  ".husky",
  ".git",
  ".idea",
  ".vscode",
  "android",
  "ios",
  "dist",
  "build",
  "node_modules",
  "babel.config.js",
  "metro.config.js",
  "react-native.config.js",
  "src/assets/icons/dist",
];

const settings = {
  react: {
    version: "detect",
  },
};

module.exports = typescript.config(
  ...recommended,
  { ignores },
  { settings },
  // core
  {
    files,
    rules: {
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
      "react-native/no-color-literals": "warn",
      "react-native/no-single-element-style-arrays": "error",
    },
  },
);
