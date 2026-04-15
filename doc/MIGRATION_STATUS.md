# API Endpoint Migration Status Report

**Last Updated:** 2026-04-15  
**Migration Started:** 2026-04-08 (AUTH pilot)  
**Current Phase:** File-by-file migration (1 of 9 completed)

---

## Completion Summary

| Phase | Status | % Complete |
|-------|--------|-----------|
| Setup & Pilot | ✅ Done | 100% |
| Core Migrations (9 files) | 🔄 In Progress | 11% (1/9) |
| Testing & Validation | ⏳ Pending | 0% |
| Stale Docs Update | ⏳ Pending | 0% |

---

## Completed Work

### Phase 1: Setup & Pilot (Completed 2026-04-08)
- ✅ `.env` created with `REACT_APP_API_BASE_URL`
- ✅ `src/lib/api.tsx` rewritten with interceptors + hadToken guard
- ✅ `src/api/endpoint.tsx` created with AUTH group (5 hooks)
- ✅ 7 component imports swapped to use `api/endpoint`
- ✅ Pilot tested: login with `admin@local.com / pass123` works

### Phase 2: File Migrations (In Progress)

#### Migration #1: PLATFORM.tsx — ✅ COMPLETED (2026-04-15)
- ✅ PLATFORM group added to ENDPOINTS
- ✅ `PlatformPostApi` migrated (verbatim)
- ✅ `UpdatePlatformApi` migrated (verbatim)
- ✅ Import swapped in 2 consumers:
  - `src/components/CreateRelease/Platform.tsx:6`
  - `src/components/EditRelease/EditPlatform.tsx:4`
- ✅ `src/api/platform.tsx` left intact (dead backup)
- ✅ Testing: compile clean (no red errors), URLs verified byte-for-byte match original

**Notes:**
- URLs validated against Postman: ✅ match
- No pre-existing issues found
- Risk level: Trivial (only 2 consumers)

---

## Pending Migrations (8 remaining)

| # | File | Hooks | Risk | Status |
|---|------|-------|------|--------|
| 2 | `profileLinking.tsx` | 4 | Low | ✅ Done |
| 3 | `ticket.tsx` | 4 | Low | ✅ Done |
| 4 | `label.tsx` | 5 | Low | ⏳ Queued |
| 5 | `financial.tsx` | 7 | Medium | ⏳ Queued |
| 6 | `youtubeClaims.tsx` | 7 | Medium | ⏳ Queued |
| 7 | `catalogs.tsx` | 4 | Medium | ⏳ Queued |
| 8 | `user.tsx` | 5 | Higher | ⏳ Queued |
| 9 | `releaseInfo.tsx` | 30+ | **HIGHEST** | ⏳ Last |

**Total Pending:** 66 hooks across 8 files

---

## Known Issues & Decisions

### Postman vs Frontend Mismatches
✅ **Resolved:** Uses Postman where available, keeps frontend URLs where Postman is incomplete.

**Endpoints NOT in Postman (will keep as frontend has them):**
- `admin/admin-finacial-get-all` (frontend: `GetAdminAllFinancialApi`)
- `admin/user-finacial-create` (frontend: `UserFinancialPostApi`)
- `admin/user-finacial-update/:id` (frontend: `UpdateUserFundApi`)
- `admin/finacial-history-get-all` (frontend: `GetAdminAllUserFinancialHistoryApi`)
- `admin/primary-artist-update/:id` (frontend: `UpdatePrimaryArtistApi`)

**Postman double-slash typos:** `admin//dashBoard-get-all`, `admin//dashBoard-link-create`
- ✅ **Decision:** Use canonical single-slash version (`/admin/dashBoard-get-all`)

### Pre-existing Issues (preserved, not fixed)
- Mock login shortcut for `admin@local.com / pass123` (development-only, in both endpoint.tsx and releaseInfo.tsx)
- Leading spaces in React Query keys: `" GetAllTicket"`, `" GetSongs"`
- Duplicate query keys in `youtubeClaims.tsx` (both use `releseInfoGetOne`)
- Dashboard 400 errors (backend issues, unrelated)

---

## Next Steps

1. **User Testing:** Verify platform migration works in browser (Create Release + Edit Release flows)
2. **Commit:** One commit for platform migration (easy rollback)
3. **profileLinking.tsx:** Next file (4 hooks, 3 consumers, low risk)
4. **Iterate:** Rinse and repeat per file, updating this report after each migration

---

## Hard Rules (DO NOT VIOLATE)

1. ✋ DO NOT delete old API files
2. ✋ DO NOT refactor during migration (preserve typos, unused vars, empty callbacks)
3. ✋ DO NOT break anything (test each migration step)
4. ✅ Postman is source of truth (use Postman URLs when available)
5. ✅ Keep frontend URLs unchanged (if missing from Postman)
6. ✅ All new endpoints go into `endpoint.tsx` going forward

---

## Environment Notes

- **Dev Server:** `npm start` at `localhost:3000`
- **Test Login:** `admin@local.com` / `pass123` (mock shortcut, development-only)
- **API Base:** `https://api.fmdigitalofficial.com/api/v1`
- **Postman Collection:** `FM-Digital.postman_collection.json` (root folder)
