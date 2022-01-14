FROM node:16.13.1-alpine10.3 AS base
WORKDIR /usr/
RUN apk update \
  && apk add bash \
  && rm -rf /var/cache/apk/*
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn generate
