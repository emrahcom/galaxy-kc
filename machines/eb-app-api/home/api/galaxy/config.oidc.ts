// application
export const API_SECRET = Deno.env.get("API_SECRET") || "mysecret";
export const API_TIMEOUT = Number(Deno.env.get("API_TIMEOUT") || 86400);

// oidc
export const OIDC_ISSUER_URL = Deno.env.get("OIDC_ISSUER_URL") || "";
export const OIDC_CLIENT_ID = Deno.env.get("OIDC_CLIENT_ID") || "";
export const OIDC_CLIENT_SECRET = Deno.env.get("OIDC_CLIENT_SECRET") || "";
export const OIDC_SCOPES = Deno.env.get("OIDC_SCOPES") || "";
