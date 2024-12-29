module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "plugin:import/typescript",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react-native",
    "promise",
    "react",
    "react-hooks",
    "@typescript-eslint",
    "import",
    "prettier",
  ],
  settings: {
    "import/settings": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "prettier/prettier": "error",

    "no-duplicate-imports": "off",
    "no-template-curly-in-string": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "max-params": ["warn", 4],
    "no-console": "warn",
    "no-empty": "error",
    "no-extra-boolean-cast": "error",

    //? TYPESCRIPT
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-duplicate-enum-values": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],

    //? PROMISE
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/no-nesting": "error",
    "promise/no-return-in-finally": "warn",

    //? REACT NATIVE
    "react-native/no-unused-styles": "error",
    "react-native/no-inline-styles": "error",
    "react-native/no-color-literals": "warn",
    "react-native/no-single-element-style-arrays": "error",

    //? REACT
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

    //? REACT HOOKS
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",

    //? IMPORT
    "import/no-deprecated": "off",
    "import/namespace": "off",
    "import/no-unresolved": "off",
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
};
