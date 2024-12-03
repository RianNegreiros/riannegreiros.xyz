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
