# 📚 Saeful Portfolio API Documentation

**Base URL:** `http://localhost:3000` (dev) | `saefulrdevs-portfolio-api.vercel.app` (prod)

## 🔍 Quick Links

- **OpenAPI Spec:** `/api/openapi` (machine-readable, use with Swagger UI / Insomnia)
- **Auth:** Next Auth + Credentials provider

---

## 📋 Table of Contents

1. [Projects API](#projects-api)
2. [Upload API](#upload-api)
3. [Authentication](#authentication)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)

---

## 🎯 Projects API

### Get All Projects

```http
GET /api/projects?page=1&limit=10&highlight=false&q=search&status=completed&tags=react,typescript
```

**Query Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `page` | integer | ❌ | Page number (default: 1, min: 1) |
| `limit` | integer | ❌ | Items per page (default: 10, max: 100) |
| `highlight` | boolean | ❌ | Filter highlighted projects only |
| `q` | string | ❌ | Search by title, slug, description, shortDescription |
| `status` | string | ❌ | Filter by status: `completed`, `in-progress`, `planned` |
| `tags` | string | ❌ | Comma-separated tags (AND match logic) |

**Example Request:**
```javascript
fetch('/api/projects?highlight=true&limit=5')
  .then(res => res.json())
  .then(console.log);
```

**Example Response:**
```json
{
  "status": "success",
  "message": "Projects list retrieved successfully",
  "code": 200,
  "data": [
    {
      "id": "project-1",
      "title": "E-Commerce Platform",
      "slug": "ecommerce-platform",
      "description": "Full-stack e-commerce platform with payment integration",
      "shortDescription": "Modern e-commerce solution",
      "technologies": ["Next.js", "React", "TypeScript", "PostgreSQL"],
      "role": "Full Stack Developer",
      "status": "completed",
      "startDate": "2024-01",
      "endDate": "2024-06",
      "features": ["User authentication", "Product catalog", "Payment processing"],
      "links": {
        "github": "https://github.com/saeful/ecommerce",
        "demo": "https://ecommerce.example.com"
      },
      "images": [
        {
          "url": "https://cdn.example.com/project-1-hero.jpg",
          "alt": "E-commerce hero image"
        }
      ],
      "tags": ["e-commerce", "fullstack", "production"],
      "highlight": true
    }
  ],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 23
  },
  "timestamp": "2026-05-22T10:30:00.000Z"
}
```

---

### Create Project

```http
POST /api/projects
Content-Type: application/json
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "slug": "project-slug",
  "description": "Detailed description",
  "shortDescription": "Short description",
  "technologies": ["React", "TypeScript"],
  "role": "Full Stack Developer",
  "status": "completed",
  "startDate": "2024-01",
  "endDate": "2024-06",
  "features": ["Feature 1", "Feature 2"],
  "links": {
    "github": "https://github.com/...",
    "demo": "https://demo.com"
  },
  "images": [
    {
      "url": "https://cdn.example.com/image.jpg",
      "alt": "Image description"
    }
  ],
  "tags": ["tag1", "tag2"],
  "highlight": false
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Project created successfully",
  "code": 201,
  "data": { ...same as request body },
  "timestamp": "2026-05-22T10:30:00.000Z"
}
```

**Validation Errors (422):**
```json
{
  "status": "fail",
  "message": "Validation failed",
  "code": 422,
  "details": {
    "fieldErrors": {
      "title": ["String must contain at least 1 character"]
    },
    "formErrors": []
  }
}
```

---

### Get Single Project

```http
GET /api/projects/:id
```

**Parameters:**
- `:id` - Project ID or slug

**Example:**
```bash
# By ID
GET /api/projects/project-1

# By slug
GET /api/projects/ecommerce-platform
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Project retrieved successfully",
  "code": 200,
  "data": { ...project object },
  "timestamp": "2026-05-22T10:30:00.000Z"
}
```

**Error (404 Not Found):**
```json
{
  "status": "fail",
  "message": "Project not found",
  "code": 404
}
```

---

### Update Project

```http
PUT /api/projects/:id
Content-Type: application/json
Authorization: Bearer <session_token>
```

**Request Body:** (all fields optional for updates)
```json
{
  "title": "Updated Title",
  "status": "in-progress"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Project updated successfully",
  "code": 200,
  "data": { ...updated project object }
}
```

---

### Delete Project

```http
DELETE /api/projects/:id
Authorization: Bearer <session_token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Project deleted successfully",
  "code": 200,
  "data": true
}
```

---

## 📸 Upload API

Currently using **Cloudinary** for image storage. Will migrate to **Supabase Storage** soon.

### Upload Image

```http
POST /api/upload
Content-Type: multipart/form-data
Authorization: Bearer <session_token>
```

**Form Data:**
```
file: <binary image file>
```

**Supported formats:** JPG, PNG, GIF, WebP, SVG

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.data.url); // Use this URL in project images
```

**Response (200):**
```json
{
  "status": "success",
  "message": "File uploaded successfully",
  "code": 200,
  "data": {
    "public_id": "portfolio-projects/abc123def456",
    "url": "https://res.cloudinary.com/...",
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "size": 245120
  },
  "timestamp": "2026-05-22T10:30:00.000Z"
}
```

**Error (400):**
```json
{
  "status": "fail",
  "message": "No file provided",
  "code": 400
}
```

---

### Delete Images

```http
DELETE /api/upload
Content-Type: application/json
Authorization: Bearer <session_token>
```

**Request Body:**
```json
{
  "publicIds": [
    "portfolio-projects/abc123",
    "portfolio-projects/def456"
  ]
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Files deleted successfully",
  "code": 200,
  "data": {
    "deletedCount": 2,
    "result": { ...deletion details }
  }
}
```

---

## 🔐 Authentication

### Login

```http
POST /api/auth/callback/credentials
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure_password"
}
```

### Session Management

Using **NextAuth.js** with JWT strategy.

**Get Session:**
```javascript
import { useSession } from 'next-auth/react';

function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'authenticated') {
    console.log(session.user); // { email, name, id }
  }
}
```

**Making Authenticated Requests:**
```javascript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(projectData)
  // Session token is sent via cookies automatically
});
```

---

## 📊 Response Format

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  message: string;
  code: number;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  details?: unknown; // Only in error responses
  timestamp: string; // ISO 8601 format
}
```

