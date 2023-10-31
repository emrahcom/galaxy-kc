export async function load() {
  const oidc = window.sessionStorage.getItem("oidc");

  if (!oidc) {
    window.location.href = "/oidc/redirect-none";
    return {};
  }

  const data = window.localStorage.getItem("identity");
  const identity = data ? JSON.parse(data) : {};

  return {
    identity: identity,
  };
}
