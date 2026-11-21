FROM --platform=$BUILDPLATFORM denoland/deno AS builder

WORKDIR /app

COPY home/api/galaxy /app
RUN \
  deno fmt --check && \
  deno lint && \
  deno cache /app/index-adm.ts && \
  deno check /app/index-adm.ts

FROM denoland/deno

WORKDIR /app

COPY --from=builder /deno-dir /deno-dir
COPY --from=builder /app /app
COPY --chmod=755 adm.docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

USER deno
EXPOSE 8000
ENTRYPOINT ["docker-entrypoint.sh"]
