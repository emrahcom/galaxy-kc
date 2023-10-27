// server
export const HOSTNAME = "0.0.0.0";
export const PORT_ADMIN = 8000;
export const PORT_PRIVATE = 8001;
export const PORT_PUBLIC = 8002;

// database
export const DB_NAME = Deno.env.get("DB_NAME") || "galaxy";
export const DB_USER = Deno.env.get("DB_USER") || "galaxy";
export const DB_PASSWD = Deno.env.get("DB_PASSWD") || "___DB_PASSWD___";
export const DB_HOST = Deno.env.get("DB_HOST") || "eb-postgres";
export const DB_PORT = Number(Deno.env.get("DB_PORT") || 5432);
export const DB_POOL_SIZE = 8;
export const DEFAULT_LIST_SIZE = 10;
export const MAX_LIST_SIZE = 100;
