# Contributing

#### Table of Contents

[Commit message conventions](#commit-message-conventions)

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
