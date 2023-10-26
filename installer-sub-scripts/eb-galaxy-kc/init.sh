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

    export GALAXY_FQDN=app.mydomain.corp
EOF
  false
fi

if [[ "$SKIP_DNS_CHECK" != true ]]; then
  if [[ -z "$(dig +short $GALAXY_FQDN)" ]]; then
    cat <<EOF
Error: Unresolvable APP_FQDN: $GALAXY_FQDN

If this is a test setup and you don't have a resolvable GALAXY_FQDN,
please set SKIP_DNS_CHECK before installation

    export SKIP_DNS_CHECK=true
EOF
    false
  fi
fi

# ------------------------------------------------------------------------------
# INSTALLER CONFIGURATION
# ------------------------------------------------------------------------------
cp -ap ../$TAG-base/* .
