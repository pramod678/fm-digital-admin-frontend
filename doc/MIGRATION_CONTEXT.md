# endpoint.tsx Migration Context

Use this file as the first prompt when opening new Claude Code chats for this project. It contains the full context needed to continue the API endpoint migration safely.

---

## Project Overview

**FM Digital Admin Frontend** is a React 18 + TypeScript music distribution dashboard (CRA). It has an admin panel and user-facing side for managing music releases, catalogs, artists, labels, tickets, financials, YouTube claims, and profile linking.

**Stack:** React 18, TypeScript, Create React App (CRA), Axios, React Query (useMutation/useQuery), Zustand with persist middleware (storage key: `auth-storage`), react-router-dom.

---

## What We're Doing

We are migrating all API endpoint URLs and their React Query hook functions (callback functions) from 9 separate files in `src/api/` into a single centralized file: **`src/api/endpoint.tsx`**.

This was mandated by the project's senior developer. The design has been approved.

### The Pattern

```
src/lib/api.tsx       --> Axios instance (base URL, token interceptor, 401 handler)
src/api/endpoint.tsx  --> ALL endpoint URLs + ALL React Query hooks (callback functions)
src/components/...    --> Import hooks from endpoint.tsx, never directly use axios
```

### Three-Layer Architecture

1. **`src/lib/api.tsx`** (the HTTP vehicle) - creates axios instance, reads baseURL from `.env`, attaches Bearer token from localStorage on every request via request interceptor, handles 401 responses with a `hadToken` guard (only auto-logouts if user WAS logged in, prevents wrong-password attempts from triggering redirect loops). Clears `token`, `userType`, and `auth-storage` (Zustand persist key) on 401 logout.

2. **`src/api/endpoint.tsx`** (the brain) - contains a grouped `ENDPOINTS` object with `as const` for type safety, plus all exported React Query hook functions. Each hook uses `api.post(ENDPOINTS.GROUP.NAME, payload)` style calls. Components import hooks from here.

3. **Components** (the trigger) - import hooks from endpoint.tsx, call them on user actions (form submit, page load, etc.). Components never know about HTTP or URLs.

---

## Current State (as of 2026-04-13)

### Already Completed (Pilot)

- **`.env`** created at project root with `REACT_APP_API_BASE_URL=https://api.fmdigitalofficial.com/api/v1`
- **`src/lib/api.tsx`** rewritten with interceptors and hadToken guard
- **`src/api/endpoint.tsx`** created with `ENDPOINTS.AUTH` group and 5 auth hooks migrated
- **`src/api/authentication.tsx`** left fully intact as a dead backup (nothing imports it anymore)
- **7 component imports swapped** from `../../api/authentication` to `../../api/endpoint`:
  - `src/components/Authentication/Login.tsx` (LoginWithMailApi)
  - `src/components/Authentication/SignUp.tsx` (RegisterWithMailApi)
  - `src/components/Authentication/ForgotPassword.tsx` (ForgotPasswordApi)
  - `src/components/Routes/ProtectedRoute.tsx` (GetTokenValidateApi)
  - `src/components/Routes/PublicRoute.tsx` (GetTokenValidateApi)
  - `src/components/Home/index.tsx` (GetUserDataApi - pre-existing dead import)
  - `src/components/Dashboard/index.tsx` (GetUserDataApi - pre-existing dead import)
- **Pilot tested:** Login with mock creds `admin@local.com` / `pass123` works, dashboard loads, ProtectedRoute gates correctly.

### Files Still To Migrate (9 files, ~68 hooks total)

| # | File | Lines | Hooks | Component imports | Risk |
|---|------|-------|-------|-------------------|------|
| 1 | `platform.tsx` | 31 | 2 | 2 files | Trivial |
| 2 | `profileLinking.tsx` | 60 | 4 | 3 files | Low |
| 3 | `ticket.tsx` | 54 | 4 | 5 files | Low |
| 4 | `label.tsx` | 83 | 5 | 6 files | Low |
| 5 | `financial.tsx` | 111 | 7 | 6 files | Medium |
| 6 | `youtubeClaims.tsx` | 107 | 7 | 6 files | Medium (cross-feature imports) |
| 7 | `catalogs.tsx` | 58 | 4 | 8 files | Medium |
| 8 | `user.tsx` | 72 | 5 | 14 files | Higher |
| 9 | `releaseInfo.tsx` | 440 | 30+ | 30+ files | **HIGHEST - do last** |

