# Changelog

All notable changes to Kaka Digital Image ERP will be documented in this file.

The format is inspired by Keep a Changelog.

Versioning follows Semantic Versioning.

---

# [Unreleased]

## Planned

### Gallery

- Gallery Response DTO
- Favorites
- Client Selection
- Gallery Downloads
- Watermark Support
- QR Gallery
- Gallery Analytics

### Dashboard

- Admin Dashboard
- Photographer Dashboard
- Editor Dashboard

### Reports

- Monthly Reports
- Revenue Reports
- Event Statistics

---

# [v0.5.0] - 2026-07-10

## Added

### Gallery Module

- Gallery module created
- Public Gallery API
- Gallery Token support
- Gallery Service
- Gallery Controller

### Event

- Added galleryToken
- Public gallery access

### Documentation

- Architecture documentation
- Roadmap documentation
- Database documentation
- API documentation
- Business workflow documentation

## Changed

- Gallery architecture changed to:
  - One Event = One Gallery

---

# [v0.4.0] - 2026-07-09

## Added

### Media Module

- Media upload
- Media listing
- Search
- Pagination
- Filters
- Update media
- Delete media

### Bulk Operations

- Bulk Status Update
- Bulk Section Assignment

### Validation

- Event → Album validation
- Album → Section validation
- Media Validation Service

### Media Status Workflow

```
UPLOADED

↓

EDITING

↓

REVIEW

↓

APPROVED

↓

DELIVERED
```

---

# [v0.3.0] - 2026-07-08

## Added

### Albums

- Create Album
- List Albums

### Sections

- Create Section
- List Sections

### Assignments

- Photographer Assignment
- Editor Assignment

### Event Improvements

- Event Cover Image
- Album Cover Image

---

# [v0.2.0] - 2026-07-07

## Added

### Authentication

- Admin Registration
- Login
- JWT Authentication
- Role Based Authorization

### Users

- Current User API
- Admin User APIs

### Clients

- CRUD APIs

### Bookings

- CRUD APIs

### Events

- CRUD APIs

---

# [v0.1.0] - 2026-07-06

## Initial Release

### Project Setup

- Turborepo
- NestJS API
- Next.js Web
- PostgreSQL
- Prisma ORM
- Swagger
- pnpm Workspace

---

# Upcoming Releases

## v0.6.0

Client Gallery

- Favorites
- Client Selection
- Gallery Response DTO

---

## v0.7.0

Delivery

- Downloads
- Watermarks
- QR Gallery

---

## v0.8.0

Dashboard

- Reports
- Analytics
- Statistics

---

## v0.9.0

AI Features

- Face Recognition
- Smart Search
- Duplicate Detection

---

## v1.0.0

Production Release

### Features

- Complete ERP
- Client Portal
- Dashboard
- Reports
- Payments
- AI
- Mobile Support
- Cloud Storage

---

# Semantic Versioning

Major

```
1.0.0
```

Breaking changes

---

Minor

```
0.5.0
```

New features

---

Patch

```
0.5.1
```

Bug fixes

---

# Release Checklist

Before every release:

- Database migration completed
- API tested
- Swagger updated
- Documentation updated
- Version bumped
- Git tag created
- Release notes written

---

# Git Tags

Example:

```
git tag v0.5.0
git push origin v0.5.0
```

---

# Contributors

Project Owner

Vedant Desai

Project

Kaka Digital Image ERP

Technology

- NestJS
- Prisma
- PostgreSQL
- Next.js
- TypeScript