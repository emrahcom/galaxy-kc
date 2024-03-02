FROM denoland/deno

WORKDIR /app

COPY home/api/galaxy /app
RUN deno fmt --check
RUN deno lint
RUN deno cache /app/index-pub.ts
RUN deno check /app/index-pub.ts

USER deno
EXPOSE 8002

CMD ["deno", "run", "--allow-net", "--allow-env", "index-pub.ts"]
