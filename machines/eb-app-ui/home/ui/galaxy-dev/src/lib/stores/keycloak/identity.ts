import { writable } from "svelte/store";
import type { KeycloakIdentity } from "$lib/keycloak/types";

export default writable({} as KeycloakIdentity);
