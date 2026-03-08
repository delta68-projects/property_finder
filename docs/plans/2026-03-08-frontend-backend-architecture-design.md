# Frontend and Backend Architecture Design

**Goal:** Define a scalable, ticket-aligned architecture for project `10002dfe-082d-4d0f-811a-d5ab27dde47d` with a FastAPI + Pydantic + DDD backend and a Next.js + shadcn/ui frontend.

## 1) Recommended Approach

Use a **DDD modular monolith** for backend and a **domain-module Next.js frontend with shadcn/ui**.

- Single backend deployable for fast delivery and low operational overhead.
- Clear bounded contexts so each ticket area maps to an explicit module.
- Event-driven integration inside the monolith to avoid hard coupling.
- Frontend organized by business domains, not by technical layer only.

This satisfies current delivery speed while preserving future extraction paths into services.

## 2) Ticket-to-Domain Mapping

- `SIN-2 MVP Foundation` -> `platform`, `ingestion`
- `SIN-3 Deal Analysis Engine` -> `deal_analysis`
- `SIN-4 Financing Module` -> `financing`
- `SIN-5 Market Intelligence` -> `market_intelligence`
- `SIN-6 Property Management` -> `property_management`
- `SIN-7 Acquisition Workflow` -> `acquisition`
- `SIN-8 Deal Flow Automation` -> `deal_flow_automation`
- `SIN-9 Deal Sourcing` -> `deal_sourcing`
- `SIN-10 Legal and Tax` -> `legal_tax`
- `SIN-11 Renovation Planner` -> `renovation`
- `SIN-12 Portfolio Management Dashboard` -> `portfolio`
- `SIN-13 Cross-cutting Platform` -> `identity_access`, `audit`, `observability`

## 3) Backend Architecture (FastAPI + Pydantic + DDD)

### 3.1 Bounded Context Pattern

Each domain follows:

- `domain/`: entities, value objects, domain services, domain events, repository interfaces
- `application/`: use cases, command/query handlers, DTOs
- `infrastructure/`: ORM models, repository implementations, external adapters
- `interfaces/api/`: FastAPI routers, request/response schemas, dependency wiring

### 3.2 Global Layers

- `shared_kernel/`: common value objects, result/error types, domain event base classes
- `platform/`: authN/authZ, tenancy, audit, observability, idempotency, config
- `ingestion/`: listing providers, ETL orchestration, normalization and dedup

### 3.3 Backend Folder Structure

```text
backend/
  app/
    main.py
    bootstrap/
      container.py
      settings.py
      logging.py
      db.py
    shared_kernel/
      domain/
      application/
      infrastructure/
    platform/
      identity_access/
      audit/
      observability/
    contexts/
      acquisition/
        domain/
        application/
        infrastructure/
        interfaces/api/
      deal_analysis/
        domain/
        application/
        infrastructure/
        interfaces/api/
      financing/
      market_intelligence/
      property_management/
      deal_flow_automation/
      deal_sourcing/
      legal_tax/
      renovation/
      portfolio/
      ingestion/
    integration/
      events/
      jobs/
      webhooks/
  migrations/
  tests/
    unit/
    integration/
    contract/
    e2e/
```

### 3.4 API and Schema Conventions

- FastAPI routers per context, versioned under `/api/v1/<context>`.
- **Pydantic v2** for API contracts and internal DTO boundaries.
- Separate request/response schema models from domain entities.
- Command/Query split in application layer to keep use cases explicit.

### 3.5 Data and Consistency Strategy

- Primary relational DB (PostgreSQL) for transactional consistency.
- Outbox table for reliable domain-event publication.
- Read-optimized projections for dashboard and analytics endpoints.
- Optimistic locking on aggregate roots where concurrent edits are expected.

### 3.6 Security and Platform Cross-Cutting

- JWT/OAuth2 auth with role/permission checks at endpoint and use-case layers.
- Per-request correlation ID and audit trail for sensitive operations.
- Structured logs, metrics, and traces wired from `platform/observability`.

## 4) Frontend Architecture (Next.js + shadcn/ui)

### 4.1 Frontend Principles

- Next.js App Router as the frontend runtime foundation.
- Domain-first structure mirroring backend bounded contexts.
- Thin UI components + explicit data hooks.
- shadcn/ui as the primary component system, extended with domain-specific UI.
- Feature-driven routes with shared design tokens and primitives.

### 4.2 Frontend Folder Structure

```text
frontend/
  src/
    app/
      (dashboard)/
      acquisition/
      deal-analysis/
      financing/
      market-intelligence/
      property-management/
      deal-flow-automation/
      deal-sourcing/
      legal-tax/
      renovation/
      portfolio/
      api/
      layout.tsx
      page.tsx
      providers.tsx
    components/
      ui/                    # shadcn/ui generated components
      domain/
    domains/
      acquisition/
        components/
        api/
        hooks/
        types/
      deal-analysis/
      financing/
      market-intelligence/
      property-management/
      deal-flow-automation/
      deal-sourcing/
      legal-tax/
      renovation/
      portfolio/
    lib/
      api-client/
      auth/
      utils/
      validations/
    styles/
      globals.css
  public/
  tests/
    unit/
    integration/
    e2e/
```

### 4.3 Frontend Runtime Strategy

- Route-level code splitting via Next.js App Router segments.
- Typed API client generated or hand-maintained from OpenAPI.
- React Query-style server-state caching and invalidation by context.
- Role-aware route guards for platform permission model.

### 4.4 Frontend Scaffolding Rule

- Use terminal tooling for scaffolding (no manual file-by-file bootstrapping for the base app).
- Baseline creation commands:
  - `npx create-next-app@latest frontend --ts --eslint --app --src-dir --import-alias "@/*"`
  - `cd frontend && npx shadcn@latest init`
  - Add shadcn/ui components via CLI as needed (for example `npx shadcn@latest add button card input table`).

## 5) End-to-End Data Flow

1. User action triggers frontend domain hook.
2. Hook calls typed API client endpoint.
3. FastAPI router validates request via Pydantic schema.
4. Application use case loads aggregate(s), executes domain logic.
5. Repository persists state and appends outbox events.
6. Projection updater refreshes read models if needed.
7. API responds with response schema; frontend cache updates.

## 6) Scalability and Evolution Path

- Start as modular monolith with strict context boundaries.
- Enforce no direct cross-context DB access except via interfaces/events.
- Extract highest-load contexts first (likely `deal_analysis`, `deal_sourcing`, `portfolio`) to independent services when needed.
- Keep API contracts and event schemas stable to reduce migration risk.

## 7) Testing Strategy

- Unit tests for domain entities/value objects and use cases.
- Integration tests for repository implementations and DB behavior.
- API contract tests for each context router and schema.
- End-to-end tests for key workflows: sourcing -> analysis -> acquisition -> management -> portfolio.

## 8) Definition of Done for Architecture Alignment

- Every board ticket maps to exactly one primary bounded context.
- Every context has domain/application/infrastructure/api folders.
- Cross-cutting concerns implemented only in `platform` and shared modules.
- Public API schemas defined through Pydantic models.
- Observability, auth, and audit are enforced platform-wide.

## 9) Git Rule Acknowledgement

The rule "ALWAYS PULL MAIN FIRST" is enforced operationally before any creation/scaffolding work. In this workspace, `origin` is not configured yet, so pulling from remote `main` currently fails until a remote is added.
