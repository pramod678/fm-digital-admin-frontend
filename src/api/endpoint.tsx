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
        VERIFY_OTP: "/user/verifyOtp",
        RESET_PASSWORD: "/user/resetPassword",
    },
} as const;
