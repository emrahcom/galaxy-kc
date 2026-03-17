import { ok } from "../http/response.ts";
import { getAuthEndpoint, getLogoutEndpoint } from "../common/oidc.ts";
import { CONTACT_EMAIL, GALAXY_FQDN } from "../../config.ts";

// -----------------------------------------------------------------------------
export default async function (): Promise<Response> {
  const config = [{
    contact_email: CONTACT_EMAIL,
    galaxy_fqdn: GALAXY_FQDN,
    auth_endpoint: await getAuthEndpoint(),
    logout_endpoint: await getLogoutEndpoint(),
  }];

  return ok(JSON.stringify(config));
}
