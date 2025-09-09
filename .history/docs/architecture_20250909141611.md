# Architecture Overview

This document provides a detailed overview of the decoupled architecture used in this project.

## Core Philosophy

The project is built on a **decoupled (or "headless") architecture**. This means that the frontend (the "head") is a separate application from the backend (the "body"). They communicate with each other via APIs.

This approach provides several key advantages:

*   **Flexibility:** Frontend and backend development can happen independently. The frontend can be rebuilt or even replaced with a different technology (e.g., a mobile app) without affecting the backend.
*   **Scalability:** The frontend and backend can be scaled independently based on their specific resource needs.
*   **Performance:** The frontend can be optimized for fast rendering and user experience using modern frameworks like Next.js, while the backend can focus purely on content management and data delivery.

## System Components

### 1. Backend (`/backend`)

*   **Framework:** [Strapi v5](https://strapi.io/)
*   **Database:** PostgreSQL
*   **Role:** Serves as the single source of truth for all content.
*   **Key Responsibilities:**
    *   Providing a user-friendly Admin Panel for content creators to manage all data.
    *   Exposing a secure and flexible REST API for the frontend to consume.
    *   Managing data models (Content-Types), roles, and permissions.
    *   Handling business logic and data validation.

### 2. Frontend (`/frontend`)

*   **Framework:** [Next.js 15](https://nextjs.org/) with React 19
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Role:** Serves as the presentation layer for the user.
*   **Key Responsibilities:**
    *   Rendering the user interface.
    *   Fetching data from the Strapi API during the build process (for static pages) or on the server/client (for dynamic pages).
    *   Managing all user interactions and client-side state.
    *   Optimizing for performance, SEO, and accessibility.

## Data Flow

1.  **Content Creation:** A content editor uses the Strapi Admin Panel to create and manage content (e.g., writing a new article).
2.  **API Exposure:** Strapi automatically makes this new content available through its REST API endpoints (e.g., `/api/articles`).
3.  **Data Fetching:** The Next.js frontend makes a request to the appropriate Strapi API endpoint to get the content. This can happen at build time, on the server per-request, or on the client.
4.  **Rendering:** The Next.js frontend takes the API data and renders it into HTML using its React components.
5.  **User Interaction:** The final HTML is sent to the user's browser, where it becomes a fully interactive web page.

## Internal Tooling

*   **Strapi Templates (`/__.templates__/strapi`):** To ensure a consistent and reliable way of creating new backend components, we use a set of custom templates instead of the Strapi CLI. See the [template README](./../__.templates__/strapi/README.md) for more details.
*   **CI/CD (`/.github/workflows/ci.yml`):** An automated GitHub Actions workflow ensures that all code is tested, linted, and built on every push and pull request, maintaining code quality and stability.
