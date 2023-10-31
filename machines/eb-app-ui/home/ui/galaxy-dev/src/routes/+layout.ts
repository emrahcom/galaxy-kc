export async function load() {
  const data = window.sessionStorage.getItem("identity");
  const identity = data ? JSON.parse(data) : {};

  return {
    identity: identity,
  };
}
