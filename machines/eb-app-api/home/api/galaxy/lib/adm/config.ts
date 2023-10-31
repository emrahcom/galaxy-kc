import { ok } from "../http/response.ts";
import {
  GALAXY_FQDN,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_ORIGIN,
  KEYCLOAK_REALM,
} from "../../config.ts";

// -----------------------------------------------------------------------------
export default function (): Response {
  const config = [{
    galaxy_fqdn: GALAXY_FQDN,
    keycloak_client_id: KEYCLOAK_CLIENT_ID,
    keycloak_origin: KEYCLOAK_ORIGIN,
    keycloak_realm: KEYCLOAK_REALM,
  }];

  return ok(JSON.stringify(config));
}
