<script lang="ts">
  async function load() {
    const GALAXY_FQDN = globalThis.localStorage.getItem("galaxy_fqdn");
    const OIDC_CLIENT_ID = globalThis.localStorage.getItem("oidc_client_id");
    const OIDC_LOGOUT_ENDPOINT = globalThis.localStorage.getItem(
      "oidc_logout_endpoint",
    );

    const target =
      `${OIDC_LOGOUT_ENDPOINT}` +
      `?client_id=${OIDC_CLIENT_ID}` +
      `&post_logout_redirect_uri=https://${GALAXY_FQDN}/oidc/clean`;

    globalThis.location.replace(`${target}`);
  }

  load();
</script>
