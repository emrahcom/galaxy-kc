FROM denoland/deno

WORKDIR /app

COPY home/api/galaxy /app
COPY adm.docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN \
  deno fmt --check && \
  deno lint && \
  deno cache /app/index-adm.ts && \
  deno check /app/index-adm.ts && \
  chmod +x /usr/local/bin/docker-entrypoint.sh

USER deno
EXPOSE 8000
ENTRYPOINT ["docker-entrypoint.sh"]
