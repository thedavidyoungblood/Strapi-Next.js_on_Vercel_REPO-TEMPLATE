<div align="center">
  <h1 align="center">Strapi-Next Decoupled Monorepo</h1>
  <p align="center">
    A robust, production-ready starter for building high-performance, decoupled web applications with Strapi and Next.js.
  </p>
</div>

<!-- BADGES -->
<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE/ci.yml?branch=main)
![GitHub issues](https://img.shields.io/github/issues/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE)
![GitHub forks](https://img.shields.io/github/forks/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE)
![GitHub stars](https://img.shields.io/github/stars/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE)
![MIT License](https://img.shields.io/github/license/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE)

</div>

---

### **Table of Contents**

1.  [**About The Project**](#about-the-project)
    *   [Built With](#built-with)
2.  [**Getting Started**](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
3.  [**Usage**](#usage)
4.  [**Roadmap**](#roadmap)
5.  [**Contributing**](#contributing)
6.  [**License**](#license)
7.  [**Contact**](#contact)
8.  [**Acknowledgments**](#acknowledgments)

---

## About The Project

This project is a high-performance, decoupled web application built on a modern, production-ready stack. It features a Strapi backend for powerful and flexible content management, and a Next.js frontend for a fast, scalable, and rich user experience.

The primary goal of this repository is to provide a robust, production-ready foundation for "headless" or "decoupled" applications. It is architected to support a hyper-modular, test-driven, and perpetually-extensible development workflow, making it an ideal starting point for a variety of use-cases, including:
*   Marketing websites
*   Blogs or publication platforms
*   E-commerce sites
*   Portfolios

### Built With

This project is built on the latest stable releases of its core technologies:

*   **Backend:**
    *   [Strapi v5](https://strapi.io/)
    *   [PostgreSQL](https://www.postgresql.org/)
*   **Frontend:**
    *   [Next.js 15](https://nextjs.org/)
    *   [React 19](https://react.dev/)
    *   [Tailwind CSS v4](https://tailwindcss.com/)
*   **Tooling:**
    *   [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [GitHub Actions](https://github.com/features/actions)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.0.0 or higher)
*   npm
*   A running PostgreSQL instance

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE.git
    cd Strapi-Next.js_on_Vercel_REPO-TEMPLATE
    ```

2.  **Install Dependencies:**
    This project is a monorepo. You need to install dependencies for the root, the frontend, and the backend.
    ```bash
    # Install root dependencies
    npm install

    # Install frontend dependencies
    cd frontend && npm install && cd ..

    # Install backend dependencies
    cd backend && npm install && cd ..
    ```

3.  **Configure Environment Variables:**
    Copy the `.env.example` files to `.env` in both the `frontend` and `backend` directories and customize them with your database credentials and other settings.

---

## Usage

To run both the frontend and backend development servers concurrently, use the `dev` script from the root directory:

```bash
npm run dev
```

*   The **Next.js frontend** will be available at `http://localhost:3000`
*   The **Strapi backend** will be available at `http://localhost:1337`
*   The **Strapi Admin Panel** can be accessed at `http://localhost:1337/admin`

For more detailed information, please refer to the [In-Depth Documentation](./docs).

---

## Roadmap

*   [ ] Implement a PowerShell/Node.js script to automate the Strapi template generation.
*   [ ] Add comprehensive end-to-end tests with Cypress or Playwright.
*   [ ] Enhance the frontend with a more polished UI/UX.
*   [ ] Add storybook for component development.

See the [open issues](https://github.com/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE/issues) for a full list of proposed features (and known issues).

---

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see our [**Contributing Guide**](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

David Youngblood - [@TheDavidYB](https://x.com/TheDavidYB) - [LinkedIn](https://www.linkedin.com/in/thedavidyoungblood/)

Project Link: [https://github.com/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE](https://github.com/thedavidyoungblood/Strapi-Next.js_on_Vercel_REPO-TEMPLATE)

---

## Acknowledgments

This project was architected, engineered, and developed by **David Youngblood** of **LouminAI Labs, LLC**.

> **LouminAI Labs, LLC**
>
> "Applied R&D for Human Enablement through AI Alignment."
>
> [louminai.com](https://louminai.com)

<div align="center">
  <a href="https://buymeacoffee.com/thedavidyoungblood">
    <img src="https://imgs.search.brave.com/0uv-ga8xZ_Xpf98WEOVjt4jr_05-nt0X-P2hEeiS_Kw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jYW1v/LmdpdGh1YnVzZXJj/b250ZW50LmNvbS83/YjhmNzM0M2JmYzZl/M2M2NWM3OTAxODQ2/NjM3YjYwM2ZkODEy/ZjFhNWY3NjhkOGIw/NTcyNTU4YmRlODU5/ZWI5LzY4NzQ3NDcw/NzMzYTJmMmY2MzY0/NmUyZTYyNzU3OTZk/NjU2MTYzNmY2NjY2/NjU2NTJlNjM2ZjZk/MmY2Mjc1NzQ3NDZm/NmU3MzJmNzYzMjJm/NjQ2NTY2NjE3NTZj/NzQyZDc5NjU2YzZj/NmY3NzJlNzA2ZTY3.jpeg" 
         alt="Buy-Me-A-Coffee-Icon" 
         width="200" />
  </a>
  <br />
  <a href="https://buymeacoffee.com/thedavidyoungblood" 
     style="color: #0066cc; text-decoration: underline; font-size: 14px; margin-top: 8px; display: inline-block;">
    You're invited to 'Buy Me A Coffee'...
  </a>
</div>
