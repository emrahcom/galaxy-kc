<script lang="ts">
  import { get } from "$lib/api";

  async function load() {
    //const GALAXY_FQDN = window.localStorage.getItem("galaxy_fqdn");
    //const KEYCLOAK_CLIENT_ID =
    //  window.localStorage.getItem("keycloak_client_id");
    //const KEYCLOAK_ORIGIN = window.localStorage.getItem("keycloak_origin");
    //const KEYCLOAK_REALM = window.localStorage.getItem("keycloak_realm");

    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem("oidc_checked", "ok");

    // Send a clearing request to API to remove the HttpOnly cookie.
    // This cookie contains the token for this session.
    try {
      await get("/api/adm/identity/clear");
    } catch {
      // do nothing
    }

    // DISABLE LOGOUT FROM KEYCLOAK, LOGOUT ONLY FROM APP
    //const target =
    //  `${KEYCLOAK_ORIGIN}/realms/${KEYCLOAK_REALM}` +
    //  `/protocol/openid-connect/logout?client_id=${KEYCLOAK_CLIENT_ID}` +
    //  `&post_logout_redirect_uri=https://${GALAXY_FQDN}/`;

    //window.location.replace(`${target}`);

    window.location.href = "/";
  }

  load();
</script>
