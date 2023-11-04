# Test Deployment

If there is no trusted certificate for Keycloak:

```bash
lxc-attach eb-app-api

# Uncomment Environment=IGNORE_CERT_ERRORS=--unsafely-ignore-certificate-errors
# in /etc/systemd/system/galaxy-api-adm.service

systemctl daemon-reload
systemctl restart galaxy-api-adm.service
```