**Migrate in this order** (smallest blast radius first). If something breaks, it breaks small.

---

## The API Bucket (Source of Truth)

The Postman collection is at the project root: **`FM-Digital.postman_collection.json`**

Senior explicitly stated: **the Postman collection URLs are the source of truth.** If the frontend has a different URL hardcoded, the Postman version wins.

### Known Mismatches Between Frontend Code and Postman

These MUST be corrected during migration (use Postman URL, not the old frontend URL):

1. **Forgot password:** Frontend uses `user/forgot-password` (with dash), Postman says `user/forgotpassword` (no dash). **Use Postman's version.**

2. **profileLinkinAdudiogGet prefix:** Frontend uses `tools/profileLinkinAdudiogGet`, Postman uses `createRelease/profileLinkinAdudiogGet`. **Use Postman's version.**

3. **admin/getAllDashBoard:** Exists in Postman but not used in frontend. Frontend uses `admin/dashBoard-get-all` instead. **Clarify with senior if these are different endpoints or duplicates before touching.**

4. **admin/manage-artist-get-all:** Exists in Postman but not used in frontend currently. May be needed in the future.

### All Postman Endpoints Organized by Route Prefix

**user/* endpoints:**
- POST `user/login`
- POST `user/register`
- GET `user/userData?token=...`
- POST `user/userData`
- PUT `user/userUpdate/:id`
- GET `user/getOneUser/:id`
- POST `user/forgotpassword`

**admin/* endpoints:**
- GET `admin/catlogs-get-all?user_id=&status=`
- GET `admin/getAllDashBoard`
- GET `admin/manage-artist-get-all`
- DELETE `admin/delete-user/:id`
- GET `admin/dashBoard-get-all`
- POST `admin/dashBoard-link-create`
- PUT `admin/dashBoard-link-update/:id`
- GET `admin/dashBoard-get-link-all?spotify_active=`
- POST `admin/admin-finacial-create`
- GET `admin/user-finacial-get-all` (with and without ?user_id=)
- GET `admin/admin-finacial-get-all`
- PUT `admin/user-finacial-update/:id`
- GET `admin/finacial-history-get-all?user_id=`
- GET `admin/label-get-all`
- PUT `admin/label-update`
- PUT `admin/relese-info-update`
- PUT `admin/youtube-claims-update`
- PUT `admin/featuring-artist-update/:id`
- PUT `admin/primary-artist-update/:id`
- PUT `admin/profile-linking-update`
- PUT `admin/ticket-update`
- GET `admin/manage-users-get-all?user_id=`
- GET `admin/get-all-user`
- GET `admin/youtube-get-all`
- GET `admin/profile-linking-get-all`
- GET `admin/primary-artist-get-all?user_id=`
- GET `admin/featuring-artist-get-all?user_id=`
- GET `admin/ticket-get-all`

**createRelease/* endpoints:**
- POST `createRelease/releseInfoPost`
- PUT `createRelease/releseInfoUpdate/:id`
- GET `createRelease/releseInfoGetOne/:id`
- GET `createRelease/releseInfoGetAll`
- GET `createRelease/getByReleseInfoId/:id`
- POST `createRelease/submissionPost`
- GET `createRelease/submissionGet/:id`
- POST `createRelease/songsInfoPost`
- PUT `createRelease/songsInfoUpdate/:id`
- DELETE `createRelease/songsInfoDelete/:id`
- GET `createRelease/songsInfoGetOne/:id`
- GET `createRelease/songsInfoGetEdit/:id`
- GET `createRelease/songsInfoGet`
- POST `createRelease/platformPost`
- PUT `createRelease/platformUpdate/:id`
- GET `createRelease/platformGetOne/:id`
- GET `createRelease/catalogsGet/:id/Status/:status`
- DELETE `createRelease/catalogsDelete/:id`
- GET `createRelease/genreGet`
- GET `createRelease/languageGet`
- POST `createRelease/primaryArtistPost`
- GET `createRelease/primaryArtistGet/:id`
- PUT `createRelease/primaryArtistUpdate/:id`
- POST `createRelease/featuringArtisttPost`
- GET `createRelease/featuringArtisttGet/:id`
- POST `createRelease/labelPost`
- PUT `createRelease/labelUpdate/label_id/:id`
- GET `createRelease/labelgetAll`
- POST `createRelease/ticketPost`
- GET `createRelease/ticketgetAll/users_id/:id`
- GET `createRelease/dasboardDraftgetAll/Status/:status/users_id/:uid`
- GET `createRelease/profileLinkinAdudiogGet/users_id/:uid/releseInfo_id/:rid`

**tools/* endpoints:**
- POST `tools/youtubeClaimsPost`
- GET `tools/youtubeClaimsGetAll/:id`
- POST `tools/profileLinkingPost`
- GET `tools/profileLinkingGetAll/:id`
- GET `tools/releseInfoGetAll/:id`

---

## Planned ENDPOINTS Object Structure

```tsx
const ENDPOINTS = {
    AUTH: {
        LOGIN: "/user/login",
        REGISTER: "/user/register",
        USER_DATA: "/user/userData",
        FORGOT_PASSWORD: "/user/forgotpassword",  // Postman = no dash. NOTE: pilot currently has "/user/forgot-password" — must update during migration
    },
    USER: {
        GET_ONE: "/user/getOneUser",        // + /:id
        UPDATE: "/user/userUpdate",          // + /:id
        GET_ALL: "/admin/get-all-user",
        GET_ALL_WITH_FILTERS: "/admin/manage-users-get-all",  // ?user_id=
        DELETE: "/admin/delete-user",        // + /:id
    },
    RELEASE: {
        POST: "/createRelease/releseInfoPost",
        UPDATE: "/createRelease/releseInfoUpdate",       // + /:id
        GET_ONE: "/createRelease/releseInfoGetOne",      // + /:id
        GET_BY_ID: "/createRelease/getByReleseInfoId",   // + /:id
        GENRE_GET: "/createRelease/genreGet",
        LANGUAGE_GET: "/createRelease/languageGet",
        SONGS_POST: "/createRelease/songsInfoPost",
        SONGS_UPDATE: "/createRelease/songsInfoUpdate",  // + /:id
        SONGS_DELETE: "/createRelease/songsInfoDelete",  // + /:id
        SONGS_GET_EDIT: "/createRelease/songsInfoGetEdit",  // + /:id
        PRIMARY_ARTIST_POST: "/createRelease/primaryArtistPost",
        PRIMARY_ARTIST_GET: "/createRelease/primaryArtistGet",      // + /:id
        PRIMARY_ARTIST_UPDATE: "/createRelease/primaryArtistUpdate",  // + /:id
        FEATURING_ARTIST_POST: "/createRelease/featuringArtisttPost",
        FEATURING_ARTIST_GET: "/createRelease/featuringArtisttGet",  // + /:id
        SUBMISSION_POST: "/createRelease/submissionPost",
        SUBMISSION_GET: "/createRelease/submissionGet",  // + /:id
        DRAFTS_GET: "/createRelease/dasboardDraftgetAll",  // /Status/:s/users_id/:uid
        PROFILE_AUDIO_GET: "/createRelease/profileLinkinAdudiogGet",  // Postman prefix!
        USER_DATA_POST: "/user/userData",  // POST variant (UserDataApi lives in releaseInfo.tsx, kept here for file-faithful grouping)
    },
    DASHBOARD: {
        GET_ALL: "/admin/dashBoard-get-all",
        LINK_GET_ALL: "/admin/dashBoard-get-link-all",    // ?spotify_active=
        LINK_CREATE: "/admin/dashBoard-link-create",
        LINK_UPDATE: "/admin/dashBoard-link-update",      // + /:id
    },
    CATALOGS: {
        GET: "/createRelease/catalogsGet",          // + /:id/Status/:status
        DELETE: "/createRelease/catalogsDelete",     // + /:id
        ADMIN_GET_ALL: "/admin/catlogs-get-all",     // ?user_id=&status=
        ADMIN_UPDATE: "/admin/relese-info-update",
    },
    FINANCIAL: {
        ADMIN_CREATE: "/admin/admin-finacial-create",
        USER_CREATE: "/admin/user-finacial-create",
        ADMIN_GET_ALL: "/admin/admin-finacial-get-all",
        USER_GET_ALL: "/admin/user-finacial-get-all",
        USER_UPDATE: "/admin/user-finacial-update",       // + /:id
        HISTORY_GET_ALL: "/admin/finacial-history-get-all",  // ?user_id=
    },
    LABEL: {
        POST: "/createRelease/labelPost",
        UPDATE: "/createRelease/labelUpdate/label_id",    // + /:id
        GET_ALL: "/createRelease/labelgetAll",             // + /:id
        ADMIN_GET_ALL: "/admin/label-get-all",
        ADMIN_UPDATE: "/admin/label-update",
    },
    PLATFORM: {
        POST: "/createRelease/platformPost",
        UPDATE: "/createRelease/platformUpdate",    // + /:id
        GET_ONE: "/createRelease/platformGetOne",   // + /:id
    },
    PROFILE_LINKING: {
        GET_ALL: "/tools/profileLinkingGetAll",           // + /:id
        POST: "/tools/profileLinkingPost",
        ADMIN_GET_ALL: "/admin/profile-linking-get-all",
        ADMIN_UPDATE: "/admin/profile-linking-update",
    },
    TICKET: {
        POST: "/createRelease/ticketPost",
        GET_ALL: "/createRelease/ticketgetAll/users_id",  // + /:id
        ADMIN_GET_ALL: "/admin/ticket-get-all",
        ADMIN_UPDATE: "/admin/ticket-update",
    },
    YOUTUBE_CLAIMS: {
        POST: "/tools/youtubeClaimsPost",
        GET_ALL: "/tools/youtubeClaimsGetAll",            // + /:id
        RELEASE_GET_ONE: "/createRelease/releseInfoGetOne",  // + /:id (duplicate used by YT claims)
        RELEASE_GET_ALL: "/tools/releseInfoGetAll",       // + /:id
        ADMIN_GET_ALL: "/admin/youtube-get-all",
        ADMIN_UPDATE: "/admin/youtube-claims-update",
    },
    ADMIN_ARTIST: {
        PRIMARY_GET_ALL: "/admin/primary-artist-get-all",      // ?user_id=
        PRIMARY_UPDATE: "/admin/primary-artist-update",        // + /:id
        FEATURING_GET_ALL: "/admin/featuring-artist-get-all",  // ?user_id=
        FEATURING_UPDATE: "/admin/featuring-artist-update",    // + /:id
    },
} as const;
```

---

## Migration Steps (Per File)

For each source file, repeat this exact process:

1. **Read the source file** in full.
2. **Add its feature group** to the `ENDPOINTS` block in `endpoint.tsx`.
3. **Copy all hooks verbatim** to `endpoint.tsx`. Replace hardcoded URL strings with `ENDPOINTS.GROUP.NAME` references. **Cross-reference every URL against the Postman collection** and use the Postman version if they differ.
4. **Grep for all component imports** of the source file: `from ['"].*api/<filename>['"]`
5. **Swap every import path** in consumers: `api/<filename>` to `api/endpoint`.
6. **Leave the source file fully intact** as a dead backup. Never delete it.
7. **Smoke test** the affected pages in the browser.
8. **Commit** (one commit per file for easy rollback).

---

## Hard Rules (DO NOT VIOLATE)

These come directly from the user and their senior:

1. **DO NOT delete any existing code or files.** Old API files (`authentication.tsx`, `user.tsx`, etc.) remain as dead backups even after their hooks are migrated. They just won't be imported anymore.

2. **DO NOT refactor, improve, or clean up code during migration.** Copy hooks exactly as-is. Preserve typos in variable names, leading spaces in query keys (`" GetSongs"`, `" GetAllTicket"`, `" GetLanguages"`), console.logs, empty onSuccess callbacks, unused parameters. The ONLY thing that changes is the URL string (to use ENDPOINTS reference) and import paths in consumers.

3. **DO NOT break anything.** If uncertain, stop and ask before proceeding.

4. **Discuss ambiguity first, never assume.** If something doesn't match between Postman and frontend, flag it before "fixing" it.

5. **Postman collection is the source of truth for URLs.** If frontend has a different URL, Postman wins.

6. **All new API endpoints go into `endpoint.tsx`** going forward. No new files in `src/api/`.

---

## Things To Watch Out For

### Pre-existing Issues (DO NOT FIX unless asked)

- **Mock login shortcut** in `endpoint.tsx` for `admin@local.com` / `pass123` — development only, should be gated before production. Currently exists in both `endpoint.tsx` (LoginWithMailApi) and `releaseInfo.tsx` (UserDataApi).
- **Dead imports** in `src/components/Home/index.tsx` line 7 and `src/components/Dashboard/index.tsx` line 4 — `GetUserDataApi` is imported but never used. Pre-existing, leave alone.
- **Leading spaces in React Query keys** — `" GetSongs"`, `" GetAllTicket"`, `" GetLanguages"` — these are bugs but pre-existing. Preserve them exactly.
- **Empty onSuccess callbacks** — several hooks have `onSuccess: (res) => { }` with empty bodies. Leave as-is.
- **ForgotPasswordApi** has unused `navigate` parameter. Leave as-is.
- **Duplicate query keys** — `youtubeClaims.tsx` has both `ReleseInfoGetOneApi` and `GetAllReleseInfoApi` using the same query key `releseInfoGetOne`. Pre-existing.
- **Dashboard 400 errors** on the homepage — `dashBoard-get-all`, `dashBoard-get-link-all`, `user-finacial-get-all` all return 400. Unrelated to migration. These are backend issues.

### UserDataApi is the Riskiest Hook

`UserDataApi` currently lives in `releaseInfo.tsx` but is the **single most imported hook in the app** (~20+ component files use it). It fetches user profile data and is used in Navbar, Dashboard, Catalogs, Label, Tickets, Financial, ManageArtist, YouTubeClaims, and ProfileLinking pages.

When migrating `releaseInfo.tsx` (the LAST file), pay extreme attention to this hook. If its import breaks, the entire app breaks.

### Cross-Feature Imports

Some components import from multiple API files. For example:
- `Tools/ProfileLinking/CreateProfile.tsx` imports from both `releaseInfo.tsx` AND `youtubeClaims.tsx` AND `profileLinking.tsx`
- `Tools/YouTubeClaims/Admin/index.tsx` imports from `releaseInfo.tsx`, `youtubeClaims.tsx`, AND `user.tsx`

When migrating one file, these components will temporarily import from both `api/endpoint` (migrated hooks) and `api/<old-file>` (not-yet-migrated hooks). This is fine and expected. They will fully switch to `api/endpoint` only after all their source files have been migrated.

### URL Format Inconsistency

Some frontend URLs start with `/` (e.g., `/admin/relese-info-update`) and some don't (e.g., `createRelease/genreGet`). Axios handles both fine with baseURL. When writing ENDPOINTS values, match whatever the Postman collection uses.

---

## File Reference

| File | Purpose | Status |
|------|---------|--------|
| `.env` | Base URL for CRA (REACT_APP_API_BASE_URL) | Done |
| `src/lib/api.tsx` | Axios instance + interceptors | Done |
| `src/api/endpoint.tsx` | Central endpoint file (migration target) | Auth group done, 9 groups pending |
| `src/api/authentication.tsx` | Old auth hooks | Dead backup, nothing imports it |
| `src/api/user.tsx` | User hooks (5 hooks) | Pending migration |
| `src/api/catalogs.tsx` | Catalog hooks (4 hooks) | Pending migration |
| `src/api/financial.tsx` | Financial hooks (7 hooks) | Pending migration |
| `src/api/releaseInfo.tsx` | Release/dashboard/artist hooks (30+ hooks) | Pending migration, DO LAST |
| `src/api/label.tsx` | Label hooks (5 hooks) | Pending migration |
| `src/api/platform.tsx` | Platform hooks (2 hooks) | Pending migration, DO FIRST |
| `src/api/profileLinking.tsx` | Profile linking hooks (4 hooks) | Pending migration |
| `src/api/ticket.tsx` | Ticket hooks (4 hooks) | Pending migration |
| `src/api/youtubeClaims.tsx` | YouTube claims hooks (7 hooks) | Pending migration |
| `FM-Digital.postman_collection.json` | Postman API bucket (source of truth for URLs) | At project root |
| `API_SETUP_GUIDE.md` | Old setup docs | Stale, needs updating after migration |

---

## Environment Notes

- **CRA env vars** use `REACT_APP_` prefix and are read only at boot time. After changing `.env`, must restart dev server (`Ctrl+C` then `npm start`).
- **Zustand persist key** is `auth-storage` — must be cleared alongside `token` and `userType` on 401 logout.
- **Dev server** runs on `localhost:3000`.
- The `.env` file is committed (CRA convention — shared config). `.env.local` is gitignored for personal overrides.
