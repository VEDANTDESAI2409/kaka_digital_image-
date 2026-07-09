# Kaka Digital Image ERP

> Enterprise Resource Planning (ERP) system for professional photography studios.

---

# Overview

Kaka Digital Image ERP is a complete photography business management platform built to manage the entire lifecycle of a photography project—from client booking to final photo delivery.

The system is designed around real-world photography workflows and is divided into two major parts:

- Internal ERP (Admin, Photographer, Editor)
- Client Gallery (Public)

---

# Goals

The primary goals of this project are:

- Manage clients and bookings
- Manage photography events
- Assign photographers and editors
- Organize thousands of photos efficiently
- Allow clients to view and select photos
- Deliver final edited galleries
- Scale to support multiple photographers and events

---

# Tech Stack

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Passport JWT
- Swagger

## Frontend

- Next.js
- React
- Tailwind CSS
- TypeScript

## Package Manager

- pnpm

## Monorepo

- Turborepo

---

# Project Structure

```
kaka-digital-image/

apps/
    api/
    web/

packages/
    shared/
    ui/

docs/

package.json
pnpm-workspace.yaml
turbo.json
```

---

# Backend Architecture

```
Controller
      │
      ▼
Service
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

Every module follows the same architecture:

```
Module

Controller

Service

DTO

Validation

Prisma
```

---

# Authentication

Authentication uses JWT.

Workflow:

```
Register

↓

Hash Password (bcrypt)

↓

Store User

↓

Login

↓

Generate JWT

↓

Bearer Token

↓

Protected API
```

Authorization uses:

- JwtAuthGuard
- RolesGuard

Roles:

- ADMIN
- PHOTOGRAPHER
- EDITOR

---

# Module Architecture

Current modules:

```
Auth

Users

Clients

Bookings

Events

Assignments

Albums

Sections

Media

Gallery
```

Future modules:

```
Dashboard

Notifications

Reports

Payments

AI

Settings
```

---

# Business Hierarchy

```
Client

↓

Booking

↓

Event

↓

Album

↓

Section

↓

Media
```

Relationships:

```
Client
    │
    ▼

Booking
    │
    ▼

Event
    │
    ├── Albums
    │
    ├── Assignments
    │
    ├── QR Codes
    │
    └── Media
```

---

# Media Architecture

```
Upload

↓

Media

↓

Album

↓

Section

↓

Status

↓

Gallery
```

Media Status:

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

Bulk Operations:

- Bulk Status Update
- Bulk Section Assignment

---

# Gallery Architecture

One Event = One Gallery

```
Event

↓

Gallery

↓

Albums

↓

Sections

↓

Approved Photos
```

Every event has:

```
galleryToken
```

Example:

```
https://gallery.kakadigitalimage.com/gallery/{galleryToken}
```

Only APPROVED photos are visible to clients.

---

# Folder Structure (API)

```
src/

auth/

users/

clients/

bookings/

events/

assignments/

albums/

sections/

media/

gallery/

common/

prisma/
```

Every module contains:

```
controller

service

module

dto
```

---

# API Design Principles

Internal APIs

- Authentication required
- Admin/Editor roles
- Full CRUD
- Bulk Operations

Public APIs

- Token based
- Read only
- No authentication required
- Limited response

---

# Validation Strategy

Business rules are validated in the Service layer.

Examples:

Album must belong to Event.

Section must belong to Album.

Only APPROVED media is visible in Gallery.

Future validation services may be extracted for shared business rules.

---

# Error Handling

Global Exception Filter

Global Validation Pipe

Response Interceptor

Consistent API responses across the project.

---

# Documentation

Project documentation lives inside:

```
docs/
```

Including:

- Architecture
- Database
- API
- Business Workflow
- Roadmap
- Changelog

---

# Future Architecture

```
Dashboard

↓

Analytics

↓

Reports

↓

Notifications

↓

Payments

↓

AI Face Recognition

↓

Mobile App

↓

Cloud Storage
```

---

# Development Principles

- Feature-first architecture
- Modular design
- Reusable services
- Business rule validation
- Consistent naming
- RESTful APIs
- Production-ready code
- Documentation-first development

---

# Current Status

Authentication

✅ Complete

Business Modules

✅ Complete

Media Management

✅ Complete

Gallery

🚧 In Progress

Client Selection

⏳ Planned

Delivery

⏳ Planned

AI Features

⏳ Planned