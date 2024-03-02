FROM denoland/deno

WORKDIR /app

COPY home/api/galaxy /app
RUN deno cache /app/index-pub.ts

USER deno
EXPOSE 8002

CMD ["deno", "run", "--allow-net", "--allow-env", "index-pub.ts"]
