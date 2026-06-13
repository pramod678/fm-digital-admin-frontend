# Prod auth-bridge port — implementation plan

**Audience:** the Claude Code agent (Sonnet) executing this port inside `D:\fm-digital-admin-frontend-prod`.
**Author of plan:** Opus, working from the new repo at `D:\fm-digital-admin-frontend`.
**Date:** 2026-05-22.

---

## 0. Goal in one paragraph

Take the new sign-in, sign-up, and forgot-password pages from the new repo (`D:\fm-digital-admin-frontend`) and integrate them into the older prod repo (`D:\fm-digital-admin-frontend-prod`) as a **temporary bridge** — these pages will replace prod's existing auth pages, but they will run on a **parallel, isolated auth pipeline** so the rest of prod (catalogs, label, tickets, financial, manage-user, etc.) is untouched. The full revamp of prod will happen later; this is the customer-facing front door during that work.

**Strategy chosen: Option A — side-by-side, NOT replace.** Old prod's `src/lib/api.tsx` and `src/api/authentication.tsx` keep running for the rest of the app. The three new pages get their own new files alongside.

---

## 1. Read this first — non-negotiable rules

1. **Do NOT replace** `src/lib/api.tsx` (prod). It is used by ProtectedRoute, Home, every dashboard hook, every feature page. Leaving it alone protects all those flows.
2. **Do NOT replace** `src/api/authentication.tsx` (prod). It is imported by `PublicRoute`, `ProtectedRoute`, `Home/index.tsx`, plus the (about-to-be-rewritten) `Login.tsx` and `SignUp.tsx`. The first three must keep working as-is. Only fix the committed merge-conflict markers in it; don't change any logic.
3. **Do NOT touch** anything outside the files listed in section 7. No "while I'm here" refactors. No `.toLowerCase()` fixes to consumer files like Sidebar/Navbar/Home — the userType bug stays dormant exactly as it is today (see section 6).
4. **Do NOT add `setUserType` to the new Login** when porting (see section 6).
5. **Keep the mock-login backdoor** as-is in `authV2.tsx` (see section 5). Note: it will not actually function in prod (the fake token gets rejected by the real backend at ProtectedRoute's `GetTokenValidateApi` call) — it stays as scaffolding for parity with the new repo.
6. **Conservative refactor style** — discuss ambiguity before deciding. Never delete code unless this plan explicitly says to.

---

## 2. Preconditions to verify before starting

Run these checks in `D:\fm-digital-admin-frontend-prod`:

1. `git status` — working tree should be clean except for any expected changes. Current branch should be `FM-Frontend_New` (or whatever branch the user has chosen).
2. Confirm `package.json` includes: `axios`, `react-query` (^3.39.3), `react-router-dom` (^6.x), `zustand`, `react-hook-form`, `react-spinners`, `react-google-recaptcha`, `react-icons`, `@successtar/cogo-toast`. All are already there as of writing.
3. Confirm `src/index.js` wraps the app in `<QueryClientProvider>`. It does.
4. Confirm `src/App.tsx` uses BrowserRouter with `react-router-dom` v6 syntax. It does.
5. Confirm `src/store/userstore.tsx` initialises `userType: ''` (empty string, not `'user'`). It does.
6. Confirm these two files contain unresolved committed merge conflicts (`<<<<<<<` / `=======` / `>>>>>>>` markers from commit `41dd8b6`):
   - `src/api/authentication.tsx`
   - `src/components/Authentication/Login.tsx`
   These will be resolved as part of this port (see sections 7.4 and 7.7).

If any of these fail, **stop and ask the user** before continuing.

---

## 3. Source-of-truth files in the new repo

These are the files you mirror from. Read them fresh; don't trust paraphrasing.

| Purpose | New repo path |
|---|---|
| New axios instance with `.env` URL + 401 interceptor | `D:\fm-digital-admin-frontend\src\lib\api.tsx` |
| URL manifest (full file — you only copy the AUTH section) | `D:\fm-digital-admin-frontend\src\api\endpoint.tsx` |
| Auth hooks (LoginWithMailApi, RegisterWithMailApi, GetUserDataApi, GetTokenValidateApi, ForgotPasswordApi) | `D:\fm-digital-admin-frontend\src\api\authentication.tsx` |
| New Login UI | `D:\fm-digital-admin-frontend\src\components\Authentication\Login.tsx` |
| New SignUp UI (multi-step wizard) | `D:\fm-digital-admin-frontend\src\components\Authentication\SignUp.tsx` |
| New ForgotPassword UI | `D:\fm-digital-admin-frontend\src\components\Authentication\ForgotPassword.tsx` |
| .env reference | `D:\fm-digital-admin-frontend\.env` |
| Image assets used by new pages | `D:\fm-digital-admin-frontend\public\images\fm-logo\` (bg.png, footer-and-header.svg, apple logo.svg, google logo.svg) |

**Image asset note:** Verify which of these images already exist in `D:\fm-digital-admin-frontend-prod\public\images\fm-logo\`. Anything missing must be copied from the new repo's public folder. If the folder doesn't exist in prod, create it.

---

## 4. Target file layout in prod after the port

```
D:\fm-digital-admin-frontend-prod\
├── .env                                          ← NEW
├── .env.example                                  ← NEW
├── public/images/fm-logo/                        ← copy any missing assets
└── src/
    ├── lib/
    │   ├── api.tsx                               ← UNCHANGED (old axios, used by old prod)
    │   └── apiAuth.tsx                           ← NEW (new axios, used by 3 new pages only)
    ├── api/
    │   ├── authentication.tsx                    ← MODIFIED (merge conflict resolved; logic preserved)
    │   ├── endpoint.tsx                          ← NEW (URL manifest, AUTH section only)
    │   └── authV2.tsx                            ← NEW (LoginWithMailApi, RegisterWithMailApi, ForgotPasswordApi)
    ├── components/Authentication/
    │   ├── Login.tsx                             ← REWRITTEN (merge conflict gone via rewrite)
    │   ├── SignUp.tsx                            ← REWRITTEN
    │   └── ForgotPassword.tsx                    ← NEW
    └── App.tsx                                   ← MODIFIED (one new route added)
```

**Naming convention:** `apiAuth.tsx` / `endpoint.tsx` / `authV2.tsx` are intentionally distinct so the bridge is easy to find and delete later. If the user has overridden these names, follow the user's naming.

---

## 5. Decisions baked into this plan (user can override before you run)

These are the defaults. If the user has not overridden them in their kickoff message, proceed with these.

| Decision | Default | Why |
|---|---|---|
| Mock-login backdoor in new `LoginWithMailApi` (`admin@local.com` / `pass123`) | **KEEP** in `authV2.tsx` (per user instruction) | Preserved for parity with the new repo. **Caveat:** the backdoor returns a fake token (`mock-token-12345`). After Login.tsx navigates to `/`, ProtectedRoute calls `GetTokenValidateApi` from the OLD `src/api/authentication.tsx` → hits the real backend with the fake token → backend rejects → user gets bounced back to `/sign-in`. The backdoor therefore does NOT provide a working dev login in prod. It is scaffolding only. |
| Merge-conflict resolution in `src/api/authentication.tsx` | **Keep the post-`=======` side** (commit `41dd8b6`, the most recent committed state) | Most recent intentional code. Both sides have the functions ProtectedRoute needs (`GetTokenValidateApi`, `GetUserDataApi`). |
| `setUserType` call inside new `LoginWithMailApi` (sets userType immediately on login) | **STRIP** for prod | Preserves prod's existing flow where userType is set only by `GetUserDataApi` after Home loads. Avoids reintroducing the case-sensitivity bug from a new direction. See section 6. |
| New endpoint.tsx scope | **AUTH section only** — `LOGIN`, `REGISTER`, `USER_DATA`, `FORGOT_PASSWORD` | Out-of-scope to migrate prod's other URL strings. |
| `.env` baseURL value | `https://api.fmdigitalofficial.com/api/v1` | Matches what both repos currently use. |

---

## 6. The userType case-sensitivity bug — must read

Background: prod has 10+ files comparing `userType === "Admin"` or `userType !== "User"` with strict equality and no `.toLowerCase()`. The new repo had the same bug and fixed it in three layers (case-insensitive comparisons everywhere, empty store init, no fallback to `"user"` on read).

For this port, we are **not fixing the bug in prod**. The bug stays dormant exactly as today. Concretely this means:

- New SignUp must continue to send `userType: "User"` (capital U) in the register payload — matches what prod's strict comparisons expect. The new repo already does this; preserve it.
- New Login must NOT call `setUserType(...)` from the login response. Strip that block. The userType flow in prod will continue to come from `GetUserDataApi` (in the OLD `authentication.tsx`) after Home loads, exactly as today.
- New Login's `LoginWithMailApi` signature in `authV2.tsx` should be `(reset, navigate, setToken)` — three args, not four. No `setUserType` parameter.
- New Login's call site in `Login.tsx` should pass only `(reset, navigate, setToken)`.

**Why this matters:** if you accidentally keep `setUserType` in the new Login, and the backend's `/user/login` response returns `userType` with different casing than `/user/userData`, the userType in the zustand store will flip casing during the login-to-dashboard transition. Strict comparisons in Sidebar/Navbar/Home would behave inconsistently. **Do not introduce this risk.**

---

## 7. Step-by-step implementation

Each step is independent unless noted. Do them in order. After each step, verify the build still compiles (`npm run build` once at the end is enough; you don't need to compile after every file).

### 7.1 Create `D:\fm-digital-admin-frontend-prod\.env` and `.env.example`

**`.env` contents:**

```
REACT_APP_API_BASE_URL=https://api.fmdigitalofficial.com/api/v1
```

**`.env.example` contents:** same as `.env` (no secrets — this URL is public). The example file exists so fresh clones know what to put.

**Important:** Add `.env` to `.gitignore` if not already there. Do NOT commit the `.env` file itself (only `.env.example`). Check the existing `.gitignore` in prod and confirm `.env` is listed; if not, add it.

### 7.2 Copy missing image assets

Check `D:\fm-digital-admin-frontend-prod\public\images\fm-logo\` for these files:
- `bg.png`
- `footer-and-header.svg`
- `apple logo.svg` (yes, the filename has a space)
- `google logo.svg`

For any that are missing, copy from `D:\fm-digital-admin-frontend\public\images\fm-logo\`. Create the `images\fm-logo` directory inside prod's `public/` if needed.

### 7.3 Create `src/lib/apiAuth.tsx`

This is a copy of the new repo's `D:\fm-digital-admin-frontend\src\lib\api.tsx` with **no modifications** — the file is already self-contained and prod-safe. Read it fresh and write it as-is to `D:\fm-digital-admin-frontend-prod\src\lib\apiAuth.tsx`.

Key behaviours this file gives the new pages:
- baseURL from `process.env.REACT_APP_API_BASE_URL` with the hardcoded URL as fallback.
- Request interceptor reads `localStorage.getItem("token")` fresh on each call and attaches `Authorization: Bearer ...`.
- Response interceptor: on 401, IF a token was already stored (`hadToken`), clears `token`, `userType`, and `auth-storage` from localStorage and redirects to `/sign-in`. If no token was stored, the 401 just propagates as a normal failed-login error (no redirect).

### 7.4 Resolve the merge conflict in `src/api/authentication.tsx`

Open the file. It currently has three lines of merge markers committed in:
- Line 1: `<<<<<<< HEAD`
- Line 88: `=======`
- Line 183 (approx): `>>>>>>> 41dd8b6341e16e4abb1d7810761386846104ef2e`

**Action:** keep the content BETWEEN `=======` and `>>>>>>>` (i.e. the `41dd8b6` side, lines 89-182). Delete the HEAD side (lines 1-88) and all three marker lines.

**Do not change any logic** in the kept content. Do not refactor. Do not add the userType fix. This file stays functionally identical to its post-`=======` state — it just becomes syntactically valid again so `ProtectedRoute` and `Home` can keep importing from it.

After resolving, the file should export at minimum: `LoginWithMailApi`, `RegisterWithMailApi`, `GetUserDataApi`, `GetTokenValidateApi`. The `LoginWithMailApi` and `RegisterWithMailApi` exports are stale (the new pages won't use them — they'll use `authV2.tsx`) but leave them — `Home/index.tsx` and other places may or may not reference them; safer to leave intact.

### 7.5 Create `src/api/endpoint.tsx`

New file. AUTH section only. Content:

```typescript
// ─── endpoint.tsx ────────────────────────────────────────────
// URL manifest for the new auth-bridge pages (sign-in / sign-up /
// forgot-password). This file scopes only the endpoints used by
// those three pages — it is NOT a global endpoint manifest for
// prod. Other prod hooks continue to hardcode their URLs in
// src/api/authentication.tsx and the other src/api/*.tsx files.
//
// When the prod revamp lands, this file can grow to include
// other endpoint groups, or this whole bridge can be deleted.
// ─────────────────────────────────────────────────────────────

export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/user/login",
        REGISTER: "/user/register",
        USER_DATA: "/user/userData",
        FORGOT_PASSWORD: "/user/forgotpassword",
    },
} as const;
```

### 7.6 Create `src/api/authV2.tsx`

New file. Contains the three auth hooks used by the new pages: `LoginWithMailApi`, `RegisterWithMailApi`, `ForgotPasswordApi`.

**Source:** mirror from `D:\fm-digital-admin-frontend\src\api\authentication.tsx` with these specific modifications:

1. **Import from the bridge files**, not the new-repo equivalents:
   - `import api from "../lib/apiAuth";` (not `"../lib/api"`)
   - `import { ENDPOINTS } from "./endpoint";`
2. **Keep the mock-login backdoor** in `LoginWithMailApi` exactly as it exists in the new repo (the `if (payload.email === "admin@local.com" && payload.password === "pass123") { ... }` block). Per user instruction. See section 5 caveat about why this is non-functional in prod.
3. **Strip the `setUserType` call** from `LoginWithMailApi`'s `onSuccess`. The function signature becomes `(reset, navigate, setToken)` — three args. Remove `setUserType` parameter and its usage. **Important interaction with the mock-login:** the mock-login branch in the new repo returns `userType: "admin"` (lowercase). Since we are stripping `setUserType`, that returned `userType` is now unused — the mock-login block effectively only delivers the token. Leave the `userType: "admin"` field in the mock response object intact for new-repo parity; just don't wire it into the store.
4. **Include only these three hooks**: `LoginWithMailApi`, `RegisterWithMailApi`, `ForgotPasswordApi`. Do NOT include `GetUserDataApi` or `GetTokenValidateApi` in this file — those stay in the OLD `src/api/authentication.tsx` (resolved in step 7.4) where `ProtectedRoute` and `Home` already import them from.

**Expected exports of `authV2.tsx`:**

```typescript
export const LoginWithMailApi = (reset, navigate, setToken) => { ... }
export const RegisterWithMailApi = (reset, navigate) => { ... }
export const ForgotPasswordApi = (reset, navigate) => { ... }
```

**Important sanity check:** after writing, grep `authV2.tsx`:
- It SHOULD contain `admin@local.com` (mock-login is kept).
- It SHOULD NOT contain `setUserType`. If present, you missed a modification.

### 7.7 Rewrite `src/components/Authentication/Login.tsx`

The current prod file contains committed merge conflict markers (lines 1, 142, 302). The whole file is being thrown out.

**Source:** mirror from `D:\fm-digital-admin-frontend\src\components\Authentication\Login.tsx` with these modifications:

1. **Change the import** from `"../../api/authentication"` to `"../../api/authV2"`.
2. **Remove `setUserType` from the call site.** The new-repo Login currently does:
   ```typescript
   const { setToken, setUserType } = useAuthStore();
   const { mutate: LoginMail, isLoading: isLoadingLoginWithMail } = LoginWithMailApi(
       reset, navigate, setToken, setUserType
   );
   ```
   Change to:
   ```typescript
   const { setToken } = useAuthStore();
   const { mutate: LoginMail, isLoading: isLoadingLoginWithMail } = LoginWithMailApi(
       reset, navigate, setToken
   );
   ```
3. Confirm the "Forgot password?" link points to `<Link to="/forgot-password">` — it should already (verify in the source file).
4. Confirm the "Sign Up" link points to `<Link to="/sign-up">` — should already.
5. Confirm all image references resolve to files that exist in prod's `public/` folder (verify after step 7.2).

**Note about `useLocation` import:** the new-repo Login imports `useLocation` from `react-router-dom` but doesn't actually use it in the rendered code. You may safely drop the unused import to keep the file clean. If unsure, leave it — TS won't error on unused imports.

### 7.8 Rewrite `src/components/Authentication/SignUp.tsx`

The current prod SignUp does not have a merge conflict, but it's being fully replaced.

**Source:** mirror from `D:\fm-digital-admin-frontend\src\components\Authentication\SignUp.tsx` with these modifications:

1. **Change the import** from `"../../api/authentication"` to `"../../api/authV2"`.
2. Verify that the submit payload still sends `userType: "User"` (capital U). The new-repo file does at line 138. Preserve this — see section 6.
3. No other code changes.

**Things to be aware of about this file (not changes — just so you understand what you're writing):**
- It's a 4-step wizard: account name, contact details, payment, social media.
- It collects a lot of fields (fname, lname, referralCode, email, password, phone, bank details, social URLs) but ONLY sends `fname, lname, email, password, phone, userType` to the backend. The other fields are collected but discarded in `onSubmit`. This matches the new repo's current behaviour and is intentional.
- It does NOT include a captcha. The new repo's SignUp dropped the captcha. Don't add one back.
- It uses Tailwind utility classes heavily. Verify `tailwindcss` is set up in prod (it is, per `package.json` devDependencies).

### 7.9 Create `src/components/Authentication/ForgotPassword.tsx`

New file in prod.

**Source:** mirror from `D:\fm-digital-admin-frontend\src\components\Authentication\ForgotPassword.tsx` with this modification:

1. **Change the import** from `"../../api/authentication"` to `"../../api/authV2"`.

No other changes.

### 7.10 Update `src/App.tsx`

Add one route and one import.

**Locate** the existing block (around lines 69-70):

```tsx
<Route path="sign-in" element={<PublicRoute><Login /></PublicRoute>} />
<Route path="sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
```

**Add immediately after**:

```tsx
<Route path="forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
```

**Add the import** at the top of the file, alongside the existing `import Login` / `import SignUp`:

```tsx
import ForgotPassword from "./components/Authentication/ForgotPassword";
```

No other changes to App.tsx.

---

## 8. Verification checklist

After all 10 steps, verify:

- [ ] `npm install` runs without new errors (no new dependencies were added).
- [ ] `npm start` compiles without errors. (TypeScript may warn about unused imports — those are fine.)
- [ ] No `<<<<<<<`, `=======`, or `>>>>>>>` markers anywhere in `src/`. Grep to confirm.
- [ ] `grep -r "admin@local.com" src/api/authV2.tsx` returns exactly one file match (the mock-login block is intentionally kept).
- [ ] `grep -r "setUserType" src/api/authV2.tsx` returns no matches.
- [ ] `grep -r "setUserType" src/components/Authentication/Login.tsx` returns no matches.
- [ ] Visit `/sign-in` in browser — page renders, no console errors, no broken images.
- [ ] Visit `/sign-up` — page renders, can advance through the 4 wizard steps.
- [ ] Visit `/forgot-password` — page renders, captcha shows.
- [ ] Sign in with a real account — succeeds, redirects to `/`, dashboard loads, Sidebar/Navbar show the right admin-vs-user UI (compare against current prod behaviour — should be identical).
- [ ] Open browser devtools → Network tab during sign-in. Confirm the request goes to `https://api.fmdigitalofficial.com/api/v1/user/login` (baseURL comes from `.env`).
- [ ] Sign in, then in devtools manually `localStorage.removeItem('token')`, then trigger any dashboard API call. The OLD axios doesn't have a 401 interceptor, so the dashboard call will fail but the user stays on the page. This is expected (and unchanged from today's prod behaviour).
- [ ] Sign in, then manually corrupt the token in localStorage to an invalid value, then attempt to access `/sign-in` via direct URL (should redirect to `/` via PublicRoute) — actually skip this if it's confusing. The key check is that the existing prod auth flow (ProtectedRoute → GetTokenValidateApi → old axios) still works.

