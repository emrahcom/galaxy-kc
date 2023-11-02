<script lang="ts">
  async function load() {
    const GALAXY_FQDN = window.localStorage.getItem("galaxy_fqdn");
    const KEYCLOAK_CLIENT_ID =
      window.localStorage.getItem("keycloak_client_id");
    const KEYCLOAK_ORIGIN = window.localStorage.getItem("keycloak_origin");
    const KEYCLOAK_REALM = window.localStorage.getItem("keycloak_realm");

    const target =
      `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
      `/protocol/openid-connect/logout?client_id=${KEYCLOAK_CLIENT_ID}` +
      `&post_logout_redirect_uri=https://${GALAXY_FQDN}/oidc/clean`;

    window.location.replace(`${target}`);
  }

  load();
</script>
