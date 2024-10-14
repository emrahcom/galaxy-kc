import { fetch } from "./common.ts";
import type { Id } from "./types.ts";

// -----------------------------------------------------------------------------
// if already exist, do nothing in Keycloak version
// -----------------------------------------------------------------------------
export async function addIdentity(identityId: string) {
  const sql = {
    text: `
      INSERT INTO identity (id)
      VALUES ($1)
      ON CONFLICT (id) DO NOTHING
      RETURNING id, created_at as at`,
    args: [
      identityId,
    ],
  };

  return await fetch(sql) as Id[];
}

// -----------------------------------------------------------------------------
export async function updatePresence(identityId: string) {
  const sql = {
    text: `
      UPDATE identity
      SET
        seen_at = now()
      WHERE id = $1
      RETURNING id, seen_at as at`,
    args: [
      identityId,
    ],
  };

  return await fetch(sql) as Id[];
}
