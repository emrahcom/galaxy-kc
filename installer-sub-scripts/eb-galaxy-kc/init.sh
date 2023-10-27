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
