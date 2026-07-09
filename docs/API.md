# API Documentation

> REST API documentation for Kaka Digital Image ERP.

Base URL

```
http://localhost:3001/api
```

Swagger

```
http://localhost:3001/api/docs
```

Authentication

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Authentication

## Register Admin

POST

```
/auth/register
```

Authentication

```
Public
```

---

## Login

POST

```
/auth/login
```

Authentication

```
Public
```

Returns

- JWT Token
- User Information

---

## Current User

GET

```
/users/me
```

Authentication

```
Required
```

---

# Users

## List Users

GET

```
/users
```

Authentication

```
Admin
```

---

# Clients

## Create Client

POST

```
/clients
```

Authentication

```
Admin
```

---

## List Clients

GET

```
/clients
```

Authentication

```
Required
```

---

## Update Client

PATCH

```
/clients/{id}
```

Authentication

```
Admin
```

---

## Delete Client

DELETE

```
/clients/{id}
```

Authentication

```
Admin
```

---

# Bookings

## Create Booking

POST

```
/bookings
```

Authentication

```
Admin
```

---

## List Bookings

GET

```
/bookings
```

Authentication

```
Required
```

---

## Update Booking

PATCH

```
/bookings/{id}
```

Authentication

```
Admin
```

---

## Delete Booking

DELETE

```
/bookings/{id}
```

Authentication

```
Admin
```

---

# Events

## Create Event

POST

```
/events
```

Authentication

```
Admin
```

---

## List Events

GET

```
/events
```

Authentication

```
Required
```

---

## Update Event

PATCH

```
/events/{id}
```

Authentication

```
Admin
```

---

## Delete Event

DELETE

```
/events/{id}
```

Authentication

```
Admin
```

---

# Assignments

## Create Assignment

POST

```
/assignments
```

Authentication

```
Admin
```

---

## List Assignments

GET

```
/assignments
```

Authentication

```
Required
```

---

# Albums

## Create Album

POST

```
/albums
```

Authentication

```
Admin
```

---

## List Albums

GET

```
/albums
```

Authentication

```
Required
```

---

# Sections

## Create Section

POST

```
/sections
```

Authentication

```
Admin
```

---

## List Sections

GET

```
/sections
```

Authentication

```
Required
```

---

# Media

## Upload Media

POST

```
/media/upload
```

Authentication

```
Admin / Editor
```

Features

- Upload Image
- Event Validation
- Album Validation

---

## List Media

GET

```
/media
```

Authentication

```
Required
```

Supports

- Pagination
- Search
- Status Filter
- Event Filter
- Album Filter
- Section Filter

---

## Update Media

PATCH

```
/media/{id}
```

Authentication

```
Admin / Editor
```

---

## Delete Media

DELETE

```
/media/{id}
```

Authentication

```
Admin
```

---

## Bulk Status Update

PATCH

```
/media/bulk/status
```

Authentication

```
Admin / Editor
```

Purpose

Update status for multiple media items.

---

## Bulk Section Assignment

PATCH

```
/media/bulk/section
```

Authentication

```
Admin / Editor
```

Purpose

Move multiple photos into a section.

---

# Gallery

## Public Gallery

GET

```
/gallery/{galleryToken}
```

Authentication

```
Public
```

Returns

- Event Information
- Albums
- Sections
- Approved Media

Only APPROVED media are returned.

---

# Response Format

All APIs return a consistent response structure.

Success

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": []
}
```

---

# Authentication Matrix

| Endpoint | Authentication |
|------------|----------------|
| Login | Public |
| Register | Public |
| Gallery | Public |
| Users | JWT |
| Clients | JWT |
| Bookings | JWT |
| Events | JWT |
| Albums | JWT |
| Sections | JWT |
| Media | JWT |

---

# User Roles

## ADMIN

Permissions

- Full Access

---

## PHOTOGRAPHER

Permissions

- Upload Media
- View Assignments
- View Events

---

## EDITOR

Permissions

- View Media
- Update Media
- Organize Albums
- Organize Sections

---

# Business Rules

Album must belong to Event.

Section must belong to Album.

Gallery only returns APPROVED media.

Only authenticated users can access ERP APIs.

Gallery APIs are public.

---

# API Version

Current Version

```
v0.5
```

Future

```
v1
```

will introduce

- API Versioning
- Rate Limiting
- Public Gallery Version
- Mobile API
- Webhooks