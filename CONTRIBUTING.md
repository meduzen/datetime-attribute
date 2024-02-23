# Contribution guidelines

You can contribute to this project by:
- creating [issues](https://github.com/meduzen/datetime-attribute/issues/) to report a bug, request a feature or ask a question;
- opening [pull requests](https://github.com/meduzen/datetime-attribute/issues/pulls) with improvements to the documentation or the code;
- participating in [discussions](https://github.com/meduzen/datetime-attribute/discussions).

The following websites can provide tips and guidance on how to contribute to open source projects:
- [_How to submit a contribution_](https://opensource.guide/how-to-contribute/#how-to-submit-a-contribution) on _Open Source Guides_;
- [_GitHub Skills_](https://skills.github.com/) can help to understand GitHub.

Please do your best to communicate the necessary context so your contribution can be easily understood by other persons, and don’t be afraid if you struggle with English or if you are not sure about what you are doing.

## Bug reports

When reporting a bug, here are the informations you can provide to help other persons to help you:
- version of the library that you are using;
- technical context (like Node or browser version);
- a clear description of the issue you are facing, with the less possible code required to understand or reproduce the issue.

## Pull requests

Before submitting code, the changes you bring should:
- have written tests that don’t fail when they are run (`pnpm test`)
- have updated [JSDoc comments](https://jsdoc.app/), updated types (`pnpm types`) that are tested (`pnpm test:types`);
- respect the code styles (`pnpm lint-fix`) defined using [EditorConfig](https://editorconfig.org/) and [ESLint](https://eslint.org).

Tests are using Vitest, and a command for [its UI](https://vitest.dev/guide/ui.html) is available (`pnpm test:ui`).
