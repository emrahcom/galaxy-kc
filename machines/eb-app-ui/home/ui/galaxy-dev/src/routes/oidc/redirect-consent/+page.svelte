<script lang="ts">
  async function load() {
    const GALAXY_FQDN = globalThis.localStorage.getItem("galaxy_fqdn");
    const OIDC_CLIENT_ID = globalThis.localStorage.getItem("oidc_client_id");
    const OIDC_SCOPES = globalThis.localStorage.getItem("oidc_scopes");
    const OIDC_AUTH_ENDPOINT =
      globalThis.localStorage.getItem("oidc_auth_endpoint");

    const target =
      `${OIDC_AUTH_ENDPOINT}` +
      `?client_id=${OIDC_CLIENT_ID}` +
      `&scope=${OIDC_SCOPES}` +
      `&response_type=code&prompt=consent` +
      `&redirect_uri=https://${GALAXY_FQDN}/oidc/validate`;

    globalThis.location.href = `${target}`;
  }

  load();
</script>
