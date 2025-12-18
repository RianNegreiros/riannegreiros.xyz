# riannegreiros.com.br

This is the personal website and blog of Rian Negreiros, built with Vite, React, TypeScript, and TailwindCSS. It serves as a platform to showcase projects, share blog posts, and provide a professional resume.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
  - [Running the Development Server](#running-the-development-server)
- [Acknowledgments](#acknowledgments)

## Project Overview

`riannegreiros.com.br` is a personal website that includes a blog, project portfolio, and resume. It is designed to be a central hub for Rian's professional presence online.

## Features

- Timeline: [Home Page](https://www.riannegreiros.com.br) - Unify posts and projects in a timeline.
- Personal Blog: [Blog Page](https://www.riannegreiros.com.br/blog) - Share insights and experiences through blog posts.
- Project Showcase: [Projects Page](https://www.riannegreiros.com.br/projects) - Display various projects with detailed descriptions and links.
- Professional Resume: [Resume Page](https://www.riannegreiros.com.br/resume) - Provide a professional resume with contact information and skills
- RSS Feed: [RSS Feed](https://www.riannegreiros.com.br/api/rss) - Allow users to subscribe to updates from the blog.

## Technologies Used

- **Vite**: React build tool
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **TailwindCSS**: A utility-first CSS framework for rapid UI development
- **Sanity.io**: A headless CMS for managing content

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [pnpm](https://pnpm.io/)

### Installation and Setup

1. **Clone the repository:**

```bash
  git clone https://github.com/RianNegreiros/riannegreiros.com.br.git
  cd riannegreiros.com.br
```

1. **Install dependencies:**
   Using npm:

```bash
  pnpm install
```

1. **Set up environment variables**

```bash
   cp .env.local.example .env.local
```

Then edit `.env.local` and add your Sanity project ID and base URL:

- `VITE_SANITY_PROJECT_ID`: Your Sanity project ID
- `VITE_BASE_URL`: Your site's base URL (e.g., <http://localhost:5173> for development)

### Running the Development Server

To start the development server, run:

Using npm:

```bash
  pnpm run dev
```

## Acknowledgments

The resume page layout is based on [cv](https://github.com/BartoszJarocki/cv) by **Bartosz Jarocki**. Licensed under the MIT License.
