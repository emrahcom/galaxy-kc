import { get } from "$lib/api";

// -----------------------------------------------------------------------------
export async function load() {
  if (!window.localStorage.getItem("config")) {
    const config = await get("/api/adm/config");
    window.localStorage.setItem("config", JSON.stringify(config));
  }

  const oidc = window.sessionStorage.getItem("oidc");
  if (!oidc) {
    window.location.href = "/oidc/redirect-none";
    return {};
  }

  const strData = window.localStorage.getItem("identity");
  const identity = strData ? JSON.parse(strData) : {};

  return {
    identity: identity,
  };
}
