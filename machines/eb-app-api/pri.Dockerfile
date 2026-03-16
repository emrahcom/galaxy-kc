FROM denoland/deno

WORKDIR /app

COPY home/api/galaxy /app
RUN \
  deno fmt --check && \
  deno lint && \
  deno cache /app/index-pri.ts && \
  deno check /app/index-pri.ts

USER deno
EXPOSE 8001
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["run", "--allow-net", "--allow-env", "index-pri.ts"]
