under development...

```bash
wget https://raw.githubusercontent.com/emrahcom/emrah-bullseye-base/main/installer/eb
wget https://raw.githubusercontent.com/emrahcom/galaxy-kc/main/installer/eb-galaxy-kc.conf

export GALAXY_FQDN="app.galaxy-kc.corp"
export KEYCLOAK_ORIGIN="https://ucs-sso-ng.mydomain.corp"
export KEYCLOAK_REALM="ucs"
export KEYCLOAK_CLIENT_ID="galaxy"
export SKIP_DNS_CHECK=true

bash eb eb-galaxy-kc
```
