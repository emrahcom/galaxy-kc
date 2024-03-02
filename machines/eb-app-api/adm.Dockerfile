FROM denoland/deno

WORKDIR /app

COPY home/api/galaxy /app
RUN deno cache /app/index-adm.ts

USER deno
EXPOSE 8000

CMD \
    [ "$ALLOW_UNSECURE_CERT" = "1" ] && \
        IGNORE_CERT_ERRORS="--unsafely-ignore-certificate-errors"; \
\
    deno run --allow-net --allow-env $IGNORE_CERT_ERRORS index-adm.ts
