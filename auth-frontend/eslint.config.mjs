import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  prettierConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "error",
        // prettier config
        {
          semi: false,
          singleAttributePerLine: true,
          trailingComma: "all",
          bracketSpacing: true,
          endOfLine: "auto",
        },
        {
          usePrettierrc: true,
        },
      ],
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      curly: ["warn", "all"],
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION", // is, v-is
            "LIST_RENDERING", // v-for item in items
            "CONDITIONALS", // v-if, v-else-if, v-else, v-show, v-cloak
            "RENDER_MODIFIERS", // v-pre, v-once
            "GLOBAL", // id
            "UNIQUE", // ref, key, slot
            "TWO_WAY_BINDING", // v-model
            "OTHER_DIRECTIVES", // v-custom-directive
            "OTHER_ATTR", // class, style
            "EVENTS", // @click="functionCall"
            "CONTENT", // v-text, v-html
          ],
          alphabetical: false,
        },
      ],
    },
  },
]
