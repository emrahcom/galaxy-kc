<script lang="ts">
  async function load() {
    const GALAXY_FQDN = globalThis.localStorage.getItem("galaxy_fqdn");
    const KEYCLOAK_CLIENT_ID =
      globalThis.localStorage.getItem("keycloak_client_id");
    const KEYCLOAK_ORIGIN = globalThis.localStorage.getItem("keycloak_origin");
    const KEYCLOAK_REALM = globalThis.localStorage.getItem("keycloak_realm");

    const target =
      `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
      `/protocol/openid-connect/logout?client_id=${KEYCLOAK_CLIENT_ID}` +
      `&post_logout_redirect_uri=https://${GALAXY_FQDN}/oidc/clean`;

    globalThis.location.replace(`${target}`);
  }

  load();
</script>
