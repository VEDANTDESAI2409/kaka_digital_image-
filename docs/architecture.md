# Kaka Digital Image

## Version

v1.0 Architecture

---

# Vision

Kaka Digital Image is a complete Photography Studio Management Platform.

The platform manages the entire lifecycle of a photography project:

Client
→ Booking
→ Multiple Events
→ Staff Assignment
→ Media Upload
→ Editing Workflow
→ Client Gallery
→ Album Selection
→ Final Delivery

---

# Technology Stack

Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend
- NestJS
- REST API

Database
- PostgreSQL
- Prisma ORM

Storage
- Amazon S3

Authentication
- JWT

Future
- AI Face Recognition
- Mobile Application

---

# Project Structure

Kaka-Digital-Image/

apps/

    web/

    api/

packages/

    ui/

    config/

    types/

docs/

assets/

---

# User Types

Admin

Photographer

Editor

Client (No login in Version 1)

---

# Booking Flow

Client

↓

Booking

↓

Quotation

↓

Advance Payment

↓

Booking Confirmed

↓

Multiple Events Created

↓

Assign Staff

↓

Media Upload

↓

Editing

↓

Review

↓

Gallery Delivery

↓

Album Selection

↓

Final Delivery

---

# Event Structure

Booking

↓

Events

↓

Haldi

↓

Mehendi

↓

Wedding

↓

Reception

Each event has:

- Albums
- Media
- Guest Upload
- QR Gallery
- QR Upload
- Assigned Staff

---

# Gallery Structure

Booking

↓

Event

↓

Albums

↓

Media

Media Types

PHOTO

VIDEO

HIGHLIGHT_FILM

FULL_MOVIE

ALBUM_PDF

PRINT_FILE

---

# QR System

Each event owns two QR Codes.

Gallery QR

Guests can:

- View Media

- Download Media

- Favorite Media

Upload QR

Guests can:

- Upload Photos

- Upload Videos

---

# Editing Workflow

Uploaded

↓

Editing

↓

Review

↓

Approved

↓

Delivered

---

# Staff Assignment

Every event is assigned to individual users.

Examples:

Lead Photographer

Photographer

Cinematographer

Drone Operator

Editor

Assistant

---

# Database Principles

Use cuid() IDs

Soft Deletes

Audit Logs

Enums instead of strings

Indexes on searchable columns

Never store files inside PostgreSQL

Store only metadata

---

# Storage

All media files are stored in Amazon S3.

Database stores only:

Storage Key

Thumbnail

Preview

Metadata

---

# Future Features

Face Recognition

Favorite Photos

Client Album Selection

Print Orders

Invoices

WhatsApp Notifications

Mobile App

AI Search

Studio Analytics

---

# Development Rules

Never edit migrations manually.

Always use Prisma Migrate.

Never store passwords.

Always store password hashes.

Use REST APIs.

Keep business logic inside services.

Controllers should stay thin.

Never expose internal IDs unnecessarily.

Every new feature must be reviewed before implementation.

---

# Long-Term Goal

Build a modern Photography Studio Operating System that can eventually be used by other studios in the future.