<div align="center">
  <h1>MegaBlog - Modern React Blogging Platform</h1>
  <p>A high-performance, full-stack blogging platform built with React, Vite, and Supabase, featuring rich-text editing, state management, and secure role-based database rules.</p>
</div>

<br />

## Intent & Project Overview

The **MegaBlog** project was developed to create a modern, production-grade article publishing platform. The primary intent is to provide a clean, secure, and blazingly fast interface for readers to view blogs and for authors to write and manage their content.

Instead of relying on a traditional Node.js/Express backend setup or older class-based React logic, MegaBlog introduces an entirely modern functional architecture paired with an integrated **Backend as a Service (BaaS)** via Supabase. It leverages advanced React hooks, global state management, and strict Row-Level Security (RLS) policies to ensure data integrity and a seamless user experience.

## Use Cases

This project is tailored for different user interactions:

* **Authors & Writers**: Can securely authenticate, create new articles using a powerful rich-text editor (TinyMCE), upload featured images to cloud storage, and edit or delete their own content.
* **Public Readers**: Have read-only access to view published articles on the platform, rendered dynamically from the database.
* **Administrators**: Have structural control over Postgres database policies, bucket storage rules, and authentication management via the Supabase Dashboard.

## Core Features

* **Advanced Authentication & Global State**: Secure user sessions managed by Supabase Auth and synced globally across the frontend using Redux Toolkit. Components dynamically react to login state changes without prop-drilling.
* **Protected Routing**: Seamless integration with React Router DOM and an `AuthLayout` wrapper layer. Automatically hides or exposes navigation routes based on the explicit authorization level and forces redirects for unauthenticated users trying to access protected paths.
* **Robust Form Validation**: Replacing slow native state forms with `react-hook-form`. Forms register inputs seamlessly, preventing full-page re-renders, and use callback mechanisms for features like auto-generating URL slugs on the fly.
* **Rich Text Editing**: Total native integration with `tinymce-react`. Authors can format text, embed links, and construct complex HTML blogs. The frontend safely renders this data via `html-react-parser`.
* **Backend as a Service (BaaS)**: Bypasses traditional server constraints by directly connecting the frontend to a PostgreSQL database and Storage buckets via Supabase.
* **Security & Row-Level Security (RLS)**: Total data lock-down. The backend enforces strict SQL rules dictating that anonymous users can only `SELECT` (read) active posts, while authenticated users are uniquely granted `INSERT`, `UPDATE`, and `DELETE` privileges for their own records.

## Tech Stack

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## File Structure

The workspace is heavily decoupled and component-driven:

```text
MegaBlog/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI elements (Header, Footer, Inputs, Cards)
│   │   ├── post-form/      # Complex modular form handling logic
│   │   ├── AuthLayout.jsx  # Wrapper for enforcing protected routes
│   │   └── RTE.jsx         # TinyMCE Rich Text Editor integration
│   ├── conf/               # Environment variable bindings and configuration
│   ├── pages/              # Core views (Home, AllPosts, AddPost, Login)
│   ├── store/              # Global Redux state (store.js, authSlice.js)
│   ├── supabase/           # BaaS service classes mapping to cloud APIs
│   │   ├── auth.js         # User authentication, signup, and login methods
│   │   └── config.js       # Database CRUD and Storage bucket operations
│   ├── App.jsx             # Root layout orchestrating providers and Outlets
│   └── main.jsx            # React DOM initialization & Router configuration
├── .env                    # Secret environment variables (Supabase Keys)
├── tailwind.config.js      # Tailwind utility constraints
├── vite.config.js          # Vite build configurations
└── package.json
```

## Local Setup & Installation

To run this project locally, ensure you have **Node.js** installed.

### 1. Install Dependencies

Open a terminal, navigate to the `MegaBlog` directory, and run the installation command. `npm install` will automatically gather all core dependencies listed in `package.json`, which specifically include:

*   **State & Routing**: `@reduxjs/toolkit`, `react-redux`, and `react-router-dom`
*   **Backend Client**: `@supabase/supabase-js`
*   **Styling**: `tailwindcss` and `@tailwindcss/vite`
*   **Form Management**: `react-hook-form`
*   **Rich Text Content**: `@tinymce/tinymce-react` and `html-react-parser`

```bash
npm install
```

### 2. Configure the Environment

Create a `.env` file in the root of the `MegaBlog` directory and populate it with your Supabase and TinyMCE API keys:

```bash
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
VITE_TINYMCE_API_KEY="your-tinymce-api-key"
```

### 3. Start the Frontend client

Once dependencies are installed and the environment is configured, start the development server:

```bash
npm run dev
```

The frontend will compile and automatically expose a local Vite server, typically at `http://localhost:5174`.

## Security & Database Initialization

Once the project is loaded, you must ensure your Supabase database is initialized properly:

1. **Storage Bucket**: Create a public bucket named `blog-uploads`. Configure the RLS policies to allow public reads, but authenticated inserts/deletes.
2. **Posts Table**: Create a `posts` table containing columns like `title`, `slug` (Primary Key), `content`, `featured_image`, `status`, and `user_id`. Ensure RLS dictates that only logged-in writers can create posts, while anyone can read them.
3. **Email Confirmation**: In the Supabase Dashboard Authentication settings, disable "Confirm email" for frictionless local testing and prototyping.
