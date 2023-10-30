export async function load() {
  const data = window.localStorage.getItem("identity");
  const identity = data ? JSON.parse(data) : {};

  return {
    identity: identity,
  };
}
