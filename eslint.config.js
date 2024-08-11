import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import vitest from '@vitest/eslint-plugin'

export default tseslint.config(
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },

    // (first parameter of a rule) 0: off, 1: warning, 2: error
    rules: {
      indent: [2, 2, { SwitchCase: 1 }],
      'linebreak-style': [2, 'unix'],
      quotes: [2, 'single',
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],
      semi: [2, 'never'],

      'array-bracket-spacing': [2, 'never'],
      'arrow-spacing': 2,
      'brace-style': [2, '1tbs', { allowSingleLine: true }],
      'block-spacing': 2,
      'comma-spacing': 2,
      'computed-property-spacing': [2, 'never'],
      'func-call-spacing': 2,
      'keyword-spacing': 2,
      'key-spacing': [2, { mode: 'minimum' }],
      'object-curly-spacing': [2, 'always'],
      'no-duplicate-imports': 2,
      'no-irregular-whitespace': 2,
      'no-multi-spaces': [2, {
        ignoreEOLComments: true,
        exceptions: {
          ImportDeclaration: true,
          VariableDeclarator: true,
        },
      }],
      'no-multiple-empty-lines': [2, { max: 1 }],
      'no-spaced-func': 2,
      'rest-spread-spacing': [2, 'never'],
      'semi-spacing': [2, { before: false, after: true }],
      'space-before-blocks': 2,
      'space-before-function-paren': [0, { asyncArrow: 'always' }],
      'space-in-parens': 2,
      'space-infix-ops': 2,
      'space-unary-ops': 2,
      'spaced-comment': [2, 'always', {
        block: {
          balanced: true,
        },
      }],
      'template-curly-spacing': [2, 'never'],
      'template-tag-spacing': [2, 'always'],
    },
  },
  {
    files: ['**/*.test.js'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      // ...vitest.configs.all.rules, // worth testing from time to time…

      // Additional rules below taken from `vitest.configs.all.rules`
      'vitest/consistent-test-it': 0,
      'vitest/no-hooks': 0, // when testing `vitest.configs.all.rules`
      'vitest/no-test-return-statement': 1,
      'vitest/prefer-expect-assertions': 0, // when testing `vitest.configs.all.rules`
      'vitest/prefer-todo': 1,
      'vitest/require-to-throw-message': 1,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
)
