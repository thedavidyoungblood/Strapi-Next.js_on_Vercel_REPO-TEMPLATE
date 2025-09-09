# Development Workflow Guide

This guide provides step-by-step instructions for setting up the local development environment and following the project's established workflows.

## Initial Setup

1.  **Clone the Repository:**
    ```bash
    git clone [repository-url]
    cd [repository-name]
    ```

2.  **Install Dependencies:**
    This project is a monorepo. You need to install dependencies for the root, the frontend, and the backend.
    ```bash
    # Install root dependencies
    npm install

    # Install frontend dependencies
    cd frontend
    npm install
    cd ..

    # Install backend dependencies
    cd backend
    npm install
    cd ..
    ```

3.  **Configure Environment Variables:**
    Both the frontend and backend applications require environment variables. Copy the `.env.example` files to `.env` in each directory and customize them as needed.

    *   `frontend/.env.example` -> `frontend/.env`
    *   `backend/.env.example` -> `backend/.env`

## Running the Application

To run both the frontend and backend development servers concurrently, use the `dev` script in the root `package.json`.

```bash
npm run dev
```

This will start:
*   The **Next.js frontend** on `http://localhost:3000`
*   The **Strapi backend** on `http://localhost:1337`

You can access the Strapi Admin Panel at `http://localhost:1337/admin`.

## Backend Development Workflow

Due to inconsistencies with the Strapi CLI, we use a template-based approach for creating new API components.

### Creating a New Content-Type

1.  **Copy Templates:** Copy the `controller.ts.tpl`, `service.ts.tpl`, `router.ts.tpl`, and `schema.json.tpl` files from `__.templates__/strapi` into a new directory in `backend/src/api`.
    *   Example for a "Product" API: `backend/src/api/product/`

2.  **Rename & Configure:**
    *   Rename the `.tpl` files (e.g., `controller.ts.tpl` -> `product.ts`).
    *   Edit the `schema.json` to define your content-type's attributes and names.
    *   Edit the other files, replacing placeholders like `__API_NAME__` with your API's name (e.g., `product`).

3.  **Rebuild Strapi:**
    After adding a new content-type, you must rebuild the Strapi admin panel for it to appear.
    ```bash
    cd backend
    npm run build
    cd ..
    ```

## Frontend Development Workflow

1.  **Create Components:** Build new React components in the `frontend/app/components` directory.
2.  **Fetch Data:** Use the API client in `frontend/lib/api.ts` to fetch data from the Strapi backend.
3.  **Write Tests:** All new components should have corresponding tests in a `__tests__` subdirectory. Run the tests using:
    ```bash
    cd frontend
    npm test
    cd ..
    ```
