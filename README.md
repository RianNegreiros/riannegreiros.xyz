# Riannegreiros.dev

This is the personal website and blog of Rian Negreiros, built with Next.js, TypeScript, and TailwindCSS. It serves as a platform to showcase projects, share blog posts, and provide a professional resume.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
  - [Running the Development Server](#running-the-development-server)
  - [Using Docker Compose](#using-docker-compose)
- [Acknowledgments](#acknowledgments)

## Project Overview

Riannegreiros.dev is a personal website that includes a blog, project portfolio, and resume. It is designed to be a central hub for Rian's professional presence online.

## Features

- Personal blog for sharing insights and experiences
- Project showcase with detailed descriptions and links
- Professional resume with contact information and skills
- Responsive design using TailwindCSS

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **TailwindCSS**: A utility-first CSS framework for rapid UI development
- **Sanity.io**: A headless CMS for managing content
- **Docker**: Containerization platform for deploying applications

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation and Setup

1. **Clone the repository:**

```bash
  git clone https://github.com/RianNegreiros/riannegreiros.dev.git
  cd riannegreiros.dev
```

2. **Install dependencies:**
   Using npm:

```bash
  npm install
```

Or using Yarn

```bash
  yarn install
```

3. **Rename the `.env.local.example` and add your environment variables**

```bash
   cp .env.local.example .env.local
```

### Running the Development Server

To start the development server, run:

Using npm:

```bash
  npm run dev
```

Or using Yarn:

```bash
  yarn dev
```

### Using Docker Compose

To run the application using Docker Compose, follow these steps:

1. **Build and start the containers:**

```bash
  docker-compose up --build
```

This command will build the Docker images and start the
containers as defined in your docker-compose.yml file.

2. **Access the application:** Open `http://localhost:3000` in your browser to see the application running in a Docker container.

## Acknowledgments

The resume page layout is based on [cv](https://github.com/BartoszJarocki/cv) by **Bartosz Jarocki**. Licensed under the MIT License.