**Status Codes:**
- `success` - Request succeeded (2xx)
- `fail` - Client error (4xx) - validation, not found, etc.
- `error` - Server error (5xx)

---

## ❌ Error Handling

**Example Error Response:**
```json
{
  "status": "error",
  "message": "Failed to create project",
  "code": 500,
  "data": null,
  "details": null,
  "timestamp": "2026-05-22T10:30:00.000Z"
}
```

**Common Status Codes:**

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Not authenticated |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Internal Server Error |

---

## 🔗 Frontend Integration Examples

### React with Fetch

```javascript
// Get all projects
async function getProjects() {
  const response = await fetch('/api/projects?limit=10');
  const { data, meta } = await response.json();
  return { projects: data, pagination: meta };
}

// Create project
async function createProject(project) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return response.json();
}
```

### React with SWR

```javascript
import useSWR from 'swr';

function Projects() {
  const { data, error } = useSWR('/api/projects?limit=10');
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      {data.data.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- Images are currently stored in Cloudinary (migration to Supabase planned)
- Authentication is required for POST/PUT/DELETE operations
- Rate limiting may be applied in production
- CORS is configured for development

---

## 🚀 Migration to Supabase (Upcoming)

- Database: Firebase Firestore → PostgreSQL (Supabase)
- Image Storage: Cloudinary → Supabase Storage
- Auth: Firebase Auth → Supabase Auth (optional)

Stay tuned for updates!
