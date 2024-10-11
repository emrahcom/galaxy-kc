<script lang="ts">
  async function load() {
    const GALAXY_FQDN = globalThis.localStorage.getItem("galaxy_fqdn");
    const KEYCLOAK_CLIENT_ID =
      globalThis.localStorage.getItem("keycloak_client_id");
    const KEYCLOAK_ORIGIN = globalThis.localStorage.getItem("keycloak_origin");
    const KEYCLOAK_REALM = globalThis.localStorage.getItem("keycloak_realm");

    const target =
      `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
      `/protocol/openid-connect/auth?client_id=${KEYCLOAK_CLIENT_ID}` +
      `&response_type=code&scope=openid&prompt=consent` +
      `&redirect_uri=https://${GALAXY_FQDN}/oidc/validate`;

    globalThis.location.href = `${target}`;
  }

  load();
</script>
