# CiviAgora Backend API Specification

This document provides complete API specifications for backend developers to implement the CiviAgora platform backend.

## 📋 Table of Contents

- [Overview](#overview)
- [Base URL & Authentication](#base-url--authentication)
- [Common Response Format](#common-response-format)
- [Authentication Endpoints](#authentication-endpoints)
- [User Endpoints](#user-endpoints)
- [Theme Endpoints](#theme-endpoints)
- [Consultation Endpoints](#consultation-endpoints)
- [Petition Endpoints](#petition-endpoints)
- [Vote Endpoints](#vote-endpoints)
- [Assembly Endpoints](#assembly-endpoints)
- [Conference Endpoints](#conference-endpoints)
- [Dashboard Endpoints](#dashboard-endpoints)
- [Search Endpoints](#search-endpoints)
- [Error Handling](#error-handling)
- [Database Schema](#database-schema)

---

## Overview

The CiviAgora API is a RESTful API that supports a multilingual (FR/DE/EN) participatory democracy platform.

### Technology Stack Recommendations

- **Backend Framework**: NestJS, Express, or FastAPI
- **Database**: PostgreSQL (recommended) or MongoDB
- **ORM**: TypeORM, Prisma, or Sequelize
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3, MinIO, or local storage
- **Email**: SendGrid, AWS SES, or SMTP

### Key Features

- 🌍 **Multilingual**: All content in French, German, and English
- 🔐 **Authentication**: JWT-based with refresh tokens
- 📄 **Pagination**: Standardized pagination for list endpoints
- 🔍 **Filtering**: Query parameters for filtering results
- 📊 **Statistics**: Real-time participation metrics
- 🗳️ **Democratic Processes**: Consultations, Petitions, Votes, Assemblies

---

## Base URL & Authentication

### Base URL
```
Production: https://api.civiagora.fr/v1
Staging: https://api.staging.civiagora.fr/v1
Development: http://localhost:3000/v1
```

### Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <access_token>
```

#### Token Structure
```json
{
  "userId": "usr_001",
  "email": "user@example.com",
  "role": "citizen",
  "iat": 1704718800,
  "exp": 1704722400
}
```

---

## Common Response Format

All API responses follow this standard format:

### Success Response
```typescript
{
  "data": T,                    // Response data (type varies)
  "meta"?: {                    // Optional pagination metadata
    "currentPage": number,
    "totalPages": number,
    "totalItems": number,
    "itemsPerPage": number,
    "hasNextPage": boolean,
    "hasPreviousPage": boolean
  },
  "timestamp": string,          // ISO 8601 timestamp
  "success": true
}
```

### Error Response
```typescript
{
  "statusCode": number,         // HTTP status code
  "message": string,            // Error message
  "error": string,              // Error type
  "timestamp": string,          // ISO 8601 timestamp
  "path"?: string               // Request path
}
```

---

## Authentication Endpoints

### POST /auth/login

Login user and return JWT tokens.

**Request Body:**
```typescript
{
  "email": string,              // Valid email
  "password": string,           // Min 8 characters
  "rememberMe"?: boolean        // Optional, default false
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "user": UserDTO,
    "tokens": {
      "accessToken": string,
      "refreshToken": string,
      "expiresIn": number,      // Seconds
      "tokenType": "Bearer"
    }
  },
  "timestamp": string,
  "success": true
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Validation errors

---

### POST /auth/register

Register new user account.

**Request Body:**
```typescript
{
  "email": string,
  "password": string,           // Min 8 chars, 1 uppercase, 1 number
  "firstName": string,
  "lastName": string,
  "acceptTerms": boolean,       // Must be true
  "language"?: "fr" | "de" | "en"
}
```

**Response: 201 Created**
```typescript
{
  "data": {
    "user": UserDTO,
    "tokens": AuthTokenDTO
  },
  "timestamp": string,
  "success": true
}
```

**Errors:**
- `409 Conflict` - Email already exists
- `400 Bad Request` - Validation errors

---

### POST /auth/forgot-password

Request password reset email.

**Request Body:**
```typescript
{
  "email": string
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "message": "Password reset email sent"
  },
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Generate unique reset token (valid 24 hours)
- Send email with reset link
- Return success even if email doesn't exist (security)

---

### POST /auth/reset-password

Reset password using token.

**Request Body:**
```typescript
{
  "token": string,
  "newPassword": string
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "message": "Password reset successfully"
  },
  "timestamp": string,
  "success": true
}
```

---

### POST /auth/refresh

Refresh access token using refresh token.

**Request Body:**
```typescript
{
  "refreshToken": string
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "accessToken": string,
    "expiresIn": number
  },
  "timestamp": string,
  "success": true
}
```

---

### POST /auth/logout

Logout user and invalidate refresh token.

**Headers:** `Authorization: Bearer <token>`

**Response: 200 OK**
```typescript
{
  "data": {
    "message": "Logged out successfully"
  },
  "timestamp": string,
  "success": true
}
```

---

## User Endpoints

### GET /users/me

Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response: 200 OK**
```typescript
{
  "data": UserDTO,
  "timestamp": string,
  "success": true
}
```

---

### PATCH /users/me

Update current user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (Partial update)
```typescript
{
  "firstName"?: string,
  "lastName"?: string,
  "phoneNumber"?: string,
  "address"?: AddressDTO,
  "preferences"?: Partial<UserPreferencesDTO>
}
```

**Response: 200 OK**
```typescript
{
  "data": UserDTO,
  "timestamp": string,
  "success": true
}
```

---

### GET /users/me/history

Get user participation history.

**Headers:** `Authorization: Bearer <token>`

**Response: 200 OK**
```typescript
{
  "data": ParticipationHistoryDTO,
  "timestamp": string,
  "success": true
}
```

---

### GET /users/me/notifications

Get user notifications.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `unreadOnly` (boolean, optional) - Filter unread notifications
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)

**Response: 200 OK**
```typescript
{
  "data": NotificationDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

---

### PATCH /users/me/notifications/:id/read

Mark notification as read.

**Headers:** `Authorization: Bearer <token>`

**Response: 200 OK**
```typescript
{
  "data": NotificationDTO,
  "timestamp": string,
  "success": true
}
```

---

### GET /users/me/activities

Get user activities.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `type` (ActivityType[], optional) - Filter by activity type

**Response: 200 OK**
```typescript
{
  "data": ActivityDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

---

## Theme Endpoints

### GET /themes

Get all themes.

**Response: 200 OK**
```typescript
{
  "data": ThemeDTO[],
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Return active themes sorted by displayOrder
- Include statistics (consultations, petitions, votes counts)

---

### GET /themes/:id

Get theme by ID.

**Response: 200 OK**
```typescript
{
  "data": ThemeDTO,
  "timestamp": string,
  "success": true
}
```

**Errors:**
- `404 Not Found` - Theme not found

---

## Consultation Endpoints

### GET /consultations

Get all consultations.

**Query Parameters:**
- `status` (string, optional) - Filter by status
- `themeId` (string, optional) - Filter by theme
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `sort` (string, default: '-createdAt') - Sort field

**Response: 200 OK**
```typescript
{
  "data": ConsultationDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

---

### GET /consultations/:idOrSlug

Get consultation by ID or slug.

**Response: 200 OK**
```typescript
{
  "data": ConsultationDTO,
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Accept both ID and slug as parameter
- Populate related data (theme, author, organizer)
- Include documents and images

**Errors:**
- `404 Not Found` - Consultation not found

---

### POST /consultations/:id/register

Register for a consultation.

**Headers:** `Authorization: Bearer <token>`

**Response: 200 OK**
```typescript
{
  "data": {
    "message": "Successfully registered",
    "registrationId": string
  },
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Check capacity limits
- Prevent duplicate registrations
- Send confirmation email
- Update participant count

---

### GET /consultations/:id/comments

Get consultation comments.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 50)
- `sort` (string, default: '-createdAt')

**Response: 200 OK**
```typescript
{
  "data": ConsultationCommentDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

---

### POST /consultations/:id/comments

Post a comment on consultation.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```typescript
{
  "content": string,            // Max 2000 characters
  "parentId"?: string           // For replies
}
```

**Response: 201 Created**
```typescript
{
  "data": ConsultationCommentDTO,
  "timestamp": string,
  "success": true
}
```

---

## Petition Endpoints

### GET /petitions

Get all petitions.

**Query Parameters:**
- `status` (string, optional)
- `themeId` (string, optional)
- `category` ('local' | 'regional' | 'national', optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response: 200 OK**
```typescript
{
  "data": PetitionDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

---

### GET /petitions/:idOrSlug

Get petition by ID or slug.

**Response: 200 OK**
```typescript
{
  "data": PetitionDTO,
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Calculate progress percentage
- Mark milestones as reached
- Include hasSign ed flag if user authenticated

---

### POST /petitions/:id/sign

Sign a petition.

**Headers:** `Authorization: Bearer <token>` (optional for anonymous)

**Request Body:**
```typescript
{
  "firstName"?: string,         // Required if anonymous
  "lastName"?: string,          // Required if anonymous
  "email"?: string,             // Required if anonymous
  "anonymous": boolean,
  "comment"?: string            // Max 500 characters
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "message": "Petition signed successfully",
    "signatureCount": number,
    "signatureId": string
  },
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Prevent duplicate signatures (check by userId or email)
- Update signature count
- Check if milestones reached
- Send confirmation email
- If threshold reached, notify petition author

---

### GET /petitions/:id/signatures

Get petition signatures.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 50)

**Response: 200 OK**
```typescript
{
  "data": PetitionSignatureDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

**Privacy:**
- Hide personal information if `isAnonymous: true`
- Show only non-sensitive data

---

## Vote Endpoints

### GET /votes

Get all votes.

**Query Parameters:**
- `status` (string, optional)
- `themeId` (string, optional)
- `type` (VoteType, optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response: 200 OK**
```typescript
{
  "data": VoteDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

---

### GET /votes/:idOrSlug

Get vote by ID or slug.

**Headers:** `Authorization: Bearer <token>` (optional)

**Response: 200 OK**
```typescript
{
  "data": VoteDTO,
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Include hasVoted flag if user authenticated
- Include results if status is 'results_published'
- Hide results if vote is still open (unless user has voted)

---

### POST /votes/:id/cast

Cast a vote.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```typescript
{
  "optionIds": string[]         // One or more option IDs
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "message": "Vote cast successfully",
    "voteId": string,
    "verified": boolean
  },
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Validate eligibility criteria (age, residency, etc.)
- Prevent duplicate votes
- Respect voting method (single/multiple/ranked choice)
- Update vote counts
- Store anonymously if `isAnonymous: true`
- Queue for verification if `requiresVerification: true`

**Errors:**
- `403 Forbidden` - User not eligible
- `409 Conflict` - Already voted
- `400 Bad Request` - Invalid options

---

### GET /votes/:id/results

Get vote results (only if published).

**Response: 200 OK**
```typescript
{
  "data": VoteResultsDTO,
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Only return if `status === 'results_published'`
- Include demographic breakdown if available

**Errors:**
- `403 Forbidden` - Results not published yet

---

## Assembly Endpoints

### GET /assemblies

Get all assemblies.

**Query Parameters:**
- `themeId` (string, optional)
- `status` (string, optional)
- `type` (AssemblyType, optional)

**Response: 200 OK**
```typescript
{
  "data": AssemblyDTO[],
  "timestamp": string,
  "success": true
}
```

---

### GET /assemblies/:idOrSlug

Get assembly by ID or slug.

**Response: 200 OK**
```typescript
{
  "data": AssemblyDTO,
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Include next upcoming meeting
- Include recent meetings
- Include working groups

---

### GET /assemblies/:id/meetings

Get assembly meetings.

**Query Parameters:**
- `status` (string, optional)
- `upcoming` (boolean, optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response: 200 OK**
```typescript
{
  "data": AssemblyMeetingDTO[],
  "meta": PaginationMeta,
  "timestamp": string,
  "success": true
}
```

---

## Conference Endpoints

### GET /conferences

Get all conferences.

**Query Parameters:**
- `status` (string, optional)
- `themeId` (string, optional)
- `upcoming` (boolean, optional)

**Response: 200 OK**
```typescript
{
  "data": ConferenceDTO[],
  "timestamp": string,
  "success": true
}
```

---

### GET /conferences/:idOrSlug

Get conference by ID or slug.

**Response: 200 OK**
```typescript
{
  "data": ConferenceDTO,
  "timestamp": string,
  "success": true
}
```

---

### POST /conferences/:id/register

Register for conference.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```typescript
{
  "sessions"?: string[],
  "attendeeInfo": {
    "firstName": string,
    "lastName": string,
    "email": string,
    "organization"?: string,
    "dietaryRestrictions"?: string,
    "accessibility"?: string
  }
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "message": "Successfully registered",
    "registrationId": string
  },
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Check capacity (overall and per session)
- Send confirmation email with calendar invite
- Update registered count

---

### GET /speakers/:id

Get speaker details.

**Response: 200 OK**
```typescript
{
  "data": SpeakerDTO,
  "timestamp": string,
  "success": true
}
```

---

## Dashboard Endpoints

### GET /dashboard/stats

Get dashboard statistics.

**Headers:** `Authorization: Bearer <token>` (optional)

**Response: 200 OK**
```typescript
{
  "data": DashboardStatsDTO,
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Calculate real-time statistics
- Include growth trends (compare with previous period)
- Include upcoming events (next 30 days)
- If authenticated, include personalized data

---

## Search Endpoints

### POST /search

Search across all content.

**Request Body:**
```typescript
{
  "query": string,
  "filters"?: {
    "types"?: SearchResultType[],
    "themeIds"?: string[],
    "status"?: string[],
    "dateFrom"?: string,
    "dateTo"?: string
  },
  "sort"?: "relevance" | "date" | "popularity",
  "page"?: number,
  "limit"?: number
}
```

**Response: 200 OK**
```typescript
{
  "data": {
    "results": SearchResultDTO[],
    "meta": PaginationMeta & {
      "totalResults": number,
      "searchTime": number
    },
    "suggestions": string[],
    "filters": {
      "availableThemes": ThemeDTO[],
      "availableStatuses": string[]
    }
  },
  "timestamp": string,
  "success": true
}
```

**Business Logic:**
- Use Elasticsearch or PostgreSQL full-text search
- Search across consultations, petitions, votes, conferences
- Multilingual search support
- Highlight matching terms
- Provide search suggestions
- Track popular searches for analytics

---

## Error Handling

### Standard Error Codes

- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource
- `422 Unprocessable Entity` - Business logic error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### Error Response Example
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "timestamp": "2026-01-09T14:30:00Z",
  "path": "/auth/register"
}
```

---

## Database Schema

### Recommended Tables

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'citizen',
  status VARCHAR(50) DEFAULT 'active',
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Themes
CREATE TABLE themes (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(100) UNIQUE,
  name_fr TEXT,
  name_de TEXT,
  name_en TEXT,
  icon VARCHAR(10),
  color_hex VARCHAR(7),
  active BOOLEAN DEFAULT true,
  display_order INTEGER
);

-- Consultations
CREATE TABLE consultations (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  title_fr TEXT,
  title_de TEXT,
  title_en TEXT,
  description_fr TEXT,
  description_de TEXT,
  description_en TEXT,
  theme_id VARCHAR(50) REFERENCES themes(id),
  type VARCHAR(50),
  status VARCHAR(50),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Petitions
CREATE TABLE petitions (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  title_fr TEXT,
  title_de TEXT,
  title_en TEXT,
  theme_id VARCHAR(50) REFERENCES themes(id),
  status VARCHAR(50),
  target_signatures INTEGER,
  current_signatures INTEGER DEFAULT 0,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Petition Signatures
CREATE TABLE petition_signatures (
  id UUID PRIMARY KEY,
  petition_id UUID REFERENCES petitions(id),
  user_id UUID REFERENCES users(id) NULL,
  email VARCHAR(255),
  is_anonymous BOOLEAN DEFAULT false,
  comment TEXT,
  signed_at TIMESTAMP DEFAULT NOW()
);

-- Votes
CREATE TABLE votes (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  title_fr TEXT,
  title_de TEXT,
  title_en TEXT,
  theme_id VARCHAR(50) REFERENCES themes(id),
  type VARCHAR(50),
  status VARCHAR(50),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vote Options
CREATE TABLE vote_options (
  id UUID PRIMARY KEY,
  vote_id UUID REFERENCES votes(id),
  label_fr TEXT,
  label_de TEXT,
  label_en TEXT,
  display_order INTEGER,
  vote_count INTEGER DEFAULT 0
);

-- User Votes
CREATE TABLE user_votes (
  id UUID PRIMARY KEY,
  vote_id UUID REFERENCES votes(id),
  user_id UUID REFERENCES users(id),
  option_ids UUID[],
  voted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(vote_id, user_id)
);
```

### Indexes

```sql
CREATE INDEX idx_consultations_theme ON consultations(theme_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_petitions_status ON petitions(status);
CREATE INDEX idx_petition_signatures_petition ON petition_signatures(petition_id);
CREATE INDEX idx_votes_status ON votes(status);
CREATE INDEX idx_user_votes_user ON user_votes(user_id);
```

---

## Rate Limiting

Implement rate limiting to prevent abuse:

- **Authentication endpoints**: 5 requests/minute per IP
- **Write operations**: 30 requests/minute per user
- **Read operations**: 100 requests/minute per user
- **Search**: 20 requests/minute per user

---

## Caching Strategy

Recommended caching:

- **Themes**: Cache indefinitely, invalidate on update
- **Consultations/Petitions/Votes lists**: Cache 5 minutes
- **Statistics**: Cache 10 minutes
- **User profile**: Cache 15 minutes, invalidate on update

---

## Webhooks (Optional)

Consider implementing webhooks for external integrations:

```http
POST /webhooks/petition-signed
POST /webhooks/vote-cast
POST /webhooks/milestone-reached
```

---

## Additional Recommendations

1. **API Versioning**: Use URL versioning (`/v1/`, `/v2/`)
2. **CORS**: Configure properly for frontend domains
3. **Logging**: Log all API requests with request ID
4. **Monitoring**: Track response times, error rates
5. **Documentation**: Generate OpenAPI/Swagger from DTOs
6. **Testing**: Unit tests, integration tests, E2E tests
7. **CI/CD**: Automated deployment pipeline
8. **Backup**: Daily database backups
9. **Security**: Implement OWASP best practices

---

**API Version**: 1.0.0  
**Last Updated**: January 9, 2026  
**Maintainer**: CiviAgora Backend Team
