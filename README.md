# Trackio

[Live demo](https://trackio.vercel.app/)

Built with:

- Next.js
- React
- Typescript
- Tailwind CSS
- shadcn/ui
- NextAuth.js
- React Query
- Prisma
- PostgreSQL

## Project Setup

### Environment variables

To run this project, you need to set up the following environment variables. Create a .env.local file in the root directory of the project with the following:

```bash
AUTH_GOOGLE_ID="***"
AUTH_GOOGLE_SECRET="***"
AUTH_SECRET="***"
CRON_SECRET="***"
DATABASE_URL="***"
DIRECT_URL="***"
EDGE_CONFIG="***"
IGDB_ID="***"
IGDB_SECRET="***"
TMDB_TOKEN="***"
VERCEL_TOKEN="***"
```

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```
