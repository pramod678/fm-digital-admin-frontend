# FM Digital Admin Frontend — Backend API Reference

> **Purpose**: Complete reference for backend developers. Covers all API contracts, data models, auth patterns, status codes, and integration requirements as observed from the revamped frontend.

---

## Table of Contents

1. [API Configuration & Authentication](#1-api-configuration--authentication)
2. [Authentication Endpoints](#2-authentication-endpoints)
3. [User Management Endpoints](#3-user-management-endpoints)
4. [Release & Catalog Endpoints](#4-release--catalog-endpoints)
5. [Song / Track Endpoints](#5-song--track-endpoints)
6. [Artist Endpoints](#6-artist-endpoints)
7. [Platform Endpoints](#7-platform-endpoints)
8. [Label Endpoints](#8-label-endpoints)
9. [Financial Endpoints](#9-financial-endpoints)
10. [Ticket Endpoints](#10-ticket-endpoints)
11. [Profile Linking Endpoints](#11-profile-linking-endpoints)
12. [YouTube Claims Endpoints](#12-youtube-claims-endpoints)
13. [Dashboard Endpoints](#13-dashboard-endpoints)
14. [Draft & Submission Endpoints](#14-draft--submission-endpoints)
15. [Data Types & Interfaces](#15-data-types--interfaces)
16. [Status Codes & Enums](#16-status-codes--enums)
17. [Role-Based Access Control (RBAC)](#17-role-based-access-control-rbac)
18. [File Uploads](#18-file-uploads)
19. [Error Handling Contract](#19-error-handling-contract)
20. [Pagination & Filtering](#20-pagination--filtering)
21. [React Query & Caching Hints](#21-react-query--caching-hints)
22. [Missing / TODO Endpoints](#22-missing--todo-endpoints)
23. [Security Notes](#23-security-notes)

---

## 1. API Configuration & Authentication

### Base URL
```
https://api.fmdigitalofficial.com/api/v1
```

### Standard Headers (all requests)
```
Content-Type: application/json
Authorization: Bearer {token}
```

### Token Lifecycle
- Token is stored in `localStorage` under the key `"token"`.
- Injected into every request via an Axios interceptor (`/src/lib/api.tsx`).
- `userType` is stored in `localStorage` under the key `"userType"`.
- On app init the frontend calls `GET /user/userData?token={token}` to validate the token.
- If the response body equals the string `"token expired"`, the user is logged out.

> **Note**: `withCredentials` is intentionally **disabled** on the Axios instance due to CORS constraints. Do not rely on cookies for auth — use Bearer tokens.

---

## 2. Authentication Endpoints

### Login
`POST /user/login`

**Request Body**
```typescript
{
  email: string;
  password: string;
  checkbox: boolean;  // "Remember me" flag
}
```

**Response**
```typescript
{
  status: "success" | "error";
  data: {
    token: string;       // OR nested: data.data.token
    userType?: string;   // "admin" | "user"
  };
  error?: string;
  message?: string;
}
```

> The token may be a top-level string (`data.token`) or nested (`data.data.token`). The frontend handles both — keep this consistent.

---

### Register
`POST /user/register`

**Request Body**
```typescript
{
  fname: string;
  lname: string;
  email: string;
  password: string;
  country?: string;
  phone?: string;
  referralCode?: string;
  beneficiaryName?: string;
  bankName?: string;
  ibanAccount?: string;
  ifscCode?: string;
  swiftCode?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  userType: "User" | "admin";
  secretKey?: string;  // Required for admin registration
}
```

**Response**
```typescript
{
  error?: string;
  token?: string;
  data?: { token?: string };
  message?: string;
}
```

---

### Get User Data (Token Validation)
`GET /user/userData?token={token}`

**Response**
```typescript
// Success
{
  data: {
    fname: string;
    lname: string;
    email: string;
    userType: string;
    profile_image?: string;
    subscriptionPlan?: string;
    users_id?: number;
  }
}

// Expired token (literal string response)
"token expired"
```

---

### Forgot Password
`POST /user/forgot-password`

**Request Body**
```typescript
{ email: string; }
```

**Response**
```typescript
{ error?: string; message?: string; }
```

> An OTP verification step is anticipated (`/user/verify-otp`) but **not yet implemented** on the frontend. Prepare this endpoint.

---

## 3. User Management Endpoints

### Get Single User
`GET /user/getOneUser/{id}`

| Param | Type | Description |
|-------|------|-------------|
| `id` | number | User ID (path param) |

---

### Get All Users (Admin)
`GET /admin/get-all-user`

**Response**
```typescript
{ data: { data: UserObject[] } }
```

---

### Get Users with Filter (Admin)
`GET /admin/manage-users-get-all?user_id={userId}`

| Param | Type | Description |
|-------|------|-------------|
| `user_id` | string | Filter by user ID |

---

### Update User
`PUT /user/userUpdate/{id}`

| Param | Type |
|-------|------|
| `id` | string \| number |

**Request Body**: Partial `UserDetailsDto` (see [Data Types](#15-data-types--interfaces))

---

### Delete User (Admin)
`DELETE /admin/delete-user/{id}`

| Param | Type |
|-------|------|
| `id` | string |

---

## 4. Release & Catalog Endpoints

### Get Catalogs (User)
`GET /createRelease/catalogsGet/{id}/Status/{selectedOption}`

| Param | Type | Description |
|-------|------|-------------|
| `id` | string \| number | User ID |
| `selectedOption` | string | Status filter value |

**Response**: `{ result: CatalogObject[] }`

---

### Get All Catalogs (Admin)
`GET /admin/catlogs-get-all?user_id={userId}&status={statusId}`

| Query Param | Type | Required |
|-------------|------|----------|
| `user_id` | string | Yes |
| `status` | string | No |

---

### Get Release Info (Single)
`GET /createRelease/releseInfoGetOne/{id}`

**Response**: `{ data: ReleaseInfoDto }`

---

### Get Release Info by ID
`GET /createRelease/getByReleseInfoId/{id}`

---

### Get All Release Info (User Tools)
`GET /tools/releseInfoGetAll/{id}`

**Response**: `{ data: ReleaseInfoDto[] }`

---

### Create Release Info
`POST /createRelease/releseInfoPost`

**Request Body**: `ReleaseInfoDto`

---

### Update Release Info (User)
`PUT /createRelease/releseInfoUpdate/{id}`

**Request Body**: Partial `ReleaseInfoDto`

---

### Update Release Info (Admin)
`PUT /admin/relese-info-update`

**Request Body**: Full release info object with target fields updated.

---

### Delete Catalog
`DELETE /createRelease/catalogsDelete/{id}`

---

### Get Genre List
`GET /createRelease/genreGet`

**Response**: Array of genre objects.

---

### Get Language List
`GET /createRelease/languageGet`

**Response**: Array of language objects.

---

## 5. Song / Track Endpoints

### Create Song
`POST /createRelease/songsInfoPost`

**Request Body**: `SongDetailsDto`

---

### Update Song
`PUT /createRelease/songsInfoUpdate/{id}`

**Request Body**: Partial `SongDetailsDto`

---

### Get Songs for Release
`GET /createRelease/songsInfoGetEdit/{id}`

| Param | Description |
|-------|-------------|
| `id` | Release ID |

**Response**: Array of song objects.

---

### Delete Song
`DELETE /createRelease/songsInfoDelete/{id}`

---

## 6. Artist Endpoints

### Create Primary Artist
`POST /createRelease/primaryArtistPost`

**Request Body**: `PrimaryArtistDto`

---

### Update Primary Artist (User)
`PUT /createRelease/primaryArtistUpdate/{id}`

---

### Get Primary Artists for Release
`GET /createRelease/primaryArtistGet/{id}`

| Param | Description |
|-------|-------------|
| `id` | Release ID |

---

### Get All Primary Artists (Admin)
`GET /admin/primary-artist-get-all?user_id={userId}`

---

### Update Primary Artist (Admin)
`PUT /admin/primary-artist-update/{id}`

---

### Create Featuring Artist
`POST /createRelease/featuringArtisttPost`

**Request Body**: `FeatureArtistDto`

> Note: The endpoint name has a double-t typo (`featuringArtisttPost`). Keep consistent with current backend.

---

### Get Featuring Artists for Release
`GET /createRelease/featuringArtisttGet/{id}`

---

### Get All Featuring Artists (Admin)
`GET /admin/featuring-artist-get-all?user_id={userId}`

---

### Update Featuring Artist (Admin)
`PUT /admin/featuring-artist-update/{id}`

---

## 7. Platform Endpoints

### Create Platform
`POST /createRelease/platformPost`

---

### Update Platform
`PUT /createRelease/platformUpdate/{id}`

---

### Get Platform (Single)
`GET /createRelease/platformGetOne/{id}`

| Param | Description |
|-------|-------------|
| `id` | Release ID |

---

## 8. Label Endpoints

### Create Label
`POST /createRelease/labelPost`

**Content-Type**: `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `labelDocument` | File | Document/image file |
| `title` | string | Label title |
| `youtubeURL` | string | YouTube URL |
| `users_id` | string | User ID (as string) |

---

### Update Label
`PUT /createRelease/labelUpdate/label_id/{id}`

**Content-Type**: `multipart/form-data` (same fields as create)

---

### Get All Labels (User)
`GET /createRelease/labelgetAll/{id}`

| Param | Description |
|-------|-------------|
| `id` | User ID |

---

### Get All Labels (Admin)
`GET /admin/label-get-all?user_id={userId}&status={statusId}`

---

### Update Label Status (Admin)
`PUT /admin/label-update`

**Request Body**
```typescript
{
  label_id: number;
  Status: number;   // See Status Codes section
  users_id?: number | string;
  remark?: string;
}
```

---

## 9. Financial Endpoints

### Create Admin Financial Record
`POST /admin/admin-finacial-create`

**Request Body**: `FinancialDto`

---

### Create User Financial Record (Admin action)
`POST /admin/user-finacial-create`

**Request Body**: `CreateUserFinancialDto`

---

### Get All Admin Financial Records
`GET /admin/admin-finacial-get-all`

---

### Get All User Financial Records
`GET /admin/user-finacial-get-all`

---

### Get Financial History for User
`GET /admin/finacial-history-get-all?user_id={userId}`

---

### Get User's Own Financial Records
`GET /admin/user-finacial-get-all?user_id={userId}`

---

### Update User Fund
`PUT /admin/user-finacial-update/{id}`

**Request Body**: Financial data including `id` field.

---

## 10. Ticket Endpoints

### Create Ticket
`POST /createRelease/ticketPost`

**Content-Type**: `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `reason` | string | Ticket reason/subject |
| `discreption` | string | Ticket description (intentional typo in codebase — keep as-is) |
| `ticketDocument` | File | Supporting document |

> **Important**: The field name is `discreption` (not `description`) — this typo exists in the codebase and must match the backend field name.

---

### Get All Tickets (User)
`GET /createRelease/ticketgetAll/users_id/{userId}`

---

### Get All Tickets (Admin)
`GET /admin/ticket-get-all?user_id={userId}&status={statusId}`

---

### Update Ticket Status (Admin)
`PUT /admin/ticket-update`

**Request Body**: Ticket object with updated `Status` field.

---

## 11. Profile Linking Endpoints

### Create Profile Linking
`POST /tools/profileLinkingPost`

**Request Body**: `ProfileLinkingDto`

---

### Get All Profile Linkings (User)
`GET /tools/profileLinkingGetAll/{id}`

---

### Get All Profile Linkings (Admin)
`GET /admin/profile-linking-get-all?user_id={userId}&status={statusId}`

---

### Update Profile Linking (Admin)
`PUT /admin/profile-linking-update`

**Request Body**: Profile linking object with updated `Status` field.

---

### Get Audio Profile Linking
`GET /tools/profileLinkinAdudiogGet/users_id/{userId}/releseInfo_id/{releaseId}`

| Param | Description |
|-------|-------------|
| `userId` | User ID |
| `releaseId` | Release/Release Info ID |

---

## 12. YouTube Claims Endpoints

### Create YouTube Claim
`POST /tools/youtubeClaimsPost`

**Request Body**: `YouTubeClaimsDto`

---

### Get YouTube Claims (User)
`GET /tools/youtubeClaimsGetAll/{id}`

---

### Get YouTube Claims (Admin)
`GET /admin/youtube-get-all?user_id={userId}&status={statusId}`

---

### Update YouTube Claims (Admin)
`PUT /admin/youtube-claims-update`

**Request Body**: YouTube claims object with updated `Status` field and optional `remark`.

---

## 13. Dashboard Endpoints

### Get Dashboard Statistics
`GET /admin/dashBoard-get-all`

**Response**: Aggregated stats object (user counts, release counts, etc.)

---

### Get Dashboard Links
`GET /admin/dashBoard-get-link-all?spotify_active={active}`

| Query Param | Type | Description |
|-------------|------|-------------|
| `spotify_active` | boolean | Filter by active status |

---

### Create Dashboard Link
`POST /admin/dashBoard-link-create`

---

### Update Dashboard Link
`PUT /admin/dashBoard-link-update/{id}`

| Param | Description |
|-------|-------------|
| `id` | `dashBoard_id` value |

**Request Body**: Dashboard link object including `dashBoard_id`.

---

## 14. Draft & Submission Endpoints

### Get Drafts for User
`GET /createRelease/dasboardDraftgetAll/Status/0/users_id/{userId}`

Returns releases with Status = `0` (Draft).

---

### Get Corrections/Rejections for User
`GET /createRelease/dasboardDraftgetAll/Status/3/users_id/{userId}`

Returns releases with Status = `3` (Correction required).

---

### Create Submission
`POST /createRelease/submissionPost`

---

### Get Submission
`GET /createRelease/submissionGet/{id}`

| Param | Description |
|-------|-------------|
| `id` | Release ID |

---

## 15. Data Types & Interfaces

### ReleaseInfoDto
```typescript
{
  ReleaseType: string;
  ReleaseTitle: string;
  PrimaryArtist: string;
  FeaturingArtist: string;
  Genre: string;
  SubGenre: string;
  LabelName: string;
  ReleaseDate: string;
  PLine: string;
  CLine: string;
  UPCEAN: string;
  AdditionalInfo: string;
  users_id: number;
  Status: number;
  releseInfo_id: number;
  ImageDocument: any[];
}
```

### SongDetailsDto
```typescript
{
  AudioDocument: string;
  Trackversion: string;
  Instrumental: string;
  Title: string;
  VersionSubtitle: string;
  Primaryartist: string;
  FeaturingArtist: string;
  Author: string;
  Composer: string;
  Producer: string;
  Publisher: string;
  ISRC: string;
  Genre: string;
  PriceTier: string;
  Subgenre: string;
  ExplicitVersion: string;
  TrackTitleLanguage: string;
  LyricsLanguage: string;
  Lyrics: string;
  CallerTuneTiming: string;
  DistributeMusicvideo: string;
  users_id: number;
  releseInfo_id: number;
  songsInfo_id: number;
}
```

### PrimaryArtistDto
```typescript
{
  PrimaryArtist: string;
  AppleId: string;
  SpotifyId: string;
  users_id: number;
}
```

### FeatureArtistDto
```typescript
{
  FeaturingArtist: string;
  AppleId: string;
  SpotifyId: string;
  users_id: number;
}
```

### FinancialDto
```typescript
{
  total_amount: number;
  month_date: string;
  earning_resources: string;  // "Video Distribution" | "Audio Distribution"
  vender: string;
  requested_by: string;
  cPercents: number;           // 0 | 5 | 10 | 15
}
```

### CreateUserFinancialDto
```typescript
{
  user_id: string;
  earning_amount: number;
}
```

### UserDetailsDto
```typescript
{
  fname: string;
  lname: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  gstRegistered: string;
  gstNumber: string;
  panNumber: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  googleplus: string;
  linkedin: string;
  vevo: string;
  soundcloud: string;
  beneficiaryName: string;
  bankName: string;
  accountNumber: string;
  IFSCcode: string;
  swiftcode: string;
}
```

### YouTubeClaimsDto
```typescript
{
  Selectrelease: string;
  SelectAudio: string;
  Selectplatform: string;
  SelectPolicy: string;  // "Monetize" | "Remove" | "Block"
  PasteURL: string;
}
```

### ProfileLinkingDto
```typescript
{
  Selectrelease: string;
  SelectAudio: string;
  Selectplatform: string;
  FecebookLink: string;   // Note: typo in codebase — "Fecebook" not "Facebook"
  InstagramLink: string;
  ArtistName: string;
}
```

### Label Response Object
```typescript
{
  label_id: number;
  users_id: number;
  title: string;
  youtubeURL: string;
  labelDocument: string;  // e.g. "storage/labels/abc123.jpg"
  Status: number;
  created_at: string;
  updated_at: string;
}
```

---

## 16. Status Codes & Enums

### Universal Content Status
| Value | Meaning | Applies To |
|-------|---------|------------|
| `0` | Draft / Pending | Releases, Labels, Tickets, YouTube Claims, Profile Linking |
| `1` | Approved | Labels, general content |
| `2` | Rejected | Labels, general content |
| `3` | Correction Required | Releases (user must fix) |
| `4` | Completed / Approved | Tickets (closed), Labels (alternate approval) |

### Ticket Status
| Value | Meaning |
|-------|---------|
| `0` | Open / Pending |
| `4` | Closed / Completed |

### YouTube Policy Options
```
"Monetize" | "Remove" | "Block"
```

### Earning Resources
```
"Video Distribution" | "Audio Distribution"
```

### Commission Percentages
```
0 | 5 | 10 | 15
```

### User Types
```
"admin" | "Admin" | "user" | "User"
```

---

## 17. Role-Based Access Control (RBAC)

### Admin-only endpoints (prefix `/admin/`)
- `get-all-user`, `manage-users-get-all`, `delete-user`
- `catlogs-get-all`, `relese-info-update`
- `label-get-all`, `label-update`
- `admin-finacial-create`, `user-finacial-create`, `user-finacial-update`, `finacial-history-get-all`
- `ticket-get-all`, `ticket-update`
- `primary-artist-get-all`, `primary-artist-update`
- `featuring-artist-get-all`, `featuring-artist-update`
- `youtube-get-all`, `youtube-claims-update`
- `profile-linking-get-all`, `profile-linking-update`
- `dashBoard-get-all`, `dashBoard-get-link-all`, `dashBoard-link-create`, `dashBoard-link-update`

### User-scoped endpoints (prefix `/createRelease/` and `/tools/`)
- All release creation and editing
- Label submission
- Ticket submission
- Profile linking submission
- YouTube claims submission

### Filtering convention
- Admin endpoints accept a `user_id` query param to filter data for a specific user.
- Omitting `user_id` (or passing the admin's own ID) returns all records.
- User-scoped endpoints use path params (`/{userId}`) and only return the calling user's data.

---

## 18. File Uploads

### Pattern
All file uploads use `multipart/form-data`. Axios automatically sets the correct `Content-Type` boundary — do not override it manually on the backend.

### Endpoints accepting files

| Endpoint | FormData Field | Description |
|----------|----------------|-------------|
| `POST /createRelease/labelPost` | `labelDocument` | Label image/document |
| `PUT /createRelease/labelUpdate/label_id/{id}` | `labelDocument` | Updated label file |
| `POST /createRelease/ticketPost` | `ticketDocument` | Support ticket attachment |

### Stored file path format
Files are referenced back from the API as:
```
storage/{category}/{filename}
```
Example: `storage/ticketdocument/6708c04cd8b30.jpg`

---

## 19. Error Handling Contract

### Expected error response shape
```typescript
{
  error?: string;
  message?: string;
}
```

Or nested via Axios:
```typescript
{
  response: {
    data: {
      error?: string;
      message?: string;
    }
  }
}
```

### Token expiry
When a token is expired, respond with the literal string:
```json
"token expired"
```
(not an error status code — the frontend checks `data === "token expired"`)

### Frontend toast behavior
- Success → `cogoToast.success(message)`
- Error → `cogoToast.error(message)`

Always return a human-readable `message` or `error` string in error responses.

---

## 20. Pagination & Filtering

- **No server-side pagination is currently implemented or expected.** The frontend fetches all records and paginates client-side at 25 records per page.
- Filtering is also primarily done client-side after fetch.
- The only server-side filtering currently used is via query params: `user_id` and `status`.

> If server-side pagination is added in the future, coordinate with the frontend team — it will require frontend changes.

---

## 21. React Query & Caching Hints

The frontend uses React Query v3 with the following default config:
```typescript
{
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
}
```

This means:
- Data is **not re-fetched** on tab focus or reconnect.
- Always return complete, accurate data on first fetch — stale data will persist until a manual `refetchQueries` call is triggered (which happens after successful mutations).

---

## 22. Missing / TODO Endpoints

These endpoints are anticipated by the frontend but **not yet confirmed as implemented**:

### 1. OTP Verification
```
POST /user/verify-otp
```
- Required for the Forgot Password flow.
- Navigation to the OTP page is prepared in the frontend.

### 2. Service Status Management
```
GET  /api/admin/service-status
PUT  /api/admin/service-status
```
- Referenced in `useServiceStatus.ts`.
- Currently falls back to `localStorage`. Implement to remove the fallback.

---

## 23. Security Notes

| Area | Current State | Recommendation |
|------|--------------|----------------|
| Token storage | `localStorage` | Consider `httpOnly` cookies for XSS protection |
| Token transport | Bearer header | Already correct |
| CORS | `withCredentials: false` | Ensure CORS headers are set for the frontend domain |
| reCAPTCHA | Enabled on login (sitekey: `6LdFPH8pAAAAAFpZr2CrRBPvCaqoO0iXpLFVGYte`) | Validate reCAPTCHA response server-side |
| Token refresh | Not implemented | Implement refresh token mechanism |
| HTTPS | Already in use | Maintain; enforce HSTS |

---

## Known Typos in API Field Names

These typos exist in **both** the frontend and (presumably) the backend. **Do not fix them unilaterally** — both sides must change together:

| Typo | Correct Spelling | Location |
|------|-----------------|----------|
| `discreption` | `description` | Ticket POST body |
| `featuringArtisttPost` | `featuringArtistPost` | Endpoint path |
| `featuringArtisttGet` | `featuringArtistGet` | Endpoint path |
| `FecebookLink` | `FacebookLink` | ProfileLinkingDto field |
| `releseInfo` | `releaseInfo` | Multiple endpoint paths |
| `finacial` | `financial` | Multiple endpoint paths |

---

*Last updated: 2026-03-27 — based on full codebase analysis of the revamped FM Digital Admin Frontend.*
