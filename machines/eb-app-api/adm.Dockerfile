FROM denoland/deno
LABEL version="v20231112"

WORKDIR /app

COPY home/api/galaxy /app
RUN deno cache /app/index-adm.ts
RUN deno cache /app/index-pri.ts
RUN deno cache /app/index-pub.ts

ENV DB_NAME "galaxy"
ENV DB_USER "galaxy"
ENV DB_PASSWD "galaxy"
ENV DB_HOST "galaxy-db"
ENV DB_PORT 5432
ENV GALAXY_FQDN "app.galaxy-kc.corp"
ENV API_SECRET "mysecret"
ENV API_TIMEOUT 86400
ENV KEYCLOAK_ORIGIN "https://ucs-sso-ng.mydomain.corp"
ENV KEYCLOAK_REALM "ucs"
ENV KEYCLOAK_CLIENT_ID "galaxy"
ENV ALLOW_UNSECURE_CERT 1

USER deno
EXPOSE 8000

CMD \
    [ "$ALLOW_UNSECURE_CERT" = "1" ] && \
        IGNORE_CERT_ERRORS="--unsafely-ignore-certificate-errors"; \
\
    deno run --allow-net --allow-env $IGNORE_CERT_ERRORS index-adm.ts