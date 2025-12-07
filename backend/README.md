# Trustate Assignment - Backend

This is the backend API for the Retail Sales Management System, built with **Node.js**, **Express**, and **GraphQL**.

## Deployment

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database (connection string required)

### Configuration

Create a `.env` file in the root directory:

```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
PORT=5000
```

### Installation

```bash
npm install
```

### Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

The GraphQL endpoint will be at `http://localhost:5000/graphql`.

## Architecture

For a detailed overview of the system architecture, please refer to [docs/architecture.md](../docs/architecture.md).
