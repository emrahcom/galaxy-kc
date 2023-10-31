export async function load() {
  const GALAXY_FQDN = window.localStorage.getItem("galaxy_fqdn");
  const KEYCLOAK_CLIENT_ID = window.localStorage.getItem("keycloak_client_id");
  const KEYCLOAK_ORIGIN = window.localStorage.getItem("keycloak_origin");
  const KEYCLOAK_REALM = window.localStorage.getItem("keycloak_realm");

  const target =
    `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
    `/protocol/openid-connect/auth?client_id=${KEYCLOAK_CLIENT_ID}` +
    `&response_type=code&scope=openid&prompt=consent` +
    `&redirect_uri=https://${GALAXY_FQDN}/oidc/validate`;

  window.location.href = `${target}`;
}
