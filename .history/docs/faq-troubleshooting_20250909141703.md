# FAQ & Troubleshooting

This document is a living collection of frequently asked questions, common issues, and their solutions.

## Backend

### Q: The `strapi generate` or `strapi generate:api` command fails with a `MODULE_NOT_FOUND` error.

*   **Symptom:** The non-interactive Strapi CLI fails to generate APIs or content-types, often with a `Cannot find module '.../backend/api'` error.
*   **Cause:** This appears to be a bug or inconsistency in the Strapi v5 CLI, where it incorrectly resolves paths in non-interactive mode.
*   **Solution:** **Do not use the non-interactive CLI for generation.** We have created a set of standardized templates to bypass this issue. Follow the "Creating a New Content-Type" guide in the [Development Workflow](./development-workflow.md) document. The interactive generator (`npx strapi generate`) can also be used as a last resort, but the templates are preferred for consistency.

### Q: The `strapi build` command fails with TypeScript errors related to `ContentType`.

*   **Symptom:** After manually creating or modifying an API, the `strapi build` command fails with errors like `Argument of type '"api::article.article"' is not assignable to parameter of type 'ContentType'`.
*   **Cause:** The build-time TypeScript environment is not aware of dynamically generated or manually created content-types. The `ContentType` type is a union of all known UIDs *at compile time*.
*   **Solution:** This was a complex issue to debug. The most reliable solution was to abandon the use of the `factories` pattern for manually-created APIs and instead use the simple boilerplate (e.g., `export default {};`) for controllers, services, and routes. While the `factories` provide more out-of-the-box functionality, the simplified approach avoids the unresolvable type errors. Custom logic can be added to these simple files as needed.

### Q: The `strapi build` command fails with an error about PostCSS config.

*   **Symptom:** The build fails with an error like `Invalid PostCSS Plugin found at: plugins[0]` and references a `postcss.config.js` file outside the project directory.
*   **Cause:** The Strapi/Vite build process was not finding a local `postcss.config.js` and was incorrectly falling back to a system-level file.
*   **Solution:** Create an empty but valid `postcss.config.js` in the `backend` directory.
    ```javascript
    // backend/postcss.config.js
    module.exports = {
      plugins: [],
    };
    ```

## Frontend

### Q: Jest tests are failing with `SyntaxError: Cannot use import statement outside a module`.

*   **Symptom:** The test runner fails immediately on the `jest.setup.js` file.
*   **Cause:** Jest runs in a CommonJS environment by default and cannot parse ES Module `import` statements in setup files.
*   **Solution:** Change the `jest.setup.js` file to use `require('@testing-library/jest-dom');` instead of `import`.

### Q: Jest tests are failing with `SyntaxError: Unexpected token '<'`.

*   **Symptom:** The test runner fails when it encounters JSX syntax in a test file.
*   **Cause:** The `ts-jest` transformer is not correctly configured to handle the modern React JSX runtime.
*   **Solution:** Create a `tsconfig.test.json` file in the `frontend` directory that extends the main `tsconfig.json` and explicitly sets the JSX runtime. Then, update `jest.config.js` to use this new tsconfig for transformations.
    ```json
    // frontend/tsconfig.test.json
    {
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "jsx": "react-jsx"
      }
    }
    ```
    ```javascript
    // frontend/jest.config.js
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
    },
    ```
