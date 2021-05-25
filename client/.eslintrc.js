module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  rules: {
    /* Possible errors */
    'no-await-in-loop': 2,
    'no-console': 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-extra-parens': [1, "all", {
      nestedBinaryExpressions: false
    }],
    'no-template-curly-in-string': 1,

    /* Best practices */
    'accessor-pairs': 2,
    'array-callback-return': 2,
    'block-scoped-var': 2,
    'class-methods-use-this': 2,
    'complexity': 1,
    'consistent-return': 1,
    'curly': [1, 'all'],
    'default-case': 1,
    'dot-location': [1, 'property'],
    'dot-notation': [1],
    'eqeqeq': 2,
    'guard-for-in': 2,
    'max-classes-per-file': [1, 1],
    'no-alert': 2,
    'no-caller': 2,
    'no-div-regex': 2,
    'no-else-return': 1,
    'no-empty-function': 1,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 1,
    'no-implicit-coercion': 2,
    'no-implicit-globals': 2,
    'no-implied-eval': 2,
    'no-invalid-this': 2,
    'no-iterator': 2,
    'no-labels': 2,
    'no-lone-blocks': 1,
    'no-loop-func': 1,
    'no-multi-spaces': 1,
    'no-multi-str': 1,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    // 'no-param-reassign': 2,
    'no-return-await': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-throw-literal': 2,
    'no-unmodified-loop-condition': 2,
    'no-unused-expressions': 1,
    'no-useless-call': 2,
    'no-useless-concat': 2,
    'no-useless-return': 2,
    'no-void': 2,
    // 'no-warning-comments': 1,
    // 'prefer-named-capture-group': 1,
    'prefer-promise-reject-errors': 1,
    'radix': 2,
    'require-await': 2,
    'vars-on-top': 1,
    'wrap-iife': [2, 'inside'],

    /* Variables */
    '@typescript-eslint/init-declarations': 2,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 1,
    'no-undef-init': 2,
    'no-undefined': 2,
    'no-use-before-define': [2, { functions: false, classes: false }],

    /* Stylistic */
    'camelcase': 0,
    'consistent-this': 2,
    'func-name-matching': 1,
    'func-names': 1,
    'func-style': [1, 'declaration', {
      allowArrowFunctions: true
    }],
    'function-call-argument-newline': 0,
    'function-paren-newline': 0,
    'indent': [0, 2],
    'max-lines-per-function': 0, // TODO: review
    'linebreak-style': 1,
    'max-len': [1, {
      code: 100,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    'max-params': 0, // TODO: review
    'max-statements': 0, // TODO: review
    'max-statements-per-line': [1, { max: 1 }],
    'no-bitwise': 1,
    'no-continue': 2,
    'no-lonely-if': 1,
    'no-mixed-operators': [1, {
      groups: [
        ["+", "-", "*", "/", "%", "**"],
        ["&", "|", "^", "~", "<<", ">>", ">>>"],
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"]
      ]
    }],
    'no-multi-assign': 1,
    'no-multiple-empty-lines': 1,
    'no-negated-condition': 1,
    'no-plusplus': 2,
    'no-tabs': [1],
    // 'no-ternary': 1,
    'no-trailing-spaces': 1,
    'no-whitespace-before-property': 1,
    'object-curly-spacing': [1, 'always'],
    'quote-props': [1, 'consistent-as-needed'],
    'semi': [1, 'always'],
    'space-before-function-paren': [1, 'never'],

    /* ES6+ */
    'prefer-object-spread': 2,
    'prefer-spread': 2,
    'prefer-template': 1,

    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'vue/html-indent': [1, 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: []
    }
    ],
    'vue/script-indent': [1, 2, {
      baseIndent: 1,
      switchCase: 0,
      ignores: []
    }
    ],
    'vue/html-closing-bracket-spacing': [1, {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'never'
    }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0
  }
};


// /* eslint-disable */ // To-Do
// const { resolve } = require('path');

// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: [
//     'eslint:recommended',

//     'plugin:@typescript-eslint/eslint-recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:@typescript-eslint/recommended-requiring-type-checking',

//     '@vue/typescript',
//     'plugin:vue/essential',

//     'airbnb-base',
//   ],
//   parserOptions: {
//     extraFileExtensions: ['.vue'],
//     parser: '@typescript-eslint/parser',
//     project: resolve(__dirname, './tsconfig.json'),
//     tsconfigRootDir: __dirname,
//     ecmaVersion: 2018,
//     sourceType: 'module',
//   },
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'import/order': ['error', {
//       alphabetize: {
//         caseInsensitive: true,
//         order: 'asc',
//       },
//       groups: [
//         'builtin',
//         'external',
//         'unknown',
//         'internal',
//         ['parent', 'sibling'],
//         'index',
//       ],
//       'newlines-between': 'always',
//       pathGroups: [
//         {
//           group: 'internal',
//           pattern: '@/**',
//         },
//         {
//           group: 'internal',
//           pattern: '@components/**',
//         },
//       ],
//       pathGroupsExcludedImportTypes: [],
//     }],
//     'padding-line-between-statements': [
//       'error',
//       {
//         blankLine: 'always',
//         next: '*',
//         prev: ['const', 'let', 'export', 'if'],
//       },
//       {
//         blankLine: 'any',
//         next: ['const', 'let', 'export'],
//         prev: ['const', 'let', 'export'],
//       },
//     ],
//     quotes: ['error', 'single'],
//   },
// };