FROM denoland/deno
LABEL version="v20231112"

WORKDIR /app

COPY home/api/galaxy /app
RUN deno cache /app/index-adm.ts
RUN deno cache /app/index-pri.ts
RUN deno cache /app/index-pub.ts

USER deno
EXPOSE 8000

CMD \
    [ "$ALLOW_UNSECURE_CERT" = "1" ] && \
        IGNORE_CERT_ERRORS="--unsafely-ignore-certificate-errors"; \
\
    deno run --allow-net --allow-env $IGNORE_CERT_ERRORS index-adm.ts
