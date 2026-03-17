import { ok } from "../http/response.ts";
import { getAuthEndpoint, getLogoutEndpoint } from "../common/oidc.ts";
import { CONTACT_EMAIL, GALAXY_FQDN } from "../../config.ts";
import { OIDC_CLIENT_ID, OIDC_SCOPES } from "../../config.oidc.ts";

// -----------------------------------------------------------------------------
export default async function (): Promise<Response> {
  const config = [{
    contact_email: CONTACT_EMAIL,
    galaxy_fqdn: GALAXY_FQDN,
    oidc_auth_endpoint: await getAuthEndpoint(),
    oidc_client_id: OIDC_CLIENT_ID,
    oidc_logout_endpoint: await getLogoutEndpoint(),
    oidc_scopes: OIDC_SCOPES,
  }];

  return ok(JSON.stringify(config));
}
