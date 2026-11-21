FROM --platform=$BUILDPLATFORM denoland/deno AS builder

WORKDIR /app

COPY home/api/galaxy /app
RUN \
  deno fmt --check && \
  deno lint && \
  deno cache /app/index-pri.ts && \
  deno check /app/index-pri.ts

FROM denoland/deno

WORKDIR /app

COPY --from=builder /deno-dir /deno-dir
COPY --from=builder /app /app

USER deno
EXPOSE 8001
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["run", "--allow-net", "--allow-env", "index-pri.ts"]