If `ForgotPassword` returns a 404 from the backend, that's because the backend doesn't have `/user/forgotpassword` implemented yet. This is expected; the comment in the new repo's `authentication.tsx` calls this out ("TODO: Update endpoint when backend is ready"). Flag this to the user — don't try to "fix" it from the frontend.

---

## 9. Non-goals (do not do these)

- ❌ Do not migrate other prod hooks (catalogs, label, tickets, financial, etc.) to use `endpoint.tsx`.
- ❌ Do not replace prod's `src/lib/api.tsx` with the new axios instance.
- ❌ Do not add a 401 response interceptor to the old `src/lib/api.tsx`.
- ❌ Do not fix the userType case-sensitivity bug in Sidebar, Navbar, Home, or any of the page wrappers. The bug stays.
- ❌ Do not add `.toLowerCase()` anywhere in prod.
- ❌ Do not rename or move any existing prod file beyond what this plan specifies.
- ❌ Do not delete the old `LoginWithMailApi` / `RegisterWithMailApi` in the OLD `src/api/authentication.tsx`. They become unused-but-harmless. Leave them.
- ❌ Do not amend any existing prod commit. Create a new commit (or new commits) for this work.
- ❌ Do not push to `main` or to `origin/FM-Frontend_New` without the user's explicit go-ahead.

