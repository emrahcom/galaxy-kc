# ------------------------------------------------------------------------------
# builder
# ------------------------------------------------------------------------------
FROM node:20-alpine as builder

WORKDIR /app

COPY home/ui/galaxy-dev/package.json /app/
RUN yarn install

COPY home/ui/galaxy-dev/ /app/
RUN yarn run check
RUN yarn run lint
RUN yarn run build

# ------------------------------------------------------------------------------
# prod
# ------------------------------------------------------------------------------
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY etc/nginx/conf.d/docker.default.conf /etc/nginx/conf.d/default.conf
