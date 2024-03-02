FROM denoland/deno

WORKDIR /app

COPY home/api/galaxy /app
RUN deno cache /app/index-pri.ts

USER deno
EXPOSE 8001

CMD ["deno", "run", "--allow-net", "--allow-env", "index-pri.ts"]