---

## 10. Rollback path

If something goes wrong and the user wants to back out:

- All NEW files added by this port: `src/lib/apiAuth.tsx`, `src/api/endpoint.tsx`, `src/api/authV2.tsx`, `src/components/Authentication/ForgotPassword.tsx`, `.env`, `.env.example`. Delete these.
- All MODIFIED files: `src/api/authentication.tsx`, `src/components/Authentication/Login.tsx`, `src/components/Authentication/SignUp.tsx`, `src/App.tsx`. Restore from git (`git checkout HEAD -- <path>`).
- Image assets in `public/images/fm-logo/`: if any were newly copied, they can stay (no harm) or be deleted.

A `git reset --hard <commit-before-port>` would also work cleanly because every change in this port is contained in the files listed above. (Don't run that without user approval — destructive.)

---

## 11. Open caveats to flag to the user before closing

After implementation, mention these in the wrap-up summary:

1. **Backend support for `/user/forgotpassword`** — verify with the backend team. If unsupported, the ForgotPassword page will show a 404 toast and is non-functional until backend adds the route.
2. **The userType bug is still present in prod** for the non-auth pages. This was an explicit decision — out of scope for this bridge. Suggest adding a backlog ticket to fix it during the revamp.
3. **Two axios instances now coexist in prod** (`api.tsx` old + `apiAuth.tsx` new). They share the same `token` localStorage key so auth state is consistent, but this is a temporary arrangement. The revamp should consolidate.
4. **The merge-conflict resolution in `src/api/authentication.tsx`** picked the `41dd8b6` side. If the HEAD side actually contained important changes that should have survived, those are now gone. The user should review the resolved file once to confirm.
5. **`SignUp.tsx` collects far more fields than it sends to the backend** (bank details, social URLs). Confirm with the backend team whether `/user/register` is meant to receive any of these in the future — currently they're silently discarded on submit.
6. **Mock-login is non-functional in prod.** The `admin@local.com` / `pass123` backdoor is preserved in `authV2.tsx` for parity with the new repo, but cannot actually log a user in to prod's dashboard — ProtectedRoute's token-validation call against the real backend will reject the fake token and bounce the user back to `/sign-in`. If you (the user) want a working dev login in prod, that's a separate piece of work (would require either backend support for the mock token or a second short-circuit in the OLD `src/api/authentication.tsx`'s `GetTokenValidateApi`, which is out of scope for this bridge).

---

## End of plan

Implementation should take a single focused session — no architectural decisions are open, only the precise edits described above. If anything in this plan is ambiguous or contradicts what you find in the source files, STOP and ask the user before proceeding.
