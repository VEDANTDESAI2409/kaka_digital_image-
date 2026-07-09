# Database Documentation

> Database design for Kaka Digital Image ERP.

Database: PostgreSQL

ORM: Prisma

---

# Database Overview

The database is designed around the photography business workflow.

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

Supporting modules:

- Users
- Assignments
- QR Codes
- Guest Submissions
- Notifications

---

# Entity Relationship Diagram

```
User
 │
 ├──────────────┐
 │              │
 ▼              ▼
Media      EventAssignment

Client
 │
 ▼
Booking
 │
 ▼
Event
 │
 ├──────────────┐
 │              │
 ▼              ▼
Album         Media
 │              │
 ▼              │
Section─────────┘

Event
 │
 ├── QRCode
 ├── GuestSubmission
 └── Gallery
```

---

# User

Purpose

Stores all system users.

Roles

- ADMIN
- PHOTOGRAPHER
- EDITOR

Relationships

- Uploads Media
- Assigned to Events

---

# Client

Purpose

Stores customer information.

Fields

- Full Name
- Email
- Phone
- Address

Relationships

```
Client

↓

Bookings
```

---

# Booking

Purpose

Represents a photography booking.

Relationships

```
Booking

↓

Event
```

Contains

- Booking Number
- Status
- Advance Amount
- Total Amount

---

# Event

Purpose

Represents an actual photography event.

Examples

- Wedding
- Birthday
- Engagement
- Corporate

Relationships

```
Booking

↓

Event

↓

Albums

↓

Sections

↓

Media
```

Important Fields

- galleryToken
- status
- coverMedia

---

# Event Assignment

Purpose

Assign photographers and editors.

Relationships

```
User

↓

Assignment

↓

Event
```

Assignment Status

- ASSIGNED
- ACCEPTED
- REJECTED
- COMPLETED

---

# Album

Purpose

Groups photos inside an event.

Example

Wedding

↓

Highlights

↓

Bride

↓

Reception

Relationships

```
Event

↓

Album

↓

Sections
```

---

# Section

Purpose

Organizes photos inside albums.

Examples

Bride

Groom

Reception

Family

Couple Shoot

Relationships

```
Album

↓

Section

↓

Media
```

---

# Media

Purpose

Stores uploaded photographs.

Relationships

```
Event

↓

Album

↓

Section

↓

Media
```

Current Features

- Upload
- Update
- Delete
- Bulk Status
- Bulk Section

Status Workflow

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

Validation Rules

Album must belong to Event.

Section must belong to Album.

Gallery only displays APPROVED media.

---

# Gallery

Every Event has exactly one Gallery.

```
Event

↓

Gallery Token

↓

Client Gallery
```

Only APPROVED media are visible.

---

# QR Code

Purpose

Quick access to gallery.

Relationship

```
Event

↓

QRCode
```

Future

- Expiry
- Password
- Download Limit

---

# Guest Submission

Purpose

Allow guests to upload photos.

Relationship

```
Event

↓

Guest Submission
```

Future

- Moderation
- Auto Approval
- AI Duplicate Detection

---

# Notification

Future Module

Used for

- Email

- WhatsApp

- Push Notifications

---

# Soft Delete Strategy

Current

Event

Album

Section

↓

deletedAt

Media

↓

Hard Delete

Future

Media will move to soft delete with recycle bin.

---

# Indexes

Current indexes

Booking

- bookingNumber

Event

- bookingId
- eventType
- startDate
- status

Album

- eventId

Section

- albumId

Media

- eventId
- albumId
- sectionId
- status

---

# Data Integrity Rules

Booking must exist before Event.

Event must exist before Album.

Album must exist before Section.

Album must belong to Event.

Section must belong to Album.

Media must belong to Event.

Media must belong to Album.

Gallery only exposes APPROVED media.

---

# Future Database Modules

- Payments
- Invoice
- Expenses
- Vendors
- Equipment
- Employee Attendance
- Payroll
- Reports
- Analytics

---

# Database Principles

- UUID/CUID primary keys
- Foreign key constraints
- Cascade deletes where appropriate
- Business rule validation in services
- Indexed search fields
- Consistent naming conventions