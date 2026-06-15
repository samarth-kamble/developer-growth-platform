# Database

Shared Prisma package for the AI Developer Growth Platform.

## Responsibility

This package owns the PostgreSQL schema and exports a single Prisma client for backend services.

The current schema contains the Better Auth core tables:

- `user`
- `session`
- `account`
- `verification`

Application-specific tables such as resumes, coding stats, roadmaps, and analytics should be added later only when those services are built.

## Local Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Generate the Prisma client:

```bash
pnpm db:generate
```

Create and apply the first migration:

```bash
pnpm db:migrate
```

Open Prisma Studio:

```bash
pnpm db:studio
```
