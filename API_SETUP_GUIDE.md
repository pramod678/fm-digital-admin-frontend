# API Setup Guide

A practical guide to how API calls are structured in this project, why, and how to add new ones when the backend team shares the API bucket.

---

## Table of contents

1. [The 4-step mental model](#the-4-step-mental-model)
2. [What changed and why](#what-changed-and-why)
3. [File structure](#file-structure)
4. [The `.env` file](#the-env-file)
5. [The axios instance explained](#the-axios-instance-explained)
6. [How to add a new API endpoint](#how-to-add-a-new-api-endpoint)
7. [How to consume an API in a component](#how-to-consume-an-api-in-a-component)
8. [Troubleshooting](#troubleshooting)
9. [Glossary](#glossary)
10. [Future cleanup opportunities](#future-cleanup-opportunities)

---

## The 4-step mental model

Every React app that talks to a backend follows the same flow. Once you internalise it, you'll never think about it again:

```
  Base URL   →   .env   →   Axios instance   →   Token used globally
  (root of         (store             (one client                (interceptor
  the API)         it safely)         everyone imports)          auto-attaches)
```

### Step 1 — Base URL
The root of the backend. Every endpoint hangs off this:

```
https://api.fmdigitalofficial.com/api/v1
                                         ↑
                  endpoints append here: /user/login, /posts, etc.
```

### Step 2 — Store it in `.env`
Don't hardcode the URL in code. Put it in a `.env` file at the project root so you can swap between local, staging, and production without touching source:

```
REACT_APP_API_BASE_URL=https://api.fmdigitalofficial.com/api/v1
```

### Step 3 — Create the axios instance
One pre-configured HTTP client in [src/lib/api.tsx](src/lib/api.tsx). Every file imports this — nobody creates their own.

### Step 4 — Token used globally
A **request interceptor** automatically attaches the JWT token to every outgoing request. A **response interceptor** automatically logs the user out on 401. Written once, applies everywhere.

---

## What changed and why

Three files were touched to bring the project in line with the pattern above. No business logic, no component behavior, no endpoints were changed.

### Changed files

| File | Change | Why |
|---|---|---|
| [.env](.env) | **Created** | Holds the base URL outside of source code so it can differ between environments |
| [src/lib/api.tsx](src/lib/api.tsx) | Rewrote axios instance | Reads base URL from env, cleaner request interceptor, added response interceptor for 401 handling |
| [src/api/authentication.tsx](src/api/authentication.tsx) | Removed 2 hardcoded full URLs | They were bypassing the `baseURL` config, defeating the point of the instance |

### Before vs after — axios instance

**Before** ([src/lib/api.tsx](src/lib/api.tsx)):
```tsx
const token = localStorage.getItem("token");   // only read once, at module load
const api = axios.create({
    baseURL: "https://api.fmdigitalofficial.com/api/v1",   // hardcoded
    ...
});

const setAuthToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

api.interceptors.request.use((config) => {
    setAuthToken();
    return config;
});

// ❌ no response interceptor → expired tokens silently fail
```

**Problems with the old version:**
1. Base URL hardcoded → can't switch environments
2. No handling for 401 responses → expired sessions produced confusing errors in components
3. Mutated `api.defaults.headers.common` globally on every request → functionally works but is indirect; the token mutation persists across requests rather than being scoped to one

**After** ([src/lib/api.tsx](src/lib/api.tsx)):
```tsx
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.fmdigitalofficial.com/api/v1",
    headers: { 'Content-Type': 'application/json' }
});

// Attach token on every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle expired/invalid token globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const hadToken = !!localStorage.getItem("token");
            if (hadToken) {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("auth-storage");
                window.location.href = "/sign-in";
            }
        }
        return Promise.reject(error);
    }
);
```

**Improvements:**
1. Base URL from `.env`, with a **safe fallback** so a fresh clone without `.env` still works
2. Response interceptor handles expired tokens globally — users are auto-redirected to sign-in
3. Request interceptor reads the token **per request** (so fresh logins work immediately without restarting the app)
4. Clears `auth-storage` (the Zustand persist key) along with `token` and `userType` — otherwise the store would rehydrate a dead token on page reload
5. `hadToken` guard — wrong-password login attempts (which also return 401) don't trigger the redirect, so the user stays on the login page and sees the normal error toast

### Before vs after — authentication.tsx

Two calls were passing full URLs, bypassing the `baseURL` on the instance:

**Before:**
```tsx
const res = await api.post("https://api.fmdigitalofficial.com/api/v1/user/login", payload);
// ...
const res = await api.post("https://api.fmdigitalofficial.com/api/v1/user/register", data);
```

**After:**
```tsx
const res = await api.post("/user/login", payload);
// ...
const res = await api.post("/user/register", data);
```

Now all API calls in the codebase follow the same convention: relative path only, base URL handled by the instance.

---

## File structure

```
fm-digital-admin-frontend/
├── .env                              ← base URL (committed, non-secret)
├── .env.local                        ← optional, your personal overrides (gitignored)
├── src/
│   ├── lib/
│   │   └── api.tsx                   ← the ONE axios instance — everyone imports this
│   └── api/                          ← service layer (one file per feature)
│       ├── authentication.tsx        ← /user/login, /user/register, etc.
│       ├── user.tsx                  ← user profile endpoints
│       ├── catalogs.tsx              ← catalog endpoints
│       ├── financial.tsx             ← financial endpoints
│       ├── label.tsx
│       ├── platform.tsx
│       ├── profileLinking.tsx
│       ├── releaseInfo.tsx
│       ├── ticket.tsx
│       └── youtubeClaims.tsx
```

> **Note:** The senior dev called this the "services" folder. This project calls it `api/`. Same thing. Don't rename it unless you want to break every import in the app — the convention in this codebase is `src/api/`.

---

## The `.env` file

### Location
Project root (next to `package.json`), **not** inside `src/`.

### Current contents
```
REACT_APP_API_BASE_URL=https://api.fmdigitalofficial.com/api/v1
```

### Rules (Create React App specific)

1. **File name must be exactly `.env`** — no extension, no prefix
2. **Variable names MUST start with `REACT_APP_`** — CRA ignores any env var that doesn't
3. **Restart `npm start` after editing** — env vars are only read when the dev server boots. Editing `.env` while the server is running has no effect until you restart
4. **No quotes needed** around values
5. **No spaces around `=`** — `KEY=value`, not `KEY = value`

### `.env` vs `.env.local`

| File | Purpose | Git |
|---|---|---|
| `.env` | Shared defaults for the team (e.g. the production API URL) | Committed |
| `.env.local` | Your personal overrides (e.g. pointing at a local backend) | **Gitignored** |

If you want to point your local dev at `http://localhost:5000` without affecting teammates, create `.env.local`:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
```
CRA reads `.env.local` *after* `.env`, so the local file wins.

### Accessing env vars in code
```tsx
process.env.REACT_APP_API_BASE_URL
```
`process.env` is replaced at build time — this is normal React/CRA behavior.

---

## The axios instance explained

Full annotated file: [src/lib/api.tsx](src/lib/api.tsx)

### What it does
1. Creates one axios client with the base URL and default content-type header
2. Before every request: reads the current token from localStorage and attaches it as `Authorization: Bearer <token>`
3. After every response: if the server returns 401 **and** a token existed, wipes the auth state and hard-redirects to `/sign-in`

### Why a request interceptor (not `defaults.headers`)
The interceptor reads the token **per request**. This means:
- Fresh logins work immediately — no app restart needed
- Logouts take effect on the next request
- The token isn't frozen at module-load time

### Why the `hadToken` guard on 401
Some 401s aren't "session expired" — they're "you typed the wrong password." Without the guard, a failed login would trigger the force-logout redirect on a user who wasn't even logged in yet, causing a confusing page reload.

The guard says: "only force-logout if there was actually a session to kill."

### Why clear `auth-storage`
The Zustand auth store in [src/store/userstore.tsx](src/store/userstore.tsx) uses the `persist` middleware with key `auth-storage`. Clearing only `token` from localStorage isn't enough — Zustand would rehydrate its own copy of the token from `auth-storage` on page reload and the user would look logged in again with a dead token.

---

## How to add a new API endpoint

Say the backend team sends you this in the API bucket:

```
POST /posts
  body: { title: string, content: string }
  returns: { id, title, content, createdAt }
```

### Step 1 — Find the right file in [src/api/](src/api/)
Is there already a file for this feature? If yes, open it. If no, create one.

For posts, you'd likely create `src/api/post.tsx`.

### Step 2 — Write the React Query hook

The project uses React Query for data fetching. Mutations look like this:

```tsx
import cogoToast from "@successtar/cogo-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";

type CreatePostPayload = {
    title: string;
    content: string;
};

// POST /posts — mutation
export const CreatePostApi = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: CreatePostPayload) => {
            return await api.post("/posts", payload);
        },
        onSuccess: () => {
            cogoToast.success("Post created");
            queryClient.refetchQueries(["GetAllPosts"]);   // refresh the list
        },
        onError: (error: any) => {
            cogoToast.error(error?.response?.data?.message || "Failed to create post");
        }
    });
};

// GET /posts — query
export const GetAllPostsApi = () =>
    useQuery(
        ["GetAllPosts"],
        async () => await api.get("/posts"),
        {
            refetchOnWindowFocus: false,
            onError: (error: any) => {
                cogoToast.error(error?.response?.data?.message || "Failed to load posts");
            }
        }
    );
```

### Key points
- **Always pass relative paths** (`/posts`), never full URLs. The base URL comes from the instance.
- **No manual token handling** — the interceptor does it.
- **Use `queryClient.refetchQueries([queryKey])`** in mutation `onSuccess` to refresh cached data.
- **Query keys** are arrays: `["GetAllPosts"]`, `["GetPost", id]`, etc. Match the existing naming style in the project.

---

## How to consume an API in a component

```tsx
import { useState } from "react";
import { CreatePostApi, GetAllPostsApi } from "../api/post";

function Posts() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Query: runs on mount, gives you data + loading + error state
    const { data, isLoading } = GetAllPostsApi();

    // Mutation: you call .mutate() when you want to fire it
    const { mutate: createPost, isLoading: isCreating } = CreatePostApi();

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost({ title, content });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <button disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create"}
                </button>
            </form>

            <ul>
                {data?.data?.data?.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    );
}
```

### What the component does **not** do
- ❌ Import axios directly
- ❌ Know the base URL
- ❌ Touch localStorage for tokens
- ❌ Set `Authorization` headers manually
- ❌ Handle 401 redirects

All of that is in the service layer and the axios instance. The component only cares about data and user events.

---

## Troubleshooting

### "My API call returns undefined for baseURL"
You edited `.env` but didn't restart the dev server. Stop `npm start` with `Ctrl+C` and run it again.

### "`process.env.REACT_APP_X` is undefined"
- Variable name must start with `REACT_APP_`
- Variable must be in `.env` at the project root (not inside `src/`)
- Dev server must have been started **after** the variable was added

### "I get a 401 on login with the right password"
That means the backend rejected the credentials — **not** a frontend issue. Check the Network tab to confirm the request payload matches what the backend expects. The `hadToken` guard means failed logins show the normal error toast instead of force-redirecting.

### "I'm logged in but every request returns 401"
Token is expired. The response interceptor should catch this and redirect you — if it doesn't, something in the mutation's `onError` might be swallowing the error. Check the Network tab, then check the Console for the redirect log.

### "Request goes to the wrong URL"
You wrote the full URL in an `api.post(...)` call instead of just the path. It should be:
```tsx
api.post("/user/login", payload)     // ✅ path only
```
not
```tsx
api.post("https://.../user/login", payload)   // ❌ bypasses baseURL
```

### "CORS errors in dev"
CORS is a backend problem, not a frontend problem. Ask the backend team to allow your origin (`http://localhost:3000`). The commented-out `withCredentials` in the old code was a symptom of a CORS fight — don't re-enable it without backend changes.

---

## Glossary

| Term | What it means |
|---|---|
| **Axios instance** | A pre-configured HTTP client that knows your base URL and default headers |
| **Interceptor** | Middleware that runs before every request or after every response |
| **Request interceptor** | Modifies outgoing requests (e.g. attach token) |
| **Response interceptor** | Handles incoming responses (e.g. catch 401) |
| **Bearer token** | Convention for sending a JWT: `Authorization: Bearer <token>` |
| **JWT** | JSON Web Token — a string the backend issues on login that proves who you are |
| **401** | HTTP status: "you're not authenticated" (missing or expired token) |
| **Base URL** | The root of the API, e.g. `https://api.fmdigitalofficial.com/api/v1` |
| **Service / API layer** | The folder where all backend calls live, isolated from UI components |
| **API bucket / collection** | Slang for the endpoint list/Postman collection the backend team shares |
| **React Query** | Library that handles server state (caching, refetching, loading/error states) |
| **Mutation** | React Query term for a write operation (POST/PUT/DELETE) |
| **Query** | React Query term for a read operation (GET) |
| **Zustand** | The state management library this project uses for client state (token, UI toggles) |
| **Persist middleware** | Zustand feature that mirrors store state into localStorage under a named key |

---

## Future cleanup opportunities

These were intentionally **not touched** in this pass because they're out of scope for API infrastructure, but worth knowing about:

### 1. Hardcoded asset URLs (~18 files)
Files under [src/components/](src/components/) and [src/ui/](src/ui/) contain image/audio `<src>` attributes like:
```tsx
src={`https://api.fmdigitalofficial.com/${catalog.ImageDocument}`}
```
These are **static file URLs**, not API calls — they point at the backend's file storage, not its API endpoints. They should probably come from a second env var (e.g. `REACT_APP_ASSET_BASE_URL`) and a small helper. Worth doing in a dedicated pass later.

### 2. Hardcoded mock login
[src/api/authentication.tsx](src/api/authentication.tsx) contains a hardcoded `admin@local.com` / `pass123` mock that bypasses the real backend. Harmless in development, but should be stripped (or gated behind an env var like `REACT_APP_ENABLE_MOCK_LOGIN`) before any production build.

### 3. Unused `navigate` param in `ForgotPasswordApi`
TypeScript hint at [src/api/authentication.tsx:193](src/api/authentication.tsx#L193) — pre-existing, unrelated to API infrastructure.

### 4. `console.log` spam in auth flow
[src/api/authentication.tsx](src/api/authentication.tsx) has a lot of debugging logs in the registration flow. Useful while wiring the backend, noisy in production.

---

## Quick reference card

```tsx
// 1. Import the instance
import api from "../lib/api";

// 2. Call endpoints with relative paths
api.get("/posts");
api.post("/posts", { title, content });
api.put("/posts/:id", { title });
api.delete("/posts/:id");

// 3. No token code anywhere. Ever.
// The interceptor does it.
```

That's the whole pattern. When the API bucket arrives, you're just turning each line in the bucket into a function in the matching file under [src/api/](src/api/).
