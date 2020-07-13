//Reference for rules - https://commitlint.js.org/#/reference-rules
//TODO - need to add to scope-enum

const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["build", "deps", "common", "deps-dev"]],
    "scope-case": [0],
    "scope-empty": [2, "never"],
    "subject-case": [0],
    "body-max-line-length": [0],
  },
};

module.exports = Configuration;
