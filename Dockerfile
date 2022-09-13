FROM node:16-buster AS builder
ARG APP_ENV=prod
ENV APP_ENV ${APP_ENV}
RUN echo ${APP_ENV}

WORKDIR /opt/app
COPY . .

RUN yarn install
RUN yarn build

FROM node:16-buster AS runner

WORKDIR /opt/app

ARG APP_ENV=prod
ENV APP_ENV ${APP_ENV}
RUN echo ${APP_ENV}

COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]