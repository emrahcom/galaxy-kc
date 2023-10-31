export async function load() {
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
