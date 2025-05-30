# ------------------------------------------------------------------------------
# INIT.SH
# ------------------------------------------------------------------------------
set -e

# ------------------------------------------------------------------------------
# ENVIRONMENT
# ------------------------------------------------------------------------------
cd $INSTALLER

# ------------------------------------------------------------------------------
# INIT
# ------------------------------------------------------------------------------
[[ "$DONT_RUN_INIT" = true ]] && exit

curl -sf "$LOGGER/?text=$APP_TEMPLATE-init" || true

# ------------------------------------------------------------------------------
# CHECKS
# ------------------------------------------------------------------------------
echo

if [[ -z "$GALAXY_FQDN" ]]; then
  cat <<EOF
Error: GALAXY_FQDN not found

Please set GALAXY_FQDN before installation, e.g.

    export GALAXY_FQDN="app.mydomain.corp"
EOF
  false
fi

if [[ "$SKIP_DNS_CHECK" != true ]]; then
  if [[ -z "$(dig +short $GALAXY_FQDN)" ]]; then
    cat <<EOF
Error: Unresolvable GALAXY_FQDN: $GALAXY_FQDN

If this is a test setup and you don't have a resolvable GALAXY_FQDN,
please set SKIP_DNS_CHECK before installation

    export SKIP_DNS_CHECK=true
EOF
    false
  fi
fi

if [[ -z "$MAILER_HOST" ]]; then
  cat <<EOF
Error: MAILER_HOST not found

Please set MAILER_HOST before installation, e.g.

    export MAILER_HOST="mail.mydomain.corp"
EOF
  false
fi

if [[ -z "$MAILER_PORT" ]]; then
  cat <<EOF
Error: MAILER_PORT not found

Please set MAILER_PORT before installation, e.g.

    export MAILER_PORT=465
EOF
  false
fi

if [[ -z "$MAILER_SECURE" ]]; then
  cat <<EOF
Error: MAILER_SECURE not found

Please set MAILER_SECURE before installation, e.g.

    export MAILER_SECURE=true
EOF
  false
fi

if [[ -z "$MAILER_USER" ]]; then
  cat <<EOF
Error: MAILER_USER not found

Please set MAILER_USER before installation, e.g.

    export MAILER_USER="username"
EOF
  false
fi

if [[ -z "$MAILER_PASS" ]]; then
  cat <<EOF
Error: MAILER_PASS not found

Please set MAILER_PASS before installation, e.g.

    export MAILER_PASS="password"
EOF
  false
fi

if [[ -z "$MAILER_FROM" ]]; then
  cat <<EOF
Error: MAILER_FROM not found

Please set MAILER_FROM before installation, e.g.

    export MAILER_FROM="no-reply@mydomain.corp"
EOF
  false
fi

if [[ -z "$KEYCLOAK_ORIGIN" ]]; then
  cat <<EOF
Error: KEYCLOAK_ORIGIN not found

Please set KEYCLOAK_ORIGIN before installation, e.g.

    export KEYCLOAK_ORIGIN="https://ucs-sso-ng.mydomain.corp"
EOF
  false
fi

if [[ -z "$KEYCLOAK_REALM" ]]; then
  cat <<EOF
Error: KEYCLOAK_REALM not found

Please set KEYCLOAK_REALM before installation, e.g.

    export KEYCLOAK_REALM="ucs"
EOF
  false
fi

if [[ -z "$KEYCLOAK_CLIENT_ID" ]]; then
  cat <<EOF
Error: KEYCLOAK_CLIENT_ID not found

Please set KEYCLOAK_CLIENT_ID before installation, e.g.

    export KEYCLOAK_CLIENT_ID="galaxy"
EOF
  false
fi

# ------------------------------------------------------------------------------
# INSTALLER CONFIGURATION
# ------------------------------------------------------------------------------
cp -ap ../$TAG-base/* .
