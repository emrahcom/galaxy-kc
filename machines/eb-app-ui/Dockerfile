# ------------------------------------------------------------------------------
# builder
# ------------------------------------------------------------------------------
FROM node:20-alpine as builder

WORKDIR /app

COPY home/ui/galaxy-dev/package.json home/ui/galaxy-dev/yarn.lock /app/
RUN yarn install

COPY home/ui/galaxy-dev/ /app/
RUN yarn build

# ------------------------------------------------------------------------------
# prod
# ------------------------------------------------------------------------------
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY etc/nginx/conf.d/docker.default.conf /etc/nginx/conf.d/default.conf
