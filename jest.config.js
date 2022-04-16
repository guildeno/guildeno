// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const base = require("./jest.config.base.js");

// eslint-disable-next-line no-undef
module.exports = {
    ...base,
    projects:
    [
        "<rootDir>/packages/*/jest.config.js"
    ],
    coverageDirectory: "<rootDir>/coverage/"
};
