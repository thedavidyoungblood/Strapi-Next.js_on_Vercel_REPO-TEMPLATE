# Strapi API Generation Templates

This directory contains a set of standardized, best-practice templates for generating new Strapi API components.

## Purpose

During the initial setup of this project, we encountered significant inconsistencies and bugs with the interactive and non-interactive Strapi CLI `generate` commands. To ensure a stable, reliable, and consistent development workflow, we have adopted a template-based approach for scaffolding new API components.

These templates provide a deterministic way to create new controllers, services, routes, policies, and content-types, completely bypassing the buggy CLI.

## Templates

| File | Purpose |
| --- | --- |
| `controller.ts.tpl` | A template for a core controller that uses the `factories` pattern. |
| `service.ts.tpl` | A template for a core service that uses the `factories` pattern. |
| `router.ts.tpl` | A template for a core router that uses the `factories` pattern. |
| `policy.ts.tpl` | A template for a standard policy. |
| `middleware.ts.tpl` | A template for a standard middleware. |
| `schema.json.tpl` | A template for a content-type's `schema.json`. |
| `migration.js.tpl` | A template for a database migration. |

## Usage

Currently, using these templates is a manual process:

1.  Copy the desired template file to the appropriate location in the `backend/src/api` directory.
2.  Rename the file (e.g., `controller.ts.tpl` to `[api-name].ts`).
3.  Perform a search-and-replace for the placeholder variables (e.g., `__NAME__`, `__API_NAME__`).

Future development may include a PowerShell or Node.js script to automate this process.
