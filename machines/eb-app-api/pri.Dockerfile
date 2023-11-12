FROM denoland/deno
LABEL version="v20231112"

WORKDIR /app

COPY home/api/galaxy /app
RUN deno cache /app/index-adm.ts
RUN deno cache /app/index-pri.ts
RUN deno cache /app/index-pub.ts

USER deno
EXPOSE 8001

CMD ["deno", "run", "--allow-net", "--allow-env", "index-pri.ts"]
