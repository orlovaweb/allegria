module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": "warn",
        indent: ["warn", 2, { SwitchCase: 1 }],
        semi: [2, "always"],
        "space-before-function-paren": ["error", { anonymous: "always", named: "never" }],
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
}
