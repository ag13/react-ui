# Contributing

#### Table of Contents

[Technology Stack](#technology-stack)

[Styles and Conventions](#styles-and-conventions)
- [Code Style](#code-style)
- [Folder structure](#folder-structure)
- [Third party source code](#third-party-source-code)
- [Conventions](#conventions)

[Configuration best practices](#configuration-best-practices)

[Branch and Pull Requests](#branch-and-pull-requests)

[Commit message conventions](#commit-message-conventions)

## Technology Stack

The application is build using React but there are other libraries as well that are part of the stack

- [React](https://reactjs.org/docs/getting-started.html) to handle HTML rendering and basic lifecycle of the application
- [Redux](https://redux.js.org/) to manage the application state
- [React Redux](https://react-redux.js.org/) to use redux store with react components
- UI component library ??
- I18n library as [lingui](https://lingui.js.org/)
- [Luxon](https://moment.github.io/luxon/) for managing dates and times
- [Formik](https://formik.org/) for form management
- [React Query](https://github.com/tannerlinsley/react-query) for fetching and managing asynchronous data'

## Styles and Conventions

### Code Style
The coding style is enforced by `eslint` and `prettier`. This is configured as a pre-commit hook. This should also be configured as a CI status check. If you want to run it locally, you should be able to do it via a yarn custom command like `yarn lint`. You can also configure your editor to auto-format on save.

### Folder structure

#### Component’s file name should be in Pascal Case

Component names should be like `TabbedPage` and not like `tabbedPage`. Also no other type of file should be in Pascal Case. This way, whenever we see a filename in Pascal Case, it is very clear that the file is a React component.

### Third party source code

Ensure that you add third party source code as an npm module via package.json file. Do not copy paste the entire source code as it is. Also ensure that any third party library that you are adding is open source (has MIT licence) and is approved via a PR review process. If it is a paid version, then appropriate permission needs to be taken. Contact person XXXX?

### Conventions

#### Common components

- All the common components should support storybook and have appropriate examples to denote how it works

- It should have a clear interface - what props does it accept and what is its purpose. This can be demonstrated using storybook itself

#### Avoid default component export

- Always use named exports so that a component can then be imported like

`import { TabbedPage } from ‘./common’`

- Keep all the common components used across the application in `common` folder. If a common component has its own folder then there should be a component file inside it with the same name. The component folder name should also be in Pascal case. Make sure to have an index.js (or index.ts) file inside the folder to avoid imports like this

`import { TabbedPage } from ‘./common/TabbedPage/TabbedPage’`

The `index.js` file can export the named component

`export * from ‘./TabbedPage’`

#### Use Hooks

Always prefer using hooks which lets you add state and side effects to functional components. All new code should use hooks instead of the traditional React lifecycle methods.

- Follow the rules of hooks as mentioned [here](https://reactjs.org/docs/hooks-rules.html)
- Use hooks for Redux state and actions (`useSelector`, `useDispatch`)

#### Internationalize all user facing text

All displayed text messages should be internationalized using Lingui. Refer to the documentation [here](https://lingui.js.org/tutorials/react.html)

#### Localize all dates/times

All date time values displayed in the UI should be localized using Luxon


#### Use data-test attributes for e2e tests

Cypress tests require a stable way to select elements. Instead of using class names or element hierarchy that can change, use a `data-test` attribute instead.

## Configuration best practices

- Sort module imports using [this] module (https://www.npmjs.com/package/import-sort-style-modul) package 
* [eslint](https://eslint.org/) (pre-commit hook)
* [Prettier](https://prettier.io/) (pre-commit hook)
* [Dependabot](https://github.com/marketplace/dependabot-preview) setup for managing third party dependencies

## Branch and Pull Requests

All code being merged to `master` branch should go through a code review process by raising a Pull Request in Github.

The PRs should be small enough for better reviews and it should only contain a single feature or a fix. Large number of files in a single PR should be avoided and instead should be broken down into multiple PRs unless absolutely necessary.

Proper PR descriptions indicating 
- Purpose of the change
- What has changed
- Next steps if any

should be written to enable faster reviews

## Commit message conventions

The repository uses [commitlint](https://github.com/conventional-changelog/commitlint) to enforce a particular commit message style. It enforces developers to use standardized commit messages which help with creating release notes, understanding what and where has the code changed.

It must follow the [conventions](https://www.conventionalcommits.org/en/v1.0.0)

It uses the following pattern:

`type(scope): subject`

The type can be one of the following:

`['feat', 'fix', 'build', 'chore', 'ci', 'docs', 'style','refactor', 'perf', 'test']`

The scope values can be one of the following:

`['build', 'deps', 'common']`

The subject is a description of the changes included in the commit

### Commit message examples

`feat(common): adding support for dropdown component`

`fix(build): fixing ui build`

`refactor(common): adding support for search in dropdown select`
