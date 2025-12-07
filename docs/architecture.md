# System Architecture

## Backend Architecture

The backend is a **Node.js** application using **Express** as the web server. It exposes a **GraphQL API** (`/graphql`) for all data interactions.

- **Database**: PostgreSQL (hosted on Supabase).
- **ORM/Querying**: Raw SQL queries constructed dynamically in `salesService.js`.
- **API Layer**: `express-graphql` with a defined schema (`schema.js`) and resolvers (`resolvers.js`).

## Frontend Architecture

The frontend is a **Next.js** application (App Router) served on port 3000.

- **Rendering**: Server Components for layout, Client Components for interactive elements (Search, Filter, Table).
- **Styling**: Tailwind CSS / CSS Modules (preserving the original vanilla CSS look).
- **State Management**: React `useState` and `useEffect` for handling filters, pagination, and data fetching.
- **API Interaction**: Fetches data from the backend GraphQL endpoint (`http://localhost:5000/graphql`).

## Data Flow

1.  **User Interaction**: User changes a filter or types in search on the Next.js frontend.
2.  **Request**: Frontend constructs a GraphQL query with variables and sends a POST request to the Backend.
3.  **Processing**: Backend resolver receives the request, calls `salesService.getSales`.
4.  **Database Query**: Service constructs a SQL query with `WHERE`, `ORDER BY`, an `LIMIT` clauses and executes it via `db.query`.
5.  **Response**: Database returns rows; Backend formats them (aggregates, total counts) and returns JSON to Frontend.
6.  **Update**: Frontend updates the UI (Table and Metrics) with the new data.

## Folder Structure

```
/
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── graphql/      # Schema and Resolvers
│   │   ├── routes/       # API routes (if any REST)
│   │   └── services/     # Business logic (SalesService)
│   ├── .env              # Backend secrets
│   └── package.json
│
├── frontend/             # Next.js Application
│   ├── app/              # App Router pages and layout
│   ├── components/       # Reusable UI components (Filters, Table)
│   ├── public/           # Static assets
│   ├── .env.local        # Frontend config (API URL)
│   └── package.json
│
└── docs/                 # Documentation
```

## Module Responsibilities

- **Backend**:

  - `index.js`: Entry point, CORS setup, GraphQL server mounting.
  - `salesService.js`: Core logic for SQL generation and searching.
  - `schema.js`: Defines the data types (Sale, Aggregates, FilterInput).
  - `db.js`: Manages PostgreSQL connection pool.

- **Frontend**:
  - `page.js`: Main dashboard controller.
  - `api.js`: Helper for GraphQL requests.
  - `SalesTable.js`: Displays the data grid.
  - `FilterPanel.js`: Manages all filter inputs.
  - `MetricsCards.js`: specific display for aggregated stats.
